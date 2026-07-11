import * as d3 from 'd3'
import { type Canvas } from '@/d3/canvas'
import { GraphBadge } from '@/model/graph-badge'

export type BadgeSelection = d3.Selection<SVGGElement, GraphBadge, SVGGElement, undefined>

export function createBadges(canvas: Canvas): BadgeSelection {
    return canvas.append('g').classed('badges', true).selectAll('.graph-controller__badge-container')
}
