import { type D3Link, GraphLink } from '@/model/graph-link'
import { type D3Node, GraphNode } from '@/model/graph-node'

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
        importedId?: string | number,
        label?: string,
        color?: string
    ): D3Node {
        const node = new GraphNode(
            this.nodeIdCounter++,
            importedId,
            x,
            y,
            undefined,
            undefined,
            label,
            color
        )
        this.nodes.push(node)
        return node
    }

    public createLink(
        sourceId: number,
        targetId: number,
        label?: string,
        color?: string
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

        const link = new GraphLink(source, target, undefined, label, color)
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
            (l) => l.source.id === link.source.id && l.target.id === link.target.id
        )
        if (linkIndex === -1) {
            return undefined
        }

        this.links.splice(linkIndex, 1)
        return link
    }

    /**
     * Checks if a link in a given (not default) color exists.
     * @param color - Color to check on.
     * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
     * @returns True if non-default colored links exist, false otherwise.
     */
    public hasNonDefaultLinkColor(color: string, excludedLinkId: string = ''): boolean {
        return this.links.some((link) => link.color === color && link.id !== excludedLinkId)
    }

    /**
     * Get the existing non-default colors of links.
     * @returns An array of strings representing non-default colors, empty if none exist.
     */
    public getNonDefaultLinkColors(): string[] {
        return this.links
            .map((link) => link.color)
            .filter((color) => color !== undefined && color !== '') as string[]
    }

    /**
     * Get the link ids of links with provided color.
     * @param color - Color to check on.
     * @param excludedLinkId - You can optionally exclude a link from this check via its ID
     * @returns An array of link IDs that have the provided color (without the excludedLinkId)
     */
    public getLinkIdsWithNonDefaultLinkColors(color: string, excludedLinkId: string = '') {
        return this.links
            .filter((link) => link.color === color && link.id !== excludedLinkId)
            .map((link) => link.id)
    }

    /** Formats the Graph in Trivial Graph Format.
     * @param includeNodeLabels if node labels should be included
     * @param includeLinkLabels if link labels should be included
     * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
     * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
     * @returns The graph in TGF format
     */
    public toTGF(
        includeNodeLabels: boolean = true,
        includeLinkLabels: boolean = true,
        includeNodeColor: boolean = false,
        includeLinkColor: boolean = false
    ): string {
        if (this.nodes.length === 0 && this.links.length === 0) {
            return 'Graph is empty'
        }

        let nodeLines: string
        let linkLines: string

        nodeLines = this.nodes
            .map((node) => {
                let line = `${node.id}`

                if (includeNodeLabels && node.label !== undefined) {
                    line += ` ${node.label}`
                }
                if (includeNodeColor && node.color !== undefined) {
                    line += ` /COLOR:/${node.color}`
                }
                return line
            })
            .join('\n')

        linkLines = this.links
            .map((link) => {
                let line = `${link.source.id} ${link.target.id}`

                if (includeLinkLabels && link.label !== undefined) {
                    line += ` ${link.label}`
                }
                if (includeLinkColor && link.color !== undefined) {
                    line += ` /COLOR:/${link.color}`
                }
                return line
            })
            .join('\n')

        return `${nodeLines}${linkLines ? '\n#\n' : ''}${linkLines}`
    }
}
