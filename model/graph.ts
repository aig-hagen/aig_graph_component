import { D3Link, Link } from '~/model/link'
import { D3Node, Node } from '~/model/node'

export default class Graph {
    private nodeIdCounter: number = 0
    public readonly nodes: D3Node[] = []
    public readonly links: D3Link[] = []

    public unlockNodes(): void {
        this.nodes.forEach((node) => {
            node.fx = undefined
            node.fy = undefined
        })
    }

    public createNode(
        x?: number,
        y?: number,
        id?: number,
        label?: string
    ): D3Node {
        const node = new Node(
            this.nodeIdCounter++, //todo if id is passed, then in the future it will be used instead
            x,
            y,
            undefined,
            undefined,
            label
        )
        this.nodes.push(node)
        return node
    }

    public createLink(
        sourceId: number,
        targetId: number,
        label?: string
    ): D3Link | undefined {
        const existingLink = this.links.find(
            (l) => l.source.id === sourceId && l.target.id === targetId
        )
        if (existingLink !== undefined) {
            return undefined
        }

        const source = this.nodes.find((node) => node.id === sourceId)
        if (source === undefined) {
            return undefined
        }

        const target = this.nodes.find((node) => node.id === targetId)
        if (target === undefined) {
            return undefined
        }

        const link = new Link(source, target, undefined, label)
        this.links.push(link)
        return link
    }

    public removeNode(node: D3Node): [D3Node, D3Link[]] | undefined {
        const nodeIndex = this.nodes.findIndex((n) => n.id === node.id)
        if (nodeIndex === -1) {
            return undefined
        }

        this.nodes.splice(nodeIndex, 1)
        const attachedLinks = this.links.filter(
            (link) => link.source.id === node.id || link.target.id === node.id
        )
        attachedLinks.forEach((link) => {
            const linkIndex = this.links.indexOf(link, 0)
            this.links.splice(linkIndex, 1)
        })

        return [node, attachedLinks]
    }

    public removeLink(link: D3Link): D3Link | undefined {
        const linkIndex = this.links.findIndex(
            (l) =>
                l.source.id === link.source.id && l.target.id === link.target.id
        )
        if (linkIndex === -1) {
            return undefined
        }

        this.links.splice(linkIndex, 1)
        return link
    }

    // formats the graph in Trivial Graph Format
    public toTGF(includeNodeLabels: true, includeLinkLabels: true): String {
        if (this.nodes.length === 0 && this.links.length === 0) {
            return 'Graph is empty'
        }

        let nodeLines: string
        let linkLines: string

        if (includeNodeLabels) {
            nodeLines = this.nodes
                .map((node) => `${node.id} ${node.label}`)
                .join('\n')
        } else {
            nodeLines = this.nodes.map((node) => `${node.id}`).join('\n')
        }

        if (includeLinkLabels) {
            linkLines = this.links
                .map(
                    (link) =>
                        `${link.source.id} ${link.target.id} ${link.label}`
                )
                .join('\n')
        } else {
            linkLines = this.links
                .map((link) => `${link.source.id} ${link.target.id}`)
                .join('\n')
        }

        return `${nodeLines}${linkLines ? '\n#\n' : ''}${linkLines}`
    }
}
