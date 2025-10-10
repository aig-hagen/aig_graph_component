import { NodeShape } from '@/model/node-shape'
import { SideType } from '@/model/side-type'
import type { NodeGUIEditability } from '@/model/graph-node'
import type { LinkGUIEditability } from '@/model/graph-link'

export type NodeProps = NodeCircle | NodeRect
export type NodeSize = NodeSizeCircle | NodeSizeRect

export type NodeCircle = {
    shape: NodeShape.CIRCLE
    radius: number
}

/**
 * Rectangular Node Properties.
 * A `width`-to-`height` ratio smaller than 1:10 is recommended as well as an `cornerRadius` between 0 and 4.
 *
 * *Regarding the `reflexiveEdgeStart` property:*
 * - *For ratios up to 1:3, both movable and fixed edges are visually fine*
 * - *For ratios between 1:3 and 1:10 prefer using fixed edges*
 * - *Avoid higher ratios, if you still use them, use fixed edges and avoid placing them from the short to the long side.*
 */
export type NodeRect = {
    shape: NodeShape.RECTANGLE
    width: number
    height: number
    cornerRadius: number
    reflexiveEdgeStart: 'MOVABLE' | SideType
}

export type NodeSizeRect = {
    width: number
    height: number
}
export type NodeSizeCircle = {
    radius: number
}

export interface GraphConfiguration {
    // nodes
    nodeProps: NodeProps //also individual element option
    nodeGUIEditability: NodeGUIEditability //also individual element option
    nodeAutoGrowToLabelSize: boolean
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    // links
    linkGUIEditability: LinkGUIEditability //also individual element option
    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    // graph component
    allowNodeCreationViaGUI: boolean
    zoomEnabled: boolean

    // marker
    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string

    //canvas
    readonly isCanvasBoundToView: boolean
}

export class GraphConfigDefault implements GraphConfiguration {
    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    private _nodeProps: NodeProps = {
        shape: NodeShape.RECTANGLE,
        width: 128,
        height: 48,
        cornerRadius: 4,
        reflexiveEdgeStart: 'MOVABLE'
    }

    private _nodeGUIEditability: Required<NodeGUIEditability> = {
        fixedPosition: { x: false, y: false },
        deletable: true,
        labelEditable: true,
        allowIncomingLinks: true,
        allowOutgoingLinks: true
    }
    /**
     * If this is set to true, the nodes can grow dynamically to match the width and height
     * of the labels, provided they exceed the size set in the node props.
     * Words in the label will stay on a single line (no horizontal wrapping).
     *
     * If set to false, the nodes have a fixed size, and label words may wrap to the next line
     * or potentially overflow.
     */
    nodeAutoGrowToLabelSize = true
    showNodeLabels = true
    nodePhysicsEnabled = false

    private _linkGUIEditability: Required<LinkGUIEditability> = {
        deletable: true,
        labelEditable: true
    }
    showLinkLabels = true
    fixedLinkDistanceEnabled = false

    allowNodeCreationViaGUI = true
    zoomEnabled = false

    markerBoxSize = 4

    private _markerPadding = 2 * this.markerBoxSize

    public set nodeSize(nodeSize: NodeSize | number) {
        if (this.nodeProps.shape === NodeShape.CIRCLE) {
            if (typeof nodeSize === 'number') {
                this.nodeProps.radius = nodeSize
            } else {
                this.nodeProps.radius = (nodeSize as NodeSizeCircle).radius ?? 24
            }
        } else if (this.nodeProps.shape === NodeShape.RECTANGLE) {
            if (typeof nodeSize === 'number') {
                this.nodeProps.width = nodeSize
                this.nodeProps.height = nodeSize
            } else {
                this.nodeProps.width = (nodeSize as NodeSizeRect).width ?? 48
                this.nodeProps.height = (nodeSize as NodeSizeRect).height ?? 48
            }
        }
    }

    public get nodeSize(): NodeSizeRect & NodeSizeCircle {
        let w, h, r
        if (this.nodeProps.shape === NodeShape.CIRCLE) {
            r = this.nodeProps.radius
            w = 2 * r
            h = 2 * r
        } else {
            w = this.nodeProps.width
            h = this.nodeProps.height
            r = w / 2
        }

        return {
            width: w,
            height: h,
            radius: r
        }
    }

    public set nodeProps(props: NodeProps) {
        props.shape = props.shape ?? this._nodeProps.shape
        this._nodeProps = props

        if (props.shape === NodeShape.CIRCLE) {
            this.nodeSize = { radius: props.radius }
        } else if (props.shape === NodeShape.RECTANGLE) {
            this.nodeSize = { width: props.width, height: props.height }
            if (props.cornerRadius === undefined) {
                ;(this._nodeProps as NodeRect).cornerRadius = 4
            }
            if (props.reflexiveEdgeStart === undefined) {
                ;(this._nodeProps as NodeRect).reflexiveEdgeStart = 'MOVABLE'
            }
        }
    }

    public get nodeProps() {
        return this._nodeProps
    }

    public set nodeGUIEditability(editability: NodeGUIEditability) {
        this._nodeGUIEditability = {
            ...this._nodeGUIEditability,
            ...editability,
            fixedPosition: {
                ...this._nodeGUIEditability.fixedPosition,
                ...editability.fixedPosition
            }
        }
    }

    public get nodeGUIEditability(): Required<NodeGUIEditability> {
        return this._nodeGUIEditability
    }

    public set linkGUIEditability(editability: LinkGUIEditability) {
        this._linkGUIEditability = {
            ...this._linkGUIEditability,
            ...editability
        }
    }

    public get linkGUIEditability(): Required<LinkGUIEditability> {
        return this._linkGUIEditability
    }

    public get markerPadding() {
        return this._markerPadding
    }

    public get markerRef() {
        return this.markerBoxSize / 2
    }

    public get arrowPoints(): [number, number][] {
        return [
            [0, 0],
            [0, this.markerBoxSize],
            [this.markerBoxSize, this.markerBoxSize / 2]
        ]
    }

    public get markerPath() {
        return [0, 0, this.markerBoxSize, this.markerBoxSize].join(',')
    }

    /**
     * The canvas is bound to the view if zoom is disabled.
     * When zoom (and panning) is enabled, we don't need bounds because the user can navigate to nodes outside the view.
     * When zoom is disabled, bounds are used to ensure all nodes accessible to the user.
     */
    public get isCanvasBoundToView() {
        return !this.zoomEnabled
    }
}
