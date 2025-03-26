import * as d3 from 'd3'
import { type Canvas } from '@/d3/canvas'
import { GraphLink } from '@/model/graph-link'

export type LinkSelection = d3.Selection<SVGGElement, GraphLink, SVGGElement, undefined>

export function createLinks(canvas: Canvas): LinkSelection {
    return canvas.append('g').classed('links', true).selectAll('.graph-controller__link-container')
}
