import Matrix from 'ml-matrix'
//@ts-ignore
import svgPathReverse from 'svg-path-reverse'
import type { GraphConfiguration } from '@/model/config'
import type { GraphNode } from '@/model/graph-node'
import type { GraphLink } from '@/model/graph-link'
import { PathType } from '@/model/path-type'
import { SideType } from '@/model/side-type'
import type Graph from '@/model/graph'
import type { UnwrapRef } from 'vue'

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
            return paddedReflexivePath(d.source, [width / 2, height / 2], config)
        }
        case PathType.ARC: {
            return paddedArcPath(d.source, d.target, config)
        }
        case PathType.ARCREVERSE: {
            return svgPathReverse.reverse(paddedArcPath(d.source, d.target, config))
        }
        case PathType.LINE: {
            return paddedLinePath(d.source, d.target, config)
        }
        case PathType.LINEREVERSE: {
            return svgPathReverse.reverse(paddedLinePath(d.source, d.target, config))
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
 * Determines on which side of a rectangular shaped node a path should be attached.
 *
 * @param oppositeLegLength - The vertical distance (delta y) between the node whose side is being determined and its target node
 * @param adjacentLegLength - The horizontal distance (delta x) between the node whose side is being determined and its target node
 * @return The determined side of the node
 */
function getPathAttachmentSide(oppositeLegLength: number, adjacentLegLength: number) {
    let angle = _radiansToDegrees(Math.atan2(oppositeLegLength, adjacentLegLength))
    if (angle < 0) {
        angle += 360
    }

    let side
    if (angle === 45) side = SideType.BOTTOMRIGHT
    else if (angle > 45 && angle < 135) side = SideType.BOTTOM
    else if (angle === 135) side = SideType.BOTTOMLEFT
    else if (angle > 135 && angle < 255) side = SideType.LEFT
    else if (angle === 225) side = SideType.TOPLEFT
    else if (angle > 255 && angle < 315) side = SideType.TOP
    else if (angle === 315) side = SideType.TOPRIGHT
    else side = SideType.RIGHT

    return side
}

/**
 * Creates the path of a straight line between the edges of two nodes.
 *
 * @param source The source Node.
 * @param target The target Node.
 * @param graphConfiguration Visual configuration.
 */
export function paddedLinePath(
    source: GraphNode,
    target: GraphNode,
    graphConfiguration: GraphConfiguration
): string {
    const deltaX = target.x! - source.x!
    const deltaY = target.y! - source.y!
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const normX = deltaX / dist
    const normY = deltaY / dist
    const sourceX = source.x! + (graphConfiguration.nodeRadius - 1) * normX
    const sourceY = source.y! + (graphConfiguration.nodeRadius - 1) * normY
    const targetX = target.x! - graphConfiguration.markerPadding * normX
    const targetY = target.y! - graphConfiguration.markerPadding * normY
    return `M${sourceX},${sourceY}
          L${targetX},${targetY}`
}

/**
 * Creates the path of an arc line between the border of two nodes.
 *
 * @param source The source Node.
 * @param target The target Node.
 * @param graphConfiguration Visual configuration.
 */
export function paddedArcPath(
    source: GraphNode,
    target: GraphNode,
    graphConfiguration: GraphConfiguration
): string {
    const s = new Matrix([[source.x!, source.y!]])
    const t = new Matrix([[target.x!, target.y!]])
    const diff = Matrix.subtract(t, s)
    const dist = diff.norm('frobenius')
    const norm = diff.divide(dist)
    const rotation = _degreesToRadians(10)
    const start = _rotate(norm, -rotation)
        .multiply(graphConfiguration.nodeRadius - 1)
        .add(s)
    const endNorm = Matrix.multiply(norm, -1)
    const end = _rotate(endNorm, rotation)
        .multiply(graphConfiguration.nodeRadius)
        .add(t)
        .add(_rotate(endNorm, rotation).multiply(2 * graphConfiguration.markerBoxSize))
    const arcRadius = 1.2 * dist
    return `M${start.get(0, 0)},${start.get(0, 1)}
          A${arcRadius},${arcRadius},0,0,1,${end.get(0, 0)},${end.get(0, 1)}`
}

/**
 * Creates the path of a reflexive line of a node.
 * It will be always be directed away from the center.
 *
 * @param node The Node.
 * @param center The center point of the graph.
 * @param graphConfiguration Visual configuration.
 */
export function paddedReflexivePath(
    node: GraphNode,
    center: [number, number],
    graphConfiguration: GraphConfiguration
): string {
    const n = new Matrix([[node.x!, node.y!]])
    const c = new Matrix([center])
    if (n.get(0, 0) === c.get(0, 0) && n.get(0, 1) === c.get(0, 1)) {
        c.add([[0, 1]]) // Nodes at the exact center of the Graph should have their reflexive edge above them.
    }
    const diff = Matrix.subtract(n, c)
    const norm = diff.divide(diff.norm('frobenius'))
    const rotation = _degreesToRadians(40)
    const start = _rotate(norm, rotation)
        .multiply(graphConfiguration.nodeRadius - 1)
        .add(n)
    const end = _rotate(norm, -rotation)
        .multiply(graphConfiguration.nodeRadius)
        .add(n)
        .add(_rotate(norm, -rotation).multiply(2 * graphConfiguration.markerBoxSize))
    return `M${start.get(0, 0)},${start.get(0, 1)}
          A${graphConfiguration.nodeRadius},${
              graphConfiguration.nodeRadius
          },0,1,0,${end.get(0, 0)},${end.get(0, 1)}`
}

/**
 * Creates a straight path between two points.
 *
 * @param from Source coordinates.
 * @param to Target coordinates.
 */
export function linePath(from: [number, number], to: [number, number]): string {
    return `M${from[0]},${from[1]}
          L${to[0]},${to[1]}`
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
