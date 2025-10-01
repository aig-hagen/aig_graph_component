<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
//component
import GraphControls from '@/components/GraphControls.vue'
//d3
import * as d3 from 'd3'
import type { D3ZoomEvent } from 'd3'
import { createZoom, type Zoom } from '@/d3/zoom'
import { createDrag, type Drag } from '@/d3/drag'
import { type Canvas, createCanvas } from '@/d3/canvas'
import { createLinks, type LinkSelection } from '@/d3/link'
import { createNodes, type NodeSelection } from '@/d3/node'
import { createLinkMarkerColored, deleteLinkMarkerColored, initMarkers } from '@/d3/markers'
import { createDraggableLink, type DraggableLink } from '@/d3/draggable-link'
import {
    createSimulation,
    setFixedLinkDistance,
    setNodeChargeAndAttraction,
    updateCollide
} from '@/d3/simulation'
import { arcPath, generatePath, getPathType, linePath, reflexivePath } from '@/d3/paths'
import {
    terminate,
    triggerLabelEdited,
    triggerLinkClicked,
    triggerLinkCreated,
    triggerLinkDeleted,
    triggerNodeClicked,
    triggerNodeCreated,
    triggerNodeDeleted
} from '@/d3/event'
//model
import Graph from '@/model/graph'
import { NodeShape } from '@/model/node-shape'
import { PathType } from '@/model/path-type'
import { SideType } from '@/model/side-type'
import {
    GraphConfigDefault,
    type GraphConfiguration,
    type NodeCircle,
    type NodeProps,
    type NodeRect,
    type NodeSize,
    type NodeSizeCircle,
    type NodeSizeRect
} from '@/model/config'
import {
    checkForAllNecessaryKeys,
    checkForNotValidKeys,
    escapeColor,
    generateRoundedRectPath,
    isProbablyClick,
    releaseImplicitPointerCapture,
    separateNodeAndLinkIds,
    setAndValFixedNodePosition,
    showError
} from '@/model/helper'
import {
    type jsonGraph,
    type parsedLink,
    type parsedNode,
    parseJSONGraph,
    parseTGF
} from '@/model/parser'
import { type FixedAxis, GraphNode, type NodeGUIEditability } from '@/model/graph-node'
import type { GraphLink, LinkGUIEditability } from '@/model/graph-link'
//other
import Bowser from 'bowser'

const graphHost = computed(() => {
    //this is the case for production mode (one and multiple components)
    const hosts = document.querySelectorAll('graph-component')

    let graphHost = undefined
    for (let i = 0; i < hosts.length; i++) {
        const hostElement = hosts[i]
        //@ts-ignore
        const hostShadow = d3.select<HTMLElement, undefined>(hostElement.shadowRoot)

        let graphHostToInit
        //with (open) shadow root
        if (!hostShadow.empty()) {
            graphHostToInit = hostShadow.select<HTMLDivElement>(
                '.graph-controller__graph-host.uninitialised'
            )
        }
        //w/o shadow root
        else {
            graphHostToInit = d3.select<HTMLDivElement, undefined>(
                '.graph-controller__graph-host.uninitialised'
            )
        }

        if (!graphHostToInit.empty()) {
            graphHostToInit.classed('uninitialised', false)
            graphHost = graphHostToInit
            break
        }
    }

    // this is the case for dev mode (one component)
    if (graphHost === undefined) {
        graphHost = d3.select<HTMLDivElement, undefined>(
            '.graph-controller__graph-host.uninitialised'
        )
        graphHost.classed('uninitialised', false)
    }

    return graphHost
})

const graphHostId = computed(() => {
    // w/o shadow root
    let parent = graphHost.value.node()!.parentElement
    // with open shadow root
    if (!parent) {
        let hostShadow = graphHost.value.node()!.getRootNode() as ShadowRoot
        parent = hostShadow.host! as HTMLElement
    }

    let id = parent.getAttribute('id')
    return id ? id : 'gc'
})

onMounted(() => {
    initData()
    window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
})

const browser = Bowser.getParser(window.navigator.userAgent)
const platformType = browser.getPlatformType(true)

/* Set to true, when the label input fields opens and to false when it blurs
 * -> this may not be accurate for all cases. */
let isVirtualKeyboardProbablyOpen = false

/* Stores the position where the last pointer down occurred on a node.*/
let lastPointerDownOnNodePosition: { x: number; y: number } = { x: -100000, y: -100000 }

const graph = ref(new Graph())
const graphHasNodes = ref(false)
const config = reactive(new GraphConfigDefault())
let simulation: any = undefined
let width: number = 400
let height: number = 400
let zoom: Zoom | undefined
let drag: Drag
let canvas: Canvas | undefined
let linkSelection: LinkSelection | undefined
let nodeSelection: NodeSelection | undefined
let draggableLink: DraggableLink | undefined
let draggableLinkSourceNode: GraphNode | undefined
let draggableLinkTargetNode: GraphNode | undefined
let draggableLinkEnd: [number, number] | undefined
let xOffset = 0
let yOffset = 0
let scale = 1
let longRightClickTimerNode: number
let longRightClickTimerLink: number
let nodeLabelResizeObserver: ResizeObserver

//exposing for API
defineExpose({
    setDefaults,
    getGraph,
    setGraph,
    printGraph,
    deleteElement,
    setLabel,
    setColor,
    setNodeSize,
    setNodeShape,
    setNodeProps,
    setDeletable,
    setLabelEditable,
    setNodesLinkPermission,
    setNodesFixedPosition,
    setEditability,
    toggleNodeLabels,
    toggleLinkLabels,
    toggleZoom,
    toggleNodePhysics,
    toggleFixedLinkDistance,
    toggleGraphEditingInGUI,
    toggleNodeAutoGrow,
    resetView
})

type GraphConfigurationInput = Partial<
    Pick<
        GraphConfiguration,
        | 'isGraphEditableInGUI'
        | 'zoomEnabled'
        | 'nodePhysicsEnabled'
        | 'fixedLinkDistanceEnabled'
        | 'showNodeLabels'
        | 'showLinkLabels'
        | 'nodeAutoGrowToLabelSize'
        | 'nodeProps'
    > // > & {
>

function setDefaults(configInput: GraphConfigurationInput) {
    //region graph-level
    // editability
    if (configInput.isGraphEditableInGUI !== undefined) {
        toggleGraphEditingInGUI(configInput.isGraphEditableInGUI)
    }
    // zoom
    if (configInput.zoomEnabled !== undefined) {
        toggleZoom(configInput.zoomEnabled)
    }
    // simulation
    if (configInput.nodePhysicsEnabled !== undefined) {
        toggleNodePhysics(configInput.nodePhysicsEnabled)
    }
    if (configInput.fixedLinkDistanceEnabled !== undefined) {
        toggleFixedLinkDistance(configInput.fixedLinkDistanceEnabled)
    }
    //labels and auto resize
    if (configInput.showNodeLabels !== undefined) {
        toggleNodeLabels(configInput.showNodeLabels)
    }
    if (configInput.showLinkLabels !== undefined) {
        toggleLinkLabels(configInput.showLinkLabels)
    }
    if (configInput.nodeAutoGrowToLabelSize !== undefined) {
        toggleNodeAutoGrow(configInput.nodeAutoGrowToLabelSize)
    }
    //endregion

    //region individual element level
    //nodes
    config.nodeProps = configInput.nodeProps ?? config.nodeProps
    //endregion

    restart()
}

//region functions that are solely used as exposed ones
function getGraph(
    format: string = 'json',
    includeNodePosition: boolean = true,
    includeNodeProps: boolean = true,
    includeColor: boolean = true,
    includeEditability: boolean = true
) {
    if (format.toLowerCase() === 'json') {
        return JSON.parse(
            graph.value.toJSON(
                includeNodePosition,
                config.showNodeLabels,
                config.showLinkLabels,
                includeNodeProps,
                includeColor,
                includeColor,
                includeEditability,
                includeEditability
            )
        )
    } else if (format.toLowerCase() === 'tgf') {
        return graph.value.toTGF(config.showNodeLabels, config.showLinkLabels, true, true)
    } else {
        console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".')
    }
}

function setGraph(graphToSet: string | jsonGraph | undefined) {
    if (typeof graphToSet === 'object' || typeof graphToSet === 'string') {
        _onHandleGraphImport(graphToSet)
    } else {
        _resetGraph()
    }
}

function printGraph(
    format: string = 'json',
    includeNodePosition: boolean = true,
    includeNodeProps: boolean = true,
    includeColor: boolean = true,
    includeEditability: boolean = true
) {
    if (format.toLowerCase() === 'json') {
        console.log(
            graph.value.toJSON(
                includeNodePosition,
                config.showNodeLabels,
                config.showLinkLabels,
                includeNodeProps,
                includeColor,
                includeColor,
                includeEditability,
                includeEditability
            )
        )
    } else {
        console.log(graph.value.toTGF(config.showNodeLabels, config.showLinkLabels))
    }
}

/**
 * Exposed function that deletes nodes and links via their IDs.
 * If no IDs are provided all currently existing nodes and links are deleted.
 * @param ids
 */
function deleteElement(ids: string[] | number[] | string | number | undefined) {
    if (ids !== undefined) {
        const [nodeIds, linkIds] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each(function (d) {
                    let r = graph.value.removeNode(d)
                    if (r !== undefined) {
                        let [removedNode, removedLinks] = r
                        triggerNodeDeleted(removedNode, graphHost.value)
                        removedLinks.forEach((link) => {
                            triggerLinkDeleted(link, graphHost.value)
                        })
                    }
                })
        }

        for (const id of linkIds) {
            linkSelection!
                .filter((d) => d.id === id)
                .each(function (d) {
                    let removedLink = graph.value.removeLink(d)
                    if (removedLink !== undefined) {
                        triggerLinkDeleted(removedLink, graphHost.value)
                    }
                })
        }
    } else {
        nodeSelection!.each(function (d) {
            let r = graph.value.removeNode(d)
            if (r !== undefined) {
                let [removedNode, removedLinks] = r
                triggerNodeDeleted(removedNode, graphHost.value)
                removedLinks.forEach((link) => {
                    triggerLinkDeleted(link, graphHost.value)
                })
            }
        })

        linkSelection!.each(function (d) {
            let removedLink = graph.value.removeLink(d)
            if (removedLink !== undefined) {
                triggerLinkDeleted(removedLink, graphHost.value)
            }
        })
    }

    graphHasNodes.value = graph.value.nodes.length > 0
    restart()
}

/**
 * Exposed function that sets the label of nodes and links via their IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param label
 * @param ids
 */
function setLabel(label: string, ids: string[] | number[] | string | number | undefined) {
    if (ids !== undefined) {
        const [nodeIds, linkIds] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    _updateLabel(d, label)
                })
        }

        for (const id of linkIds) {
            linkSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    _updateLabel(d, label)
                })
        }
    } else {
        nodeSelection!.each((d) => {
            _updateLabel(d, label)
        })
        linkSelection!.each((d) => {
            _updateLabel(d, label)
        })
    }
}

/**
 * Exposed function that sets the color of nodes and links via their IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param color
 * @param ids
 */
function setColor(color: string, ids: string[] | number[] | string | number | undefined) {
    if (ids !== undefined) {
        const [nodeIds, linkIds] = separateNodeAndLinkIds(ids)

        _deleteNotNeededColorMarker(linkIds)

        for (const id of nodeIds) {
            nodeSelection!
                .selectAll<SVGCircleElement | SVGRectElement, GraphNode>('.graph-controller__node')
                .filter((d) => d.id === id)
                .each((d) => (d.color = color))
                .style('fill', color)
        }
        for (const id of linkIds) {
            linkSelection!
                .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
                .filter((d) => d.id === id)
                .each((d) => (d.color = color))
                .style('stroke', color)
        }
    } else {
        //if no ids are provided, the color is set for all currently existing nodes
        nodeSelection!
            .selectAll<SVGCircleElement | SVGRectElement, GraphNode>('.graph-controller__node')
            .each((d) => (d.color = color))
            .style('fill', color)

        //if no ids are provided, the color is set for all currently existing links
        _deleteNotNeededColorMarker(graph.value.links.map((link) => link.id))
        linkSelection!
            .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
            .each((d) => (d.color = color))
            .style('stroke', color)
    }
    createLinkMarkerColored(canvas!, graphHostId.value, config, color)
    restart()
}

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
function setNodeSize(size: NodeSize | number, ids: number[] | number | undefined) {
    if (ids !== undefined) {
        const [nodeIds, _] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    if (typeof size === 'number') {
                        d.setSize(size, config)
                    } else if (
                        d.props.shape === NodeShape.CIRCLE &&
                        checkForAllNecessaryKeys(['radius'], Object.keys(size), true)
                    ) {
                        d.setSize(size, config)
                    } else if (
                        d.props.shape === NodeShape.RECTANGLE &&
                        checkForAllNecessaryKeys(['width', 'height'], Object.keys(size), true)
                    ) {
                        d.setSize(size, config)
                    }
                })
        }
    } else {
        nodeSelection!.each((d) => {
            if (typeof size === 'number') {
                d.setSize(size, config)
            } else if (
                d.props.shape === NodeShape.CIRCLE &&
                checkForAllNecessaryKeys(['radius'], Object.keys(size), false)
            ) {
                d.setSize(size, config)
            } else if (
                d.props.shape === NodeShape.RECTANGLE &&
                checkForAllNecessaryKeys(['width', 'height'], Object.keys(size), false)
            ) {
                d.setSize(size, config)
            }
        })
    }
    restart()
}

/**
 * Exposed function to set the individual node shape via id.
 * If no ids are provided, it is set for all currently existing nodes.
 * @param shape
 * @param ids
 */
function setNodeShape(shape: NodeShape, ids: number[] | number | undefined) {
    if (ids !== undefined) {
        const [nodeIds, _] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    if (d.props.shape !== shape) {
                        d.setShape(shape, config)
                    }
                })
        }
    } else {
        nodeSelection!.each((d) => {
            if (d.props.shape !== shape) {
                d.setShape(shape, config)
            }
        })
    }
    restart()
}

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
function setNodeProps(
    nodeProps: NodeProps,
    ids: string[] | number[] | string | number | undefined
) {
    if (checkForAllNecessaryKeys(['shape'], Object.keys(nodeProps), false)) {
        let nodeIds

        ids !== undefined ? ([nodeIds] = separateNodeAndLinkIds(ids)) : (nodeIds = undefined)

        if (nodeProps.shape === NodeShape.CIRCLE) {
            const nodeCircleKeys: (keyof NodeCircle)[] = ['shape', 'radius']

            if (checkForAllNecessaryKeys(nodeCircleKeys, Object.keys(nodeProps), true)) {
                if (nodeIds !== undefined) {
                    for (const id of nodeIds) {
                        nodeSelection!
                            .filter((d) => d.id === id)
                            .each((d) => {
                                d.props = nodeProps
                            })
                    }
                } else {
                    nodeSelection!.each((d) => {
                        d.props = nodeProps
                    })
                }
            }
            checkForNotValidKeys(nodeCircleKeys, Object.keys(nodeProps), true)
        } else if (nodeProps.shape === NodeShape.RECTANGLE) {
            const nodeRectKeys: (keyof NodeRect)[] = [
                'shape',
                'width',
                'height',
                'cornerRadius',
                'reflexiveEdgeStart'
            ]

            if (checkForAllNecessaryKeys(nodeRectKeys, Object.keys(nodeProps), true)) {
                if (
                    Object.values(SideType).includes(nodeProps.reflexiveEdgeStart as SideType) ||
                    nodeProps.reflexiveEdgeStart === 'MOVABLE'
                ) {
                    if (nodeIds !== undefined) {
                        for (const id of nodeIds) {
                            nodeSelection!
                                .filter((d) => d.id === id)
                                .each((d) => {
                                    d.props = nodeProps
                                })
                        }
                    } else {
                        nodeSelection!.each((d) => {
                            d.props = nodeProps
                        })
                    }
                }
            } else {
                showError(
                    'Invalid reflexiveEdgeStart Value',
                    'Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE.'
                )
            }
            checkForNotValidKeys(nodeRectKeys, Object.keys(nodeProps), true)
        }

        restart()
    } else {
        showError(
            'Invalid NodeProps Object',
            'For circular nodes: {shape: NodeShape, radius: number}\n' +
                "For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}"
        )
    }
}

/**
 * Exposed function to set if nodes and links are deletable via GUI based on the provided IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param isDeletable
 * @param ids
 */
function setDeletable(
    isDeletable: boolean,
    ids: string[] | number[] | string | number | undefined
) {
    if (ids !== undefined) {
        const [nodeIds, linkIds] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    d.deletable = isDeletable
                })
        }

        for (const id of linkIds) {
            linkSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    d.deletable = isDeletable
                })
        }
    } else {
        nodeSelection!.each((d) => {
            d.deletable = isDeletable
        })
        linkSelection!.each((d) => {
            d.deletable = isDeletable
        })
    }
}

/**
 * Exposed function to set if the labels of nodes and links are editable via GUI based on the provided IDs.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param isLabelEditable
 * @param ids
 */
function setLabelEditable(
    isLabelEditable: boolean,
    ids: string[] | number[] | string | number | undefined
) {
    if (ids !== undefined) {
        const [nodeIds, linkIds] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    d.labelEditable = isLabelEditable
                })
        }

        for (const id of linkIds) {
            linkSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    d.labelEditable = isLabelEditable
                })
        }
    } else {
        nodeSelection!.each((d) => {
            d.labelEditable = isLabelEditable
        })
        linkSelection!.each((d) => {
            d.labelEditable = isLabelEditable
        })
    }
}

/**
 * Exposed function to set if specified nodes allow incoming or outgoing links edited via GUI
 * based on the provided IDs.
 * If no IDs are provided, it is set for all currently existing nodes.
 * @param allowIncomingLinks
 * @param allowOutgoingLinks
 * @param ids
 */
function setNodesLinkPermission(
    allowIncomingLinks: boolean,
    allowOutgoingLinks: boolean,
    ids: string[] | number[] | string | number | undefined
) {
    if (ids !== undefined) {
        const [nodeIds, _] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    d.allowIncomingLinks = allowIncomingLinks
                    d.allowOutgoingLinks = allowOutgoingLinks
                })
        }
    } else {
        nodeSelection!.each((d) => {
            d.allowIncomingLinks = allowIncomingLinks
            d.allowOutgoingLinks = allowOutgoingLinks
        })
    }
}

/**
 * Exposed function to set if a node can be dragged via GUI and is influenced by the simulation forces.
 * If no IDs are provided, it is set for all currently existing nodes.
 * @param fixedPosition
 * @param ids
 */
function setNodesFixedPosition(
    fixedPosition: FixedAxis | boolean,
    ids: string[] | number[] | string | number | undefined
) {
    if (ids !== undefined) {
        const [nodeIds, _] = separateNodeAndLinkIds(ids)

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each((d) => {
                    setAndValFixedNodePosition(d, fixedPosition)
                })
        }
    } else {
        nodeSelection!.each((d) => {
            setAndValFixedNodePosition(d, fixedPosition)
        })
    }
}

/**
 * Exposed function to set the editability parameters of nodes and links at once using an editability-object.
 * If no IDs are provided, it is set for all currently existing nodes and links.
 * @param editability
 * @param ids
 * */
function setEditability(
    editability: NodeGUIEditability | LinkGUIEditability,
    ids: string[] | number[] | string | number | undefined
) {
    const allEditabilityProps: (
        | keyof NodeGUIEditability
        | keyof LinkGUIEditability
        | keyof FixedAxis
    )[] = [
        'fixedPosition',
        'deletable',
        'labelEditable',
        'allowIncomingLinks',
        'allowOutgoingLinks'
    ]
    const linkEditabilityProps: (keyof LinkGUIEditability)[] = ['deletable', 'labelEditable']

    if (ids !== undefined) {
        const [nodeIds, linkIds] = separateNodeAndLinkIds(ids)
        const onlyLinks = nodeIds.length === 0

        for (const id of nodeIds) {
            nodeSelection!
                .filter((d) => d.id === id)
                .each(function (d) {
                    d.deletable = editability.deletable ?? d.deletable
                    d.labelEditable = editability.labelEditable ?? d.labelEditable
                    if ('fixedPosition' in editability) {
                        setAndValFixedNodePosition(d, editability.fixedPosition)
                    }
                    if ('allowIncomingLinks' in editability) {
                        d.allowIncomingLinks =
                            editability.allowIncomingLinks ?? d.allowIncomingLinks
                    }
                    if ('allowOutgoingLinks' in editability) {
                        d.allowOutgoingLinks =
                            editability.allowOutgoingLinks ?? d.allowOutgoingLinks
                    }
                })
        }

        for (const id of linkIds) {
            linkSelection!
                .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
                .filter((d) => d.id === id)
                .each(function (d) {
                    d.deletable = editability.deletable ?? d.deletable
                    d.labelEditable = editability.labelEditable ?? d.labelEditable
                })
        }

        checkForNotValidKeys(
            onlyLinks ? linkEditabilityProps : allEditabilityProps,
            Object.keys(editability),
            true
        )
    } else {
        //if no ids are provided, the editability is set for all currently existing nodes and links
        nodeSelection!.each(function (d) {
            d.deletable = editability.deletable ?? d.deletable
            d.labelEditable = editability.labelEditable ?? d.labelEditable
            if ('fixedPosition' in editability) {
                setAndValFixedNodePosition(d, editability.fixedPosition)
            }
            if ('allowIncomingLinks' in editability) {
                d.allowIncomingLinks = editability.allowIncomingLinks ?? d.allowIncomingLinks
            }
            if ('allowOutgoingLinks' in editability) {
                d.allowOutgoingLinks = editability.allowOutgoingLinks ?? d.allowOutgoingLinks
            }
        })

        linkSelection!
            .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
            .each(function (d) {
                d.deletable = editability.deletable ?? d.deletable
                d.labelEditable = editability.labelEditable ?? d.labelEditable
            })

        checkForNotValidKeys(allEditabilityProps, Object.keys(editability), true)
    }
    restart()
}

function toggleNodePhysics(isEnabled: boolean): void {
    config.nodePhysicsEnabled = isEnabled
    setNodeChargeAndAttraction(simulation, isEnabled, width, height)
}

function toggleFixedLinkDistance(isEnabled: boolean): void {
    config.fixedLinkDistanceEnabled = isEnabled
    setFixedLinkDistance(simulation, graph.value, config, isEnabled)
}

function toggleLinkLabels(isEnabled: boolean) {
    config.showLinkLabels = isEnabled
}

function toggleNodeLabels(isEnabled: boolean) {
    config.showNodeLabels = isEnabled
}

function toggleZoom(isEnabled: boolean) {
    config.zoomEnabled = isEnabled
    resetView()
}

function toggleGraphEditingInGUI(isEnabled: boolean) {
    config.isGraphEditableInGUI = isEnabled
}

function toggleNodeAutoGrow(isEnabled: boolean) {
    config.nodeAutoGrowToLabelSize = isEnabled
    isEnabled ? restart() : nodeLabelResizeObserver.disconnect()
}

//endregion

function initData() {
    width = graphHost.value.node()!.clientWidth
    height = graphHost.value.node()!.clientHeight
    zoom = createZoom(
        (event: D3ZoomEvent<any, any>) => onZoom(event, config.zoomEnabled),
        config.zoomEnabled
    )
    canvas = createCanvas(
        graphHost.value!,
        zoom,
        (event) => (config.isGraphEditableInGUI ? onPointerMovedBeginningFromNode(event) : null),
        (event) => (config.isGraphEditableInGUI ? onPointerUpNode(event) : null),
        (event) => {
            if (config.isGraphEditableInGUI) {
                createNode(
                    { ...config.nodeProps },
                    d3.pointer(event, canvas!.node())[0],
                    d3.pointer(event, canvas!.node())[1]
                )
            }
        }
    )
    initMarkers(canvas, graphHostId.value, config, graph.value.getNonDefaultLinkColors())
    draggableLink = createDraggableLink(canvas)
    linkSelection = createLinks(canvas)
    nodeSelection = createNodes(canvas)
    simulation = createSimulation(graph.value, config, width, height, () => onTick())
    drag = createDrag(simulation, width, height, config)
    nodeLabelResizeObserver = createNodeLabelResizeObserver()
    restart()
}

function createNodeLabelResizeObserver() {
    return new ResizeObserver((entries) => {
        let sizeChange = false
        for (let entry of entries) {
            const nodeLabel = entry
            if (nodeLabel) {
                const labelWidth = nodeLabel.borderBoxSize[0].inlineSize
                const labelHeight = nodeLabel.borderBoxSize[0].blockSize
                const labelRadius = labelWidth > labelHeight ? labelWidth / 2 : labelHeight / 2

                const labelSize = {
                    width: labelWidth,
                    height: labelHeight,
                    radius: labelRadius
                }

                const nodeLabelContainer = d3.select(nodeLabel.target)
                const nodeData = nodeLabelContainer.datum() as GraphNode

                sizeChange = nodeData.setRenderedSize(labelSize)

                    if (nodeData.props.radius !== newRadius) {
                        nodeData.props.radius = newRadius
                        sizeChange = true
                    }
                } else if (nodeData.props.shape === NodeShape.RECTANGLE) {
                    const newWidth =
                        labelWidth > nodeData.props.width ? labelWidth : nodeData.props.width
                    const newHeight =
                        labelHeight > nodeData.props.height ? labelHeight : nodeData.props.height

                    if (nodeData.props.width !== newWidth) {
                        nodeData.props.width = newWidth
                        sizeChange = true
                    }
                    if (nodeData.props.height !== newHeight) {
                        nodeData.props.height = newHeight
                        sizeChange = true
                    }
                }
            }
        }
        if (sizeChange) {
            restart()
        }
    })
}

/**
 * Sets the node selection observed by the node label resize observer.
 */
function updateNodeLabelResizeObserverSelection() {
    const nodeLabels = graphHost.value.node()!.querySelectorAll('.graph-controller__node-label')
    nodeLabels.forEach((label) => nodeLabelResizeObserver.observe(label))
}

function onZoom(event: D3ZoomEvent<any, any>, isEnabled: boolean = true): void {
    if (isEnabled) {
        xOffset = event.transform.x
        yOffset = event.transform.y
        scale = event.transform.k

        canvas!.attr('transform', `translate(${xOffset},${yOffset})scale(${scale})`)
    }
}

function createLink(
    source: GraphNode,
    target: GraphNode,
    label?: string,
    linkColor?: string,
    isDeletableViaGUI: boolean = true,
    isLabelEditableViaGUI: boolean = true
): void {
    let newLink = graph.value.createLink(
        source.id,
        target.id,
        label,
        linkColor,
        isDeletableViaGUI,
        isLabelEditableViaGUI
    )
    if (newLink !== undefined) {
        triggerLinkCreated(newLink, graphHost.value)
    }
    restart()
}

function createNode(
    props: NodeProps,
    x?: number,
    y?: number,
    importedId?: string | number,
    label?: string,
    nodeColor?: string,
    //TODO soon there will probably also be global editability config settings, which will replace the default values
    hasFixedPosition: FixedAxis = { x: false, y: false },
    isDeletableViaGUI: boolean = true,
    isLabelEditableViaGUI: boolean = true,
    allowIncomingLinks: boolean = true,
    allowOutgoingLinks: boolean = true
): void {
    let newNode = graph.value.createNode(
        props,
        x ?? width / 2,
        y ?? height / 2,
        importedId,
        label,
        nodeColor,
        hasFixedPosition,
        isDeletableViaGUI,
        isLabelEditableViaGUI,
        allowIncomingLinks,
        allowOutgoingLinks
    )
    triggerNodeCreated(newNode, graphHost.value)
    updateCollide(simulation, graph.value, config)
    graphHasNodes.value = true
    restart()
}

function onTick(): void {
    nodeSelection!.attr('transform', (d) => `translate(${d.x},${d.y})`)

    linkSelection!
        .selectAll<
            SVGPathElement,
            GraphLink
        >('.graph-controller__link, .graph-controller__link-click-box')
        .attr('d', (d: GraphLink) => {
            _updatePathType(d)
            return generatePath(d, width, height, config)
        })

    _updateLinkMjxPosition()
}

/**
 * Sets the path type for a link depending on the connection and position of its nodes and updates the view.
 * @param d
 */
function _updatePathType(d: GraphLink) {
    let oldPathType = d.pathType
    d.pathType = getPathType(d.source, d.target, graph.value)
    if (oldPathType !== d.pathType) {
        restart()
    }
}

/**
 * Updates the draggable link path according to the needed shape.
 */
function _updateDraggableLinkPath(): void {
    const source = draggableLinkSourceNode

    const isSourceOnDeletion = d3
        .select(
            graphHost.value.node()!.querySelector(`#${graphHostId.value + '-node-' + source!.id}`)!
        )
        .classed('on-deletion')

    if (source !== undefined && !isSourceOnDeletion) {
        const target = draggableLinkTargetNode
        if (target !== undefined) {
            draggableLink!.attr('d', () => {
                if (source.id === target.id) {
                    return reflexivePath(source, [width / 2, height / 2], config)
                } else if (graph.value.hasBidirectionalConnection(source, target)) {
                    return linePath(source, target, config)
                } else {
                    return arcPath(source, target, config)
                }
            })
        } else if (draggableLinkEnd !== undefined) {
            draggableLink!.attr(
                'd',
                linePath(source, { x: draggableLinkEnd[0], y: draggableLinkEnd[1] }, config)
            )
        }
    }
}

//region restart
function restart(alpha: number = 0.5): void {
    linkSelection = linkSelection!
        .data(graph.value.links, (d: GraphLink) => d.id)
        .join((enter) => {
            const linkGroup = enter.append('g').classed('graph-controller__link-container', true)

            linkGroup
                .append('path')
                .classed('graph-controller__link', true)
                .style('stroke', (d) => (d.color ? d.color : ''))
                .attr('id', (d) => graphHostId.value + '-link-' + d.id)

            linkGroup
                .append('path')
                .classed('graph-controller__link-click-box', true)
                .on('dblclick', (event: PointerEvent) => {
                    //a double click on a link, should not create a new node
                    terminate(event)
                })
                .on('pointerout', (event: PointerEvent) => onPointerOutLink(event))
                .on('pointerdown', (event: PointerEvent, d: GraphLink) => {
                    triggerLinkClicked(d, event.button, graphHost.value)
                    if (config.isGraphEditableInGUI) {
                        onPointerDownDeleteLink(event, d)
                    }
                })
                .on('pointerup', (event: PointerEvent, d: GraphLink) => {
                    onPointerUpLink(event, d)
                })

            linkGroup
                .append('text')
                .attr('class', (d) => {
                    return `graph-controller__${d.pathType?.toLowerCase()}-path-text`
                })
                .append('textPath')
                .attr('class', (d: GraphLink) =>
                    d.label
                        ? 'graph-controller__link-label'
                        : 'graph-controller__link-label-placeholder'
                )
                .attr('href', (d) => `#${graphHostId.value + '-link-' + d.id}`)
                .text((d: GraphLink) => (d.label ? d.label : 'add label'))
                .on('click', (event: PointerEvent, d: GraphLink) => {
                    if (config.isGraphEditableInGUI) {
                        onLinkLabelClicked(event, d)
                    }
                })
                .on('dblclick', (event: PointerEvent) => {
                    //a double click on a label, should not create a new node
                    terminate(event)
                })

            linkGroup
                .append('foreignObject')
                .classed('graph-controller__link-label-mathjax-container', true)
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr('width', 1)
                .attr('height', 1)
                .html(
                    (d: GraphLink) =>
                        `<div class='${d.label ? 'graph-controller__link-label' : 'graph-controller__link-label-placeholder'}'>
                        </div>`
                )
                .on('click', (event: PointerEvent, d: GraphLink) => {
                    if (config.isGraphEditableInGUI) {
                        onLinkLabelClicked(event, d)
                    }
                })
                .on('dblclick', (event: PointerEvent) => {
                    //a double click on a label, should not create a new node
                    terminate(event)
                })

            return linkGroup
        })
    // link marker positioning depending on path type reversion
    linkSelection
        .selectChild('.graph-controller__link')
        .attr('marker-start', function (d) {
            if (d.pathType?.includes('REVERSE')) {
                let markerName = `url(#${graphHostId.value}-link-arrow-reverse`
                if (d.color) {
                    markerName += '-' + escapeColor(d.color)
                }
                markerName += ')'
                return markerName
            } else {
                return null
            }
        })
        .attr('marker-end', function (d) {
            if (!d.pathType?.includes('REVERSE')) {
                let markerName = `url(#${graphHostId.value}-link-arrow`
                if (d.color) {
                    markerName += '-' + escapeColor(d.color)
                }
                markerName += ')'
                return markerName
            } else {
                return null
            }
        })

    // link label positioning, visibility and editability
    linkSelection
        .selectChild('text')
        .attr('class', (d) => {
            return `graph-controller__${d.pathType?.toLowerCase()}-path-text`
        })
        .attr('dy', (d) => {
            if (d.pathType === PathType.REFLEXIVE) {
                return 15
            } else if (d.pathType == PathType.LINEREVERSE) {
                return -10
            } else if (d.pathType?.includes('REVERSE')) {
                return 20
            } else {
                return -10
            }
        })
        .selectChild('textPath')
        .attr('class', (d: GraphLink) =>
            d.label ? 'graph-controller__link-label' : 'graph-controller__link-label-placeholder'
        )
        .classed('hidden', (d) => !config.showLinkLabels || (!d.label && !d.labelEditable))
        .classed('not-editable', !config.isGraphEditableInGUI)
        .attr('startOffset', (d) => {
            if (d.pathType?.includes('REVERSE')) {
                return '46%'
            } else {
                return '50%'
            }
        })
        .text((d: GraphLink) => (d.label ? d.label : 'add label'))

    nodeSelection = nodeSelection!
        .data(graph.value.nodes, (d) => d.id)
        .join(
            (enter) => {
                //node container
                const nodeContainerGroup = enter
                    .append('g')
                    .classed('graph-controller__node-container', true)
                    .call(drag!)
                    .on('dblclick', (event: PointerEvent) => {
                        //a double click on a node, should not create a new one
                        terminate(event)
                    })
                    .on('pointerenter', (_, d: GraphNode) => onPointerEnterNode(d))
                    .on('pointerout', (_, d: GraphNode) => onPointerOutNode(d))
                    .on('pointerdown', (event: PointerEvent, d: GraphNode) => {
                        triggerNodeClicked(d, event.button, graphHost.value)
                        lastPointerDownOnNodePosition = { x: event.x, y: event.y }
                        if (config.isGraphEditableInGUI) {
                            onPointerDownNode(event, d)
                        }
                    })
                    .on('pointerup', (event: PointerEvent, d: GraphNode) => {
                        if (config.isGraphEditableInGUI) {
                            onPointerUpNode(event, d)
                        }
                    })
                //node shape, size and label
                return _appendNodeShapeAndLabel(nodeContainerGroup)
            },
            (update) => {
                update.each(function (d) {
                    const nodeContainer = d3.select<SVGGElement, GraphNode>(this)
                    const currentShape = nodeContainer
                        .selectChild('.graph-controller__node')
                        .node() as SVGCircleElement | SVGRectElement

                    if (_hasShapeChange(d, currentShape)) {
                        _replaceNodeShapeAndLabel(currentShape, nodeContainer)
                        updateCollide(simulation, graph.value, config)
                    } else {
                        _updateNodeAndLabelSize(nodeContainer)
                    }
                })
                return update
            }
        )
    //node label visibility, editability and behaviour
    nodeSelection
        .selectChild('foreignObject')
        .selectChild('div')
        .attr('class', (d) => {
            if (d.label) {
                if (config.nodeAutoGrowToLabelSize) {
                    return 'graph-controller__node-label controls-node-size'
                } else {
                    return 'graph-controller__node-label'
                }
            } else {
                return 'graph-controller__node-label-placeholder'
            }
        })
        .classed('hidden', (d) => !config.showNodeLabels || (!d.label && !d.labelEditable))
        .classed('not-editable', !config.isGraphEditableInGUI)
        .text((d) => (d.label ? d.label : 'add label'))

    //version will only be injected until MathJax is initialized
    if (window.MathJax?.version) {
        window.MathJax.typesetPromise().then(() => {
            _handleLinkMathJax()
        })
    }

    if (config.nodeAutoGrowToLabelSize) {
        updateNodeLabelResizeObserverSelection()
    }

    simulation.nodes(graph.value.nodes)
    simulation.alpha(alpha).restart()
}

/**
 * Checks whether the node's shape prop differs from the currently rendered shape.
 * @param node - GraphNode bound data
 * @param nodeShapeElement - The currently rendered SVG shape element
 * @returns True if the shape type differs from the node's data
 */
function _hasShapeChange(node: GraphNode, nodeShapeElement: SVGCircleElement | SVGRectElement) {
    return (
        (node.props.shape === NodeShape.CIRCLE && nodeShapeElement.tagName !== 'circle') ||
        (node.props.shape === NodeShape.RECTANGLE && nodeShapeElement.tagName !== 'rect')
    )
}

/**
 * Replaces the current node shape and its label container with new ones based on the node's data.
 * @param nodeShapeElement - The currently rendered SVG node shape element to be replaced
 * @param nodeContainer - D3 Selection of the node container
 */
function _replaceNodeShapeAndLabel(
    nodeShapeElement: SVGCircleElement | SVGRectElement,
    nodeContainer: d3.Selection<SVGGElement, GraphNode, any, any>
) {
    if (config.nodeAutoGrowToLabelSize) {
        nodeLabelResizeObserver.unobserve(
            <Element>nodeContainer.selectChild('.graph-controller__node-label-container').node()
        )
    }
    nodeShapeElement.remove()
    nodeContainer.selectChild('.graph-controller__node-label-container').remove()
    _appendNodeShapeAndLabel(nodeContainer)
}

/**
 * Appends the necessary elements for the node selections node shape and label inside the node container.
 * @param nodeContainerGroup - D3 Selection of the node container, from the enter or update phase, to which it is appended
 */
function _appendNodeShapeAndLabel(
    nodeContainerGroup: d3.Selection<SVGGElement, GraphNode, any, any>
) {
    //shape circle
    nodeContainerGroup
        .filter((d) => d.props.shape === NodeShape.CIRCLE)
        .append(NodeShape.CIRCLE)
        .classed('graph-controller__node', true)
        .attr('id', (d) => `${graphHostId.value + '-node-' + d.id}`)
        .attr('r', (d) => (d.renderedSize as NodeSizeCircle).radius)
        .style('fill', (d) => (d.color ? d.color : ''))

    //shape rect
    nodeContainerGroup
        .filter((d) => d.props.shape === NodeShape.RECTANGLE)
        .append(NodeShape.RECTANGLE)
        .classed('graph-controller__node', true)
        .attr('id', (d) => `${graphHostId.value + '-node-' + d.id}`)
        .attr('width', (d) => (d.renderedSize as NodeSizeRect).width)
        .attr('height', (d) => (d.renderedSize as NodeSizeRect).height)
        .attr('x', (d) => -0.5 * (d.renderedSize as NodeSizeRect).width)
        .attr('y', (d) => -0.5 * (d.renderedSize as NodeSizeRect).height)
        .attr('rx', (d) => (d.props as NodeRect).cornerRadius)
        .attr('ry', (d) => (d.props as NodeRect).cornerRadius)
        .style('fill', (d) => (d.color ? d.color : ''))

    //label
    const nodeForeignObject = nodeContainerGroup
        .append('foreignObject')
        .classed('graph-controller__node-label-container', true)
        .attr('xmlns', 'http://www.w3.org/2000/svg')

    nodeForeignObject
        .filter((d) => d.props.shape === NodeShape.CIRCLE)
        .attr('width', (d) => 2 * (d.renderedSize as NodeSizeCircle).radius)
        .attr('height', (d) => 2 * (d.renderedSize as NodeSizeCircle).radius)
        .attr('x', (d) => -(d.renderedSize as NodeSizeCircle).radius)
        .attr('y', (d) => -(d.renderedSize as NodeSizeCircle).radius)

    nodeForeignObject
        .filter((d) => d.props.shape === NodeShape.RECTANGLE)
        .attr('width', (d) => (d.renderedSize as NodeSizeRect).width)
        .attr('height', (d) => (d.renderedSize as NodeSizeRect).height)
        .attr('x', (d) => -0.5 * (d.renderedSize as NodeSizeRect).width)
        .attr('y', (d) => -0.5 * (d.renderedSize as NodeSizeRect).height)

    nodeForeignObject
        .append('xhtml:div')
        .on('click', (event: PointerEvent, d: GraphNode) => {
            if (config.isGraphEditableInGUI) {
                onNodeLabelClicked(event, d)
            }
        })
        .on('dblclick', (event: PointerEvent) => {
            //a double click on a label, should not create a new node
            terminate(event)
        })
        .on('pointerenter', (_, d: GraphNode) => onPointerEnterNode(d))
        .on('pointerout', (_, d: GraphNode) => onPointerOutNode(d))

    return nodeContainerGroup
}

/**
 * Updates the size of nodes as well as the size and position of their labels.
 * This is used, when the node's shape does not change (when it changes `_replaceNodeShapeAndLabel` is needed).
 * @param nodeContainerGroup - D3 Selection of the node container
 */
function _updateNodeAndLabelSize(
    nodeContainerGroup: d3.Selection<SVGGElement, GraphNode, any, any>
) {
    //circle
    nodeContainerGroup
        .selectChild('.graph-controller__node')
        .filter((d) => d.props.shape === NodeShape.CIRCLE)
        .attr('r', (d) => (d.renderedSize as NodeSizeCircle).radius)

    //circle label
    nodeContainerGroup
        .filter((d) => d.props.shape === NodeShape.CIRCLE)
        .selectChild('.graph-controller__node-label-container')
        .attr('width', (d) => 2 * (d.renderedSize as NodeCircle).radius)
        .attr('height', (d) => 2 * (d.renderedSize as NodeCircle).radius)
        .attr('x', (d) => -(d.renderedSize as NodeCircle).radius)
        .attr('y', (d) => -(d.renderedSize as NodeCircle).radius)

    //rect
    nodeContainerGroup
        .selectChild('.graph-controller__node')
        .filter((d) => d.props.shape === NodeShape.RECTANGLE)
        .attr('width', (d) => (d.renderedSize as NodeSizeRect).width)
        .attr('height', (d) => (d.renderedSize as NodeSizeRect).height)
        .attr('x', (d) => -0.5 * (d.renderedSize as NodeSizeRect).width)
        .attr('y', (d) => -0.5 * (d.renderedSize as NodeSizeRect).height)
        .attr('rx', (d) => (d.props as NodeRect)?.cornerRadius)
        .attr('ry', (d) => (d.props as NodeRect)?.cornerRadius)

    //rect label
    nodeContainerGroup
        .filter((d) => d.props.shape === NodeShape.RECTANGLE)
        .selectChild('.graph-controller__node-label-container')
        .attr('width', (d) => (d.renderedSize as NodeSizeRect).width)
        .attr('height', (d) => (d.renderedSize as NodeSizeRect).height)
        .attr('x', (d) => -0.5 * (d.renderedSize as NodeSizeRect).width)
        .attr('y', (d) => -0.5 * (d.renderedSize as NodeSizeRect).height)
}

/**
 * Moves the latex link label that was created from MathJax to the correct container.
 *
 * This is necessary since for link labels, normal text and mjx content don't have the same container.
 */
function _handleLinkMathJax() {
    // move link label mathjax to link label mjx container
    linkSelection!
        .selectChild('text')
        .selectChild('textPath')
        .selectChild('mjx-container')
        .each(function (d) {
            const mjxContainer = this as HTMLElement
            const graphLink = d as GraphLink

            const linkLabelMjxContainer = d3
                .select(mjxContainer.parentNode!.parentNode!.parentNode as SVGGElement) // link container
                .selectChild('foreignObject')
                .selectChild('div')
                .attr('class', 'graph-controller__link-label')
                .classed(
                    'hidden',
                    !config.showLinkLabels || (!graphLink.label && !graphLink.labelEditable)
                )
                .node() as HTMLDivElement

            linkLabelMjxContainer.replaceChild(mjxContainer, linkLabelMjxContainer.childNodes[0])
        })

    // if there is no text after moving mathjax
    // we need a placeholder for the textpath
    // to still be able to retrieve the textpath position
    linkSelection!
        .selectChild('text')
        .selectChild('textPath')
        .each(function () {
            const textPathElement = this as SVGTextPathElement

            let hasTextNode = false
            const children = textPathElement.childNodes

            children.forEach((child) => {
                if (child?.nodeType === Node.TEXT_NODE && child?.textContent?.trim() !== '') {
                    hasTextNode = true
                }
            })
            if (!hasTextNode) {
                d3.select(textPathElement)
                    .text('I')
                    .attr('class', 'graph-controller__link-label-placeholder mjx-hidden')
            }
        })

    _updateLinkMjxPosition()
}

/**
 * Updates the position for the link label mathjax container.
 */
function _updateLinkMjxPosition() {
    linkSelection!
        .selectChild('text')
        .selectChild('textPath')
        .each(function () {
            const textPathElement = this as SVGTextPathElement
            const [x, y] = _getTextPathPosition(textPathElement)

            d3.select(textPathElement!.parentNode!.parentNode as SVGGElement) //link container
                .select('foreignObject')
                .attr('x', x)
                .attr('y', y)
        })
}

//endregion

// region onNodePointerDown

/**
 * On a short right click+drag movement a draggable link is created (if outgoing links are allowed on the node),
 * on a right click+hold the node is deleted (if the node is deletable).
 * @param event
 * @param node
 */
function onPointerDownNode(event: PointerEvent, node: GraphNode): void {
    if (event.button === 2 || event.pointerType === 'touch') {
        releaseImplicitPointerCapture(event)

        if (node.allowOutgoingLinks) {
            _onPointerDownCreateDraggableLink(node)
        }

        if (node.deletable) {
            longRightClickTimerNode = setTimeout(() => {
                draggableLinkTargetNode = undefined
                _onPointerDownRenderDeleteAnimationNode(node)
            }, 250)
        }
    }
}

/**
 * Renders an animated, growing outline around the specified node,
 * then triggers the node's deletion after the animation is complete.
 * @param node
 */
function _onPointerDownRenderDeleteAnimationNode(node: GraphNode) {
    let nodeElement = graphHost.value
        .node()!
        .querySelector(`#${graphHostId.value + '-node-' + node.id}`)!
    d3.select(nodeElement).classed('on-deletion', true)

    let nodeContainer = d3.select(nodeElement.parentElement)

    if (node.props.shape === NodeShape.CIRCLE) {
        let arcGenerator = d3
                .arc()
                .outerRadius((node.props as NodeCircle).radius + 4)
                .innerRadius((node.props as NodeCircle).radius),
            startArc = [{ startAngle: 0, endAngle: 0 }]

        let path = nodeContainer
            .append('g')
            .attr('class', 'arc')
            .selectAll('path.arc')
            .data(startArc)

        path.enter()
            .append('path')
            .attr('class', 'arc')
            .style('fill', 'black')
            .style('opacity', 0.7)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attrTween('d', function (d) {
                let end = { startAngle: 0, endAngle: 2 * Math.PI }
                let interpolate = d3.interpolate(d, end)
                return function (t) {
                    //@ts-ignore
                    return arcGenerator(interpolate(t))
                }
            })
            .on('end', () => _onPointerDownDeleteNode(node))
    } else if (node.props.shape === NodeShape.RECTANGLE) {
        const pathData = generateRoundedRectPath(
            (node.renderedSize as NodeSizeRect).width,
            (node.renderedSize as NodeSizeRect).height,
            (node.props as NodeRect).cornerRadius
        )

        let nodePath = nodeContainer
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 4)
            .attr('opacity', '0.7')
            .attr('d', pathData)

        let nodePathLength =
            2 * (node.renderedSize as NodeSizeRect).width +
            2 * (node.renderedSize as NodeSizeRect).height

        nodePath
            .attr('stroke-dasharray', nodePathLength)
            .attr('stroke-dashoffset', nodePathLength)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0)
            .on('end', () => _onPointerDownDeleteNode(node))
    }
}

/**
 * Deletes the given node and triggers the according events.
 * @param node
 */
function _onPointerDownDeleteNode(node: GraphNode): void {
    if (config.isGraphEditableInGUI) {
        let r = graph.value.removeNode(node)
        if (r !== undefined) {
            let [removedNode, removedLinks] = r
            triggerNodeDeleted(removedNode, graphHost.value)
            removedLinks.forEach((link) => {
                triggerLinkDeleted(link, graphHost.value)
            })
            updateCollide(simulation, graph.value, config)
        }
        graphHasNodes.value = graph.value.nodes.length > 0
        _resetDraggableLink()
        restart()
    }
}

/**
 * Creates a draggable link beginning from the node that was clicked.
 * @param node
 */
function _onPointerDownCreateDraggableLink(node: GraphNode): void {
    draggableLinkEnd = [node.x!, node.y!]
    draggableLinkSourceNode = node
    draggableLink!
        .attr('marker-end', `url(#${graphHostId.value}-draggable-link-arrow)`)
        .classed('hidden', false)
        .attr('d', linePath(node, { x: draggableLinkEnd[0], y: draggableLinkEnd[1] }, config))
}

//endregion

//region onPointerUpNode
/**
 * Stops the timer and animation for a long right click (node deletion)
 * and creates a link if the conditions are met.
 * @param event
 * @param node
 */
function onPointerUpNode(event: PointerEvent, node: GraphNode | undefined = undefined): void {
    terminate(event)
    clearTimeout(longRightClickTimerNode)
    if (node) {
        _onPointerUpCancelDeleteAnimationNode(node)
    }

    if (event.pointerType === 'mouse') {
        _onPointerUpCreateLink()
    } else if (
        (event.pointerType === 'touch' || event.pointerType === 'pen') &&
        !isProbablyClick(
            { x: lastPointerDownOnNodePosition.x, y: lastPointerDownOnNodePosition.y },
            { x: event.x, y: event.y }
        )
    ) {
        _onPointerUpCreateLink()
    } else {
        _resetDraggableLink()
    }
}

/**
 * Cancels the delete process and animation for the specified node.
 * @param node
 */
function _onPointerUpCancelDeleteAnimationNode(node: GraphNode) {
    let nodeById = graphHost.value
        .node()!
        .querySelector(`#${graphHostId.value + '-node-' + node.id}`)!
    let nodeElement = d3.select(nodeById)
    let nodeContainer = d3.select(nodeById.parentElement)

    if (node.props.shape === NodeShape.CIRCLE) {
        nodeElement.classed('on-deletion', false)
        nodeContainer.select('g.arc').select('path.arc').interrupt().remove()
        nodeContainer.select('g.arc').remove()
    } else if (node.props.shape === NodeShape.RECTANGLE) {
        if (nodeElement.classed('on-deletion')) {
            let nodePath = nodeContainer.select('path')
            nodePath
                .attr('stroke-dasharray', 2 * node.props.width + 2 * node.props.height)
                .attr('stroke-dashoffset', 0)
                .transition()
                .attr('stroke-dashoffset', 2 * node.props.width + 2 * node.props.height)
                .on('end', () => {
                    nodeContainer.select('path').remove()
                })
        }

        nodeElement.classed('on-deletion', false)
    }
}

/**
 * Creates a link, from source to target node if both nodes are defined.
 */
function _onPointerUpCreateLink(): void {
    const source = draggableLinkSourceNode
    const target = draggableLinkTargetNode
    _resetDraggableLink()
    if (source === undefined || target === undefined) {
        return
    }
    createLink(source, target)
}

//endregion

/**
 * Updates the position of the draggable link.
 * @param event
 */
function onPointerMovedBeginningFromNode(event: PointerEvent): void {
    terminate(event)
    if (draggableLinkSourceNode !== undefined) {
        const pointer = d3.pointers(event, graphHost.value!.node())[0]
        draggableLinkEnd = [(pointer[0] - xOffset) / scale, (pointer[1] - yOffset) / scale]
        _updateDraggableLinkPath()
    }
}

/**
 * Sets the entered node as a target node for the draggable link if the node allows incoming links.
 * @param node
 */
function onPointerEnterNode(node: GraphNode) {
    if (node.allowIncomingLinks) {
        draggableLinkTargetNode = node
    }
}

/**
 * Clears the timeout for long right click on node, cancels the delete animation
 * and unsets the target node for the draggable link.
 * @param node
 */
function onPointerOutNode(node: GraphNode | undefined) {
    if (node) {
        _onPointerUpCancelDeleteAnimationNode(node)
    }
    draggableLinkTargetNode = undefined
    clearTimeout(longRightClickTimerNode)
}

//region pointer link

/**
 * Clears the timeout for long right click on link
 * @param event
 */
function onPointerOutLink(event: PointerEvent) {
    terminate(event)
    clearTimeout(longRightClickTimerLink)
}

/**
 * Clears the timeout for long right click on link
 * and cancels the link deletion and the respective animation if the link is deletable.
 */
function onPointerUpLink(event: PointerEvent, link: GraphLink) {
    terminate(event)
    clearTimeout(longRightClickTimerLink)

    if (event.button === 2 || event.pointerType === 'touch') {
        if (link.deletable) {
            _onPointerUpCancelDeleteAnimationLink(link)
        }
    }
}

/**
 * If the link is deletable, deletes the given link after showing the delete animation and triggers the according events.
 * @param event
 * @param link
 */
function onPointerDownDeleteLink(event: PointerEvent, link: GraphLink): void {
    if (event.button === 2 || event.pointerType === 'touch') {
        releaseImplicitPointerCapture(event)

        if (link.deletable) {
            longRightClickTimerLink = setTimeout(() => {
                _onPointerDownRenderDeleteAnimationLink(link)
            }, 250)
        }
    }
}

/**
 * Renders the delete animation for the link
 * and deletes it after the animation is finished.
 * @param link
 */
function _onPointerDownRenderDeleteAnimationLink(link: GraphLink) {
    let linkElement = graphHost.value
        .node()!
        .querySelector(`#${graphHostId.value + '-link-' + link.id}`)

    d3.select(linkElement).classed('on-deletion', true)

    if (linkElement instanceof SVGPathElement) {
        let linkPath = d3.select(linkElement),
            pathLength = linkElement.getTotalLength(),
            textPath = linkElement.parentElement!.querySelector('text'),
            isReverse = Array.from(textPath!.classList).some((className) =>
                className.includes('reverse')
            )

        let initialOffset = 0,
            finalOffset = isReverse ? pathLength : -pathLength

        linkPath
            .attr('stroke-dasharray', pathLength)
            .attr('stroke-dashoffset', initialOffset)
            .transition()
            .duration(750)
            .attr('stroke-dashoffset', finalOffset)
            .on('end', () => _onPointerDownDeleteLink(link))
    }
}

/**
 * Deletes the link and removes not needed color markers.
 * @param link
 */
function _onPointerDownDeleteLink(link: GraphLink): void {
    let color = link.color
    if (config.isGraphEditableInGUI) {
        let removedLink = graph.value.removeLink(link)
        if (removedLink !== undefined) {
            triggerLinkDeleted(removedLink, graphHost.value)
        }
        if (color) {
            if (!graph.value.hasNonDefaultLinkColor(color)) {
                deleteLinkMarkerColored(canvas!, graphHostId.value, color)
            }
        }
    }
    restart()
}

/**
 * Cancels the delete process and animation for the specified link if it is on deletion.
 * @param link
 */
function _onPointerUpCancelDeleteAnimationLink(link: GraphLink) {
    let linkElement = graphHost.value
        .node()!
        .querySelector(`#${graphHostId.value + '-link-' + link.id}`)

    if (d3.select(linkElement).classed('on-deletion')) {
        if (linkElement instanceof SVGPathElement) {
            let linkPath = d3.select(linkElement),
                pathLength = linkElement.getTotalLength()

            linkPath
                .attr('stroke-dasharray', pathLength)
                .attr('stroke-dashoffset', pathLength)
                .transition()
                .attr('stroke-dashoffset', 0)
                .on('end', () => {
                    linkPath.attr('stroke-dasharray', null).attr('stroke-dashoffset', null)
                })
        }
    }

    d3.select(linkElement).classed('on-deletion', false)
}

//endregion

// region labels

/**
 * Handles the input for the nodes label, if it is editable.
 * @param event
 * @param node
 */
function onNodeLabelClicked(event: PointerEvent, node: GraphNode): void {
    terminate(event)
    if (node.labelEditable) {
        handleInputForLabel(node, [node.x!, node.y!])
    }
}

/**
 * Handles the input for the link label, if it is editable.
 * @param event
 * @param link
 */
function onLinkLabelClicked(event: PointerEvent, link: GraphLink): void {
    if (link.labelEditable) {
        let eventTarget = event.target as Element
        let textPathElement

        if (eventTarget.nodeName === 'textPath') {
            textPathElement = eventTarget as SVGTextPathElement
        } else {
            const linkContainer = eventTarget.closest('.graph-controller__link-container')
            textPathElement = linkContainer!.querySelector('textPath') as SVGTextPathElement
        }

        let position = _getTextPathPosition(textPathElement)
        handleInputForLabel(link, position)
    }
}

/**
 * Handles the input for node and link labels.
 *
 * @param element
 * @param position
 */
function handleInputForLabel(element: GraphNode | GraphLink, position: [number, number]) {
    let elementType = element instanceof GraphNode ? 'node' : 'link'

    // create input
    const input = document.createElement('input')
    input.setAttribute('class', 'graph-controller__label-input')
    input.setAttribute('id', `${elementType}-label-input-field`)
    element.label == undefined ? (input.value = '') : (input.value = element.label)
    input.placeholder = `Enter ${elementType} label`

    // append input to foreign object
    const foreignObj = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    foreignObj.setAttribute('width', '100%')
    foreignObj.setAttribute('height', '100%')
    foreignObj.setAttribute('x', `${position[0]! - 90}`)
    foreignObj.setAttribute('y', `${position[1]! - 12}`)
    foreignObj.append(input)

    // append foreign object
    graphHost.value.select<SVGElement>('svg').select<SVGGElement>('g').node()!.append(foreignObj)
    input.focus()

    if (platformType !== 'desktop') {
        isVirtualKeyboardProbablyOpen = true
    }

    //event handling
    input.ondblclick = function (e) {
        //double-click on the input should not create a new node
        terminate(e)
    }
    let pressedEnter = false
    input.onkeyup = function (e) {
        if (e.key === 'Enter') {
            pressedEnter = true
            input.blur()
        } else if (e.key === 'Escape') {
            input.value = ''
            input.blur()
        }
    }
    input.onblur = function () {
        if (pressedEnter) {
            _updateLabel(element, input.value.trim())
        }
        foreignObj.remove()

        if (platformType !== 'desktop') {
            isVirtualKeyboardProbablyOpen = false
        }
    }
}

/**
 * Updates the label of the element as well as the view and triggers the labeledited event
 * @param element - graph node or link
 * @param label - new label
 */
function _updateLabel(element: GraphNode | GraphLink, label: string) {
    triggerLabelEdited(element, label, graphHost.value)

    element.label = label
    restart()

    let elementType = element instanceof GraphNode ? 'node' : 'link'
    if (elementType === 'link') {
        _handleLinkMjxContainer(element as GraphLink)
    } else if (elementType === 'node' && label !== '') {
        _redrawNodeContainer(element as GraphNode)
    }
}

/**
 * Removes the link labels current mjx container.
 *
 * This is necessary during input of a new link label, since for link labels,
 * mjx and normal text content don't have the same textContainingElement,
 * so the old mjx-container needs to be removed separately.
 * @param link
 */
function _handleLinkMjxContainer(link: GraphLink) {
    const linkContainer = graphHost.value
        .node()!
        .querySelector<SVGTextPathElement>(
            `#${graphHostId.value + '-link-' + link.id}`
        )!.parentElement

    linkContainer!.querySelector('mjx-container')?.remove()

    linkContainer!
        .querySelector('div')!
        .setAttribute('class', 'graph-controller__link-label-placeholder')

    restart()
}

/**
 * Redraw the node container.
 *
 * This is necessary for node labels that are larger than the node, ensuring they fully appear above the node circle.
 * @param node
 */
function _redrawNodeContainer(node: GraphNode) {
    const nodeContainer = graphHost.value
        .node()!
        .querySelector<SVGGElement>(`#${graphHostId.value + '-node-' + node.id}`)!.parentElement

    if (nodeContainer) {
        const nodeContainerParent = nodeContainer!.parentElement
        nodeContainer!.remove()
        nodeContainerParent!.append(nodeContainer)
    }
}

function _getTextPathPosition(textPathElement: SVGTextPathElement): [number, number] {
    let rectSvg = graphHost.value.select<SVGElement>('svg')!.node()!.getBoundingClientRect()
    let rectTextPath = textPathElement.getBoundingClientRect()
    let x = (rectTextPath.x - rectSvg.x - xOffset) / scale
    let y = (rectTextPath.y - rectSvg.y - yOffset) / scale
    return [x, y]
}

function _resetDraggableLink(): void {
    draggableLink?.classed('hidden', true).attr('marker-end', 'null')
    draggableLinkSourceNode = undefined
    draggableLinkTargetNode = undefined
    draggableLinkEnd = undefined
}

// endregion

/**
 * Handles the graph import: Parses the provided content (TGF or JSON)
 * and displays it in the graph component.
 *
 * @param importContent - The graph data to import, either as a TGF string or a JSON object.*/
function _onHandleGraphImport(importContent: string | jsonGraph) {
    let nodes, links
    try {
        if (typeof importContent === 'string') {
            ;[nodes, links] = parseTGF(importContent)
        } else if (typeof importContent === 'object') {
            ;[nodes, links] = parseJSONGraph(importContent)
        } else {
            showError('Invalid graph import type:', 'Must either be TGF or JSON.')
            return
        }
    } catch (e) {
        showError('Error during parsing:', 'Invalid data format:' + '\n' + e)
        return
    }

    _resetGraph()
    _parseToGraph(nodes, links)
}

/**
 * Renders the parsed nodes and links within the graph component.
 * @param nodes - parsed nodes
 * @param links - parsed links
 */
function _parseToGraph(nodes: parsedNode[], links: parsedLink[]) {
    for (let parsedNode of nodes) {
        createNode(
            parsedNode.props ?? config.nodeProps,
            parsedNode.x,
            parsedNode.y,
            parsedNode.idImported,
            parsedNode.label,
            parsedNode.color,
            parsedNode.fixedPosition,
            parsedNode.deletable,
            parsedNode.labelEditable,
            parsedNode.allowIncomingLinks,
            parsedNode.allowOutgoingLinks
        )
    }
    const findNodeByImportedId = (importedId: number | string) =>
        graph.value.nodes.find((node) => node.idImported === importedId)

    for (let parsedLink of links) {
        let srcNode = findNodeByImportedId(parsedLink.sourceIdImported)
        let targetNode = findNodeByImportedId(parsedLink.targetIdImported)
        if (srcNode && targetNode) {
            createLink(
                srcNode,
                targetNode,
                parsedLink.label,
                parsedLink.color,
                parsedLink.deletable,
                parsedLink.labelEditable
            )
            if (parsedLink.color) {
                createLinkMarkerColored(canvas!, graphHostId.value, config, parsedLink.color)
            }
        }
    }
}

/**
 Checks the links that will change color and deletes colored link markers that are then not needed anymore
 @params idArrayOfLinkColorToChanged - links that will change color
 */
function _deleteNotNeededColorMarker(idsOfLinkColorToChange: string[]) {
    for (let id of idsOfLinkColorToChange) {
        const currentColorOfLink = graph.value.links
            .filter((link) => link.id === id)
            .map((link) => link.color)
            .shift()

        if (currentColorOfLink) {
            //the color of the link we are about to change doesn't exist on another link -> marker can be deleted
            if (!graph.value.hasNonDefaultLinkColor(currentColorOfLink, id)) {
                deleteLinkMarkerColored(canvas!, graphHostId.value, currentColorOfLink)
            }
            //the link color we are about to change exists in other links
            else {
                //check if this other links will also have a color change (then the marker for this color can be deleted)
                const linkIdsWithColorToChange = graph.value.getLinkIdsWithNonDefaultLinkColors(
                    currentColorOfLink,
                    id
                )
                let canBeDeleted = linkIdsWithColorToChange.every((linkId) =>
                    idsOfLinkColorToChange.includes(linkId)
                )
                if (canBeDeleted) {
                    deleteLinkMarkerColored(canvas!, graphHostId.value, currentColorOfLink)
                }
            }
        }
    }
}

function resetView(): void {
    simulation.stop()
    graphHost.value!.selectChildren().remove()
    zoom = undefined
    xOffset = 0
    yOffset = 0
    scale = 1
    canvas = undefined
    draggableLink = undefined
    linkSelection = undefined
    nodeSelection = undefined
    simulation = undefined
    _resetDraggableLink()
    initData()
}

function handleWindowResize() {
    if (!config.isCanvasBoundToView) {
        return
    }
    // Do not resize view when triggered by the appearance of the on-screen keyboard on touch devices
    // Detection of whether the keyboard is truly open may not be 100% accurate.
    if (isVirtualKeyboardProbablyOpen) {
        return
    }
    resetView()
}

function _resetGraph(): void {
    graph.value.links.forEach((link) => triggerLinkDeleted(link, graphHost.value))
    graph.value.nodes.forEach((node) => triggerNodeDeleted(node, graphHost.value))
    graph.value = new Graph()
    graphHasNodes.value = false
    resetView()
}
</script>

<template>
    <div class="graph-controller__graph-host uninitialised" />
    <div v-show="!graphHasNodes">
        <graph-controls
            class="graph-controller__info-text-background"
            show-controls-graph
            :show-latex-info="true"
            :show-controls-environment="false"
            :show-header="true"
            :platform-type="platformType"
        ></graph-controls>
    </div>
</template>

<style lang="scss">
.graph-controller__graph-host {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    background-color: lightgrey;
}

.graph-controller__graph-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

.graph-controller__link {
    stroke: #004c97;
    stroke-width: 4px;
    fill: none;

    &.hidden {
        stroke-width: 0;
    }

    &.draggable {
        stroke: #007dae;
        stroke-dasharray: 8px 2px;
        pointer-events: none;
    }
}

.graph-controller__link-click-box {
    stroke: rgba($color: #000, $alpha: 0);
    stroke-width: 16px;
    fill: none;
    cursor: pointer;
}

.graph-controller__arrow {
    fill: #004c97;

    &.draggable {
        fill: #007dae;
    }
}

.graph-controller__line-path-text,
.graph-controller__arc-path-text,
.graph-controller__line-reverse-path-text,
.graph-controller__arc-reverse-path-text,
.graph-controller__reflexive-path-text,
.graph-controller__link-label-mathjax-container {
    text-anchor: middle;
    pointer-events: all;
    cursor: text;
    opacity: 1;
    stroke: none;

    .graph-controller__link-label {
        fill: black;
        font-family: sans-serif;
        font-size: 1rem;
        stroke: none;

        &.hidden {
            visibility: hidden;
            cursor: pointer;
            pointer-events: none;
        }

        &.not-editable {
            cursor: pointer;
        }
    }

    .graph-controller__link-label-placeholder {
        fill: dimgrey;
        font-family: sans-serif;
        font-size: 0.85rem;
        font-style: oblique;

        &.hidden {
            visibility: hidden;
            cursor: pointer;
            pointer-events: none;
        }

        &.not-editable {
            cursor: pointer;
        }

        &.mjx-hidden {
            visibility: hidden;
            cursor: pointer;
            pointer-events: none;
        }
    }
}

.graph-controller__node {
    fill: #eb9850;
    stroke: none;
    cursor: pointer;

    &:not(.on-deletion):hover {
        stroke: #006597;
        stroke-dasharray: (8, 3);
        stroke-width: 2;
        filter: grayscale(30%);
    }
}

.graph-controller__link-label-mathjax-container {
    overflow: visible;
    cursor: text;
}

.graph-controller__node-label-container {
    overflow: visible;
    cursor: pointer;
}

.graph-controller__node-label {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    pointer-events: all;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;

    &.controls-node-size {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: inline-block;
        text-align: center;
        width: auto;
        height: auto;
        padding: 4px 8px;
        white-space: nowrap;
    }

    &.hidden {
        visibility: hidden;
        cursor: pointer;
        pointer-events: none;
    }

    &.not-editable {
        cursor: pointer;
    }
}

.graph-controller__node-label-placeholder {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    pointer-events: all;
    font-family: sans-serif;
    font-style: oblique;
    font-size: 0.85rem;
    color: dimgrey;
    cursor: pointer;

    &.hidden {
        visibility: hidden;
        cursor: pointer;
        pointer-events: none;
    }

    &.not-editable {
        cursor: pointer;
    }
}

.graph-controller__label-input {
    background-color: rgba(255, 255, 255, 0.9);
}

.graph-controller__info-text-background {
    color: lightgrey;
    font-family: sans-serif;
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}

[class^='graph-controller']:not(input):not(.selectable) {
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    user-select: none !important;
}
</style>
