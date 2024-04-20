export type parsedNode = {
    idImported: string | number
    label: string | undefined
    color: string | undefined
}

export type parsedLink = {
    sourceIdImported: string | number
    targetIdImported: string | number
    label: string | undefined
}

export type textNode = {
    id: number
    label?: string
    color?: string
}
export type textLink = {
    sourceId: number
    targetId: number
    label?: string
}
export type textGraph = {
    nodes: textNode[]
    links: textLink[]
}

export function parseTGF(file: string): [parsedNode[], parsedLink[]] {
    const input: string[] = file.replace(/\r\n/g, '\n').split('\n')

    const splitIndex: number = input.findIndex((element) => element.trim().startsWith('#'))
    const nodesInput: string[] = splitIndex !== -1 ? input.slice(0, splitIndex) : input
    const linksInput: string[] = splitIndex !== -1 ? input.slice(splitIndex + 1) : []

    const nodes: parsedNode[] = []
    if (nodesInput.length) {
        for (const node of nodesInput) {
            const [, id, nodeLabel, nodeColor] =
                node.match(/(\w+) (.*) \/COLOR:\/(.+)/) ||
                node.match(/(\w+) (.*)/) ||
                node.match(/(\w+)/) ||
                []
            if (id) {
                nodes.push({
                    idImported: id.trim(),
                    label: nodeLabel?.trim(),
                    color: nodeColor?.trim()
                })
            }
        }
    }

    const links: parsedLink[] = []
    if (linksInput.length) {
        for (const link of linksInput) {
            const [, source, target, label] =
                link.match(/(\w+) (\w+) (.*)/) || link.match(/(\w+) (\w+)/) || []

            if (source && target) {
                links.push({
                    sourceIdImported: source.trim(),
                    targetIdImported: target.trim(),
                    label: label?.trim()
                })
            }
        }
    }

    return [nodes, links]
}

export function parseTextGraph(textGraph: textGraph): [parsedNode[], parsedLink[]] {
    const nodes: parsedNode[] = []
    for (let node of textGraph.nodes) {
        nodes.push({ idImported: node.id, label: node.label, color: node.color })
    }
    const links: parsedLink[] = []
    for (let link of textGraph.links) {
        links.push({
            sourceIdImported: link.sourceId,
            targetIdImported: link.targetId,
            label: link.label
        })
    }
    return [nodes, links]
}
