import { expect, test } from 'vitest'
import Graph from './graph'
import { NodeShape } from './node-shape'
import type { NodeCircle } from './config'
import type { jsonGraph } from './parser'
import { ArrowType } from './arrow-type'
import { NodeOutline } from './node-outline'
import { GraphBadge } from './graph-badge'
import { GraphAnnotation } from './graph-annotation'

test('JSON includes idImported', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    const x = undefined
    const y = undefined
    const importedId = 'aImportedId'
    graph.createNode(nodeProps, x, y, importedId)

    const includeNodePosition = false
    const includeNodeLabels = false
    const includeLinkLabels = false
    const includeNodeProps = false
    const includeNodeColor = false
    const includeLinkColor = false
    const includeNodeEditability = false
    const includeLinkEditability = false
    const includeIdImported = true
    const json = graph.toJSON(
        includeNodePosition,
        includeNodeLabels,
        includeLinkLabels,
        includeNodeProps,
        includeNodeColor,
        includeLinkColor,
        includeNodeEditability,
        includeLinkEditability,
        includeIdImported
    )
    const jsonParsed = JSON.parse(json)

    expect(jsonParsed.nodes[0].idImported).toBe('aImportedId')
})

test('JSON exculdes idImported if not requested', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    const x = undefined
    const y = undefined
    const importedId = 'aImportedId'
    const node = graph.createNode(nodeProps, x, y, importedId)
    graph.createLink(node.id, node.id, ArrowType.SINGLE)

    const includeNodePosition = false
    const includeNodeLabels = false
    const includeLinkLabels = false
    const includeNodeProps = false
    const includeNodeColor = false
    const includeLinkColor = false
    const includeNodeEditability = false
    const includeLinkEditability = false
    const includeIdImported = false
    const json = graph.toJSON(
        includeNodePosition,
        includeNodeLabels,
        includeLinkLabels,
        includeNodeProps,
        includeNodeColor,
        includeLinkColor,
        includeNodeEditability,
        includeLinkEditability,
        includeIdImported
    )
    const jsonParsed = JSON.parse(json)

    expect(jsonParsed.nodes[0].idImported).toBeUndefined()
})

test('JSON exculdes idImported if not existent', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    graph.createNode(nodeProps)

    const includeNodePosition = false
    const includeNodeLabels = false
    const includeLinkLabels = false
    const includeNodeProps = false
    const includeNodeColor = false
    const includeLinkColor = false
    const includeNodeEditability = false
    const includeLinkEditability = false
    const includeIdImported = true
    const json = graph.toJSON(
        includeNodePosition,
        includeNodeLabels,
        includeLinkLabels,
        includeNodeProps,
        includeNodeColor,
        includeLinkColor,
        includeNodeEditability,
        includeLinkEditability,
        includeIdImported
    )
    const jsonParsed = JSON.parse(json)

    expect(jsonParsed.nodes[0].idImported).toBeUndefined()
})

test('JSON includes arrowType', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    const x = undefined
    const y = undefined
    const node = graph.createNode(nodeProps, x, y)
    graph.createLink(node.id, node.id, ArrowType.SINGLE)

    const includeNodePosition = false
    const includeNodeLabels = false
    const includeLinkLabels = false
    const includeNodeProps = false
    const includeNodeColor = false
    const includeLinkColor = false
    const includeNodeEditability = false
    const includeLinkEditability = false
    const includeIdImported = true
    const includeLinkArrowType = true
    const json = graph.toJSON(
        includeNodePosition,
        includeNodeLabels,
        includeLinkLabels,
        includeNodeProps,
        includeNodeColor,
        includeLinkColor,
        includeNodeEditability,
        includeLinkEditability,
        includeIdImported,
        includeLinkArrowType
    )
    const jsonParsed = JSON.parse(json) as jsonGraph

    expect(jsonParsed.links[0]?.arrowType).toBe(ArrowType.SINGLE)
})

test('JSON exculdes arrowType if not requested', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    const x = undefined
    const y = undefined
    const node = graph.createNode(nodeProps, x, y)
    graph.createLink(node.id, node.id, ArrowType.SINGLE)

    const includeNodePosition = false
    const includeNodeLabels = false
    const includeLinkLabels = false
    const includeNodeProps = false
    const includeNodeColor = false
    const includeLinkColor = false
    const includeNodeEditability = false
    const includeLinkEditability = false
    const includeIdImported = false
    const includeLinkArrowType = false
    const json = graph.toJSON(
        includeNodePosition,
        includeNodeLabels,
        includeLinkLabels,
        includeNodeProps,
        includeNodeColor,
        includeLinkColor,
        includeNodeEditability,
        includeLinkEditability,
        includeIdImported,
        includeLinkArrowType
    )
    const jsonParsed = JSON.parse(json) as jsonGraph

    expect(jsonParsed.links[0]!.arrowType).toBeUndefined()
})

test('JSON includes outline', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    graph.createNode(
        nodeProps,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NodeOutline.DASHED
    )

    const json = graph.toJSON(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true
    )
    const jsonParsed = JSON.parse(json) as jsonGraph

    expect(jsonParsed.nodes[0]!.outline).toBe(NodeOutline.DASHED)
})

test('JSON exculdes outline if not requested', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = {
        shape: NodeShape.CIRCLE,
        radius: 1
    }
    graph.createNode(
        nodeProps,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NodeOutline.DASHED
    )

    const json = graph.toJSON(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    )
    const jsonParsed = JSON.parse(json) as jsonGraph

    expect(jsonParsed.nodes[0]!.outline).toBeUndefined()
})

test('setBadge creates and updates a badge', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)

    graph.setBadge(node.id, '0.5')
    expect(graph.badges).toHaveLength(1)
    expect(graph.badges[0]).toBeInstanceOf(GraphBadge)
    expect(graph.badges[0]!.text).toBe('0.5')

    graph.setBadge(node.id, '0.8', 'red')
    expect(graph.badges).toHaveLength(1)
    expect(graph.badges[0]!.text).toBe('0.8')
    expect(graph.badges[0]!.color).toBe('red')
})

test('setBadge with undefined text removes the badge', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)
    graph.setBadge(node.id, '0.5')

    graph.setBadge(node.id, undefined)

    expect(graph.badges).toHaveLength(0)
})

test('removeNode also removes its badge', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)
    graph.setBadge(node.id, '0.5')

    graph.removeNode(node)

    expect(graph.badges).toHaveLength(0)
})

test('createAnnotation creates an annotation', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)

    const annotation = graph.createAnnotation(node.id, '0.5')

    expect(annotation).toBeInstanceOf(GraphAnnotation)
    expect(graph.annotations).toHaveLength(1)
    expect(graph.annotations[0]!.content).toBe('0.5')
    expect(graph.annotations[0]!.position).toBeUndefined()
})

test('createAnnotation is idempotent for the same anchor', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)

    graph.createAnnotation(node.id, '0.5')
    graph.createAnnotation(node.id, '0.8', { angle: 1, distance: 20 })

    expect(graph.annotations).toHaveLength(1)
    expect(graph.annotations[0]!.content).toBe('0.8')
    expect(graph.annotations[0]!.position).toStrictEqual({ angle: 1, distance: 20 })
})

test('createAnnotation returns undefined for an unknown anchor', () => {
    const graph = new Graph()

    const annotation = graph.createAnnotation(999, '0.5')

    expect(annotation).toBeUndefined()
    expect(graph.annotations).toHaveLength(0)
})

test('deleteAnnotation removes the annotation', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)
    graph.createAnnotation(node.id, '0.5')

    graph.deleteAnnotation(node.id)

    expect(graph.annotations).toHaveLength(0)
})

test('removeNode also removes its annotation', () => {
    const graph = new Graph()
    const nodeProps: NodeCircle = { shape: NodeShape.CIRCLE, radius: 1 }
    const node = graph.createNode(nodeProps)
    graph.createAnnotation(node.id, '0.5')

    graph.removeNode(node)

    expect(graph.annotations).toHaveLength(0)
})
