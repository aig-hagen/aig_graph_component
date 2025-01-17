export interface GraphConfiguration {
    persistSettingsLocalStorage: boolean

    nodeRadius: number
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    isGraphEditableInGUI: boolean

    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
}

export class GraphConfigDefault implements GraphConfiguration {
    persistSettingsLocalStorage = false

    private _nodeRadius = 24
    showNodeLabels = true
    nodePhysicsEnabled = false

    isGraphEditableInGUI = true

    showLinkLabels = true
    fixedLinkDistanceEnabled = false

    markerBoxSize = 4
    private _markerPadding = this._nodeRadius + 2 * this.markerBoxSize

    public get nodeRadius() {
        return this._nodeRadius
    }
    public set nodeRadius(radius: number) {
        this._nodeRadius = radius
        this._markerPadding = this._nodeRadius + 2 * this.markerBoxSize
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
