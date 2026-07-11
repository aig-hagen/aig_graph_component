import { GraphNode } from '@/model/graph-node'

export class GraphBadge {
    /**
     * @param anchor - The node this badge is attached to
     * @param text - The text displayed inside the badge
     * @param color - The color of the badge (empty = default color)
     */
    public constructor(
        public readonly anchor: GraphNode,
        public text: string,
        public color?: string
    ) {}

    public get anchorId(): number {
        return this.anchor.id
    }
}
