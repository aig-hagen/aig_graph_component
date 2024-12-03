import type { NodeGUIEditability } from '@/model/graph-node'
import type { LinkGUIEditability } from '@/model/graph-link'

export type parsedNode = {
    idImported: string | number
    x?: number
    y?: number
    fx?: number
    fy?: number
    label?: string
    color?: string
} & NodeGUIEditability

export type parsedLink = {
    sourceIdImported: string | number
    targetIdImported: string | number
    label?: string
    color?: string
} & LinkGUIEditability

export type jsonNode = {
    id: number
    x?: number
    y?: number
    fx?: number
    fy?: number
    label?: string
    color?: string
} & NodeGUIEditability
export type jsonLink = {
    sourceId: number
    targetId: number
    label?: string
    color?: string
} & LinkGUIEditability
export type jsonGraph = {
    nodes: jsonNode[]
    links: jsonLink[]
}

/**
 * Parses Trivial Graph Format with IDs and labels for nodes and links.
 * Additional (non-typical TGF) color option available.
 * @param file - Trivial Graph Format String to parse
 * */
export function parseTGF(file: string): [parsedNode[], parsedLink[]] {
    const input: string[] = file.replace(/\r\n/g, '\n').split('\n')

    const splitIndex: number = input.findIndex((element) => element.trim().startsWith('#'))
    const nodesInput: string[] = splitIndex !== -1 ? input.slice(0, splitIndex) : input
    const linksInput: string[] = splitIndex !== -1 ? input.slice(splitIndex + 1) : []

    const nodes: parsedNode[] = []
    if (nodesInput.length) {
        for (const node of nodesInput) {
            let [, id, nodeLabel, nodeColor] = (
                node.match(/(\w+) (.*) \/COLOR:\/(.+)/) ||
                node.match(/(\w+) (.*)/) ||
                node.match(/(\w+)/) ||
                []
            ).map((item) => item.trim())
            //when there is no nodeLabel but a nodeColor
            if (nodeLabel?.includes('/COLOR:/')) {
                nodeColor = nodeLabel
                nodeLabel = ''
            }
            if (id) {
                nodes.push({
                    idImported: id,
                    label: nodeLabel,
                    color: nodeColor?.replace('/COLOR:/', '')
                })
            }
        }
    }

    const links: parsedLink[] = []
    if (linksInput.length) {
        for (const link of linksInput) {
            let [, source, target, linkLabel, linkColor] = (
                link.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) ||
                link.match(/(\w+) (\w+) (.*)/) ||
                link.match(/(\w+) (\w+)/) ||
                []
            ).map((item) => item.trim())
            //when there is no linkLabel but a linkColor
            if (linkLabel?.includes('/COLOR:/')) {
                linkColor = linkLabel
                linkLabel = ''
            }

            if (source && target) {
                links.push({
                    sourceIdImported: source,
                    targetIdImported: target,
                    label: linkLabel,
                    color: linkColor?.replace('/COLOR:/', '')
                })
            }
        }
    }

    return [nodes, links]
}

/**
 * Parses json like graph format
 * @param jsonGraph - json like graph object to parse
 * */
export function parseJSONGraph(jsonGraph: jsonGraph): [parsedNode[], parsedLink[]] {
    const nodes: parsedNode[] = []
    for (let node of jsonGraph.nodes) {
        nodes.push({
            idImported: node.id,
            x: node.x,
            y: node.y,
            fx: node.fx,
            fy: node.fy,
            label: node.label,
            color: node.color,
            fixedPosition: node.fixedPosition,
            deletable: node.deletable,
            labelEditable: node.labelEditable
        })
    }
    const links: parsedLink[] = []
    for (let link of jsonGraph.links) {
        links.push({
            sourceIdImported: link.sourceId,
            targetIdImported: link.targetId,
            label: link.label,
            color: link.color,
            deletable: link.deletable,
            labelEditable: link.labelEditable
        })
    }
    return [nodes, links]
}
