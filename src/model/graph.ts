import { GraphLink, GraphHyperLink } from '@/model/graph-link'
import { type FixedAxis, GraphNode } from '@/model/graph-node'
import { GraphBadge } from '@/model/graph-badge'
import { GraphAnnotation, type AnnotationPosition } from '@/model/graph-annotation'
import type { jsonLink, jsonHyperLink } from '@/model/parser'
import type { NodeProps } from '@/model/config'
import { NodeShape } from './node-shape'
import type { ArrowType } from './arrow-type'
import type { NodeOutline } from './node-outline'

export default class Graph {
    private nodeIdCounter: number = 0
    public readonly nodes: GraphNode[] = []
    public readonly links: GraphLink[] = []
    public readonly hyperLinks: GraphHyperLink[] = []
    public readonly badges: GraphBadge[] = []
    public readonly annotations: GraphAnnotation[] = []

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
        allowOutgoingLinks?: boolean,
        outline?: NodeOutline
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
            allowOutgoingLinks,
            undefined,
            outline
        )
        this.nodes.push(node)
        return node
    }

    public createLink(
        sourceId: number,
        targetId: number,
        arrowType: ArrowType,
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
            arrowType,
            undefined,
            label,
            color,
            deletable,
            labelEditable
        )
        this.links.push(link)
        return link
    }

    public createHyperLink(
        sourceIds: number[],
        targetId: number,
        label?: string,
        color?: string,
        deletable?: boolean,
        labelEditable?: boolean
    ): GraphHyperLink | undefined {
        if (sourceIds.length < 2) {
            return undefined
        }

        const sources: GraphNode[] = []
        for (const id of sourceIds) {
            const node = this.nodes.find((n) => n.id === id)
            if (node === undefined) {
                return undefined
            }
            sources.push(node)
        }

        const target = this.nodes.find((n) => n.id === targetId)
        if (target === undefined) {
            return undefined
        }

        const candidateId = `${sourceIds.slice().sort((a, b) => a - b).join(',')}-${targetId}`
        const existingHyperLink = this.hyperLinks.find((hl) => hl.id === candidateId)
        if (existingHyperLink !== undefined) {
            return undefined
        }

        const hyperLink = new GraphHyperLink(sources, target, label, color, deletable, labelEditable)
        this.hyperLinks.push(hyperLink)
        return hyperLink
    }

    public removeNode(node: GraphNode): [GraphNode, GraphLink[], GraphHyperLink[]] | undefined {
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

        const attachedHyperLinks = this.hyperLinks.filter(
            (hl) => hl.target.id === node.id || hl.sources.some((s) => s.id === node.id)
        )
        attachedHyperLinks.forEach((hl) => {
            const hlIndex = this.hyperLinks.indexOf(hl, 0)
            this.hyperLinks.splice(hlIndex, 1)
        })

        this.setBadge(node.id, undefined)
        this.deleteAnnotation(node.id)

        return [node, attachedLinks, attachedHyperLinks]
    }

    /**
     * Creates or updates the annotation attached to a node.
     * Idempotent: since callers (the app layer) re-derive and re-apply annotations wholesale
     * on every redraw, calling this again for an anchor that already has an annotation
     * updates it in place rather than rejecting like `createLink` does for duplicates.
     * @param anchorId - The id of the node to attach the annotation to
     * @param content - The displayed text, opaque to the library
     * @param position - Explicit polar position, or undefined to auto-place
     */
    public createAnnotation(
        anchorId: number,
        content: string,
        position?: AnnotationPosition
    ): GraphAnnotation | undefined {
        const existing = this.annotations.find((a) => a.anchorId === anchorId)
        if (existing !== undefined) {
            existing.content = content
            existing.position = position
            return existing
        }

        const anchor = this.nodes.find((n) => n.id === anchorId)
        if (anchor === undefined) {
            return undefined
        }

        const annotation = new GraphAnnotation(anchor, content, position)
        this.annotations.push(annotation)
        return annotation
    }

    /**
     * Removes the annotation attached to a node, if any.
     * @param anchorId - The id of the node the annotation is attached to
     */
    public deleteAnnotation(anchorId: number): GraphAnnotation | undefined {
        const index = this.annotations.findIndex((a) => a.anchorId === anchorId)
        if (index === -1) {
            return undefined
        }
        const [annotation] = this.annotations.splice(index, 1)
        return annotation
    }

    /**
     * Sets or removes the badge attached to a node.
     * Idempotent: calling this again for the same anchor updates the existing badge in place
     * rather than creating a duplicate, since badges are re-derived wholesale by callers on every update.
     * @param anchorId - The id of the node the badge is attached to
     * @param text - The badge text, or undefined to remove the badge
     * @param color - The badge color (empty = default color)
     */
    public setBadge(anchorId: number, text: string | undefined, color?: string): GraphBadge | undefined {
        const existingIndex = this.badges.findIndex((b) => b.anchorId === anchorId)
        if (text === undefined) {
            if (existingIndex !== -1) {
                this.badges.splice(existingIndex, 1)
            }
            return undefined
        }

        if (existingIndex !== -1) {
            const badge = this.badges[existingIndex]!
            badge.text = text
            badge.color = color
            return badge
        }

        const anchor = this.nodes.find((n) => n.id === anchorId)
        if (anchor === undefined) {
            return undefined
        }

        const badge = new GraphBadge(anchor, text, color)
        this.badges.push(badge)
        return badge
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

    public removeHyperLink(hyperLink: GraphHyperLink): GraphHyperLink | undefined {
        const hlIndex = this.hyperLinks.findIndex((hl) => hl.id === hyperLink.id)
        if (hlIndex === -1) {
            return undefined
        }

        this.hyperLinks.splice(hlIndex, 1)
        return hyperLink
    }

    /**
     * Checks if a link in a given (not default) color exists.
     * @param color - Color to check on.
     * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
     * @returns True if non-default colored links exist, false otherwise.
     */
    public hasNonDefaultLinkColor(color: string, excludedLinkId: string = ''): boolean {
        return (
            this.links.some((link) => link.color === color && link.id !== excludedLinkId) ||
            this.hyperLinks.some((hl) => hl.color === color && hl.id !== excludedLinkId)
        )
    }

    /**
     * Get the existing non-default colors of links.
     * @returns An array of strings representing non-default colors, empty if none exist.
     */
    public getNonDefaultLinkColors(): string[] {
        return [
            ...this.links.map((link) => link.color),
            ...this.hyperLinks.map((hl) => hl.color)
        ].filter((color) => color !== undefined && color !== '') as string[]
    }

    /**
     * Get the link ids of links with provided color.
     * @param color - Color to check on.
     * @param excludedLinkId - You can optionally exclude a link from this check via its ID
     * @returns An array of link IDs that have the provided color (without the excludedLinkId)
     */
    public getLinkIdsWithNonDefaultLinkColors(color: string, excludedLinkId: string = '') {
        return [
            ...this.links
                .filter((link) => link.color === color && link.id !== excludedLinkId)
                .map((link) => link.id),
            ...this.hyperLinks
                .filter((hl) => hl.color === color && hl.id !== excludedLinkId)
                .map((hl) => hl.id)
        ]
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
     * Hyperlinks are not included in TGF output as TGF has no standard notation for multi-source edges.
     * @param includeNodeLabels if node labels should be included
     * @param includeLinkLabels if link labels should be included
     * @returns The graph in TGF format
     */
    public toTGF(includeNodeLabels: boolean = true, includeLinkLabels: boolean = true): string {
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
                return line
            })
            .join('\n')

        linkLines = this.links
            .map((link) => {
                let line = `${link.source.id} ${link.target.id}`

                if (includeLinkLabels && link.label !== undefined) {
                    line += ` ${link.label}`
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
     * @param includeIdImported if ID from import data should be included
     * @param includeLinkArrowType if arrow type of link should be included
     * @param includeNodeOutline if node outline style should be included
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
        includeIdImported: boolean = true,
        includeLinkArrowType: boolean = true,
        includeNodeOutline: boolean = true
    ): string {
        const nodes = this.nodes.map((node) => {
            const jsonNode: any = {
                id: node.id
            }
            if (includeNodePosition) {
                if (node.x !== undefined) jsonNode.x = node.x
                if (node.y !== undefined) jsonNode.y = node.y
            }
            if (includeNodeLabels && node.label !== undefined) {
                jsonNode.label = node.label
            }
            if (includeNodeProps && node.props !== undefined) {
                jsonNode.props = node.props
            }
            if (includeNodeColor && node.color !== undefined) {
                jsonNode.color = node.color
            }
            if (includeNodeEditability) {
                if (node.fixedPosition !== undefined) {
                    jsonNode.fixedPosition = node.fixedPosition
                }
                if (node.deletable !== undefined) {
                    jsonNode.deletable = node.deletable
                }
                if (node.labelEditable !== undefined) {
                    jsonNode.labelEditable = node.labelEditable
                }
                if (node.allowIncomingLinks !== undefined) {
                    jsonNode.allowIncomingLinks = node.allowIncomingLinks
                }
                if (node.allowOutgoingLinks !== undefined) {
                    jsonNode.allowOutgoingLinks = node.allowOutgoingLinks
                }
            }
            if (includeIdImported) {
                jsonNode.idImported = node.idImported
            }
            if (includeNodeOutline && node.outline !== undefined) {
                jsonNode.outline = node.outline
            }
            return jsonNode
        })

        const links = this.links.map((link: GraphLink) => {
            return Object.fromEntries(
                Object.entries(this._convertToJSONLink(link)).filter(([key]) => {
                    return (
                        key === 'sourceId' ||
                        key === 'targetId' ||
                        (includeLinkLabels && key === 'label') ||
                        (includeLinkColor && key === 'color') ||
                        (includeLinkArrowType && key === 'arrowType') ||
                        (includeLinkEditability && ['deletable', 'labelEditable'].includes(key))
                    )
                })
            )
        })

        const hyperLinks = this.hyperLinks.map((hl: GraphHyperLink) => {
            return Object.fromEntries(
                Object.entries(this._convertToJSONHyperLink(hl)).filter(([key]) => {
                    return (
                        key === 'sourceIds' ||
                        key === 'targetId' ||
                        (includeLinkLabels && key === 'label') ||
                        (includeLinkColor && key === 'color') ||
                        (includeLinkEditability && ['deletable', 'labelEditable'].includes(key))
                    )
                })
            )
        })

        return JSON.stringify({ nodes, links, hyperLinks }, null, 4)
    }

    private _convertToJSONLink(link: GraphLink): jsonLink {
        const parts = link.id.split('-')

        return {
            sourceId: Number(parts[0]),
            targetId: Number(parts[1]),
            label: link.label,
            color: link.color,
            deletable: link.deletable,
            labelEditable: link.labelEditable,
            arrowType: link.arrowType
        }
    }

    private _convertToJSONHyperLink(hyperLink: GraphHyperLink): jsonHyperLink {
        return {
            sourceIds: hyperLink.sources.map((s) => s.id),
            targetId: hyperLink.target.id,
            label: hyperLink.label,
            color: hyperLink.color,
            deletable: hyperLink.deletable,
            labelEditable: hyperLink.labelEditable
        }
    }
}

export function getBounds(graph: Readonly<Graph>) {
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
