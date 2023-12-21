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
    let input: string[] = file.split('\n')

    let splitIndex: number = input.findIndex((element) =>
        element.trim().startsWith('#')
    )
    let nodesInput: string[] =
        splitIndex !== -1 ? input.slice(0, splitIndex) : input
    let linksInput: string[] =
        splitIndex !== -1 ? input.slice(splitIndex + 1) : []

    let nodes: parsedNode[] = []
    if (nodesInput.length) {
        for (let node of nodesInput) {
            let [, id, nodeLabel] =
                node.match(/(\w+) (.*)/) || node.match(/(\w+)/) || []
            if (id && nodeLabel) {
                nodes.push({ idImported: id.trim(), label: nodeLabel.trim() })
            } else if (id) {
                nodes.push({ idImported: id.trim(), label: id.trim() })
            }
        }
    }

    let links: parsedLink[] = []
    if (linksInput.length) {
        for (let link of linksInput) {
            let [, source, target, label] =
                link.match(/(\w+) (\w+) (.*)/) ||
                link.match(/(\w+) (\w+)/) ||
                []

            if (source && target) {
                links.push({
                    sourceIdImported: source.trim(),
                    targetIdImported: target.trim(),
                    label: label?.trim(),
                })
            }
        }
    }

    return [nodes, links]
}
