export interface parsedNode {
    id: number
    label: string
}

export interface parsedLink {
    sourceId: number
    targetId: number
    label: string
}

export function parseTGF(file: string): [parsedNode[], parsedLink[]] {
    let input: string[] = file.split('\n')

    let splitIndex: number = input.findIndex((element) =>
        /[^\w*]#+[^\w*]/.test(element)
    )
    let nodesInput: string[] =
        splitIndex !== -1 ? input.slice(0, splitIndex) : input
    let linksInput: string[] =
        splitIndex !== -1 ? input.slice(splitIndex + 1) : []

    let nodes: parsedNode[] = []
    if (nodesInput.length) {
        for (let node of nodesInput) {
            let [, id, nodeLabel] = node.match(/(\d+) (.+)/) || []
            if (id) {
                let nodeId: number = parseInt(id)
                console.log(`IDs und Labels: ${nodeId}, ${nodeLabel}`)
                nodes.push({ id: nodeId, label: nodeLabel })
            }
        }
    }

    let links: parsedLink[] = []
    if (linksInput.length) {
        for (let link of linksInput) {
            let [, src, tar, label] = link.match(/(\d+) (\d+) (.+)/) || []
            if (src && tar) {
                let source = parseInt(src)
                let target = parseInt(tar)
                console.log(`src: ${source} targ: ${target} label: ${label}`)
                links.push({ sourceId: source, targetId: target, label: label })
            }
        }
    }

    return [nodes, links]
}
