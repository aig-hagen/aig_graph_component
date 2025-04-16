import Matrix from 'ml-matrix'
//@ts-ignore
import svgPathReverse from 'svg-path-reverse'
import type { GraphConfiguration } from '@/model/config'
import { GraphNode } from '@/model/graph-node'
import type { GraphLink } from '@/model/graph-link'
import { PathType } from '@/model/path-type'
import { SideType } from '@/model/side-type'
import type Graph from '@/model/graph'
import type { UnwrapRef } from 'vue'
import { NodeShape } from '@/model/node-shape'

/**
 * Generates a path string depending on the needed path type
 * @param d
 * @param width
 * @param height
 * @param config
 */
export function generatePath(
    d: GraphLink,
    width: number,
    height: number,
    config: GraphConfiguration
): string {
    switch (d.pathType) {
        case PathType.REFLEXIVE: {
            return reflexivePath(d.source, [width / 2, height / 2], config)
        }
        case PathType.ARC: {
            return arcPath(d.source, d.target, config)
        }
        case PathType.ARCREVERSE: {
            return svgPathReverse.reverse(arcPath(d.source, d.target, config))
        }
        case PathType.LINE: {
            return linePath(d.source, d.target, config)
        }
        case PathType.LINEREVERSE: {
            return svgPathReverse.reverse(linePath(d.source, d.target, config))
        }
        default: {
            return '' //should never be reached
        }
    }
}

/**
 * Gets the path type for a link depending on the connection and position of its nodes.
 */
export function getPathType(source: GraphNode, target: GraphNode, graph: UnwrapRef<Graph>) {
    if (source.id === target.id) {
        return PathType.REFLEXIVE
    } else if (graph.hasBidirectionalConnection(source, target)) {
        return doesPathNeedReversion(source, target) ? PathType.ARCREVERSE : PathType.ARC
    } else {
        return doesPathNeedReversion(source, target) ? PathType.LINEREVERSE : PathType.LINE
    }
}

/**
 * Creates the path of a straight line between the border of two nodes or between a source node and an end point.
 *
 * @param source The source node.
 * @param target The target node or an endpoint with x and y coordinates.
 * @param config
 */
export function linePath(
    source: GraphNode,
    target: GraphNode | { x: number; y: number },
    config: GraphConfiguration
): string {
    let sourceX, sourceY, targetX, targetY

    if (config.nodeShape === NodeShape.CIRCLE) {
        const deltaX = target.x! - source.x!
        const deltaY = target.y! - source.y!
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const normX = deltaX / dist
        const normY = deltaY / dist

        sourceX = source.x! + (config.nodeRadius - 1) * normX
        sourceY = source.y! + (config.nodeRadius - 1) * normY

        if (target instanceof GraphNode) {
            targetX = target.x! - config.markerPadding * normX
            targetY = target.y! - config.markerPadding * normY
        } else {
            targetX = target.x!
            targetY = target.y!
        }
    } else if (config.nodeShape === NodeShape.RECTANGLE) {
        //fixme radius will be adapted to width and height in the future
        const sourceXCenter = source.x! + config.nodeRadius * 0.5
        const sourceYCenter = source.y! + config.nodeRadius * 0.5
        let targetXCenter, targetYCenter
        if (target instanceof GraphNode) {
            targetXCenter = target.x! + config.nodeRadius * 0.5
            targetYCenter = target.y! + config.nodeRadius * 0.5
        } else {
            targetXCenter = target.x!
            targetYCenter = target.y!
        }

        const deltaX = targetXCenter - sourceXCenter
        const deltaY = targetYCenter - sourceYCenter
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const normX = deltaX / dist //cos
        const normY = deltaY / dist //sin

        const offsetSource = _getOffsetForSide(
            _getPathAttachmentSide(deltaY, deltaX),
            0.5 * config.nodeRadius - 1,
            0.5 * config.nodeRadius - 1,
            0.5 * config.nodeRadius - 2,
            normX,
            normY
        )
        sourceX = sourceXCenter + offsetSource.x
        sourceY = sourceYCenter + offsetSource.y

        if (target instanceof GraphNode) {
            const offsetTarget = _getOffsetForSide(
                _getPathAttachmentSide(-deltaY, -deltaX),
                0.5 * config.nodeRadius - config.markerPadding - 2,
                0.5 * config.nodeRadius - config.markerPadding - 2,
                0.5 * config.nodeRadius - config.markerPadding,
                -normX,
                -normY
            )

            targetX = targetXCenter - offsetTarget.x
            targetY = targetYCenter - offsetTarget.y
        } else {
            targetX = targetXCenter
            targetY = targetYCenter
        }
    }

    return `M${sourceX},${sourceY}
          L${targetX},${targetY}`
}

/**
 * Creates the path of an arc line between the border of two nodes.
 *
 * @param source The source Node.
 * @param target The target Node.
 * @param config
 */
export function arcPath(source: GraphNode, target: GraphNode, config: GraphConfiguration): string {
    if (config.nodeShape === NodeShape.CIRCLE) {
        const s = new Matrix([[source.x!, source.y!]])
        const t = new Matrix([[target.x!, target.y!]])
        const diff = Matrix.subtract(t, s)
        const dist = diff.norm('frobenius')
        const norm = diff.divide(dist)
        const rotation = _degreesToRadians(10)
        const start = _rotate(norm, -rotation)
            .multiply(config.nodeRadius - 1)
            .add(s)
        const endNorm = Matrix.multiply(norm, -1)
        const end = _rotate(endNorm, rotation)
            .multiply(config.nodeRadius)
            .add(t)
            .add(_rotate(endNorm, rotation).multiply(2 * config.markerBoxSize))
        const arcRadius = 1.2 * dist
        return `M${start.get(0, 0)},${start.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${end.get(0, 0)},${end.get(0, 1)}`
    } else if (config.nodeShape === NodeShape.RECTANGLE) {
        //fixme radius will be adapted to width and height in the future
        const sourceXCenter = source.x! + config.nodeRadius * 0.5
        const sourceYCenter = source.y! + config.nodeRadius * 0.5
        const targetXCenter = target.x! + config.nodeRadius * 0.5
        const targetYCenter = target.y! + config.nodeRadius * 0.5

        const s = new Matrix([[sourceXCenter, sourceYCenter]])
        const t = new Matrix([[targetXCenter, targetYCenter]])
        const delta = Matrix.subtract(t, s)
        const dist = delta.norm('frobenius')
        const norm = delta.divide(dist)
        const rotation = _degreesToRadians(30)

        const offsetSource = _getOffsetForSide(
            _getPathAttachmentSide(delta.get(0, 1), delta.get(0, 0)),
            0.5 * config.nodeRadius - 1,
            0.5 * config.nodeRadius - 1,
            0.5 * config.nodeRadius - 2,
            norm.get(0, 0),
            norm.get(0, 1)
        )
        const sourceX = sourceXCenter + offsetSource.x
        const sourceY = sourceYCenter + offsetSource.y

        const start = _rotate(norm, -rotation).add([[sourceX, sourceY]])

        const offsetTarget = _getOffsetForSide(
            _getPathAttachmentSide(-delta.get(0, 1), -delta.get(0, 0)),
            0.5 * config.nodeRadius - config.markerPadding + 4,
            0.5 * config.nodeRadius - config.markerPadding + 4,
            0.5 * config.nodeRadius - config.markerPadding + 6,
            -norm.get(0, 0),
            -norm.get(0, 1)
        )
        const targetX = targetXCenter - offsetTarget.x
        const targetY = targetYCenter - offsetTarget.y

        const endNorm = Matrix.multiply(norm, -1)

        const end = _rotate(endNorm, rotation)
            .add([[targetX, targetY]])
            .add(_rotate(endNorm, rotation).multiply(2 * config.markerBoxSize))

        const arcRadius = 1.2 * dist

        return `M${start.get(0, 0)},${start.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${end.get(0, 0)},${end.get(0, 1)}`
    } else {
        return '' //should never be reached
    }
}

/**
 * Creates the path of a reflexive line of a node.
 * It will always be directed away from the center.
 *
 * @param node The Node.
 * @param center The center point of the canvas.
 * @param config
 */
export function reflexivePath(
    node: GraphNode,
    center: [number, number],
    config: GraphConfiguration
): string {
    const c = new Matrix([center])

    if (config.nodeShape === NodeShape.RECTANGLE) {
        //fixme radius will be adapted to width and height in the future
        const nodeXCenter = node.x! + config.nodeRadius * 0.5
        const nodeYCenter = node.y! + config.nodeRadius * 0.5

        const n = new Matrix([[nodeXCenter, nodeYCenter]])
        if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
            c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
        }
        const delta = Matrix.subtract(n, c)
        const norm = delta.divide(delta.norm('frobenius'))
        const rotation = _degreesToRadians(45)

        let pathStartsInCorner = _getAttachmentCornerForPathStartReflexiveLink(
            delta.get(0, 0),
            delta.get(0, 1),
            25
        )

        let start, end
        if (pathStartsInCorner) {
            let m = _getPathPointsForRectReflexiveLink(pathStartsInCorner, node, config)
            start = m.start
            end = m.end
        } else {
            start = _rotate(norm, rotation)
                .multiply(0.5 * config.nodeRadius - 1)
                .add(n)

            end = _rotate(norm, -rotation)
                .multiply(0.5 * config.nodeRadius - 1)
                .add(n)
                .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))
        }
        return `M${start.get(0, 0)},${start.get(0, 1)} A${0.5 * config.nodeRadius},${0.5 * config.nodeRadius}, 0, 1, 0, ${end.get(0, 0)},${end.get(0, 1)}`
    } else if (config.nodeShape === NodeShape.CIRCLE) {
        const n = new Matrix([[node.x!, node.y!]])
        if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
            c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
        }
        const diff = Matrix.subtract(n, c)
        const norm = diff.divide(diff.norm('frobenius'))
        const rotation = _degreesToRadians(40)
        const start = _rotate(norm, rotation)
            .multiply(config.nodeRadius - 1)
            .add(n)
        const end = _rotate(norm, -rotation)
            .multiply(config.nodeRadius)
            .add(n)
            .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))

        return `M${start.get(0, 0)},${start.get(0, 1)}
              A${config.nodeRadius},${config.nodeRadius},0,1,0,${end.get(0, 0)},${end.get(0, 1)}`
    } else {
        return `` //should never be reached
    }
}

/**
 * Determines if a path needs reversion, which is the case when the source nodes x value
 * is bigger than the target nodes x value.
 * This is necessary for flipping the text-path element that is used for the link labels.
 */
export function doesPathNeedReversion(source: GraphNode, target: GraphNode): boolean {
    return source.x! > target.x!
}

/**
 * Determines on which side of a rectangular shaped node a path should be attached.
 *
 * @param oppositeLegLength - The vertical distance (delta y) between the node whose side is being determined and its target node
 * @param adjacentLegLength - The horizontal distance (delta x) between the node whose side is being determined and its target node
 * @param threshold - The angle range (in degree) within which a direction is considered diagonal
 * @return The determined side of the node
 */
function _getPathAttachmentSide(
    oppositeLegLength: number,
    adjacentLegLength: number,
    threshold: number = 2
) {
    let angle = _radiansToDegrees(Math.atan2(oppositeLegLength, adjacentLegLength))
    if (angle < 0) angle += 360

    if (_isAngleInRange(angle, 45, threshold)) return SideType.BOTTOMRIGHT
    else if (_isAngleInRange(angle, [45, 135], -threshold)) return SideType.BOTTOM
    else if (_isAngleInRange(angle, 135, threshold)) return SideType.BOTTOMLEFT
    else if (_isAngleInRange(angle, [135, 225], -threshold)) return SideType.LEFT
    else if (_isAngleInRange(angle, 225, threshold)) return SideType.TOPLEFT
    else if (_isAngleInRange(angle, [225, 315], -threshold)) return SideType.TOP
    else if (_isAngleInRange(angle, 315, threshold)) return SideType.TOPRIGHT
    else return SideType.RIGHT
}

function _getOffsetForSide(
    side: SideType,
    widthOffset: number,
    heightOffset: number,
    diagonalOffset: number,
    normX: number,
    normY: number
) {
    return {
        [SideType.RIGHT]: {
            x: widthOffset,
            y: heightOffset * normY
        },
        [SideType.BOTTOMRIGHT]: {
            x: diagonalOffset,
            y: diagonalOffset
        },
        [SideType.BOTTOM]: {
            x: widthOffset * normX,
            y: heightOffset
        },
        [SideType.BOTTOMLEFT]: {
            x: -diagonalOffset,
            y: diagonalOffset
        },
        [SideType.LEFT]: {
            x: -widthOffset,
            y: heightOffset * normY
        },
        [SideType.TOPLEFT]: {
            x: -diagonalOffset,
            y: -diagonalOffset
        },
        [SideType.TOP]: {
            x: widthOffset * normX,
            y: -heightOffset
        },
        [SideType.TOPRIGHT]: {
            x: diagonalOffset,
            y: -diagonalOffset
        }
    }[side]
}

/**
 * Gets the start and end coordinates for a path required for a reflexive link on a rectangular node.
 * @param side - The corner of the rect node on which the path should start
 * @param node - The node
 * @param config - The graph config
 */
function _getPathPointsForRectReflexiveLink(
    side: SideType.BOTTOMRIGHT | SideType.BOTTOMLEFT | SideType.TOPLEFT | SideType.TOPRIGHT,
    node: GraphNode,
    config: GraphConfiguration
) {
    const x = node.x!
    const y = node.y!
    const widthOffset = config.nodeRadius //fixme radius will be adapted to width and height in the future
    const markerBoxSize = config.markerBoxSize

    const points = {
        [SideType.BOTTOMLEFT]: {
            start: [x + 2, y + widthOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + widthOffset + 2 * markerBoxSize]
        },
        [SideType.BOTTOMRIGHT]: {
            start: [x + widthOffset - 2, y + widthOffset - 1],
            end: [x + widthOffset + 2 * markerBoxSize, y + 4]
        },
        [SideType.TOPRIGHT]: {
            start: [x + widthOffset - 2, y + 1],
            end: [x + 4, y - 2 * markerBoxSize]
        },
        [SideType.TOPLEFT]: {
            start: [x + 2, y + 1],
            end: [x - 2 * markerBoxSize, y + widthOffset - 2 * markerBoxSize]
        }
    }

    const { start, end } = points[side]
    return {
        start: new Matrix([start]),
        end: new Matrix([end])
    }
}

/**
 * Determine the corner where a reflexive link path should start for a rectangular node.
 * @param oppositeLegLength
 * @param adjacentLegLength
 * @param threshold
 * @returns The side type of the attachment corner or false if the attachment side isn't a corner.
 */
function _getAttachmentCornerForPathStartReflexiveLink(
    oppositeLegLength: number,
    adjacentLegLength: number,
    threshold: number = 2
) {
    let angle = _radiansToDegrees(Math.atan2(oppositeLegLength, adjacentLegLength))
    if (angle < 0) {
        angle += 360
    }

    if (_isAngleInRange(angle, 0, threshold)) {
        return SideType.BOTTOMLEFT
    } else if (_isAngleInRange(angle, 90, threshold)) {
        return SideType.BOTTOMRIGHT
    } else if (_isAngleInRange(angle, 180, threshold)) {
        return SideType.TOPRIGHT
    } else if (_isAngleInRange(angle, 270, threshold)) {
        return SideType.TOPLEFT
    } else {
        return false
    }
}

/**
 * Checks whether a given angle is within a range around a center angle or a range of angles,
 * where the range is defined as the area from the angleRange ± the threshold within 0 and 360 degrees.
 *
 * @param angleToCheck The angle (in degrees) to check.
 * @param angleRange The center of the angle range or the start and end angle for the range (in degrees).
 * @param threshold The threshold (in degrees) that defines how far the range extends
 *                    on either side of the center.
 */
function _isAngleInRange(
    angleToCheck: number,
    angleRange: number | [number, number],
    threshold: number = 0
): boolean {
    angleToCheck = (angleToCheck + 360) % 360

    let start, end

    if (typeof angleRange === 'number') {
        start = (angleRange - threshold + 360) % 360
        end = (angleRange + threshold) % 360
    } else {
        start = (angleRange[0] - threshold + 360) % 360
        end = (angleRange[1] + threshold) % 360
    }

    return start < end
        ? angleToCheck >= start && angleToCheck <= end
        : angleToCheck >= start || angleToCheck <= end
}

/**
 * Calculates the radian value for the given degrees.
 *
 * @param degrees The degrees.
 */
function _degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
}

/**
 * Calculates the degree value for the given radian.
 * @param radians
 */
function _radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI)
}

/**
 * Rotates a vector by the given radians around the origin.
 *
 * @param vector The vector to be rotated.
 * @param radians The radians to rotate the vector by.
 */
function _rotate(vector: Matrix, radians: number): Matrix {
    const x = vector.get(0, 0)
    const y = vector.get(0, 1)
    return new Matrix([
        [
            x * Math.cos(radians) - y * Math.sin(radians),
            x * Math.sin(radians) + y * Math.cos(radians)
        ]
    ])
}
