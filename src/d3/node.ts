import * as d3 from 'd3'
import { type Canvas } from '@/d3/canvas'
import { GraphNode } from '@/model/graph-node'

export type NodeSelection = d3.Selection<SVGGElement, GraphNode, SVGGElement, undefined>

export function createNodes(canvas: Canvas): NodeSelection {
    return canvas.append('g').classed('nodes', true).selectAll('.graph-controller__node-container')
}
