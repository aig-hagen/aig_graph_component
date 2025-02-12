import { GraphLink } from '@/model/graph-link'
import { type FixedAxis, GraphNode } from '@/model/graph-node'
import type { jsonLink } from '@/model/parser'
import type { NodeShape } from '@/model/node-shape'

export default class Graph {
    private nodeIdCounter: number = 0
    public readonly nodes: GraphNode[] = []
    public readonly links: GraphLink[] = []

    public createNode(
        x?: number,
        y?: number,
        importedId?: string | number,
        label?: string,
        color?: string,
        nodeShape?: NodeShape,
        //TODO soon there will probably also be global editability config settings, which will replace the default values
        fixedPosition: FixedAxis = { x: false, y: false },
        deletable: boolean = true,
        labelEditable: boolean = true,
        allowIncomingLinks: boolean = true,
        allowOutgoingLinks: boolean = true
    ): GraphNode {
        const node = new GraphNode(
            this.nodeIdCounter++,
            importedId,
            x,
            y,
            label,
            color,
            nodeShape,
            fixedPosition,
            deletable,
            labelEditable,
            allowIncomingLinks,
            allowOutgoingLinks
        )
        this.nodes.push(node)
        return node
    }

    public createLink(
        sourceId: number,
        targetId: number,
        label?: string,
        color?: string,
        //TODO soon there will probably also be global editability config settings, which will replace the default values
        deletable: boolean = true,
        labelEditable: boolean = true
    ): GraphLink | undefined {
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

        const link = new GraphLink(
            source,
            target,
            undefined,
            label,
            color,
            deletable,
            labelEditable
        )
        this.links.push(link)
        return link
    }

    public removeNode(node: GraphNode): [GraphNode, GraphLink[]] | undefined {
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

    public removeLink(link: GraphLink): GraphLink | undefined {
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

    /** Formats the graph in trivial graph format.
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
            return ''
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

    /** Formats the graph in a json like graph format.
     * @param includeNodeLabels if node labels should be included
     * @param includeLinkLabels if link labels should be included
     * @param includeNodeColor if node color should be included
     * @param includeLinkColor if link color should be included
     * @param includeNodePosition if position should be included
     * @param includeNodeEditability if editability of node via GUI should be included
     * @param includeLinkEditability if editability of link via GUI should be included
     * @returns The graph in JSON format*/
    public toJSON(
        includeNodeLabels: boolean = true,
        includeLinkLabels: boolean = true,
        includeNodeColor: boolean = true,
        includeLinkColor: boolean = true,
        includeNodePosition: boolean = true,
        includeNodeEditability: boolean = true,
        includeLinkEditability: boolean = true
    ): string {
        let nodesStructure = this.nodes
            .map((node: GraphNode) => {
                let include = ['id']

                if (includeNodeLabels && node.label !== undefined) {
                    include.push('label')
                }
                if (includeNodeColor && node.color !== undefined) {
                    include.push('color')
                }
                if (includeNodePosition && node.x !== undefined && node.y !== undefined) {
                    include.push('x')
                    include.push('y')
                }
                if (includeNodeEditability) {
                    if (node.fixedPosition !== undefined) {
                        include.push('fixedPosition')
                    }
                    if (node.deletable !== undefined) {
                        include.push('deletable')
                    }
                    if (node.labelEditable !== undefined) {
                        include.push('labelEditable')
                    }
                    if (node.allowIncomingLinks !== undefined) {
                        include.push('allowIncomingLinks')
                    }
                    if (node.allowOutgoingLinks !== undefined) {
                        include.push('allowOutgoingLinks')
                    }
                }

                return JSON.stringify(node, include)
            })
            .join(',\n\t\t')

        let linkStructure = this.links
            .map((link: GraphLink) => {
                let include = ['sourceId', 'targetId']

                if (includeLinkLabels && link.label !== undefined) {
                    include.push('label')
                }
                if (includeLinkColor && link.color !== undefined) {
                    include.push('color')
                }
                if (includeLinkEditability) {
                    if (link.deletable !== undefined) {
                        include.push('deletable')
                    }
                    if (link.labelEditable !== undefined) {
                        include.push('labelEditable')
                    }
                }

                let linkWithSplitId = this._convertToJSONLink(link)
                return JSON.stringify(linkWithSplitId, include)
            })
            .join(',\n\t\t')

        return `{\n\t"nodes":[\n\t\t${nodesStructure}\n\t],\n\t"links":[\n\t\t${linkStructure}\n\t]\n}`
    }

    private _convertToJSONLink(link: GraphLink): jsonLink {
        let parts = link.id.split('-')

        return {
            sourceId: Number(parts[0]),
            targetId: Number(parts[1]),
            label: link.label,
            color: link.color,
            deletable: link.deletable,
            labelEditable: link.labelEditable
        }
    }
}
