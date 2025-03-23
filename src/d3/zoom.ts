import * as d3 from 'd3'
import type { D3ZoomEvent } from 'd3'

export type Zoom = d3.ZoomBehavior<SVGSVGElement, undefined>

export function createZoom(
    onZoom: (event: D3ZoomEvent<any, any>, b: boolean) => void,
    isEnabled: boolean
): Zoom {
    let zoom = d3
        .zoom<SVGSVGElement, undefined>()
        .filter((event) => event.button === 0 || event.touches?.length >= 2)

    return toggleZoomExtend(zoom, onZoom, isEnabled)
}

function toggleZoomExtend(
    zoom: d3.ZoomBehavior<SVGSVGElement, undefined>,
    onZoom: (event: D3ZoomEvent<any, any>, b: boolean) => void,
    isEnabled: boolean
) {
    if (isEnabled) {
        return zoom.scaleExtent([0.5, 5]).on('zoom', (event) => onZoom(event, true))
    } else {
        return zoom.scaleExtent([1, 1]).on('zoom', (event) => onZoom(event, false))
    }
}
