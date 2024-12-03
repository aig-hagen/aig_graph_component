import type { SimulationNodeDatum } from 'd3'

export interface D3Node extends SimulationNodeDatum {
    id: number
    idImported?: string | number
    x?: number
    y?: number
    fx?: number
    fy?: number
    label?: string
    color?: string
}

export interface NodeGUIEditability {
    fixedPosition?: FixedAxis
    deletable?: boolean
    labelEditable?: boolean
}

export type FixedAxis = {
    x: boolean
    y: boolean
}

export class GraphNode implements D3Node, NodeGUIEditability {
    // eslint-disable-next-line no-useless-constructor
    /**
     * @param id - The internal ID which is used for node referencing.
     * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
     * @param x
     * @param y
     * @param fx
     * @param fy
     * @param label
     * @param color - The color of the node which was set (for default color this is empty)
     * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
     * @param deletable - If the node is deletable via GUI
     * @param labelEditable - If the nodes label is editable via GUI
     */
    public constructor(
        public readonly id: number,
        public idImported?: string | number,
        public x?: number,
        public y?: number,
        public fx?: number,
        public fy?: number,
        public label?: string,
        public color?: string,
        public fixedPosition?: FixedAxis,
        public deletable?: boolean,
        public labelEditable?: boolean
    ) {}
}
