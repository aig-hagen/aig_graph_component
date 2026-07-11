import * as d3 from 'd3'
import { type Canvas } from '@/d3/canvas'
import { GraphAnnotation } from '@/model/graph-annotation'

export type AnnotationSelection = d3.Selection<SVGGElement, GraphAnnotation, SVGGElement, undefined>

export function createAnnotations(canvas: Canvas): AnnotationSelection {
    return canvas
        .append('g')
        .classed('annotations', true)
        .selectAll('.graph-controller__annotation-container')
}
