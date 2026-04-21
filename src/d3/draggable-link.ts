import * as d3 from 'd3'
import type { Canvas } from '@/d3/canvas'
import type { GraphConfiguration } from '@/main.lib'

export type DraggableLink = d3.Selection<SVGPathElement, undefined, HTMLElement | null, undefined>

export function createDraggableLink(canvas: Canvas, config: GraphConfiguration): DraggableLink {
    return canvas
        .append('path')
        .classed('graph-controller__link draggable hidden', true)
        .attr('stroke-width', config.arrowStrokeWidth)
        .attr('d', 'M0,0L0,0')
}
