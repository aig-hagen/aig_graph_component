export interface GraphConfiguration {
    hasToolbar: boolean

    nodeRadius: number
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
}

const hasToolbar = true

const nodeRadius = 24
const showNodeLabels = true
const nodePhysicsEnabled = false

const showLinkLabels = true
const fixedLinkDistanceEnabled = false

const markerBoxSize = 4

export const defaultGraphConfig: GraphConfiguration = {
    hasToolbar,

    nodeRadius,
    showNodeLabels,
    nodePhysicsEnabled,

    showLinkLabels,
    fixedLinkDistanceEnabled,

    markerBoxSize,
    markerPadding: nodeRadius + 2 * markerBoxSize,
    markerRef: markerBoxSize / 2,
    arrowPoints: [
        [0, 0],
        [0, markerBoxSize],
        [markerBoxSize, markerBoxSize / 2],
    ],
    markerPath: [0, 0, markerBoxSize, markerBoxSize].join(','),
}
