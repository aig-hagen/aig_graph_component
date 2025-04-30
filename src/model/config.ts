import { NodeShape } from '@/model/node-shape'

export type NodeProps = NodeCircle | NodeRect

type NodeCircle = {
    shape: NodeShape.CIRCLE
    radius: number
}

type NodeRect = {
    shape: NodeShape.RECTANGLE
    width: number
    height: number
    cornerRadius: number
}

type NodeSizeRect = {
    width: number
    height: number
}
type NodeSizeCircle = {
    radius: number
}
type NodeSize = NodeSizeCircle | NodeSizeRect
type NodeSizeInput = NodeSize | number

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
    markerPadding: { x: number; y: number }
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
}

export class GraphConfigDefault implements GraphConfiguration {
    persistSettingsLocalStorage = false
    hasToolbar = false

    // nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 24 }
    nodeProps: NodeProps = { shape: NodeShape.RECTANGLE, width: 128, height: 96, cornerRadius: 4 }

    showNodeLabels = true
    nodePhysicsEnabled = false

    isGraphEditableInGUI = true

    zoomEnabled = false

    showLinkLabels = true
    fixedLinkDistanceEnabled = false

    markerBoxSize = 4

    private _markerPadding =
        this.nodeProps.shape === NodeShape.CIRCLE
            ? {
                  x: this.nodeProps.radius + 2 * this.markerBoxSize,
                  y: this.nodeProps.radius + 2 * this.markerBoxSize
              }
            : {
                  x: this.nodeProps.width + 2 * this.markerBoxSize,
                  y: this.nodeProps.height + 2 * this.markerBoxSize
              }

    public get nodeSize(): NodeSize {
        if (this.nodeProps.shape === NodeShape.CIRCLE) {
            return { radius: this.nodeProps.radius }
        } else {
            return { width: this.nodeProps.width, height: this.nodeProps.height }
        }
    }

    public set nodeSize(nodeSize: NodeSizeInput) {
        if (this.nodeProps.shape === NodeShape.CIRCLE) {
            if (typeof nodeSize === 'number') {
                this.nodeProps.radius = nodeSize
            } else {
                this.nodeProps.radius = (nodeSize as NodeSizeCircle).radius
            }

            this._markerPadding = {
                x: this.nodeProps.radius + 2 * this.markerBoxSize,
                y: this.nodeProps.radius + 2 * this.markerBoxSize
            }
        } else if (this.nodeProps.shape === NodeShape.RECTANGLE) {
            if (typeof nodeSize === 'number') {
                this.nodeProps.width = nodeSize
                this.nodeProps.height = nodeSize
            } else {
                this.nodeProps.width = (nodeSize as NodeSizeRect).width ?? 48
                this.nodeProps.height = (nodeSize as NodeSizeRect).height ?? 48
            }

            this._markerPadding = {
                x: this.nodeProps.width + 2 * this.markerBoxSize,
                y: this.nodeProps.height + 2 * this.markerBoxSize
            }
        }
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
