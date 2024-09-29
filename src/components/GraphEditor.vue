<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
//component
import ImportExport from '@/components/ImportExport.vue'
import GraphHelp from '@/components/GraphHelp.vue'
import GraphSettings, { type Settings } from '@/components/GraphSettings.vue'
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
import { escapeColor } from '@/model/color'
import {
    type jsonGraph,
    type parsedLink,
    type parsedNode,
    parseJSONGraph,
    parseTGF
} from '@/model/parser'
import { GraphNode } from '@/model/graph-node'
import type { GraphLink } from '@/model/graph-link'
//other
//@ts-ignore
import svgPathReverse from 'svg-path-reverse'

const graphHost = computed(() => {
    //this is the case for production mode (one and multiple components)
    const hosts = document.querySelectorAll('graph-editor')

    let graphHost = undefined
    for (let i = 0; i < hosts.length; i++) {
        const hostElement = hosts[i]
        //@ts-ignore
        const hostShadow = d3.select<HTMLElement, undefined>(hostElement.shadowRoot)

        const graphHostToInit = hostShadow.select<HTMLDivElement>('.graph-host.uninitialised')
        if (!graphHostToInit.empty()) {
            graphHostToInit.classed('uninitialised', false)
            graphHost = graphHostToInit
            break
        }
    }

    // this is the case for dev mode (one component)
    if (graphHost === undefined) {
        graphHost = d3.select<HTMLDivElement, undefined>('.graph-host.uninitialised')
        graphHost.classed('uninitialised', false)
    }

    return graphHost
})

onBeforeMount(() => {
    initFromLocalStorage()
})

onMounted(() => {
    initData()
    window.addEventListener('resize', resetView)
})

onUnmounted(() => {
    window.removeEventListener('resize', resetView)
})

const wasHere = ref(false)

const hasError = ref(false)
const errorTitle = ref('')
const errorMsg = ref('')

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

//exposing for cli functionality
defineExpose({
    getGraph,
    setGraph,
    printGraph,
    setNodeColor,
    setLinkColor,
    deleteNode,
    deleteLink,
    toggleNodeLabels,
    toggleLinkLabels,
    toggleZoom,
    toggleNodePhysics,
    toggleFixedLinkDistance,
    toggleGraphEditingInGUI,
    resetView
})

//region functions that are solely used as exposed ones
function getGraph(format: string = 'json') {
    if (format.toLowerCase() === 'json') {
        return JSON.parse(
            graph.value.toJSON(config.showLinkLabels, config.showLinkLabels, true, true, true)
        )
    } else if (format.toLowerCase() === 'tgf') {
        return graph.value.toTGF(config.showNodeLabels, config.showLinkLabels, true, true)
    } else {
        console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".')
    }
}

function setGraph(graphToSet: string | jsonGraph | undefined) {
    if (typeof graphToSet === 'object' || typeof graphToSet === 'string') {
        onHandleGraphImport(graphToSet)
    } else {
        resetGraph()
    }
}

function printGraph(format: string = 'json') {
    if (format.toLowerCase() === 'json') {
        console.log(
            graph.value.toJSON(config.showLinkLabels, config.showLinkLabels, true, true, true)
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

        deleteNotNeededColorMarker(idArray)

        for (const id of idArray) {
            linkSelection!
                .selectAll<SVGPathElement, GraphLink>('.link')
                .filter((d) => d.id === id)
                .each((d) => (d.color = color))
                .style('stroke', color)
        }
    } else {
        //if no ids are provided, the color is set for all currently existing links
        deleteNotNeededColorMarker(graph.value.links.map((link) => link.id))

        linkSelection!
            .selectAll<SVGPathElement, GraphLink>('.link')
            .each((d) => (d.color = color))
            .style('stroke', color)
    }

    createLinkMarkerColored(canvas!, config, color)
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

function toggleGraphEditingInGUI(isEnabled: boolean) {
    config.isGraphEditableInGUI = isEnabled
}
//endregion

function initFromLocalStorage() {
    const stringToBoolean = (text: string) => (text === 'false' ? false : !!text)

    //checks if the user already visited the site
    if (localStorage.wasHere) {
        wasHere.value = stringToBoolean(localStorage.wasHere)
    }

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
    if (localStorage.enableZoom) {
        config.zoomEnabled = stringToBoolean(localStorage.enableZoom)
    }

    if (localStorage.persistSettings) {
        config.persistSettingsLocalStorage = stringToBoolean(localStorage.persistSettings)
    }
}

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
                    d3.pointer(event, canvas!.node())[0],
                    d3.pointer(event, canvas!.node())[1]
                )
            }
        }
    )
    initMarkers(canvas, config, graph.value.getNonDefaultLinkColors())
    draggableLink = createDraggableLink(canvas)
    linkSelection = createLinks(canvas)
    nodeSelection = createNodes(canvas)
    simulation = createSimulation(graph.value, config, width, height, () => onTick())
    drag = createDrag(simulation, width, height, config.nodeRadius)
    restart()
}

function onZoom(event: D3ZoomEvent<any, any>, isEnabled: boolean = true): void {
    if (isEnabled) {
        xOffset = event.transform.x
        yOffset = event.transform.y
        scale = event.transform.k

        canvas!.attr('transform', `translate(${xOffset},${yOffset})scale(${scale})`)
    }
}

function createLink(source: GraphNode, target: GraphNode, label?: string, color?: string): void {
    let newLink = graph.value.createLink(source.id, target.id, label, color)
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
    nodeColor?: string
): void {
    let newNode = graph.value.createNode(
        x ?? width / 2,
        y ?? height / 2,
        importedId,
        label,
        nodeColor
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
                const linkGroup = enter.append('g')
                linkGroup
                    .append('path')
                    .classed('link', true)
                    .style('stroke', (d) => (d.color ? d.color : ''))
                    .attr('id', (d) => d.id)
                    .attr('marker-end', (d) =>
                        d.color ? 'url(#link-arrow-' + d.color : 'url(#link-arrow)'
                    )
                linkGroup
                    .append('path')
                    .classed('clickbox', true)
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
                        d.label ? 'link-label' : 'link-label-placeholder'
                    )
                    .attr('href', (d) => `#${d.id}`)
                    .attr('startOffset', '50%')
                    .text((d: GraphLink) => (d.label ? d.label : 'add label'))
                    .on('click', (event: MouseEvent, d: GraphLink) => {
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
                            let markerName = 'url(#link-arrow-reverse'
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
                            let markerName = 'url(#link-arrow'
                            if (d.color) {
                                markerName += '-' + escapeColor(d.color)
                            }
                            markerName += ')'
                            return markerName
                        } else {
                            return null
                        }
                    })

                update
                    .selectChild('text')
                    .attr('class', (d) => {
                        return `${d.pathType?.toLowerCase()}-path-text`
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
                    .classed('hidden', !config.showLinkLabels)
                    .classed('not-editable', !config.isGraphEditableInGUI)
                    .attr('startOffset', (d) => {
                        if (d.pathType?.includes('REVERSE')) {
                            return '46%'
                        } else {
                            return '50%'
                        }
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
                    .call(drag!)
                    .on('dblclick', (event: PointerEvent) => {
                        //a double click on a node, should not create a new one
                        terminate(event)
                    })
                nodeGroup
                    .append('circle')
                    .classed('node', true)
                    .attr('id', (d) => d.id)
                    .attr('r', config.nodeRadius)
                    .style('fill', (d) => (d.color ? d.color : ''))
                    .on('mouseenter', (_, d: GraphNode) => onPointerEnterNode(d))
                    .on('mouseout', (_, d: GraphNode) => onPointerOutNode(d))
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
                    .append('text')
                    .attr('class', (d: GraphNode) =>
                        d.label ? 'node-label' : 'node-label-placeholder'
                    )
                    .text((d: GraphNode) => (d.label ? d.label : 'add label'))
                    .attr('dy', '0.33em')
                    .on('click', (event: MouseEvent, d: GraphNode) => {
                        if (config.isGraphEditableInGUI) {
                            onNodeLabelClicked(event, d)
                        }
                    })
                    .on('dblclick', (event: PointerEvent) => {
                        //a double click on a label, should not create a new node
                        terminate(event)
                    })
                    .on('mouseenter', (_, d: GraphNode) => (draggableLinkTargetNode = d))
                    .on('mouseout', () => (draggableLinkTargetNode = undefined))
                return nodeGroup
            },
            (update) => {
                update
                    .selectChild('text')
                    .classed('hidden', !config.showNodeLabels)
                    .classed('not-editable', !config.isGraphEditableInGUI)

                return update
            }
        )

    simulation.nodes(graph.value.nodes)
    simulation.alpha(alpha).restart()
}

// region onNodePointerDown

/**
 * On a short right click+drag movement a draggable link is created, on a right click+hold the node is deleted.
 * @param event
 * @param node
 */
function onPointerDownNode(event: MouseEvent, node: GraphNode): void {
    if (event.button === 2) {
        _onPointerDownCreateDraggableLink(node)

        longRightClickTimerNode = setTimeout(() => {
            draggableLinkTargetNode = undefined
            _onPointerDownRenderDeleteAnimationNode(node)
        }, 250)
    }
}

/**
 * Renders a growing circumference around the specified node and
 * triggers node deletion after the animation is complete.
 * @param node
 */
function _onPointerDownRenderDeleteAnimationNode(node: GraphNode) {
    let nodeElement = graphHost.value.node()!.querySelector(`#${CSS.escape(String(node.id))}`)!
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
        resetDraggableLink()
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
        .attr('marker-end', 'url(#draggable-link-arrow)')
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
            .querySelector(`#${CSS.escape(String(node.id))}`)!.parentElement,
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
    resetDraggableLink()
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
        const point: [number, number] = [
            (pointer[0] - xOffset) / scale,
            (pointer[1] - yOffset) / scale
        ]
        if (event.pointerType === 'touch') {
            point[1] = point[1] - 4 * config.nodeRadius
            // PointerEvents are not firing correctly for touch input.
            // So for TouchEvents, we have to manually detect Nodes within range and set them as the current target node.
            draggableLinkTargetNode = graph.value.nodes.find(
                (node) =>
                    Math.sqrt(Math.pow(node.x! - point[0], 2) + Math.pow(node.y! - point[1], 2)) <
                    config.nodeRadius
            )
        }
        draggableLinkEnd = point
        updateDraggableLinkPath()
    }
}

/**
 * Sets the entered node as a target node for the draggable link.
 * @param node
 */
function onPointerEnterNode(node: GraphNode) {
    draggableLinkTargetNode = node
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
 * and cancels the link deletion and the respective animation.
 */
function onPointerUpLink(event: PointerEvent, link: GraphLink) {
    terminate(event)
    clearTimeout(longRightClickTimerLink)

    if (event.button === 2) {
        _onPointerUpCancelDeleteAnimationLink(link)
    }
}

/**
 * Deletes the given link and triggers the according events.
 * @param event
 * @param link
 */
function onPointerDownDeleteLink(event: PointerEvent, link: GraphLink): void {
    if (event.button === 2) {
        terminate(event)
        longRightClickTimerLink = setTimeout(() => {
            _onPointerDownRenderDeleteAnimationLink(link)
        }, 250)
    }
}

/**
 * Renders the delete animation for the link
 * and deletes it after the animation is finished.
 * @param link
 */
function _onPointerDownRenderDeleteAnimationLink(link: GraphLink) {
    let linkElement = graphHost.value.node()!.querySelector(`#${CSS.escape(link.id)}`)

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
                deleteLinkMarkerColored(canvas!, color)
            }
        }
    }
}

/**
 * Cancels the delete process and animation for the specified link.
 * @param link
 */
function _onPointerUpCancelDeleteAnimationLink(link: GraphLink) {
    let linkElement = graphHost.value.node()!.querySelector(`#${CSS.escape(link.id)}`)

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
//endregion

// region labels

function onNodeLabelClicked(event: MouseEvent, node: GraphNode): void {
    const textElement = event?.target as SVGTextElement

    handleInputForLabel(node, textElement, [node.x!, node.y!])
}
function onLinkLabelClicked(event: MouseEvent, link: GraphLink): void {
    const textPathElement = event.target as SVGTextPathElement
    let position = getTextPathPosition(textPathElement)

    handleInputForLabel(link, textPathElement, position)
}
function handleInputForLabel(
    element: GraphNode | GraphLink,
    textContainingElement: SVGTextElement | SVGTextPathElement,
    position: [number, number]
) {
    let elementType = element instanceof GraphNode ? 'node' : 'link'

    const input = document.createElement('input')
    input.setAttribute('class', 'label-input')
    element.label == undefined ? (input.value = '') : (input.value = element.label)
    input.placeholder = `Enter ${elementType} label`

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
            if (input.value === '') {
                textContainingElement.setAttribute('class', `${elementType}-label-placeholder`)
                textContainingElement.textContent = 'add label'
                element.label = undefined
            } else {
                textContainingElement.setAttribute('class', `${elementType}-label`)
                textContainingElement.textContent = input.value.trim()
                element.label = textContainingElement.textContent
            }
        }
        foreignObj.remove()
    }

    const foreignObj = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    foreignObj.setAttribute('width', '100%')
    foreignObj.setAttribute('height', '100%')
    foreignObj.setAttribute('x', `${position[0]! - 80}`)
    foreignObj.setAttribute('y', `${position[1]! - 12}`)
    foreignObj.append(input)

    const parentSVG = textContainingElement.closest('svg')
    parentSVG?.querySelector('g')?.append(foreignObj)

    input.focus()
}
function getTextPathPosition(textPathElement: SVGTextPathElement): [number, number] {
    let rectSvg = graphHost.value.select<SVGElement>('svg')!.node()!.getBoundingClientRect()
    let rectTextPath = textPathElement.getBoundingClientRect()
    let x = (rectTextPath.x - rectSvg.x - xOffset) / scale
    let y = (rectTextPath.y - rectSvg.y - yOffset) / scale
    return [x, y]
}

// endregion

function onUpdateSettings(newSettings: Settings): void {
    toggleNodeLabels(newSettings.showNodeLabels)
    toggleNodePhysics(newSettings.nodePhysicsEnabled)

    toggleLinkLabels(newSettings.showLinkLabels)
    toggleFixedLinkDistance(newSettings.fixedLinkDistanceEnabled)

    toggleZoom(newSettings.zoomEnabled)

    config.persistSettingsLocalStorage = newSettings.persistEnabled
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

function resetDraggableLink(): void {
    draggableLink?.classed('hidden', true).attr('marker-end', 'null')
    draggableLinkSourceNode = undefined
    draggableLinkTargetNode = undefined
    draggableLinkEnd = undefined
}
function onHandleGraphImport(importContent: string | jsonGraph) {
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

    resetGraph()
    parsedToGraph(nodes, links)
}
function parsedToGraph(nodes: parsedNode[], links: parsedLink[]) {
    for (let parsedNode of nodes) {
        createNode(
            parsedNode.x,
            parsedNode.y,
            parsedNode.idImported,
            parsedNode.label,
            parsedNode.color
        )
    }
    const findNodeByImportedId = (importedId: number | string) =>
        graph.value.nodes.find((node) => node.idImported === importedId)

    for (let parsedLink of links) {
        let srcNode = findNodeByImportedId(parsedLink.sourceIdImported)
        let targetNode = findNodeByImportedId(parsedLink.targetIdImported)
        if (srcNode && targetNode) {
            createLink(srcNode, targetNode, parsedLink.label, parsedLink.color)
            if (parsedLink.color) {
                createLinkMarkerColored(canvas!, config, parsedLink.color)
            }
        }
    }
}
/**
 Checks the links that will change color and deletes colored link markers that are then not needed anymore
 @params idArrayOfLinkColorToChanged - links that will change color
 */
function deleteNotNeededColorMarker(idsOfLinkColorToChange: string[]) {
    for (let id of idsOfLinkColorToChange) {
        const currentColorOfLink = graph.value.links
            .filter((link) => link.id === id)
            .map((link) => link.color)
            .shift()

        if (currentColorOfLink) {
            //the color of the link we are about to change doesn't exist on another link -> marker can be deleted
            if (!graph.value.hasNonDefaultLinkColor(currentColorOfLink, id)) {
                deleteLinkMarkerColored(canvas!, currentColorOfLink)
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
                    deleteLinkMarkerColored(canvas!, currentColorOfLink)
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
    resetDraggableLink()
    initFromLocalStorage()
    initData()
}

function resetGraph(): void {
    graph.value.links.forEach((link) => triggerLinkDeleted(link, graphHost.value))
    graph.value.nodes.forEach((node) => triggerNodeDeleted(node, graphHost.value))
    graph.value = new Graph()
    graphHasNodes.value = false
    resetView()
}

function showError(title: string, message: any) {
    console.error(title + '\n' + message)
    hasError.value = true
    errorTitle.value = title
    errorMsg.value = message.toString()
    window.setInterval(() => (hasError.value = false), 6000)
}
</script>

<template>
    <!-- we need this for vuetify to work properly in the custom element version-->
    <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
    />

    <div class="graph-host uninitialised" />
    <div v-if="config.hasToolbar" class="button-container">
        <v-tooltip location="bottom" :open-delay="750" text="Create Node">
            <template #activator="{ props }">
                <v-btn
                    v-if="config.isGraphEditableInGUI"
                    aria-label="Create Node"
                    class="mx-1"
                    color="grey"
                    density="comfortable"
                    elevation="6"
                    icon="$addNode"
                    v-bind="props"
                    variant="plain"
                    @click="createNode()"
                >
                </v-btn>
            </template>
        </v-tooltip>
        <v-tooltip location="bottom" :open-delay="750" text="Delete Graph">
            <template #activator="{ props }">
                <v-btn
                    v-if="config.isGraphEditableInGUI"
                    aria-label="Delete Graph"
                    class="mx-1"
                    color="grey"
                    density="comfortable"
                    elevation="6"
                    icon="$deleteGraph"
                    v-bind="props"
                    variant="plain"
                    @click="resetGraph()"
                >
                </v-btn>
            </template>
        </v-tooltip>
        <v-tooltip location="bottom" :open-delay="750" text="Reset View">
            <template #activator="{ props }">
                <v-btn
                    v-if="config.zoomEnabled"
                    aria-label="Reset View"
                    class="mx-1"
                    color="grey"
                    density="comfortable"
                    elevation="6"
                    icon="$resetView"
                    v-bind="props"
                    variant="plain"
                    @click="resetView()"
                ></v-btn>
            </template>
        </v-tooltip>
        <import-export
            :graph-as-tgf="graph.toTGF(config.showNodeLabels, config.showLinkLabels, false, false)"
            :graph-as-json="
                graph.toJSON(config.showNodeLabels, config.showLinkLabels, true, true, true)
            "
            @file-imported="onHandleGraphImport"
        />
        <graph-help />
        <graph-settings
            :config="config"
            :is-welcome="!wasHere"
            @update-settings="onUpdateSettings"
        />
    </div>
    <div v-show="!graphHasNodes">
        <graph-controls
            class="info-text-background"
            show-controls-graph
            :show-controls-environment="false"
            :show-header="false"
        ></graph-controls>
    </div>
    <v-snackbar v-model="hasError" color="error" variant="tonal">
        <v-row align="center">
            <v-icon icon="$error" class="ml-2"></v-icon>
            <v-col>
                <h4>{{ errorTitle }}</h4>
                <p>{{ errorMsg }}</p>
            </v-col>
        </v-row>
    </v-snackbar>
</template>

<style lang="scss">
.graph-host {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    background-color: lightgrey;
}

.link {
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

.clickbox {
    stroke: rgba($color: #000, $alpha: 0);
    stroke-width: 16px;
    fill: none;
    cursor: pointer;
}

.arrow {
    fill: #004c97;

    &.draggable {
        fill: #007dae;
    }
}

.line-path-text,
.arc-path-text,
.line-reverse-path-text,
.arc-reverse-path-text,
.reflexive-path-text {
    text-anchor: middle;
    pointer-events: all;
    cursor: text;
    opacity: 1;
    stroke: none;
    .link-label {
        fill: black;
        stroke: none;
        font-size: 1rem;

        &.hidden {
            visibility: hidden;
            cursor: pointer;
            pointer-events: none;
        }

        &.not-editable {
            cursor: pointer;
        }
    }

    .link-label-placeholder {
        fill: dimgrey;
        font-style: oblique;
        font-size: 0.85rem;

        &.hidden {
            visibility: hidden;
            cursor: pointer;
            pointer-events: none;
        }

        &.not-editable {
            cursor: pointer;
        }
    }
}

.node {
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

.node-label {
    fill: black;
    stroke: none;
    font-size: 1rem;
    opacity: 1;
    text-anchor: middle;
    pointer-events: all;
    cursor: text;

    &.hidden {
        visibility: hidden;
        cursor: pointer;
        pointer-events: none;
    }

    &.not-editable {
        cursor: pointer;
    }
}
.node-label-placeholder {
    fill: dimgrey;
    font-style: oblique;
    stroke: none;
    font-size: 0.85rem;
    opacity: 1;
    text-anchor: middle;
    pointer-events: all;
    cursor: text;

    &.hidden {
        visibility: hidden;
        cursor: pointer;
        pointer-events: none;
    }

    &.not-editable {
        cursor: pointer;
    }
}
.label-input {
    background-color: rgba(255, 255, 255, 0.9);
}
.button-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
    margin-top: -6px;

    > * {
        margin-top: 6px;
    }
}

*:not(input):not(.selectable) {
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
}

.info-text-background {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}
</style>
