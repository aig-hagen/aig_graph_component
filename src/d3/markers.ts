import * as d3 from 'd3'
import type { GraphConfiguration } from '@/model/config'

export function initMarkers(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    config: GraphConfiguration
): void {
    createLinkMarker(canvas, config, 'link-arrow', 'arrow', false)
    createLinkMarker(canvas, config, 'link-arrow-reverse', 'arrow', true)
    createLinkMarker(canvas, config, 'draggable-link-arrow', 'arrow draggable', false)
}

function createLinkMarker(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    config: GraphConfiguration,
    id: string,
    classes: string,
    reverse: boolean
): void {
    canvas
        .append('defs')
        .append('marker')
        .attr('id', id)
        .attr('viewBox', config.markerPath)
        .attr('refX', config.markerRef)
        .attr('refY', config.markerRef)
        .attr('markerWidth', config.markerBoxSize)
        .attr('markerHeight', config.markerBoxSize)
        .attr('orient', reverse ? 'auto-start-reverse' : 'auto')
        .classed(classes, true)
        .append('path')
        .attr('d', `${d3.line()(config.arrowPoints)}`)
}
