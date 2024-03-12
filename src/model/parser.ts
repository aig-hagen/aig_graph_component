export interface parsedNode {
    idImported: string
    label: string | undefined
}

export interface parsedLink {
    sourceIdImported: string
    targetIdImported: string
    label: string | undefined
}

export function parseTGF(file: string): [parsedNode[], parsedLink[]] {
    const input: string[] = file.replace(/\r\n/g, '\n').split('\n')

    const splitIndex: number = input.findIndex((element) => element.trim().startsWith('#'))
    const nodesInput: string[] = splitIndex !== -1 ? input.slice(0, splitIndex) : input
    const linksInput: string[] = splitIndex !== -1 ? input.slice(splitIndex + 1) : []

    const nodes: parsedNode[] = []
    if (nodesInput.length) {
        for (const node of nodesInput) {
            const [, id, nodeLabel] = node.match(/(\w+) (.*)/) || node.match(/(\w+)/) || []
            if (id && nodeLabel) {
                nodes.push({ idImported: id.trim(), label: nodeLabel.trim() })
            } else if (id) {
                nodes.push({ idImported: id.trim(), label: id.trim() })
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
