export interface GraphConfiguration {
    nodeRadius: number
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean

    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean

    tooltipOpacity: number
    tooltipFadeInTame: number
    tooltipFadeOutTime: number

    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
}

const nodeRadius = 24
const showNodeLabels = true
const nodePhysicsEnabled = false

const showLinkLabels = true
const fixedLinkDistanceEnabled = false

const tooltipOpacity = 1
const tooltipFadeInTame = 500
const tooltipFadeOutTime = 200

const markerBoxSize = 4

export const defaultGraphConfig: GraphConfiguration = {
    nodeRadius,
    showNodeLabels,
    nodePhysicsEnabled,

    showLinkLabels,
    fixedLinkDistanceEnabled,

    tooltipOpacity,
    tooltipFadeInTame,
    tooltipFadeOutTime,

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
