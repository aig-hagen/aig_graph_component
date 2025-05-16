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
    let pathStart, pathEnd

    if (config.nodeProps.shape === NodeShape.CIRCLE) {
        const deltaX = target.x! - source.x!
        const deltaY = target.y! - source.y!
        let dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        if (dist === 0) dist = Number.EPSILON
        const normX = deltaX / dist
        const normY = deltaY / dist

        pathStart = {
            x: source.x! + (config.nodeProps.radius - 1) * normX,
            y: source.y! + (config.nodeProps.radius - 1) * normY
        }

        if (target instanceof GraphNode) {
            pathEnd = {
                x: target.x! - (config.nodeProps.radius + config.markerPadding) * normX,
                y: target.y! - (config.nodeProps.radius + config.markerPadding) * normY
            }
        } else {
            pathEnd = {
                x: target.x!,
                y: target.y!
            }
        }
    } else if (config.nodeProps.shape === NodeShape.RECTANGLE) {
        const sourceXCenter = source.x! + config.nodeProps.width * 0.5
        const sourceYCenter = source.y! + config.nodeProps.height * 0.5
        let targetXCenter, targetYCenter
        if (target instanceof GraphNode) {
            targetXCenter = target.x! + config.nodeProps.width * 0.5
            targetYCenter = target.y! + config.nodeProps.height * 0.5
        } else {
            targetXCenter = target.x!
            targetYCenter = target.y!
        }

        const deltaX = targetXCenter - sourceXCenter
        const deltaY = targetYCenter - sourceYCenter
        let dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        if (dist === 0) dist = Number.EPSILON
        const normX = deltaX / dist //cos
        const normY = deltaY / dist //sin

        pathStart = _getRectEdgePointForPath(
            sourceXCenter,
            sourceYCenter,
            config.nodeProps.width,
            config.nodeProps.height,
            normX,
            normY,
            2
        )
        if (target instanceof GraphNode) {
            pathEnd = _getRectEdgePointForPath(
                targetXCenter,
                targetYCenter,
                config.nodeProps.width,
                config.nodeProps.height,
                -normX,
                -normY,
                -config.markerPadding + 1
            )
        } else {
            pathEnd = { x: targetXCenter, y: targetYCenter }
        }
    }

    return `M${pathStart!.x},${pathStart!.y}
          L${pathEnd!.x},${pathEnd!.y}`
}

/**
 * Creates the path of an arc line between the border of two nodes.
 *
 * @param source The source Node.
 * @param target The target Node.
 * @param config
 */
export function arcPath(source: GraphNode, target: GraphNode, config: GraphConfiguration): string {
    if (config.nodeProps.shape === NodeShape.CIRCLE) {
        const s = new Matrix([[source.x!, source.y!]])
        const t = new Matrix([[target.x!, target.y!]])
        const diff = Matrix.subtract(t, s)
        const dist = diff.norm('frobenius')
        const norm = diff.divide(dist)
        const rotation = _degreesToRadians(10)
        const start = _rotate(norm, -rotation)
            .multiply(config.nodeProps.radius - 1)
            .add(s)
        const endNorm = Matrix.multiply(norm, -1)
        const end = _rotate(endNorm, rotation)
            .multiply(config.nodeProps.radius)
            .add(t)
            .add(_rotate(endNorm, rotation).multiply(2 * config.markerBoxSize))
        const arcRadius = 1.2 * dist
        return `M${start.get(0, 0)},${start.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${end.get(0, 0)},${end.get(0, 1)}`
    } else if (config.nodeProps.shape === NodeShape.RECTANGLE) {
        const sourceXCenter = source.x! + config.nodeProps.width * 0.5
        const sourceYCenter = source.y! + config.nodeProps.height * 0.5
        const targetXCenter = target.x! + config.nodeProps.width * 0.5
        const targetYCenter = target.y! + config.nodeProps.height * 0.5

        const s = new Matrix([[sourceXCenter, sourceYCenter]])
        const t = new Matrix([[targetXCenter, targetYCenter]])
        const delta = Matrix.subtract(t, s)
        const dist = delta.norm('frobenius')
        const norm = delta.divide(dist)
        const rotation = _degreesToRadians(30)

        const pathStartPoint = _getRectEdgePointForPath(
            sourceXCenter,
            sourceYCenter,
            config.nodeProps.width,
            config.nodeProps.height,
            norm.get(0, 0),
            norm.get(0, 1),
            2
        )

        const pathStart = _rotate(norm, -rotation).add([[pathStartPoint.x, pathStartPoint.y]])

        const pathEndPoint = _getRectEdgePointForPath(
            targetXCenter,
            targetYCenter,
            config.nodeProps.width,
            config.nodeProps.height,
            -norm.get(0, 0),
            -norm.get(0, 1)
        )

        const endNorm = Matrix.multiply(norm, -1)

        const pathEnd = _rotate(endNorm, rotation)
            .add([[pathEndPoint.x, pathEndPoint.y]])
            .add(_rotate(endNorm, rotation).multiply(2 * config.markerBoxSize))

        const arcRadius = dist

        return `M${pathStart.get(0, 0)},${pathStart.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${pathEnd.get(0, 0)},${pathEnd.get(0, 1)}`
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

    if (config.nodeProps.shape === NodeShape.CIRCLE) {
        const n = new Matrix([[node.x!, node.y!]])
        if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
            c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
        }
        const diff = Matrix.subtract(n, c)
        const norm = diff.divide(diff.norm('frobenius'))
        const rotation = _degreesToRadians(40)
        const start = _rotate(norm, rotation)
            .multiply(config.nodeProps.radius - 1)
            .add(n)
        const end = _rotate(norm, -rotation)
            .multiply(config.nodeProps.radius)
            .add(n)
            .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))

        return `M${start.get(0, 0)},${start.get(0, 1)}
              A${config.nodeProps.radius},${config.nodeProps.radius},0,1,0,${end.get(0, 0)},${end.get(0, 1)}`
    } else if (config.nodeProps.shape === NodeShape.RECTANGLE) {
        const nodeXCenter = node.x! + config.nodeProps.width * 0.5
        const nodeYCenter = node.y! + config.nodeProps.height * 0.5

        const n = new Matrix([[nodeXCenter, nodeYCenter]])
        if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
            c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
        }
        const delta = Matrix.subtract(n, c)
        const norm = delta.divide(delta.norm('frobenius'))
        const rotation = _degreesToRadians(45)

        let start, end
        let arcWidthRadius = 0.5 * config.nodeProps.width
        let arcHeightRadius = 0.5 * config.nodeProps.height

        const pathStartSide = _getPathAttachmentSideReflexiveLink(
            delta.get(0, 0),
            delta.get(0, 1),
            30
        )

        if (
            pathStartSide === SideType.BOTTOMLEFT ||
            pathStartSide === SideType.BOTTOMRIGHT ||
            pathStartSide === SideType.TOPLEFT ||
            pathStartSide === SideType.TOPRIGHT
        ) {
            let m = _getPathCoordinatesForRectReflexiveLink(pathStartSide, node, config)
            start = m.start
            end = m.end

            if (config.nodeProps.width > config.nodeProps.height) {
                if (pathStartSide === SideType.TOPLEFT || pathStartSide === SideType.BOTTOMRIGHT) {
                    arcWidthRadius = 0.25 * config.nodeProps.width
                }
            } else if (config.nodeProps.height > config.nodeProps.width) {
                if (pathStartSide === SideType.TOPRIGHT || pathStartSide === SideType.BOTTOMLEFT) {
                    arcHeightRadius = 0.25 * config.nodeProps.height
                }
            }
        } else if (pathStartSide === SideType.LEFT || pathStartSide === SideType.RIGHT) {
            start = _rotate(norm, rotation)
                .multiply(0.5 * config.nodeProps.width - 1)
                .add(n)

            end = _rotate(norm, -rotation)
                .multiply(0.5 * config.nodeProps.height - 1)
                .add(n)
                .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))
        } else {
            start = _rotate(norm, rotation)
                .multiply(0.5 * config.nodeProps.height - 1)
                .add(n)

            end = _rotate(norm, -rotation)
                .multiply(0.5 * config.nodeProps.width - 1)
                .add(n)
                .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))
        }
        return `M${start.get(0, 0)},${start.get(0, 1)} A${arcWidthRadius},${arcHeightRadius}, 0, 1, 0, ${end.get(0, 0)},${end.get(0, 1)}`
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
 * Calculates the point where a directional vector from the center of a rectangular node intersects
 * with the rectangles outer edge.
 *
 * The directional vector points from the center of one node to the center of another node.
 *
 * The function returns the intersection point on the edge of the rectangular node in the given
 * direction, needed for the path coordinates.
 *
 * @param centerX - x coordinate of the rectangle center
 * @param centerY - y coordinate of the rectangle center
 * @param width - width of the rectangle
 * @param height - height of the rectangle
 * @param normX - Directional vector x value
 * @param normY - Directional vector y value
 * @param offset
 * @returns The intersection point on the rectangles edge in the direction of the vector
 */
function _getRectEdgePointForPath(
    centerX: number,
    centerY: number,
    width: number,
    height: number,
    normX: number,
    normY: number,
    offset = 0
) {
    const left = centerX - 0.5 * width
    const right = centerX + 0.5 * width
    const top = centerY - 0.5 * height
    const bottom = centerY + 0.5 * height

    if (normX === 0) normX = Number.EPSILON
    if (normY === 0) normY = Number.EPSILON

    const sideX = normX < 0 ? left : right
    const sideY = normY < 0 ? top : bottom

    // Rewritten in parametric form and set equal to the rectangle edge to find the intersection point
    // center + lambda * norm = side
    //                 lambda = (side - center) / norm
    const lambdaX = (sideX - centerX) / normX
    const lambdaY = (sideY - centerY) / normY

    const lambda = Math.min(lambdaX, lambdaY)

    let x = centerX + lambda * normX
    let y = centerY + lambda * normY

    if (offset !== 0) {
        if (lambdaX < lambdaY) {
            let factor: number
            sideX === left ? (factor = 1) : (factor = -1)
            x = x + offset * factor
        } else {
            let factor: number
            sideY === top ? (factor = 1) : (factor = -1)
            y = y + offset * factor
        }
    }

    return { x, y }
}

/**
 * Determines on which side of a rectangular shaped node a path for a reflexive link should be attached.
 *
 * @param oppositeLegLength - The vertical distance (delta y) between the node whose side is being determined and its target node
 * @param adjacentLegLength - The horizontal distance (delta x) between the node whose side is being determined and its target node
 * @param threshold - The angle range (in degree) within which a direction is considered diagonal
 * @return The determined side of the node
 */
function _getPathAttachmentSideReflexiveLink(
    oppositeLegLength: number,
    adjacentLegLength: number,
    threshold: number = 30
) {
    let angle = _radiansToDegrees(Math.atan2(oppositeLegLength, adjacentLegLength))
    if (angle < 0) angle += 360

    if (_isAngleInRange(angle, 0, threshold)) return SideType.BOTTOMLEFT
    else if (_isAngleInRange(angle, [0, 90], -threshold)) return SideType.BOTTOM
    else if (_isAngleInRange(angle, 90, threshold)) return SideType.BOTTOMRIGHT
    else if (_isAngleInRange(angle, [90, 180], -threshold)) return SideType.RIGHT
    else if (_isAngleInRange(angle, 180, threshold)) return SideType.TOPRIGHT
    else if (_isAngleInRange(angle, [180, 270], -threshold)) return SideType.TOP
    else if (_isAngleInRange(angle, 270, threshold)) return SideType.TOPLEFT
    else return SideType.LEFT
}

/**
 * Gets the start and end coordinates for a path required for a reflexive link on a rectangular node.
 * @param side - The corner of the rect node on which the path should start
 * @param node - The node
 * @param config - The graph config
 */
function _getPathCoordinatesForRectReflexiveLink(
    side: SideType,
    node: GraphNode,
    config: GraphConfiguration
) {
    const x = node.x!
    const y = node.y!
    const widthOffset =
        config.nodeProps.shape === NodeShape.RECTANGLE
            ? config.nodeProps.width
            : config.nodeProps.radius
    const heightOffset =
        config.nodeProps.shape === NodeShape.RECTANGLE
            ? config.nodeProps.height
            : config.nodeProps.radius
    const markerBoxSize = config.markerBoxSize

    const points = {
        [SideType.BOTTOMLEFT]: {
            start: [x + 2, y + heightOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + heightOffset + 2 * markerBoxSize]
        },
        [SideType.BOTTOM]: {
            start: [x + 0.5 * widthOffset, y + heightOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + 0.5 * heightOffset - 2 * markerBoxSize]
        },
        [SideType.BOTTOMRIGHT]: {
            start: [x + widthOffset - 2, y + heightOffset - 1],
            end: [x + widthOffset + 2 * markerBoxSize, y + 4]
        },
        [SideType.RIGHT]: {
            start: [x + 2, y + heightOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + heightOffset + 2 * markerBoxSize]
        },
        [SideType.TOPRIGHT]: {
            start: [x + widthOffset - 2, y + 1],
            end: [x + 4, y - 2 * markerBoxSize]
        },
        [SideType.TOP]: {
            start: [x + 2, y + heightOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + heightOffset + 2 * markerBoxSize]
        },
        [SideType.TOPLEFT]: {
            start: [x + 2, y + 1],
            end: [x - 2 * markerBoxSize, y + heightOffset - 2 * markerBoxSize]
        },
        [SideType.LEFT]: {
            start: [x + 2, y + heightOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + heightOffset + 2 * markerBoxSize]
        }
    }

    const { start, end } = points[side]
    return {
        start: new Matrix([start]),
        end: new Matrix([end])
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
