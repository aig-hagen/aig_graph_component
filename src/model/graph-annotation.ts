import { GraphNode } from '@/model/graph-node'

export type AnnotationPosition = {
    angle: number
    distance: number
}

export class GraphAnnotation {
    /**
     * @param anchor - The node this annotation is attached to
     * @param content - The displayed text. Opaque to the library, same as a node's `label`.
     * @param position - Explicit polar position (angle, distance) relative to the anchor's
     * center. Undefined means the position is auto-placed every tick to avoid incident edges
     * and nearby nodes.
     */
    public constructor(
        public readonly anchor: GraphNode,
        public content: string,
        public position?: AnnotationPosition
    ) {}

    public get anchorId(): number {
        return this.anchor.id
    }
}
