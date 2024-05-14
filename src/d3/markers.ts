import * as d3 from 'd3'
import type { GraphConfiguration } from '@/model/config'

export function initMarkers(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    config: GraphConfiguration,
    colors?: string[]
): void {
    createLinkMarker(canvas, config, 'link-arrow', 'arrow', false)
    createLinkMarker(canvas, config, 'link-arrow-reverse', 'arrow', true)
    createLinkMarker(canvas, config, 'draggable-link-arrow', 'arrow draggable', false)
    if (colors) {
        for (let color of colors) {
            createLinkMarkerColored(canvas, config, color)
        }
    }
}

export function createLinkMarkerColored(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    config: GraphConfiguration,
    color: string
) {
    if (canvas.select('#link-arrow-' + color).empty()) {
        createLinkMarker(canvas, config, 'link-arrow-' + color, 'arrow ' + color, false, color)
        createLinkMarker(
            canvas,
            config,
            'link-arrow-reverse-' + color,
            'arrow ' + color,
            true,
            color
        )
    }
}

export function deleteLinkMarkerColored(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    color: string
) {
    canvas
        .select<SVGMarkerElement>('#link-arrow-' + color)
        .select<SVGDefsElement>(function (): any {
            return this.parentNode!
        })
        .remove()

    canvas
        .select<SVGMarkerElement>('#link-arrow-reverse-' + color)
        .select<SVGDefsElement>(function (): any {
            return this.parentNode!
        })
        .remove()
}

function createLinkMarker(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    config: GraphConfiguration,
    id: string,
    classes: string,
    reverse: boolean,
    color?: string
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
        .style('fill', color ? color : '')
}
