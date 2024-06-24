export interface GraphConfiguration {
    persistSettingsLocalStorage: boolean
    hasToolbar: boolean

    nodeRadius: number
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    zoomEnabled: boolean

    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
}

export class GraphConfigDefault implements GraphConfiguration {
    persistSettingsLocalStorage = false
    hasToolbar = true

    nodeRadius = 24
    showNodeLabels = true
    nodePhysicsEnabled = false

    zoomEnabled = true

    showLinkLabels = true
    fixedLinkDistanceEnabled = false

    markerBoxSize = 4

    markerPadding = this.nodeRadius + 2 * this.markerBoxSize
    markerRef = this.markerBoxSize / 2
    arrowPoints: [number, number][] = [
        [0, 0],
        [0, this.markerBoxSize],
        [this.markerBoxSize, this.markerBoxSize / 2]
    ]
    markerPath = [0, 0, this.markerBoxSize, this.markerBoxSize].join(',')
}
