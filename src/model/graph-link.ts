import { type SimulationLinkDatum } from 'd3'
import { type D3Node, GraphNode } from '@/model/graph-node'
import type { ArrowType } from './arrow-type'
import type { Path } from '@/d3/paths'

export interface D3Link extends SimulationLinkDatum<D3Node> {
    id: string
    source: D3Node
    target: D3Node
    path?: Path
    label?: string
    color?: string
}

export interface LinkAppearance {
    arrowType?: ArrowType
}

export interface LinkGUIEditability {
    deletable?: boolean
    labelEditable?: boolean
}

export class GraphLink implements D3Link, LinkGUIEditability, LinkAppearance {
    id: string
    // eslint-disable-next-line no-useless-constructor
    /**
     *
     * @param source - The links source node
     * @param target - The links target node
     * @param path - The path is cached for rendering different elements composing a link. It is set by and gets constantly updated during the simulation.
     * @param label - The link label
     * @param color The color of the node which was set (for default color this is empty)
     * @param deletable - If the link is deletable via GUI
     * @param labelEditable - If the link label is editable via GUI
     */
    public constructor(
        public readonly source: GraphNode,
        public readonly target: GraphNode,
        public arrowType?: ArrowType,
        public path?: Path,
        public label?: string,
        public color?: string,
        public deletable?: boolean,
        public labelEditable?: boolean
    ) {
        this.id = `${source.id}-${target.id}`
    }
}
