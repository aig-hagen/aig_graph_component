import { type SimulationLinkDatum } from 'd3'
import { type D3Node } from '@/model/graph-node'
import { PathType } from '@/model/path-type'

export interface D3Link extends SimulationLinkDatum<D3Node> {
    id: string
    source: D3Node
    target: D3Node
    pathType?: PathType
    label?: string
}

export class GraphLink implements D3Link {
    id: string
    // eslint-disable-next-line no-useless-constructor
    public constructor(
        public readonly source: D3Node,
        public readonly target: D3Node,
        public pathType?: PathType,
        public label?: string
    ) {
        this.id = `${source.id}-${target.id}`
    }
}
