export type parsedNode = {
    idImported: string | number
    label: string | undefined
    color: string | undefined
}

export type parsedLink = {
    sourceIdImported: string | number
    targetIdImported: string | number
    label: string | undefined
    color: string | undefined
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
    color?: string
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
                console.log('link label: ' + linkLabel + ' linkColor: ' + linkColor)
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
            label: link.label,
            color: link.color
        })
    }
    return [nodes, links]
}
