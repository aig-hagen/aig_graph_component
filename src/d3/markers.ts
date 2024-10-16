import * as d3 from 'd3'
import type { GraphConfiguration } from '@/model/config'
import { escapeColor } from '@/model/color'

export function initMarkers(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    graphHostId: string,
    config: GraphConfiguration,
    colors?: string[]
): void {
    createLinkMarker(canvas, config, graphHostId + '-link-arrow', 'graph-controller__arrow', false)
    createLinkMarker(
        canvas,
        config,
        graphHostId + '-link-arrow-reverse',
        'graph-controller__arrow',
        true
    )
    createLinkMarker(
        canvas,
        config,
        graphHostId + '-draggable-link-arrow',
        'graph-controller__arrow draggable',
        false
    )
    if (colors) {
        for (let color of colors) {
            createLinkMarkerColored(canvas, graphHostId, config, color)
        }
    }
}

export function createLinkMarkerColored(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    graphHostId: string,
    config: GraphConfiguration,
    color: string
) {
    if (canvas.select(`#${graphHostId}-link-arrow-` + escapeColor(color)).empty()) {
        createLinkMarker(
            canvas,
            config,
            graphHostId + '-link-arrow-' + color,
            'graph-controller__arrow ' + color,
            false,
            color
        )
        createLinkMarker(
            canvas,
            config,
            graphHostId + '-link-arrow-reverse-' + color,
            'graph-controller__arrow colored',
            true,
            color
        )
    }
}

export function deleteLinkMarkerColored(
    canvas: d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>,
    graphHostId: string,
    color: string
) {
    canvas
        .select<SVGMarkerElement>(`#${graphHostId}-link-arrow-` + escapeColor(color))
        .select<SVGDefsElement>(function (): any {
            return this.parentNode!
        })
        .remove()

    canvas
        .select<SVGMarkerElement>(`#${graphHostId}-link-arrow-reverse-` + escapeColor(color))
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
