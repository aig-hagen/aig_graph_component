<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
//component
import GraphControls from '@/components/GraphControls.vue'
//d3
import * as d3 from 'd3'
import { createDrag, type Drag } from '@/d3/drag'
import { type Canvas, createCanvas } from '@/d3/canvas'
import { createLinks, type LinkSelection } from '@/d3/link'
import { createNodes, type NodeSelection } from '@/d3/node'
import { createLinkMarkerColored, deleteLinkMarkerColored, initMarkers } from '@/d3/markers'
import { createDraggableLink, type DraggableLink } from '@/d3/draggable-link'
import { createSimulation, setFixedLinkDistance, setNodeChargeAndAttraction } from '@/d3/simulation'
import { linePath, paddedArcPath, paddedLinePath, paddedReflexivePath } from '@/d3/paths'
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
import { PathType } from '@/model/path-type'
import { GraphConfigDefault } from '@/model/config'
import {
    checkForNotValidKeys,
    escapeColor,
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
//@ts-ignore
import svgPathReverse from 'svg-path-reverse'
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

onBeforeMount(() => {
    initFromLocalStorage()
})

onMounted(() => {
    initData()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const browser = Bowser.getParser(window.navigator.userAgent)
const platformType = browser.getPlatformType(true)

/* Set to true, when the label input fields opens and to false when it blurs
 * -> this may not be accurate for all cases. */
let isVirtualKeyboardProbablyOpen = false

const graph = ref(new Graph())
const graphHasNodes = ref(false)
const config = reactive(new GraphConfigDefault())
let simulation: any = undefined
let width: number = 400
let height: number = 400
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

//exposing for cli functionality
defineExpose({
    getGraph,
    setGraph,
    printGraph,
    setNodeColor,
    setLinkColor,
    deleteNode,
    deleteLink,
    setNodeRadius,
    setDeletable,
    setLabelEditable,
    setNodesLinkPermission,
    setNodesFixedPosition,
    setNodeEditability,
    setLinkEditability,
    toggleNodeLabels,
    toggleLinkLabels,
    toggleNodePhysics,
    toggleFixedLinkDistance,
    toggleGraphEditingInGUI
})

//region functions that are solely used as exposed ones
function getGraph(
    format: string = 'json',
    includeColor: boolean = true,
    includePosition: boolean = true,
    includeEditability: boolean = true
) {
    if (format.toLowerCase() === 'json') {
        return JSON.parse(
            graph.value.toJSON(
                config.showLinkLabels,
                config.showLinkLabels,
                includeColor,
                includeColor,
                includePosition,
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
    includeColor: boolean = true,
    includePosition: boolean = true,
    includeEditability: boolean = true
) {
    if (format.toLowerCase() === 'json') {
        console.log(
            graph.value.toJSON(
                config.showLinkLabels,
                config.showLinkLabels,
                includeColor,
                includeColor,
                includePosition,
                includeEditability,
                includeEditability
            )
        )
    } else {
        console.log(graph.value.toTGF(config.showNodeLabels, config.showLinkLabels))
    }
}

function setNodeColor(color: string, ids: string[] | number[] | string | number | undefined) {
    if (ids !== undefined) {
        const idStringArray = Array.isArray(ids) ? ids : [ids]
        const idArray = idStringArray.map(Number)
        for (const id of idArray) {
            nodeSelection!
                .selectAll<SVGCircleElement, GraphNode>('circle')
                .filter((d) => d.id === id)
                .each((d) => (d.color = color))
                .style('fill', color)
        }
    } else {
        //if no ids are provided, the color is set for all currently existing nodes
        nodeSelection!
            .selectAll<SVGCircleElement, GraphNode>('circle')
            .each((d) => (d.color = color))
            .style('fill', color)
    }
}

function setLinkColor(color: string, ids: string[] | string | undefined) {
    if (ids) {
        const idArray = Array.isArray(ids) ? ids : [ids]

        _deleteNotNeededColorMarker(idArray)

        for (const id of idArray) {
            linkSelection!
                .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
                .filter((d) => d.id === id)
                .each((d) => (d.color = color))
                .style('stroke', color)
        }
    } else {
        //if no ids are provided, the color is set for all currently existing links
        _deleteNotNeededColorMarker(graph.value.links.map((link) => link.id))

        linkSelection!
            .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
            .each((d) => (d.color = color))
            .style('stroke', color)
    }

    createLinkMarkerColored(canvas!, graphHostId.value, config, color)
}

function deleteNode(ids: number[] | number) {
    const idArray = Array.isArray(ids) ? ids : [ids]
    for (const id of idArray) {
        nodeSelection!
            .selectAll<SVGCircleElement, GraphNode>('circle')
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
    graphHasNodes.value = graph.value.nodes.length > 0
}

function deleteLink(ids: string[] | string) {
    const idArray = Array.isArray(ids) ? ids : [ids]
    for (const id of idArray) {
        linkSelection!
            .selectAll<SVGPathElement, GraphLink>('path')
            .filter((d) => d.id === id)
            .each(function (d) {
                let removedLink = graph.value.removeLink(d)
                if (removedLink !== undefined) {
                    triggerLinkDeleted(removedLink, graphHost.value)
                }
            })
    }
}

function setNodeRadius(radius: number) {
    if (radius > 0) {
        config.nodeRadius = radius
        resetView()
    } else {
        showError('Invalid Radius', 'The radius should be greater than zero.')
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

function setNodeEditability(
    editability: NodeGUIEditability,
    ids: string[] | number[] | string | number | undefined
) {
    if (ids !== undefined) {
        const idStringArray = Array.isArray(ids) ? ids : [ids]
        const idArray = idStringArray.map(Number)
        for (const id of idArray) {
            nodeSelection!
                .selectAll<SVGCircleElement, GraphNode>('circle')
                .filter((d) => d.id === id)
                .each(function (d) {
                    setAndValFixedNodePosition(d, editability.fixedPosition)
                    d.deletable = editability.deletable ?? d.deletable
                    d.labelEditable = editability.labelEditable ?? d.labelEditable
                    d.allowIncomingLinks = editability.allowIncomingLinks ?? d.allowIncomingLinks
                    d.allowOutgoingLinks = editability.allowOutgoingLinks ?? d.allowOutgoingLinks
                })
        }
    } else {
        //if no ids are provided, the editability is set for all currently existing nodes
        nodeSelection!.selectAll<SVGCircleElement, GraphNode>('circle').each(function (d) {
            setAndValFixedNodePosition(d, editability.fixedPosition)
            d.deletable = editability.deletable ?? d.deletable
            d.labelEditable = editability.labelEditable ?? d.labelEditable
            d.allowIncomingLinks = editability.allowIncomingLinks ?? d.allowIncomingLinks
            d.allowOutgoingLinks = editability.allowOutgoingLinks ?? d.allowOutgoingLinks
        })
    }

    checkForNotValidKeys(
        ['fixedPosition', 'deletable', 'labelEditable', 'allowIncomingLinks', 'allowOutgoingLinks'],
        Object.keys(editability),
        true
    )
}

function setLinkEditability(editability: LinkGUIEditability, ids: string[] | string | undefined) {
    if (ids) {
        const idArray = Array.isArray(ids) ? ids : [ids]
        for (const id of idArray) {
            linkSelection!
                .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
                .filter((d) => d.id === id)
                .each(function (d) {
                    d.deletable = editability.deletable ?? d.deletable
                    d.labelEditable = editability.labelEditable ?? d.labelEditable
                })
        }
    } else {
        linkSelection!
            .selectAll<SVGPathElement, GraphLink>('.graph-controller__link')
            .each(function (d) {
                d.deletable = editability.deletable ?? d.deletable
                d.labelEditable = editability.labelEditable ?? d.labelEditable
            })
    }

    checkForNotValidKeys(['deletable', 'labelEditable'], Object.keys(editability), true)
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
function toggleGraphEditingInGUI(isEnabled: boolean) {
    config.isGraphEditableInGUI = isEnabled
}

//endregion

/**
 * Inits the graph configuration with the settings from the local storage.
 */
function initFromLocalStorage() {
    const stringToBoolean = (text: string) => (text === 'false' ? false : !!text)

    //config
    if (localStorage.showNodeLabels) {
        config.showNodeLabels = stringToBoolean(localStorage.showNodeLabels)
    }
    if (localStorage.enableNodePhysics) {
        config.nodePhysicsEnabled = stringToBoolean(localStorage.enableNodePhysics)
    }
    if (localStorage.showLinkLabels) {
        config.showLinkLabels = stringToBoolean(localStorage.showLinkLabels)
    }
    if (localStorage.enableFixedLinkDistance) {
        config.fixedLinkDistanceEnabled = stringToBoolean(localStorage.enableFixedLinkDistance)
    }

    if (localStorage.persistSettings) {
        config.persistSettingsLocalStorage = stringToBoolean(localStorage.persistSettings)
    }
}

function initData() {
    width = graphHost.value.node()!.clientWidth
    height = graphHost.value.node()!.clientHeight
    canvas = createCanvas(
        graphHost.value!,
        (event) => (config.isGraphEditableInGUI ? onPointerMovedBeginningFromNode(event) : null),
        (event) => (config.isGraphEditableInGUI ? onPointerUpNode(event) : null),
        (event) => {
            if (config.isGraphEditableInGUI) {
                createNode(
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
    drag = createDrag(simulation, width, height, config.nodeRadius)
    restart()
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
    graphHasNodes.value = true
    restart()
}

function onTick(): void {
    nodeSelection!.attr('transform', (d) => `translate(${d.x},${d.y})`)

    linkSelection!
        .selectAll<SVGPathElement, GraphLink>('path')
        .attr('d', (d: GraphLink) => generatePath(d))

    updateDraggableLinkPath()
    restart()
}
function generatePath(d: GraphLink): string {
    setPath(d)

    switch (d.pathType) {
        case PathType.REFLEXIVE: {
            return paddedReflexivePath(d.source, [width / 2, height / 2], config)
        }
        case PathType.ARC: {
            return paddedArcPath(d.source, d.target, config)
        }
        case PathType.ARCREVERSE: {
            return svgPathReverse.reverse(paddedArcPath(d.source, d.target, config))
        }
        case PathType.LINE: {
            return paddedLinePath(d.source, d.target, config)
        }
        case PathType.LINEREVERSE: {
            return svgPathReverse.reverse(paddedLinePath(d.source, d.target, config))
        }
        default: {
            return '' //should never be reached
        }
    }
}
function setPath(d: GraphLink) {
    if (d.source.id === d.target.id) {
        d.pathType = PathType.REFLEXIVE
    } else if (isBidirectional(d.source, d.target)) {
        d.pathType = needsReversion(d.source, d.target) ? PathType.ARCREVERSE : PathType.ARC
    } else {
        d.pathType = needsReversion(d.source, d.target) ? PathType.LINEREVERSE : PathType.LINE
    }
}
function isBidirectional(source: GraphNode, target: GraphNode): boolean {
    return (
        source.id !== target.id &&
        graph.value.links.some((l) => l.target.id === source.id && l.source.id === target.id) &&
        graph.value.links.some((l) => l.target.id === target.id && l.source.id === source.id)
    )
}
function needsReversion(source: GraphNode, target: GraphNode): boolean {
    return source.x! > target.x!
}
function updateDraggableLinkPath(): void {
    const source = draggableLinkSourceNode
    if (source !== undefined) {
        const target = draggableLinkTargetNode
        if (target !== undefined) {
            draggableLink!.attr('d', () => {
                if (source.id === target.id) {
                    return paddedReflexivePath(source, [width / 2, height / 2], config)
                } else if (isBidirectional(source, target)) {
                    return paddedLinePath(source, target, config)
                } else {
                    return paddedArcPath(source, target, config)
                }
            })
        } else if (draggableLinkEnd !== undefined) {
            const from: [number, number] = [source.x!, source.y!]
            draggableLink!.attr('d', linePath(from, draggableLinkEnd))
        }
    }
}
function restart(alpha: number = 0.5): void {
    linkSelection = linkSelection!
        .data(graph.value.links, (d: GraphLink) => d.id)
        .join(
            (enter) => {
                const linkGroup = enter
                    .append('g')
                    .classed('graph-controller__link-container', true)
                linkGroup
                    .append('path')
                    .classed('graph-controller__link', true)
                    .style('stroke', (d) => (d.color ? d.color : ''))
                    .attr('id', (d) => graphHostId.value + '-link-' + d.id)
                    .attr('marker-end', (d) =>
                        d.color
                            ? `url(#${graphHostId.value}-link-arrow-` + d.color
                            : `url(#${graphHostId.value}-link-arrow)`
                    )
                linkGroup
                    .append('path')
                    .classed('graph-controller__click-box', true)
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
                    .append('textPath')
                    .attr('class', (d: GraphLink) =>
                        d.label
                            ? 'graph-controller__link-label'
                            : 'graph-controller__link-label-placeholder'
                    )
                    .attr('href', (d) => `#${graphHostId.value + '-link-' + d.id}`)
                    .attr('startOffset', '50%')
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
                            `<div class=${d.label ? 'graph-controller__link-label' : 'graph-controller__link-label-placeholder'}>
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
            },
            (update) => {
                update
                    .selectChild('path')
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

                // text positioning depending on path type
                update
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

                update
                    .selectChild('text')
                    .selectChild('textPath')
                    .classed(
                        'hidden',
                        (d) => !config.showLinkLabels || (!d.label && !d.labelEditable)
                    )
                    .classed('not-editable', !config.isGraphEditableInGUI)
                    .attr('startOffset', (d) => {
                        if (d.pathType?.includes('REVERSE')) {
                            return '46%'
                        } else {
                            return '50%'
                        }
                    })

                // move mathjax to link label mjx container
                update
                    .selectChild('text')
                    .selectChild('textPath')
                    .selectChild('mjx-container')
                    .each(function (d) {
                        const graphLink = d as GraphLink
                        const linkLabelMjxContainer = d3
                            .select(
                                (this! as HTMLElement).parentNode!.parentNode!
                                    .parentNode as SVGGElement
                            )
                            .selectChild('foreignObject')
                            .selectChild('div')
                            .attr('class', 'graph-controller__link-label')
                            .classed(
                                'hidden',
                                !config.showLinkLabels ||
                                    (!graphLink.label && !graphLink.labelEditable)
                            )
                            .node() as HTMLDivElement

                        const mjxContainer = d3.select(this!).remove().node() as HTMLElement

                        linkLabelMjxContainer?.appendChild(mjxContainer)
                    })

                // if there is no text after moving mathjax
                // we need a placeholder for the textpath
                // to still be able to retrieve the textpath position
                update
                    .selectChild('text')
                    .selectChild('textPath')
                    .each(function () {
                        const textPathElement = this as SVGTextPathElement

                        let hasTextNode = false
                        const children = textPathElement.childNodes

                        children.forEach((child) => {
                            if (
                                child?.nodeType === Node.TEXT_NODE &&
                                child?.textContent?.trim() !== ''
                            ) {
                                hasTextNode = true
                            }
                        })
                        if (!hasTextNode) {
                            d3.select(textPathElement)
                                .text('I')
                                .attr(
                                    'class',
                                    'graph-controller__link-label-placeholder mjx-hidden'
                                )
                        }
                    })

                // setting position for mathjax label
                update
                    .selectChild('text')
                    .selectChild('textPath')
                    .each(function () {
                        const textPathElement = this as SVGTextPathElement
                        const [x, y] = _getTextPathPosition(textPathElement)

                        //@ts-ignore
                        d3.select(textPathElement.parentNode.parentNode)
                            .select('foreignObject')
                            .attr('x', x)
                            .attr('y', y)
                    })

                return update
            }
        )

    nodeSelection = nodeSelection!
        .data(graph.value.nodes, (d) => d.id)
        .join(
            (enter) => {
                const nodeGroup = enter
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
                        if (config.isGraphEditableInGUI) {
                            onPointerDownNode(event, d)
                        }
                    })
                    .on('pointerup', (event: PointerEvent, d: GraphNode) => {
                        if (config.isGraphEditableInGUI) {
                            onPointerUpNode(event, d)
                        }
                    })
                nodeGroup
                    .append('circle')
                    .classed('graph-controller__node', true)
                    .attr('id', (d) => `${graphHostId.value + '-node-' + d.id}`)
                    .attr('r', config.nodeRadius)
                    .style('fill', (d) => (d.color ? d.color : ''))

                nodeGroup
                    .append('foreignObject')
                    .classed('graph-controller__node-label-container', true)
                    .attr('xmlns', 'http://www.w3.org/2000/svg')
                    .attr('width', 2 * config.nodeRadius)
                    .attr('height', 2 * config.nodeRadius)
                    .attr('x', -config.nodeRadius)
                    .attr('y', -config.nodeRadius)
                    .html(
                        (d: GraphNode) =>
                            `<div class=${d.label ? 'graph-controller__node-label' : 'graph-controller__node-label-placeholder'}>
                                ${d.label ? d.label : 'add label'}
                         </div>`
                    )
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

                return nodeGroup
            },
            (update) => {
                update.selectChild('circle').attr('r', config.nodeRadius)

                update
                    .selectChild('foreignObject')
                    .selectChild('div')
                    .classed(
                        'hidden',
                        (d) => !config.showNodeLabels || (!d.label && !d.labelEditable)
                    )
                    .classed('not-editable', !config.isGraphEditableInGUI)

                return update
            }
        )
    //version will only be injected until MathJax is initialized
    if (window.MathJax?.version) {
        window.MathJax.typeset()
    }
    simulation.nodes(graph.value.nodes)
    simulation.alpha(alpha).restart()
}

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
 * Renders a growing circumference around the specified node and
 * triggers node deletion after the animation is complete.
 * @param node
 */
function _onPointerDownRenderDeleteAnimationNode(node: GraphNode) {
    let nodeElement = graphHost.value
        .node()!
        .querySelector(`#${graphHostId.value + '-node-' + node.id}`)!
    d3.select(nodeElement).classed('on-deletion', true)

    let g = d3.select(nodeElement.parentElement)

    //remove previous arc
    g.select('g.arc').remove()

    let arcGenerator = d3
            .arc()
            .outerRadius(config.nodeRadius + 4)
            .innerRadius(config.nodeRadius),
        startArc = [{ startAngle: 0, endAngle: 0 }]

    let path = g.append('g').attr('class', 'arc').selectAll('path.arc').data(startArc)

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
    const coordinates: [number, number] = [node.x!, node.y!]
    draggableLinkEnd = coordinates
    draggableLinkSourceNode = node
    draggableLink!
        .attr('marker-end', `url(#${graphHostId.value}-draggable-link-arrow)`)
        .classed('hidden', false)
        .attr('d', linePath(coordinates, coordinates))
    restart()
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
    _onPointerUpCreateLink()
}

/**
 * Cancels the delete process and animation for the specified node.
 * @param node
 */
function _onPointerUpCancelDeleteAnimationNode(node: GraphNode) {
    let nodeParent = graphHost.value
            .node()!
            .querySelector(`#${graphHostId.value + '-node-' + node.id}`)!.parentElement,
        g = d3.select(nodeParent)

    g.select('circle').classed('on-deletion', false)
    g.select('g.arc').select('path.arc').interrupt().remove()
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
        updateDraggableLinkPath()
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
    if (node.labelEditable) {
        const eventParent = event?.target as Element
        const textElement = eventParent.closest('div') as HTMLDivElement

        handleInputForLabel(node, textElement, [node.x!, node.y!])
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
        handleInputForLabel(link, textPathElement, position)
    }
}

/**
 * Handles the input for node and link labels.
 *
 * @param element
 * @param textContainingElement
 * @param position
 */
function handleInputForLabel(
    element: GraphNode | GraphLink,
    textContainingElement: HTMLDivElement | SVGTextPathElement,
    position: [number, number]
) {
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

    //event handler
    input.ondblclick = function (e) {
        //double-click on the input should not create a new node
        terminate(e)
    }

    let pressedEnter = false

    input.onkeyup = function (e) {
        if (e.key === 'Enter') {
            triggerLabelEdited(element, input.value, graphHost.value)
            pressedEnter = true
            input.blur()
        } else if (e.key === 'Escape') {
            input.value = ''
            input.blur()
        }
    }
    input.onblur = function () {
        if (pressedEnter) {
            if (elementType === 'link') {
                _handleLinkMjxContainer(textContainingElement as SVGTextPathElement)
            }

            if (input.value === '') {
                _unsetLabel(textContainingElement, element, elementType)
            } else {
                _setLabel(input, textContainingElement, element, elementType)

                if (elementType === 'node') {
                    _redrawNodeContainer(textContainingElement as HTMLDivElement)
                }
            }
        }
        foreignObj.remove()

        if (platformType !== 'desktop') {
            isVirtualKeyboardProbablyOpen = false
        }
    }
}

/**
 * Removes the link labels current mjx container.
 *
 * This is necessary during input of a new link label, since for link labels,
 * mjx and normal text content don't have the same textContainingElement,
 * so the old mjx-container needs to be removed separately.
 * @param textContainingElement
 */
function _handleLinkMjxContainer(textContainingElement: SVGTextPathElement) {
    const linkContainer = textContainingElement.closest('.graph-controller__link-container')
    linkContainer!.querySelector('mjx-container')?.remove()
    linkContainer!
        .querySelector('div')!
        .setAttribute('class', 'graph-controller__link-label-placeholder')
}

/**
 * Redraw the node container.
 *
 * This is necessary for node labels that are larger than the node, ensuring they fully appear above the node circle.
 * @param textContainingElement
 */
function _redrawNodeContainer(textContainingElement: HTMLDivElement) {
    let nodeContainer = textContainingElement.closest(
        '.graph-controller__node-container'
    ) as SVGGElement
    const nodeContainerParent = nodeContainer!.parentElement
    nodeContainer!.remove()
    nodeContainerParent!.append(nodeContainer)
}

/**
 * Unsets the label in the elements data structure, changes the respective HTML class and adds a label placeholder
 * @param textContainingElement
 * @param element
 * @param elementType "node" or "link" for the html class name
 */
function _unsetLabel(
    textContainingElement: HTMLDivElement | SVGTextPathElement,
    element: GraphNode | GraphLink,
    elementType: string
) {
    textContainingElement.setAttribute(
        'class',
        `graph-controller__${elementType}-label-placeholder`
    )
    textContainingElement.textContent = 'add label'
    element.label = undefined
}

/**
 * Sets the label in the elements data structure and respective HTML and changes the HTML class
 * @param input
 * @param textContainingElement
 * @param element
 * @param elementType "node" or "link" for the html class name
 */
function _setLabel(
    input: HTMLInputElement,
    textContainingElement: HTMLDivElement | SVGTextPathElement,
    element: GraphNode | GraphLink,
    elementType: string
) {
    textContainingElement.setAttribute('class', `graph-controller__${elementType}-label`)
    textContainingElement.textContent = input.value.trim()
    element.label = textContainingElement.textContent
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
    _parsedToGraph(nodes, links)
}

/**
 * Renders the parsed nodes and links within the graph component.
 * @param nodes - parsed nodes
 * @param links - parsed links
 */
function _parsedToGraph(nodes: parsedNode[], links: parsedLink[]) {
    for (let parsedNode of nodes) {
        createNode(
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
    xOffset = 0
    yOffset = 0
    scale = 1
    canvas = undefined
    draggableLink = undefined
    linkSelection = undefined
    nodeSelection = undefined
    simulation = undefined
    _resetDraggableLink()
    initFromLocalStorage()
    initData()
}

/**
 * Handles window resize, except when triggered by the appearance of the on-screen keyboard on touch devices,
 * though detection of whether the keyboard is truly open may not be 100% accurate.
 */
function handleResize() {
    if (!isVirtualKeyboardProbablyOpen) {
        resetView()
    }
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

.graph-controller__click-box {
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
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    opacity: 1;
    text-align: center;
    pointer-events: all;
    cursor: pointer;
    width: 100%;
    height: 100%;

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
    color: dimgrey;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: oblique;
    font-size: 0.85rem;
    opacity: 1;
    text-align: center;
    pointer-events: all;
    cursor: pointer;
    width: 100%;
    height: 100%;

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
