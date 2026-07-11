import type { AnnotationPosition, GraphAnnotation } from '@/model/graph-annotation'
import type Graph from '@/model/graph'
import { NodeShape } from '@/model/node-shape'
import type { NodeSizeCircle, NodeSizeRect } from '@/model/config'

const CANDIDATE_COUNT = 16
const NEARBY_NODE_RADIUS_FACTOR = 4
const ANNOTATION_DEFAULT_PADDING = 14

function nodeRadius(node: { props: { shape: NodeShape }; renderedSize: NodeSizeCircle | NodeSizeRect }): number {
    if (node.props.shape === NodeShape.CIRCLE) {
        return (node.renderedSize as NodeSizeCircle).radius
    }
    const rect = node.renderedSize as NodeSizeRect
    return Math.max(rect.width, rect.height) / 2
}

/**
 * The fixed orbit radius annotations sit at - just outside the node's own bounds.
 * Shared by auto-placement and by dragging: annotations only ever orbit their anchor
 * at this distance, the user can only adjust the angle.
 */
export function annotationOrbitDistance(
    node: { props: { shape: NodeShape }; renderedSize: NodeSizeCircle | NodeSizeRect }
): number {
    return nodeRadius(node) + ANNOTATION_DEFAULT_PADDING
}

function angularDistance(a: number, b: number): number {
    const diff = Math.abs(a - b) % (2 * Math.PI)
    return diff > Math.PI ? 2 * Math.PI - diff : diff
}

export type TextAlignment = {
    textAnchor: 'start' | 'middle' | 'end'
    dominantBaseline: 'hanging' | 'central' | 'auto'
}

const ALIGNMENT_AXIS_THRESHOLD = 0.35

/**
 * Picks text-anchor/dominant-baseline so the text grows away from the node rather than
 * being centered on the orbit point - otherwise long labels (e.g. ADF conditions) bleed
 * back into the node regardless of orbit distance, since half the text would sit on the
 * node-side of its anchor. Each axis is judged independently so diagonal placements get
 * both an anchor and a baseline adjustment.
 */
export function textAlignmentForAngle(angle: number): TextAlignment {
    const dx = Math.cos(angle)
    const dy = Math.sin(angle)

    const textAnchor = dx > ALIGNMENT_AXIS_THRESHOLD ? 'start' : dx < -ALIGNMENT_AXIS_THRESHOLD ? 'end' : 'middle'
    const dominantBaseline = dy > ALIGNMENT_AXIS_THRESHOLD ? 'hanging' : dy < -ALIGNMENT_AXIS_THRESHOLD ? 'auto' : 'central'

    return { textAnchor, dominantBaseline }
}

/**
 * Computes a default position for an annotation with no explicit (user-dragged) position,
 * placing it in the widest free angular gap around its anchor node - avoiding incident
 * edges and nearby nodes - rather than a solver: 16 fixed candidate angles are scored by
 * their minimum angular distance to any occupied angle, and the best one wins.
 */
export function computeAutoPlacement(
    annotation: GraphAnnotation,
    graph: Pick<Graph, 'nodes' | 'links'>
): AnnotationPosition {
    const anchor = annotation.anchor
    const occupiedAngles: number[] = []

    if (anchor.x !== undefined && anchor.y !== undefined) {
        for (const link of graph.links) {
            if (link.source.id === anchor.id && link.target.x !== undefined && link.target.y !== undefined) {
                occupiedAngles.push(Math.atan2(link.target.y - anchor.y, link.target.x - anchor.x))
            } else if (link.target.id === anchor.id && link.source.x !== undefined && link.source.y !== undefined) {
                occupiedAngles.push(Math.atan2(link.source.y - anchor.y, link.source.x - anchor.x))
            }
        }

        const nearbyRadius = NEARBY_NODE_RADIUS_FACTOR * nodeRadius(anchor)
        for (const node of graph.nodes) {
            if (node.id === anchor.id || node.x === undefined || node.y === undefined) continue
            const dx = node.x - anchor.x
            const dy = node.y - anchor.y
            if (Math.hypot(dx, dy) <= nearbyRadius) {
                occupiedAngles.push(Math.atan2(dy, dx))
            }
        }
    }

    let bestAngle = 0
    let bestScore = -Infinity
    for (let i = 0; i < CANDIDATE_COUNT; i++) {
        const candidate = (i / CANDIDATE_COUNT) * 2 * Math.PI
        const score =
            occupiedAngles.length === 0
                ? 0
                : Math.min(...occupiedAngles.map((occupied) => angularDistance(candidate, occupied)))
        if (score > bestScore) {
            bestScore = score
            bestAngle = candidate
        }
    }

    return {
        angle: bestAngle,
        distance: annotationOrbitDistance(anchor)
    }
}
