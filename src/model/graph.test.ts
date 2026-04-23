import { expect, test } from 'vitest'
import Graph from './graph'
import { NodeShape } from './node-shape'
import type { NodeCircle } from './config'
import type { jsonGraph } from './parser'
import { ArrowType } from './arrow-type'

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
