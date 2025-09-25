import { NodeShape } from '@/model/node-shape'
import { SideType } from '@/model/side-type'

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
    nodeAutoResizeToLabelSize: boolean
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    // links
    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    // graph
    isGraphEditableInGUI: boolean //also individual element option (more fine granular)
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

    /**
     * If set to true, the nodes resizes dynamically to match the labels width and height.
     * Words in the label will stay on a single line (no horizontal wrapping).
     *
     * If set to false, the nodes have a fixed size, and label words may wrap to the next line
     * or potentially overflow.
     */
    nodeAutoResizeToLabelSize = true

    showNodeLabels = true
    nodePhysicsEnabled = false

    isGraphEditableInGUI = true

    zoomEnabled = true

    showLinkLabels = true
    fixedLinkDistanceEnabled = false

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

    public get nodeSize(): NodeSize {
        if (this.nodeProps.shape === NodeShape.CIRCLE) {
            return { radius: this.nodeProps.radius }
        } else {
            return { width: this.nodeProps.width, height: this.nodeProps.height }
        }
    }

    public set nodeProps(props: NodeProps) {
        this._nodeProps = props
        if (props.shape === NodeShape.CIRCLE) {
            this.nodeSize = { radius: props.radius }
        } else if (props.shape === NodeShape.RECTANGLE) {
            this.nodeSize = { width: props.width, height: props.height }
        }
    }

    public get nodeProps() {
        return this._nodeProps
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
