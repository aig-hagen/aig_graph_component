import * as d3 from 'd3'
import type { D3DragEvent } from 'd3'
import { terminate } from '@/d3/event'
import type { Simulation } from '@/d3/simulation'
import type { NodeProps } from '@/model/config'
import { GraphNode } from '@/model/graph-node'
import { NodeShape } from '@/model/node-shape'

export type Drag = d3.DragBehavior<SVGGElement, GraphNode, GraphNode>

export function createDrag(
    simulation: Simulation,
    width: number,
    height: number,
    nodeProps: NodeProps
): Drag {
    return d3
        .drag<SVGGElement, GraphNode, GraphNode>()
        .filter(
            (event, d) =>
                event.button === 0 && //left mouse click
                (d.fixedPosition?.x !== true || d.fixedPosition?.y !== true)
        )
        .on('start', (event: D3DragEvent<SVGCircleElement, GraphNode, GraphNode>, d: GraphNode) => {
            terminate(event.sourceEvent)
            if (event.active === 0) {
                simulation!.alphaTarget(0.5).restart()
            }
            if (d.fixedPosition?.x !== true) {
                d.fx = d.x
            }
            if (d.fixedPosition?.y !== true) {
                d.fy = d.y
            }
        })
        .on('drag', (event: D3DragEvent<SVGCircleElement, GraphNode, GraphNode>, d: GraphNode) => {
            if (d.fixedPosition?.x !== true) {
                if (nodeProps.shape === NodeShape.CIRCLE) {
                    d.fx = Math.max(nodeProps.radius, Math.min(width - nodeProps.radius, event.x))
                } else if (nodeProps.shape === NodeShape.RECTANGLE) {
                    d.fx = Math.max(0, Math.min(width - nodeProps.width, event.x))
                }
            }
            if (d.fixedPosition?.y !== true) {
                if (nodeProps.shape === NodeShape.CIRCLE) {
                    d.fy = Math.max(nodeProps.radius, Math.min(height - nodeProps.radius, event.y))
                } else if (nodeProps.shape === NodeShape.RECTANGLE) {
                    d.fy = Math.max(0, Math.min(height - nodeProps.height, event.y))
                }
            }
        })
        .on('end', (event: D3DragEvent<SVGCircleElement, GraphNode, GraphNode>, d: GraphNode) => {
            if (event.active === 0) {
                simulation!.alphaTarget(0)
            }
            if (d.fixedPosition?.x !== true) {
                d.fx = undefined
            }
            if (d.fixedPosition?.y !== true) {
                d.fy = undefined
            }
        })
}
