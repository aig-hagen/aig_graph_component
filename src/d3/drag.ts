import * as d3 from 'd3'
import type { D3DragEvent } from 'd3'
import { terminate } from '@/d3/event'
import type { Simulation } from '@/d3/simulation'
import { GraphNode } from '@/model/graph-node'

export type Drag = d3.DragBehavior<SVGGElement, GraphNode, GraphNode>

export function createDrag(
    simulation: Simulation,
    width: number,
    height: number,
    radius: number
): Drag {
    return d3
        .drag<SVGGElement, GraphNode, GraphNode>()
        .filter((event) => event.button === 0) //left mouse click
        .filter((_, d: GraphNode) => {
            return d.draggable ?? true
        })
        .on('start', (event: D3DragEvent<SVGCircleElement, GraphNode, GraphNode>, d: GraphNode) => {
            terminate(event.sourceEvent)
            if (event.active === 0) {
                simulation!.alphaTarget(0.5).restart()
            }
            d.fx = d.x
            d.fy = d.y
        })
        .on('drag', (event: D3DragEvent<SVGCircleElement, GraphNode, GraphNode>, d: GraphNode) => {
            d.fx = Math.max(radius, Math.min(width - radius, event.x))
            d.fy = Math.max(radius, Math.min(height - radius, event.y))
        })
        .on('end', (event: D3DragEvent<SVGCircleElement, GraphNode, GraphNode>, d: GraphNode) => {
            if (event.active === 0) {
                simulation!.alphaTarget(0)
            }
            d.fx = undefined
            d.fy = undefined
        })
}
