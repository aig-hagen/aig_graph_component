import { ComponentOptionsMixin } from 'vue'
import { ComponentProvideOptions } from 'vue'
import { DefineComponent } from 'vue'
import { PublicProps } from 'vue'

/**
 * Creates a new link from source to target node, triggers the according event.
 *
 * @param sourceId
 * @param targetId
 * @param label
 * @param linkColor
 * @param isDeletableViaGUI
 * @param isLabelEditableViaGUI
 * @returns The id of the newly created link or undefined if the link already exists or the source or target node id was invalid.
 */
declare function createLink(
    sourceId: number,
    targetId: number,
    label?: string,
    linkColor?: string,
    isDeletableViaGUI?: boolean,
    isLabelEditableViaGUI?: boolean
): string | undefined

/**
 * Creates a new graph node and triggers the according event.
 * @param props
 * @param x
 * @param y
 * @param importedId
 * @param label
 * @param nodeColor
 * @param hasFixedPosition
 * @param isDeletableViaGUI
 * @param isLabelEditableViaGUI
 * @param allowIncomingLinks
 * @param allowOutgoingLinks
 * @returns The id of the newly created node.
 */
declare function createNode(
    props?: NodeProps,
    x?: number,
    y?: number,
    importedId?: string | number,
    label?: string,
    nodeColor?: string,
    hasFixedPosition?: FixedAxis,
    isDeletableViaGUI?: boolean,
    isLabelEditableViaGUI?: boolean,
    allowIncomingLinks?: boolean,
    allowOutgoingLinks?: boolean
): number

/**
 * Exposed function that deletes nodes and links via their IDs.
 * If no IDs are provided all currently existing nodes and links are deleted.
 * @param ids
 */
declare function deleteElement(ids: string[] | number[] | string | number | undefined): void

declare type FixedAxis = {
    x: boolean
    y: boolean
}

declare function getDefaults(): GraphConfigurationPublic

declare function getGraph(
    format?: string,
    includeNodePosition?: boolean,
    includeNodeProps?: boolean,
    includeColor?: boolean,
    includeEditability?: boolean
): any

export declare const GraphComponent: DefineComponent<
    {},
    {
        setDefaults: typeof setDefaults
        getDefaults: typeof getDefaults
        getGraph: typeof getGraph
        setGraph: typeof setGraph
        printGraph: typeof printGraph
        createNode: typeof createNode
        createLink: typeof createLink
        deleteElement: typeof deleteElement
        setLabel: typeof setLabel
        setColor: typeof setColor
        setNodeSize: typeof setNodeSize
        setNodeShape: typeof setNodeShape
        setNodeProps: typeof setNodeProps
        setDeletable: typeof setDeletable
        setLabelEditable: typeof setLabelEditable
        setNodesLinkPermission: typeof setNodesLinkPermission
        setNodesFixedPosition: typeof setNodesFixedPosition
        setEditability: typeof setEditability
        toggleNodeLabels: typeof toggleNodeLabels
        toggleLinkLabels: typeof toggleLinkLabels
        toggleZoom: typeof toggleZoom
        toggleNodePhysics: typeof toggleNodePhysics
        toggleFixedLinkDistance: typeof toggleFixedLinkDistance
        toggleNodeCreationViaGUI: typeof toggleNodeCreationViaGUI
        toggleNodeAutoGrow: typeof toggleNodeAutoGrow
        resetView: typeof resetView
    },
    {},
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    {
        nodeCreated: (node: { id: number; label?: string; x?: number; y?: number }) => any
        nodeClicked: (
            node: {
                id: number
                label?: string
                x?: number
                y?: number
            },
            button: number
        ) => any
        nodeDeleted: (node: { id: number; label?: string; x?: number; y?: number }) => any
        nodeRenderedSizeChange: (
            node: {
                id: number
                renderedSize: NodeSize
                baseSize: NodeSize
            },
            previousRenderedSize: NodeSize
        ) => any
        linkCreated: (link: { id: string; label?: string }) => any
        linkClicked: (
            link: {
                id: string
                label?: string
            },
            button: number
        ) => any
        linkDeleted: (link: { id: string; label?: string }) => any
        labelEdited: (
            parent: {
                id: number | string
            },
            label: string
        ) => any
    },
    string,
    PublicProps,
    Readonly<{}> &
        Readonly<{
            onNodeCreated?:
                | ((node: { id: number; label?: string; x?: number; y?: number }) => any)
                | undefined
            onNodeClicked?:
                | ((
                      node: {
                          id: number
                          label?: string
                          x?: number
                          y?: number
                      },
                      button: number
                  ) => any)
                | undefined
            onNodeDeleted?:
                | ((node: { id: number; label?: string; x?: number; y?: number }) => any)
                | undefined
            onNodeRenderedSizeChange?:
                | ((
                      node: {
                          id: number
                          renderedSize: NodeSize
                          baseSize: NodeSize
                      },
                      previousRenderedSize: NodeSize
                  ) => any)
                | undefined
            onLinkCreated?: ((link: { id: string; label?: string }) => any) | undefined
            onLinkClicked?:
                | ((
                      link: {
                          id: string
                          label?: string
                      },
                      button: number
                  ) => any)
                | undefined
            onLinkDeleted?: ((link: { id: string; label?: string }) => any) | undefined
            onLabelEdited?:
                | ((
                      parent: {
                          id: number | string
                      },
                      label: string
                  ) => any)
                | undefined
        }>,
    {},
    {},
    {},
    {},
    string,
    ComponentProvideOptions,
    true,
    {},
    any
>

declare interface GraphConfiguration {
    nodeProps: NodeProps
    nodeGUIEditability: NodeGUIEditability
    nodeAutoGrowToLabelSize: boolean
    showNodeLabels: boolean
    nodePhysicsEnabled: boolean
    linkGUIEditability: LinkGUIEditability
    showLinkLabels: boolean
    fixedLinkDistanceEnabled: boolean
    allowNodeCreationViaGUI: boolean
    zoomEnabled: boolean
    markerBoxSize: number
    markerPadding: number
    markerRef: number
    arrowPoints: [number, number][]
    markerPath: string
    readonly isCanvasBoundToView: boolean
}

declare type GraphConfigurationPublic = Partial<
    Pick<
        GraphConfiguration,
        | 'zoomEnabled'
        | 'nodePhysicsEnabled'
        | 'fixedLinkDistanceEnabled'
        | 'showNodeLabels'
        | 'showLinkLabels'
        | 'allowNodeCreationViaGUI'
        | 'nodeAutoGrowToLabelSize'
        | 'nodeProps'
        | 'nodeGUIEditability'
        | 'linkGUIEditability'
    >
>

export declare type jsonGraph = {
    nodes: jsonNode[]
    links: jsonLink[]
}

export declare type jsonLink = {
    sourceId: number
    targetId: number
    label?: string
    color?: string
} & LinkGUIEditability

export declare type jsonNode = {
    id: number
    x?: number
    y?: number
    label?: string
} & NodeGUIEditability &
    NodeAppearance

export declare interface LinkGUIEditability {
    deletable?: boolean
    labelEditable?: boolean
}

declare interface NodeAppearance {
    color?: string
    props?: NodeProps
    renderedSize?: NodeSize
}

export declare type NodeCircle = {
    shape: NodeShape.CIRCLE
    radius: number
}

export declare interface NodeGUIEditability {
    fixedPosition?: FixedAxis
    deletable?: boolean
    labelEditable?: boolean
    allowIncomingLinks?: boolean
    allowOutgoingLinks?: boolean
}

export declare type NodeProps = NodeCircle | NodeRect

/**
 * Rectangular Node Properties.
 * A `width`-to-`height` ratio smaller than 1:10 is recommended as well as an `cornerRadius` between 0 and 4.
 *
 * *Regarding the `reflexiveEdgeStart` property:*
 * - *For ratios up to 1:3, both movable and fixed edges are visually fine*
 * - *For ratios between 1:3 and 1:10 prefer using fixed edges*
 * - *Avoid higher ratios, if you still use them, use fixed edges and avoid placing them from the short to the long side.*
 */
export declare type NodeRect = {
    shape: NodeShape.RECTANGLE
    width: number
    height: number
    cornerRadius: number
    reflexiveEdgeStart: 'MOVABLE' | SideType
}

/**
 * The node shapes are used to render the specific shape and attributes for the nodes
 * as well as for some internal behaviour.
 *
 * The right hand side should be a basic SVG shape.
 */
export declare enum NodeShape {
    CIRCLE = 'circle',
    RECTANGLE = 'rect'
}

declare type NodeSize = NodeSizeCircle | NodeSizeRect

declare type NodeSizeCircle = {
    radius: number
}

declare type NodeSizeRect = {
    width: number
    height: number
}

declare function printGraph(
    format?: string,
    includeNodePosition?: boolean,
    includeNodeProps?: boolean,
    includeColor?: boolean,
    includeEditability?: boolean
): void

declare function resetView(): void

/**
 * Exposed function that sets the color of nodes and links via their IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param color
 * @param ids
 */
declare function setColor(
    color: string,
    ids: string[] | number[] | string | number | undefined
): void

declare function setDefaults(configInput: GraphConfigurationPublic): void

/**
 * Exposed function to set if nodes and links are deletable via GUI based on the provided IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param isDeletable
 * @param ids
 */
declare function setDeletable(
    isDeletable: boolean,
    ids: string[] | number[] | string | number | undefined
): void

/**
 * Exposed function to set the editability parameters of nodes and links at once using an editability-object.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param editability
 * @param ids
 * */
declare function setEditability(
    editability: NodeGUIEditability | LinkGUIEditability,
    ids: string[] | number[] | string | number | undefined
): void

declare function setGraph(graphToSet: string | jsonGraph | undefined): void

/**
 * Exposed function that sets the label of nodes and links via their IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param label
 * @param ids
 */
declare function setLabel(
    label: string,
    ids: string[] | number[] | string | number | undefined
): void

/**
 * Exposed function to set if the labels of nodes and links are editable via GUI based on the provided IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param isLabelEditable
 * @param ids
 */
declare function setLabelEditable(
    isLabelEditable: boolean,
    ids: string[] | number[] | string | number | undefined
): void

/**
 * Exposed function to set the individual nodes properties.
 *
 * For rectangular properties a width-to-height ratio smaller than 1:10 is recommended.
 *
 * *Regarding the `reflexiveEdgeStart` property:*
 * - *For ratios up to 1:3, both movable and fixed edges are visually fine*
 * - *For ratios between 1:3 and 1:10 prefer using fixed edges*
 * - *Avoid higher ratios, if you still need to use them, use fixed edges and avoid placing them from the short to the long side.*
 *
 * @param nodeProps - `{shape: 'circle', radius: number}` or
 * `{shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
 * @param ids
 */
declare function setNodeProps(
    nodeProps: NodeProps,
    ids: string[] | number[] | string | number | undefined
): void

/**
 * Exposed function to set if a node can be dragged via GUI and is influenced by the simulation forces.
 * If no IDs are provided, it is set for all currently existing nodes.
 * @param fixedPosition
 * @param ids
 */
declare function setNodesFixedPosition(
    fixedPosition: FixedAxis | boolean,
    ids: string[] | number[] | string | number | undefined
): void

/**
 * Exposed function to set the individual node shape via id.
 * If no ids are provided, it is set for all currently existing nodes.
 * @param shape
 * @param ids
 */
declare function setNodeShape(shape: NodeShape, ids: number[] | number | undefined): void

/**
 * Exposed function to set the size of individual nodes via their IDs.
 * If no IDs are provided, it is set for all currently existing nodes
 * (but does not affect nodes created in the future).
 * Behavior depends on the type of `size` provided and the shape of the node.
 *
 * @param size - Either a `number` or an object defining the node size:
 *
 *   If a `number` is provided:
 *   - For circular nodes: used as the radius.
 *   - For rectangular nodes: sets the width and the height.
 *
 *   If an object is provided:
 *   - `{ radius: number }` for circular nodes.
 *   - `{ width: number, height: number }` for rectangular nodes.
 *
 * @param ids
 */
declare function setNodeSize(size: NodeSize | number, ids: number[] | number | undefined): void

/**
 * Exposed function to set if specified nodes allow incoming or outgoing links edited via GUI
 * based on the provided IDs.
 * If no IDs are provided, it is set for all currently existing nodes.
 * @param allowIncomingLinks
 * @param allowOutgoingLinks
 * @param ids
 */
declare function setNodesLinkPermission(
    allowIncomingLinks: boolean,
    allowOutgoingLinks: boolean,
    ids: string[] | number[] | string | number | undefined
): void

/**
 * Represents the possible sides of a rectangular shaped node where a path can be attached.
 */
declare enum SideType {
    RIGHT = 'RIGHT',
    BOTTOMRIGHT = 'BOTTOMRIGHT',
    BOTTOM = 'BOTTOM',
    BOTTOMLEFT = 'BOTTOMLEFT',
    LEFT = 'LEFT',
    TOPLEFT = 'TOPLEFT',
    TOP = 'TOP',
    TOPRIGHT = 'TOPRIGHT'
}

declare function toggleFixedLinkDistance(isEnabled: boolean): void

declare function toggleLinkLabels(isEnabled: boolean): void

declare function toggleNodeAutoGrow(isEnabled: boolean): void

declare function toggleNodeCreationViaGUI(isEnabled: boolean): void

declare function toggleNodeLabels(isEnabled: boolean): void

declare function toggleNodePhysics(isEnabled: boolean): void

declare function toggleZoom(isEnabled: boolean): void

export { GraphConfigurationPublic }
