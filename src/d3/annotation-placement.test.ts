import { expect, test } from 'vitest'
import Graph from '@/model/graph'
import { NodeShape } from '@/model/node-shape'
import type { NodeCircle } from '@/model/config'
import { ArrowType } from '@/model/arrow-type'
import { computeAutoPlacement, textAlignmentForAngle } from '@/d3/annotation-placement'

const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 24 }

test('auto-placement points away from a single incident edge', () => {
    const graph = new Graph()
    const anchor = graph.createNode(nodeProps, 0, 0)
    const other = graph.createNode(nodeProps, 100, 0)
    graph.createLink(anchor.id, other.id, ArrowType.SINGLE)
    const annotation = graph.createAnnotation(anchor.id, 'x')!

    const position = computeAutoPlacement(annotation, graph)

    // the edge points at angle 0 (towards +x); the best free angle should be roughly opposite (pi)
    const angularDistanceFromEdge = Math.min(
        Math.abs(position.angle - 0),
        2 * Math.PI - Math.abs(position.angle - 0)
    )
    expect(angularDistanceFromEdge).toBeGreaterThan(Math.PI / 2)
})

test('auto-placement distance is based on the anchor node radius', () => {
    const graph = new Graph()
    const anchor = graph.createNode(nodeProps, 0, 0)
    const annotation = graph.createAnnotation(anchor.id, 'x')!

    const position = computeAutoPlacement(annotation, graph)

    expect(position.distance).toBeGreaterThan(24)
})

test('auto-placement handles a node with no incident edges or neighbors', () => {
    const graph = new Graph()
    const anchor = graph.createNode(nodeProps, 0, 0)
    const annotation = graph.createAnnotation(anchor.id, 'x')!

    const position = computeAutoPlacement(annotation, graph)

    expect(Number.isFinite(position.angle)).toBe(true)
    expect(Number.isFinite(position.distance)).toBe(true)
})

test('text grows rightward, away from a node to its left', () => {
    const alignment = textAlignmentForAngle(0)
    expect(alignment.textAnchor).toBe('start')
    expect(alignment.dominantBaseline).toBe('central')
})

test('text grows leftward, away from a node to its right', () => {
    const alignment = textAlignmentForAngle(Math.PI)
    expect(alignment.textAnchor).toBe('end')
    expect(alignment.dominantBaseline).toBe('central')
})

test('text grows downward, away from a node above it', () => {
    const alignment = textAlignmentForAngle(Math.PI / 2)
    expect(alignment.textAnchor).toBe('middle')
    expect(alignment.dominantBaseline).toBe('hanging')
})

test('text grows upward, away from a node below it', () => {
    const alignment = textAlignmentForAngle(-Math.PI / 2)
    expect(alignment.textAnchor).toBe('middle')
    expect(alignment.dominantBaseline).toBe('auto')
})

test('diagonal placement adjusts both anchor and baseline', () => {
    const alignment = textAlignmentForAngle(Math.PI / 4)
    expect(alignment.textAnchor).toBe('start')
    expect(alignment.dominantBaseline).toBe('hanging')
})
