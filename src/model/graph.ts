import { GraphLink } from '@/model/graph-link'
import { type FixedAxis, GraphNode } from '@/model/graph-node'
import type { jsonLink } from '@/model/parser'
import type { NodeProps } from '@/model/config'
import { NodeShape } from './node-shape'

interface ExportedNode {
    id: number
    x?: number
    y?: number
    label?: string
    props?: NodeProps
    color?: string
    idImported?: string | number
    fixedPosition?: FixedAxis
    deletable?: boolean
    labelEditable?: boolean
    allowIncomingLinks?: boolean
    allowOutgoingLinks?: boolean
}

interface ExportedNode {
    id: number
    x?: number
    y?: number
    label?: string
    props?: NodeProps
    color?: string
    idImported?: string | number
    fixedPosition?: FixedAxis
    deletable?: boolean
    labelEditable?: boolean
    allowIncomingLinks?: boolean
    allowOutgoingLinks?: boolean
}

interface ExportedLink {
    sourceId: number
    targetId: number
    label?: string
    color?: string
    deletable?: boolean
    labelEditable?: boolean
}

export default class Graph {
    private nodeIdCounter: number = 0
    public readonly nodes: GraphNode[] = []
    public readonly links: GraphLink[] = []

    public createNode(
        props: NodeProps,
        x?: number,
        y?: number,
        importedId?: string | number,
        label?: string,
        color?: string,
        fixedPosition?: FixedAxis,
        deletable?: boolean,
        labelEditable?: boolean,
        allowIncomingLinks?: boolean,
        allowOutgoingLinks?: boolean
    ): GraphNode {
        const node = new GraphNode(
            this.nodeIdCounter++,
            props,
            importedId,
            x,
            y,
            label,
            color,
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
        deletable?: boolean,
        labelEditable?: boolean
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

    /**
     * Determine if a source and a target node have a bidirectional link connection.
     * @param source
     * @param target
     */
    public hasBidirectionalConnection(source: GraphNode, target: GraphNode): boolean {
        return (
            source.id !== target.id &&
            this.links.some((l) => l.target.id === source.id && l.source.id === target.id) &&
            this.links.some((l) => l.target.id === target.id && l.source.id === source.id)
        )
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
     * @param includeNodePosition if position should be included
     * @param includeNodeLabels if node labels should be included
     * @param includeLinkLabels if link labels should be included
     * @param includeNodeProps if node props should be included
     * @param includeNodeColor if node color should be included
     * @param includeLinkColor if link color should be included
     * @param includeNodeEditability if editability of node via GUI should be included
     * @param includeLinkEditability if editability of link via GUI should be included
     * @returns The graph in JSON format*/
    public toJSON(
        includeNodePosition: boolean = true,
        includeNodeLabels: boolean = true,
        includeLinkLabels: boolean = true,
        includeNodeProps: boolean = true,
        includeNodeColor: boolean = true,
        includeLinkColor: boolean = true,
        includeNodeEditability: boolean = true,
        includeLinkEditability: boolean = true,
        includeIdImported: boolean = true
    ): string {
        const nodes = this.nodes.map((node) => {
            const exportedNode: ExportedNode = {
                id: node.id
            }

            if (includeNodePosition) {
                exportedNode.x = node.x
                exportedNode.y = node.y
            }
            if (includeNodeLabels) {
                exportedNode.label = node.label
            }
            if (includeNodeProps) {
                exportedNode.props = node.props
            }
            if (includeNodeColor) {
                exportedNode.color = node.color
            }
            if (includeIdImported) {
                exportedNode.idImported = node.idImported
            }
            if (includeNodeEditability) {
                exportedNode.fixedPosition = node.fixedPosition
                exportedNode.deletable = node.deletable
                exportedNode.labelEditable = node.labelEditable
                exportedNode.allowIncomingLinks = node.allowIncomingLinks
                exportedNode.allowOutgoingLinks = node.allowOutgoingLinks
            }

            return exportedNode
        })

        const links = this.links.map((link: GraphLink) => {
            const exportedLink: ExportedLink = {
                sourceId: link.source.id,
                targetId: link.target.id
            }
            if (includeLinkLabels) {
                exportedLink.label = link.label
            }
            if (includeLinkColor) {
                exportedLink.color = link.color
            }
            if (includeLinkEditability) {
                exportedLink.deletable = link.deletable
                exportedLink.labelEditable = link.labelEditable
            }
            return exportedLink
        })

        return JSON.stringify({ nodes, links }, null, 4)
    }
}


export function getBounds(graph: Graph) {
    if (graph.nodes.length === 0) {
        return null
    }

    let yMin = Number.POSITIVE_INFINITY
    let yMax = Number.NEGATIVE_INFINITY
    let xMin = Number.POSITIVE_INFINITY
    let xMax = Number.NEGATIVE_INFINITY

    for (const node of graph.nodes) {
        let nodeYMin
        let nodeYMax
        let nodeXMin
        let nodeXMax

        if (node.x === undefined || node.y === undefined) {
            continue
        }

        if (node.props.shape === NodeShape.CIRCLE) {
            const radius = node.props.radius
            nodeYMin = node.y - radius
            nodeYMax = node.y + radius
            nodeXMin = node.x - radius
            nodeXMax = node.x + radius
        } else if (node.props.shape === NodeShape.RECTANGLE) {
            const width = node.props.width
            const height = node.props.height
            nodeYMin = node.y - height / 2
            nodeYMax = node.y + height / 2
            nodeXMin = node.x - width / 2
            nodeXMax = node.x + width / 2
        } else {
            throw new Error('Unknown node shape for node ' + JSON.stringify(node))
        }

        yMin = Math.min(yMin, nodeYMin)
        yMax = Math.max(yMax, nodeYMax)
        xMin = Math.min(xMin, nodeXMin)
        xMax = Math.max(xMax, nodeXMax)
    }

    return {
        yMin: yMin,
        yMax: yMax,
        xMin: xMin,
        xMax: xMax
    }
}