import { type SimulationLinkDatum } from 'd3'
import { type D3Node, GraphNode } from '@/model/graph-node'
import { PathType } from '@/model/path-type'

export interface D3Link extends SimulationLinkDatum<D3Node> {
    id: string
    source: D3Node
    target: D3Node
    pathType?: PathType
    label?: string
    color?: string
}

export interface LinkGUIEditability {
    deletable?: boolean
    labelEditable?: boolean
}

export class GraphLink implements D3Link, LinkGUIEditability {
    id: string
    // eslint-disable-next-line no-useless-constructor
    /**
     *
     * @param source
     * @param target
     * @param pathType
     * @param label
     * @param color The color of the node which was set (for default color this is empty)
     * @param deletable - If the link is deletable via GUI
     * @param labelEditable - If the link label is editable via GUI
     */
    public constructor(
        public readonly source: GraphNode,
        public readonly target: GraphNode,
        public pathType?: PathType,
        public label?: string,
        public color?: string,
        public deletable?: boolean,
        public labelEditable?: boolean
    ) {
        this.id = `${source.id}-${target.id}`
    }
}
