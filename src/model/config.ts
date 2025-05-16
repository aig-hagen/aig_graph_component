import { NodeShape } from '@/model/node-shape'

export type NodeProps = NodeCircle | NodeRect
export type NodeSize = NodeSizeCircle | NodeSizeRect | number

export type NodeCircle = {
    shape: NodeShape.CIRCLE
    radius: number
}

export type NodeRect = {
    shape: NodeShape.RECTANGLE
    width: number
    height: number
    cornerRadius: number
}

export type NodeSizeRect = {
    width: number
    height: number
}
export type NodeSizeCircle = {
    radius: number
}

export interface GraphConfiguration {
    persistSettingsLocalStorage: boolean
    hasToolbar: boolean

    nodeProps: NodeProps
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    isGraphEditableInGUI: boolean

    zoomEnabled: boolean

    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
}

export class GraphConfigDefault implements GraphConfiguration {
    persistSettingsLocalStorage = false
    hasToolbar = false

    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    private _nodeProps: NodeProps = {
        shape: NodeShape.RECTANGLE,
        width: 128,
        height: 96,
        cornerRadius: 4
    }

    showNodeLabels = true
    nodePhysicsEnabled = false

    isGraphEditableInGUI = true

    zoomEnabled = false

    showLinkLabels = true
    fixedLinkDistanceEnabled = false

    markerBoxSize = 4

    private _markerPadding = 2 * this.markerBoxSize

    public set nodeSize(nodeSize: NodeSize) {
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

    public set nodeProps(props) {
        this._nodeProps = props
        if (props.shape === NodeShape.CIRCLE) {
            this.nodeSize = props.radius
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
}
