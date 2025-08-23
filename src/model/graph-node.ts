import type { SimulationNodeDatum } from 'd3'
import {
    type GraphConfiguration,
    type NodeCircle,
    type NodeProps,
    type NodeRect,
    type NodeSize,
    type NodeSizeCircle,
    type NodeSizeRect
} from '@/model/config'
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
    props?: NodeProps
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

    /**
     * @param id - The internal ID which is used for node referencing.
     * @param props - The props of the node
     * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
     * @param x - The x coordinate of the node's center
     * @param y - The y coordinate of the node's center
     * @param label - The nodes label
     * @param color - The color of the node which was set (for default color this is empty)
     * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
     * @param deletable - If the node is deletable via GUI
     * @param labelEditable - If the nodes label is editable via GUI
     * @param allowIncomingLinks - If the node can get new incoming links via GUI
     * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
     */
    public constructor(
        public readonly id: number,
        public props: NodeProps,
        public idImported?: string | number,
        public x?: number,
        public y?: number,
        public label?: string,
        public color?: string,
        fixedPosition?: FixedAxis,
        public deletable?: boolean,
        public labelEditable?: boolean,
        public allowIncomingLinks?: boolean,
        public allowOutgoingLinks?: boolean
    ) {
        this.fixedPosition = fixedPosition
    }

    public set fixedPosition(pos: FixedAxis | undefined) {
        this._fixedPosition = pos

        this.fx = this.fixedPosition?.x ? this.x : undefined
        this.fy = this.fixedPosition?.y ? this.y : undefined
    }

    public get fixedPosition(): FixedAxis | undefined {
        return this._fixedPosition
    }

    public setShape(shape: NodeShape, config: GraphConfiguration) {
        if (shape === NodeShape.CIRCLE) {
            let radius =
                (config.nodeProps as NodeCircle).radius ?? 0.5 * (this.props as NodeRect).width
            this.props = {
                shape: NodeShape.CIRCLE,
                radius: radius
            }
        } else if (shape === NodeShape.RECTANGLE) {
            let width =
                (config.nodeProps as NodeRect).width ?? 2 * (this.props as NodeCircle).radius
            let height = (config.nodeProps as NodeRect).height ?? (this.props as NodeCircle).radius
            let cornerRadius = (config.nodeProps as NodeRect).cornerRadius ?? 4
            let reflexiveEdgeStart = (config.nodeProps as NodeRect).reflexiveEdgeStart ?? 'MOVABLE'

            this.props = {
                shape: NodeShape.RECTANGLE,
                width: width,
                height: height,
                cornerRadius: cornerRadius,
                reflexiveEdgeStart: reflexiveEdgeStart
            }
        }
    }

    public setSize(size: NodeSize | number, config: GraphConfiguration) {
        if (this.props.shape === NodeShape.CIRCLE) {
            if (typeof size === 'number') {
                this.props.radius = size
            } else {
                this.props.radius =
                    (size as NodeSizeCircle).radius ?? (config.nodeProps as NodeCircle).radius
            }
        } else if (this.props.shape === NodeShape.RECTANGLE) {
            if (typeof size === 'number') {
                this.props.width = size
                this.props.height = size
            } else {
                this.props.width =
                    (size as NodeSizeRect).width ?? (config.nodeProps as NodeRect).width
                this.props.height =
                    (size as NodeSizeRect).height ?? (config.nodeProps as NodeRect).height
            }
        }
    }
}
