import type { SimulationNodeDatum } from 'd3'
import { NodeShape } from '@/model/node-shape'

export interface D3Node extends SimulationNodeDatum {
    id: number
    idImported?: string | number
    x?: number
    y?: number
    fx?: number
    fy?: number
    label?: string
}

export interface NodeAppearance {
    color?: string
    shape?: NodeShape
}

export interface NodeGUIEditability {
    fixedPosition?: FixedAxis
    deletable?: boolean
    labelEditable?: boolean
    allowIncomingLinks?: boolean
    allowOutgoingLinks?: boolean
}

export type FixedAxis = {
    x: boolean
    y: boolean
}

export class GraphNode implements D3Node, NodeAppearance, NodeGUIEditability {
    fx?: number
    fy?: number
    private _fixedPosition?: FixedAxis
    private _shape?: NodeShape

    /**
     * @param id - The internal ID which is used for node referencing.
     * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
     * @param x - The nodes x position
     * @param y - The nodes y position
     * @param label - The nodes label
     * @param color - The color of the node which was set (for default color this is empty)
     * @param shape - The shape of the node
     * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
     * @param deletable - If the node is deletable via GUI
     * @param labelEditable - If the nodes label is editable via GUI
     * @param allowIncomingLinks - If the node can get new incoming links via GUI
     * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
     */
    public constructor(
        public readonly id: number,
        public idImported?: string | number,
        public x?: number,
        public y?: number,
        public label?: string,
        public color?: string,
        shape?: NodeShape,
        fixedPosition?: FixedAxis,
        public deletable?: boolean,
        public labelEditable?: boolean,
        public allowIncomingLinks?: boolean,
        public allowOutgoingLinks?: boolean
    ) {
        this.shape = shape
        this.fixedPosition = fixedPosition
    }

    public set shape(shape: NodeShape | undefined) {
        if (shape === (NodeShape.CIRCLE || NodeShape.RECTANGLE)) {
            this._shape = shape
        }
    }

    public get shape() {
        return this._shape
    }

    public set fixedPosition(pos: FixedAxis | undefined) {
        this._fixedPosition = pos

        this.fx = this.fixedPosition?.x ? this.x : undefined
        this.fy = this.fixedPosition?.y ? this.y : undefined
    }

    public get fixedPosition(): FixedAxis | undefined {
        return this._fixedPosition
    }
}
