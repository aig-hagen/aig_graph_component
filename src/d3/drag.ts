import * as d3 from 'd3'
import type { D3DragEvent } from 'd3'
import { terminate } from '@/d3/event'
import type { Simulation } from '@/d3/simulation'
import { GraphNode } from '@/model/graph-node'
import { NodeShape } from '@/model/node-shape'
import type { GraphConfiguration, NodeSizeCircle, NodeSizeRect } from '@/model/config'

export type Drag = d3.DragBehavior<SVGGElement, GraphNode, GraphNode>

export function createDrag(
    simulation: Simulation,
    width: number,
    height: number,
    config: GraphConfiguration
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
                if (!config.isCanvasBoundToView) {
                    d.fx = event.x
                } else if (d.props.shape === NodeShape.CIRCLE) {
                    d.fx = Math.max(
                        (d.renderedSize as NodeSizeCircle).radius,
                        Math.min(width - (d.renderedSize as NodeSizeCircle).radius, event.x)
                    )
                } else if (d.props.shape === NodeShape.RECTANGLE) {
                    d.fx = Math.max(
                        0.5 * (d.renderedSize as NodeSizeRect).width,
                        Math.min(width - 0.5 * (d.renderedSize as NodeSizeRect).width, event.x)
                    )
                }
            }
            if (d.fixedPosition?.y !== true) {
                if (!config.isCanvasBoundToView) {
                    d.fy = event.y
                } else if (d.props.shape === NodeShape.CIRCLE) {
                    d.fy = Math.max(
                        (d.renderedSize as NodeSizeCircle).radius,
                        Math.min(height - (d.renderedSize as NodeSizeCircle).radius, event.y)
                    )
                } else if (d.props.shape === NodeShape.RECTANGLE) {
                    d.fy = Math.max(
                        0.5 * (d.renderedSize as NodeSizeRect).height,
                        Math.min(height - 0.5 * (d.renderedSize as NodeSizeRect).height, event.y)
                    )
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
