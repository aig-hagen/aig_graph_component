import { type SimulationLinkDatum } from 'd3'
import { type D3Node } from '@/model/graph-node'
import { PathType } from '@/model/path-type'

export interface D3Link extends SimulationLinkDatum<D3Node> {
    id: string
    source: D3Node
    target: D3Node
    pathType?: PathType
    label?: string
    color?: string
}

export interface LinkGUIEditablity {
    isDeletableViaGUI?: boolean
    isLabelEditableViaGUI?: boolean
}

export class GraphLink implements D3Link, LinkGUIEditablity {
    id: string
    // eslint-disable-next-line no-useless-constructor
    /**
     *
     * @param source
     * @param target
     * @param pathType
     * @param label
     * @param color The color of the node which was set (for default color this is empty)
     * @param isDeletableViaGUI - If the link is deletable via GUI
     * @param isLabelEditableViaGUI - If the link label is editable via GUI
     */
    public constructor(
        public readonly source: D3Node,
        public readonly target: D3Node,
        public pathType?: PathType,
        public label?: string,
        public color?: string,
        public isDeletableViaGUI?: boolean,
        public isLabelEditableViaGUI?: boolean
    ) {
        this.id = `${source.id}-${target.id}`
    }
}
