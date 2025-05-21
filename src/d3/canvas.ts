import * as d3 from 'd3'
import { terminate } from '@/d3/event'
import type { Zoom } from '@/d3/zoom'

export type GraphHost = d3.Selection<HTMLDivElement, undefined, HTMLElement | null, undefined>

export type Canvas = d3.Selection<SVGGElement, undefined, HTMLElement | null, undefined>

export function createCanvas(
    host: GraphHost,
    zoom: Zoom,
    onPointerMoved: (event: PointerEvent) => void,
    onPointerUp: (event: PointerEvent) => void,
    onDoubleClick: (event: PointerEvent) => void
): Canvas {
    const canvasGroup = host
        .append('svg')
        .attr('class', 'graph-controller__graph-canvas')
        .style('background-color', 'white')
        .on('pointermove', (event: PointerEvent) => onPointerMoved(event))
        .on('pointerup', (event: PointerEvent) => onPointerUp(event))
        .on('contextmenu', (event: MouseEvent) => terminate(event))
        .on('dblclick', (event: PointerEvent) => onDoubleClick(event))
        .call(zoom)
        .on('dblclick.zoom', null)
        .append('g')

    return canvasGroup
}
