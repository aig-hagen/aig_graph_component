import Matrix from 'ml-matrix'
//@ts-ignore
import svgPathReverse from 'svg-path-reverse'
import type { GraphConfiguration, NodeCircle, NodeRect } from '@/model/config'
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
 * @param target The target node or an endpoint (e.g. a pointer) with x and y coordinates.
 * @param config
 */
export function linePath(
    source: GraphNode,
    target: GraphNode | { x: number; y: number },
    config: GraphConfiguration
): string {
    const delta = _linePathDetermineDelta(source, target)
    let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)
    if (dist === 0) dist = Number.EPSILON
    const normX = delta.x / dist //cos
    const normY = delta.y / dist //sin

    const pathCoordinate = _linePathDeterminePathStartAndEnd(source, target, config, normX, normY)

    return `M${pathCoordinate.start!.x},${pathCoordinate.start!.y}
          L${pathCoordinate.end!.x},${pathCoordinate.end!.y}`
}

/**
 * Determines the delta in x and y direction between the source and target node or point for line path calculation.
 * @param source
 * @param target
 */
function _linePathDetermineDelta(source: GraphNode, target: GraphNode | { x: number; y: number }) {
    const sourceX =
        source.nodeProps.shape === NodeShape.CIRCLE
            ? source.x!
            : source.x! + source.nodeProps.width * 0.5

    const sourceY =
        source.nodeProps.shape === NodeShape.CIRCLE
            ? source.y!
            : source.y! + source.nodeProps.height * 0.5

    let targetX, targetY

    if (target instanceof GraphNode) {
        targetX =
            target.nodeProps.shape === NodeShape.CIRCLE
                ? target.x!
                : target.x! + target.nodeProps.width * 0.5
        targetY =
            target.nodeProps.shape === NodeShape.CIRCLE
                ? target.y!
                : target.y! + target.nodeProps.height * 0.5
    } else {
        //if the arrow end is a pointer position (for draggable link) and not (yet) a node
        targetX = target.x!
        targetY = target.y!
    }

    const deltaX = targetX - sourceX
    const deltaY = targetY - sourceY

    return { x: deltaX, y: deltaY }
}

/**
 * Determines the start and end point for the line path calculation.
 * @param source
 * @param target
 * @param config
 * @param normX
 * @param normY
 */
function _linePathDeterminePathStartAndEnd(
    source: GraphNode,
    target: GraphNode | { x: number; y: number },
    config: GraphConfiguration,
    normX: number,
    normY: number
) {
    let pathStart, pathEnd

    if (source.nodeProps.shape === NodeShape.CIRCLE) {
        pathStart = {
            x: source.x! + (source.nodeProps.radius - 1) * normX,
            y: source.y! + (source.nodeProps.radius - 1) * normY
        }
    } else if (source.nodeProps.shape === NodeShape.RECTANGLE) {
        pathStart = _getRectEdgePointForPath(
            source.x! + source.nodeProps.width * 0.5,
            source.y! + source.nodeProps.height * 0.5,
            source.nodeProps.width,
            source.nodeProps.height,
            normX,
            normY,
            2
        )
    }

    if (target instanceof GraphNode) {
        pathEnd =
            target.nodeProps.shape === NodeShape.CIRCLE
                ? {
                      x: target.x! - (target.nodeProps.radius + config.markerPadding) * normX,
                      y: target.y! - (target.nodeProps.radius + config.markerPadding) * normY
                  }
                : _getRectEdgePointForPath(
                      target.x! + target.nodeProps.width * 0.5,
                      target.y! + target.nodeProps.height * 0.5,
                      target.nodeProps.width,
                      target.nodeProps.height,
                      -normX,
                      -normY,
                      -config.markerPadding + 1
                  )
    } else {
        //if the arrow end is a pointer position (for draggable link) and not (yet) a node
        pathEnd = {
            x: target.x!,
            y: target.y!
        }
    }

    return { start: pathStart, end: pathEnd }
}

/**
 * Creates the path of an arc line between the border of two nodes.
 *
 * @param source The source Node.
 * @param target The target Node.
 * @param config
 */
export function arcPath(source: GraphNode, target: GraphNode, config: GraphConfiguration): string {
    const s =
        source.nodeProps.shape === NodeShape.CIRCLE
            ? new Matrix([[source.x!, source.y!]])
            : new Matrix([
                  [
                      source.x! + source.nodeProps.width * 0.5,
                      source.y! + source.nodeProps.height * 0.5
                  ]
              ])

    const t =
        target.nodeProps.shape === NodeShape.CIRCLE
            ? new Matrix([[target.x!, target.y!]])
            : new Matrix([
                  [
                      target.x! + target.nodeProps.width * 0.5,
                      target.y! + target.nodeProps.height * 0.5
                  ]
              ])

    const delta = Matrix.subtract(t, s)
    const dist = delta.norm('frobenius')
    const norm = delta.divide(dist)
    let startRotation =
        source.nodeProps.shape === NodeShape.CIRCLE ? _degreesToRadians(10) : _degreesToRadians(30)
    let endRotation =
        target.nodeProps.shape === NodeShape.CIRCLE ? _degreesToRadians(10) : _degreesToRadians(30)

    let arcRadius = 1.2 * dist

    const pathCoordinate = _arcPathDeterminePathStartAndEnd(source, target, config, s, t, norm, {
        start: startRotation,
        end: endRotation
    })

    return `M${pathCoordinate.start!.get(0, 0)},${pathCoordinate.start!.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${pathCoordinate.end!.get(0, 0)},${pathCoordinate.end!.get(0, 1)}`
}

function _arcPathDeterminePathStartAndEnd(
    source: GraphNode,
    target: GraphNode,
    config: GraphConfiguration,
    s: Matrix,
    t: Matrix,
    norm: Matrix,
    rotation: { start: number; end: number }
) {
    let pathStart, pathEnd

    if (source.nodeProps.shape === NodeShape.CIRCLE) {
        pathStart = _rotate(norm, -rotation.start)
            .multiply(source.nodeProps.radius - 1)
            .add(s)
    } else if (source.nodeProps.shape === NodeShape.RECTANGLE) {
        const pathStartPoint = _getRectEdgePointForPath(
            source.x! + source.nodeProps.width * 0.5,
            source.y! + source.nodeProps.height * 0.5,
            source.nodeProps.width,
            source.nodeProps.height,
            norm.get(0, 0),
            norm.get(0, 1),
            2
        )

        pathStart = _rotate(norm, -rotation.start).add([[pathStartPoint.x, pathStartPoint.y]])
    }

    if (target.nodeProps.shape === NodeShape.CIRCLE) {
        const endNorm = Matrix.multiply(norm, -1)
        pathEnd = _rotate(endNorm, rotation.end)
            .multiply(target.nodeProps.radius)
            .add(t)
            .add(_rotate(endNorm, rotation.end).multiply(2 * config.markerBoxSize))
    } else if (target.nodeProps.shape === NodeShape.RECTANGLE) {
        const pathEndPoint = _getRectEdgePointForPath(
            target.x! + target.nodeProps.width * 0.5,
            target.y! + target.nodeProps.height * 0.5,
            target.nodeProps.width,
            target.nodeProps.height,
            -norm.get(0, 0),
            -norm.get(0, 1)
        )

        const endNorm = Matrix.multiply(norm, -1)

        pathEnd = _rotate(endNorm, rotation.end)
            .add([[pathEndPoint.x, pathEndPoint.y]])
            .add(_rotate(endNorm, rotation.end).multiply(2 * config.markerBoxSize))
    }

    return { start: pathStart, end: pathEnd }
}

/**
 * Creates the path of a reflexive line of a node.
 *
 * For circular nodes it will always be directed away from the center.
 * For rectangular nodes this is the case if they have the `MOVABLE` option set in the `config`,
 * otherwise they will start at the side mentioned in the configs `reflexiveEdgeStart`.
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

    if (node.nodeProps.shape === NodeShape.CIRCLE) {
        const n = new Matrix([[node.x!, node.y!]])
        if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
            c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
        }
        const diff = Matrix.subtract(n, c)
        const norm = diff.divide(diff.norm('frobenius'))
        const rotation = _degreesToRadians(40)
        const start = _rotate(norm, rotation)
            .multiply((node.nodeProps as NodeCircle).radius - 1)
            .add(n)
        const end = _rotate(norm, -rotation)
            .multiply((node.nodeProps as NodeCircle).radius)
            .add(n)
            .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))

        return `M${start.get(0, 0)},${start.get(0, 1)}
              A${(node.nodeProps as NodeCircle).radius},${(node.nodeProps as NodeCircle).radius},0,1,0,${end.get(0, 0)},${end.get(0, 1)}`
    } else if (node.nodeProps.shape === NodeShape.RECTANGLE) {
        if ((node.nodeProps as NodeRect).reflexiveEdgeStart == 'MOVABLE') {
            return _reflexiveRectPathMovable(node, config, c)
        } else {
            return _reflexiveRectPathFixed(node, config)
        }
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
    let xSource, xTarget

    xSource =
        source.nodeProps.shape === NodeShape.CIRCLE
            ? source.x! - source.nodeProps.radius
            : source.x!
    xTarget =
        target.nodeProps.shape === NodeShape.CIRCLE
            ? target.x! - target.nodeProps.radius
            : target.x!

    return xSource > xTarget
}

/**
 * Creates the path for a reflexive link on a rectangular node.
 * The path position adjusts dynamically when the node is moved and is always directed away from the center.
 *
 * **Caution**: This should only be used when the *width-to-height ratio of the node is less than or equal to 3:1*
 * since with a higher ratio, the reflexive edges do no longer visually align well with the node.
 *
 * @param node The rectangular node
 * @param config
 * @param c The center matrix
 */
function _reflexiveRectPathMovable(node: GraphNode, config: GraphConfiguration, c: Matrix) {
    if (node.nodeProps.shape === NodeShape.RECTANGLE) {
        const nodeXCenter = node.x! + (node.nodeProps as NodeRect).width * 0.5
        const nodeYCenter = node.y! + (node.nodeProps as NodeRect).height * 0.5

        const n = new Matrix([[nodeXCenter, nodeYCenter]])
        if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
            c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
        }
        const delta = Matrix.subtract(n, c)
        const norm = delta.divide(delta.norm('frobenius'))
        const rotation = _degreesToRadians(45)

        let start, end
        let arcWidthRadius = 0.5 * (node.nodeProps as NodeRect).width
        let arcHeightRadius = 0.5 * (node.nodeProps as NodeRect).height

        const pathStartSide = _getPathAttachmentSideForRectReflexiveLink(
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

            if ((node.nodeProps as NodeRect).width > (node.nodeProps as NodeRect).height) {
                if (pathStartSide === SideType.TOPLEFT || pathStartSide === SideType.BOTTOMRIGHT) {
                    arcWidthRadius = 0.25 * (node.nodeProps as NodeRect).width
                }
            } else if ((node.nodeProps as NodeRect).height > (node.nodeProps as NodeRect).width) {
                if (pathStartSide === SideType.TOPRIGHT || pathStartSide === SideType.BOTTOMLEFT) {
                    arcHeightRadius = 0.25 * (node.nodeProps as NodeRect).height
                }
            }
        } else if (pathStartSide === SideType.LEFT || pathStartSide === SideType.RIGHT) {
            start = _rotate(norm, rotation)
                .multiply(0.5 * (node.nodeProps as NodeRect).width - 1)
                .add(n)

            end = _rotate(norm, -rotation)
                .multiply(0.5 * (node.nodeProps as NodeRect).height - 1)
                .add(n)
                .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))
        } else {
            start = _rotate(norm, rotation)
                .multiply(0.5 * (node.nodeProps as NodeRect).height - 1)
                .add(n)

            end = _rotate(norm, -rotation)
                .multiply(0.5 * (node.nodeProps as NodeRect).width - 1)
                .add(n)
                .add(_rotate(norm, -rotation).multiply(2 * config.markerBoxSize))
        }
        return `M${start.get(0, 0)},${start.get(0, 1)} A${arcWidthRadius},${arcHeightRadius}, 0, 1, 0, ${end.get(0, 0)},${end.get(0, 1)}`
    } else {
        return '' //should never be reached
    }
}

/**
 * Creates the path for a reflexive link of a rectangular node.
 * The path is fixed and starts from the side defined by the `reflexiveEdgeStart` property of `nodeProps`
 * in the `config`.
 *
 * *For width-to-height ratios above 1:10, reflexive edges from the short to the long side display with a very shallow angle.
 * Prefer staying within this ratio or starting the edge from the longer side by specifying in the
 * `reflexiveEdgeStart` property of `NodeProps` inside the `config`.*
 *
 * @param node The rectangular node
 * @param config
 */
function _reflexiveRectPathFixed(node: GraphNode, config: GraphConfiguration) {
    if (
        (node.nodeProps as NodeRect).shape === NodeShape.RECTANGLE &&
        (node.nodeProps as NodeRect).reflexiveEdgeStart !== 'MOVABLE'
    ) {
        let start, end
        let arcWidthRadius = 0.5 * (node.nodeProps as NodeRect).width
        let arcHeightRadius = 0.5 * (node.nodeProps as NodeRect).height

        if ((node.nodeProps as NodeRect).width > (node.nodeProps as NodeRect).height) {
            if (
                (node.nodeProps as NodeRect).reflexiveEdgeStart === SideType.TOPLEFT ||
                (node.nodeProps as NodeRect).reflexiveEdgeStart === SideType.BOTTOMRIGHT
            ) {
                arcWidthRadius =
                    (node.nodeProps as NodeRect).width / (node.nodeProps as NodeRect).height +
                    (node.nodeProps as NodeRect).height
            }
        } else if ((node.nodeProps as NodeRect).height > (node.nodeProps as NodeRect).width) {
            if (
                (node.nodeProps as NodeRect).reflexiveEdgeStart === SideType.TOPRIGHT ||
                (node.nodeProps as NodeRect).reflexiveEdgeStart === SideType.BOTTOMLEFT
            ) {
                arcHeightRadius =
                    (node.nodeProps as NodeRect).height / (node.nodeProps as NodeRect).width +
                    (node.nodeProps as NodeRect).width
            }
        }

        let m = _getPathCoordinatesForRectReflexiveLink(
            (node.nodeProps as NodeRect).reflexiveEdgeStart as SideType,
            node,
            config
        )
        start = m.start
        end = m.end

        return `M${start.get(0, 0)},${start.get(0, 1)} A${arcWidthRadius},${arcHeightRadius}, 0, 1, 0, ${end.get(0, 0)},${end.get(0, 1)}`
    } else {
        return '' //should never be reached
    }
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
 * @param oppositeLegLength - The vertical distance (delta y) between the node whose side is being determined and the canvas center point
 * @param adjacentLegLength - The horizontal distance (delta x) between the node whose side is being determined and the canvas center point
 * @param threshold - The angle range (in degree) within which a direction is considered diagonal
 * @return The determined side of the node
 */
function _getPathAttachmentSideForRectReflexiveLink(
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
 * @param side - The side of the rect node on which the path should start
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
        node.nodeProps.shape === NodeShape.RECTANGLE ? node.nodeProps.width : node.nodeProps.radius
    const heightOffset =
        node.nodeProps.shape === NodeShape.RECTANGLE ? node.nodeProps.height : node.nodeProps.radius
    const markerBoxSize = config.markerBoxSize

    const points = {
        [SideType.BOTTOMLEFT]: {
            start: [x + 2, y + heightOffset - 1],
            end: [x + widthOffset - 2 * markerBoxSize, y + heightOffset + 2 * markerBoxSize]
        },
        [SideType.BOTTOM]: {
            start: [x + 0.5 * widthOffset, y + heightOffset - 1],
            end: [x + widthOffset + 2 * markerBoxSize, y + 0.5 * heightOffset]
        },
        [SideType.BOTTOMRIGHT]: {
            start: [x + widthOffset - 2, y + heightOffset - 1],
            end: [x + widthOffset + 2 * markerBoxSize, y + 2 * markerBoxSize]
        },
        [SideType.RIGHT]: {
            start: [x + widthOffset - 1, y + 0.5 * heightOffset],
            end: [x + 0.5 * widthOffset, y - 2 * markerBoxSize]
        },
        [SideType.TOPRIGHT]: {
            start: [x + widthOffset - 2, y + 1],
            end: [x + 2 * markerBoxSize, y - 2 * markerBoxSize]
        },
        [SideType.TOP]: {
            start: [x + 0.5 * widthOffset, y + 1],
            end: [x - 2 * markerBoxSize, y + 0.5 * heightOffset]
        },
        [SideType.TOPLEFT]: {
            start: [x + 2, y + 1],
            end: [x - 2 * markerBoxSize, y + heightOffset - 2 * markerBoxSize]
        },
        [SideType.LEFT]: {
            start: [x + 1, y + 0.5 * heightOffset],
            end: [x + 0.5 * widthOffset, y + heightOffset + 2 * markerBoxSize]
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
