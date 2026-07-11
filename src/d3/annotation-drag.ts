import * as d3 from 'd3'
import type { D3DragEvent } from 'd3'
import { terminate } from '@/d3/event'
import { annotationOrbitDistance, textAlignmentForAngle } from '@/d3/annotation-placement'
import { GraphAnnotation } from '@/model/graph-annotation'
import type { GraphConfiguration } from '@/model/config'

export type AnnotationDrag = d3.DragBehavior<SVGGElement, GraphAnnotation, GraphAnnotation>

/**
 * Annotations aren't part of the force simulation, so - unlike node dragging, which relies
 * on the simulation's own tick loop to keep repainting positions during a drag - this drag
 * behavior updates the dragged element's transform directly on every 'drag' event.
 *
 * Annotations always orbit their anchor at a fixed distance (`annotationOrbitDistance`) -
 * dragging only ever adjusts the angle, never the distance, so the annotation can't be
 * dragged arbitrarily far from its node.
 *
 * `config` is read live (not captured once) so toggling `allowAnnotationDragging` via
 * `toggleAnnotationDragging()` takes effect on the next drag attempt without needing to
 * recreate this behavior or re-bind it to the annotation selection.
 */
export function createAnnotationDrag(
    config: GraphConfiguration,
    afterEnd: (annotation: GraphAnnotation) => void
): AnnotationDrag {
    return d3
        .drag<SVGGElement, GraphAnnotation, GraphAnnotation>()
        .filter((event) => event.button === 0 && config.allowAnnotationDragging)
        .on('start', (event: D3DragEvent<SVGGElement, GraphAnnotation, GraphAnnotation>) => {
            terminate(event.sourceEvent)
        })
        .on(
            'drag',
            function (
                this: SVGGElement,
                event: D3DragEvent<SVGGElement, GraphAnnotation, GraphAnnotation>,
                d: GraphAnnotation
            ) {
                const anchorX = d.anchor.x ?? 0
                const anchorY = d.anchor.y ?? 0
                const dx = event.x - anchorX
                const dy = event.y - anchorY
                const distance = annotationOrbitDistance(d.anchor)
                const angle = Math.atan2(dy, dx)
                d.position = { angle, distance }
                const { textAnchor, dominantBaseline } = textAlignmentForAngle(angle)
                d3.select(this)
                    .attr(
                        'transform',
                        `translate(${anchorX + Math.cos(angle) * distance},${anchorY + Math.sin(angle) * distance})`
                    )
                    .selectChild('text')
                    .attr('text-anchor', textAnchor)
                    .attr('dominant-baseline', dominantBaseline)
            }
        )
        .on('end', (_event: D3DragEvent<SVGGElement, GraphAnnotation, GraphAnnotation>, d: GraphAnnotation) => {
            afterEnd(d)
        })
}
