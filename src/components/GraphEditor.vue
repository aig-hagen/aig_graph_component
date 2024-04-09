<script setup lang="ts">
import * as d3 from 'd3'
import Graph from '@/model/graph'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { createZoom, type Zoom } from '@/d3/zoom'
import { createDrag, type Drag } from '@/d3/drag'
import { type Canvas, createCanvas } from '@/d3/canvas'
import { createLinks, type LinkSelection } from '@/d3/link'
import { createNodes, type NodeSelection } from '@/d3/node'
import { initMarkers } from '@/d3/markers'
import { createDraggableLink, type DraggableLink } from '@/d3/draggable-link'
import { createSimulation, setFixedLinkDistance, setNodeChargeAndAttraction } from '@/d3/simulation'
import { defaultGraphConfig } from '@/model/config'
import type { D3ZoomEvent } from 'd3'
import { PathType } from '@/model/path-type'
import { linePath, paddedArcPath, paddedLinePath, paddedReflexivePath } from '@/d3/paths'
import { terminate } from '@/d3/event'
import { parseTGF } from '@/model/parser'
import { GraphNode } from '@/model/graphNode'
import type { GraphLink } from '@/model/graphLink'
//@ts-ignore
import svgPathReverse from 'svg-path-reverse'
import ImportExport from '@/components/ImportExport.vue'
import GraphSettings from '@/components/GraphSettings.vue'
import GraphHelp from '@/components/GraphHelp.vue'

const graphHost = computed(() => {
    //this is the case for production mode (one and multiple components)
    const editors = document.querySelectorAll('graph-editor')
    let graphHost = undefined
    for (let i = 0; i < editors.length; i++) {
        const editor = editors[i]
        const graphHostToInit = d3.select(editor).select('.graph-host.uninitialised')
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

onMounted(() => {
    initData()
    window.addEventListener('resize', resetView)
})

onUnmounted(() => {
    window.removeEventListener('resize', resetView)
})

const graph = ref(new Graph())
const graphHasNodes = ref(false)
const config = reactive(defaultGraphConfig)
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

defineExpose({ getGraph, setGraph, printGraph })
function getGraph() {
    return graph.value.toTGF(config.showNodeLabels, config.showLinkLabels)
}

function setGraph(graphAsTGF: string) {
    if (graphAsTGF !== 'Graph is empty') {
        onHandleGraphImport(graphAsTGF)
    }
}
function printGraph() {
    console.log(graph.value.toTGF(config.showNodeLabels, config.showLinkLabels))
}

function initData() {
    width = graphHost.value.node()!.clientWidth
    height = graphHost.value.node()!.clientHeight
    zoom = createZoom((event: D3ZoomEvent<any, any>) => onZoom(event))
    canvas = createCanvas(
        graphHost.value,
        zoom,
        (event) => onPointerMoved(event),
        (event) => onPointerUp(event),
        (event) => {
            createNode(d3.pointer(event, canvas!.node())[0], d3.pointer(event, canvas!.node())[1])
        }
    )
    initMarkers(canvas, config)
    draggableLink = createDraggableLink(canvas)
    linkSelection = createLinks(canvas)
    nodeSelection = createNodes(canvas)
    simulation = createSimulation(graph.value, config, width, height, () => onTick())
    drag = createDrag(simulation, width, height, config.nodeRadius)
    restart()
}

function onZoom(event: D3ZoomEvent<any, any>): void {
    xOffset = event.transform.x
    yOffset = event.transform.y
    scale = event.transform.k

    canvas!.attr('transform', `translate(${xOffset},${yOffset})scale(${scale})`)
}

function createLink(source: GraphNode, target: GraphNode, label?: string): void {
    graph.value.createLink(source.id, target.id, label)
    restart()
}
function createNode(x?: number, y?: number, importedId?: string | number, label?: string): void {
    graph.value.createNode(x ?? width / 2, y ?? height / 2, importedId, label)
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
                    .attr('id', (d) => d.id)
                    .attr('marker-end', 'url(#link-arrow)')
                linkGroup
                    .append('path')
                    .classed('clickbox', true)
                    .on('pointerdown', (event: MouseEvent, d: GraphLink) => {
                        if (event.button !== 1) {
                            //mouse wheel
                            return
                        }
                        terminate(event)
                        graph.value.removeLink(d)
                        restart()
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
                        onLinkLabelClicked(event, d)
                    })
                return linkGroup
            },
            (update) => {
                update
                    .selectChild('path')
                    .attr('marker-start', (d) =>
                        d.pathType?.includes('REVERSE') ? 'url(#link-arrow-reverse)' : null
                    )
                    .attr('marker-end', (d) =>
                        d.pathType?.includes('REVERSE') ? null : 'url(#link-arrow)'
                    )

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
                    .on('pointerdown', (event: MouseEvent, d: GraphNode) => {
                        if (event.button !== 1) {
                            //mouse wheel
                            return
                        }
                        terminate(event)
                        graph.value.removeNode(d)
                        graphHasNodes.value = graph.value.nodes.length > 0
                        resetDraggableLink()
                        restart()
                    })
                nodeGroup
                    .append('circle')
                    .classed('node', true)
                    .attr('r', config.nodeRadius)
                    .on('mouseenter', (_, d: GraphNode) => (draggableLinkTargetNode = d))
                    .on('mouseout', () => (draggableLinkTargetNode = undefined))
                    .on('pointerdown', (event: PointerEvent, d: GraphNode) => {
                        onPointerDown(event, d)
                    })
                    .on('pointerup', (event: PointerEvent) => {
                        onPointerUp(event)
                    })
                nodeGroup
                    .append('text')
                    .attr('class', (d: GraphNode) =>
                        d.label ? 'node-label' : 'node-label-placeholder'
                    )
                    .text((d: GraphNode) => (d.label !== undefined ? d.label : 'add label'))
                    .attr('dy', '0.33em')
                    .on('click', (event: MouseEvent, d: GraphNode) => {
                        onNodeLabelClicked(event, d)
                    })
                    .on('mouseenter', (_, d: GraphNode) => (draggableLinkTargetNode = d))
                    .on('mouseout', () => (draggableLinkTargetNode = undefined))
                return nodeGroup
            },
            (update) => {
                update.selectChild('text').classed('hidden', !config.showNodeLabels)

                return update
            }
        )

    simulation.nodes(graph.value.nodes)
    simulation.alpha(alpha).restart()
}
function onPointerDown(event: PointerEvent, node: GraphNode): void {
    if (event.button !== 0) {
        return
    }
    terminate(event)
    const coordinates: [number, number] = [node.x!, node.y!]
    draggableLinkEnd = coordinates
    draggableLinkSourceNode = node
    draggableLink!
        .attr('marker-end', 'url(#draggable-link-arrow)')
        .classed('hidden', false)
        .attr('d', linePath(coordinates, coordinates))
    restart()
}

function onPointerUp(event: PointerEvent): void {
    const source = draggableLinkSourceNode
    const target = draggableLinkTargetNode
    resetDraggableLink()
    if (source === undefined || target === undefined) {
        return
    }
    terminate(event)
    createLink(source, target)
}

function onPointerMoved(event: PointerEvent): void {
    terminate(event)
    if (draggableLinkSourceNode !== undefined) {
        const pointer = d3.pointers(event, graphHost.value.node())[0]
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
    let rect = textPathElement.getBoundingClientRect()
    let x = (rect.x - xOffset) / scale
    let y = (rect.y - yOffset) / scale
    return [x, y]
}

function toggleForces(isEnabled: boolean): void {
    config.nodePhysicsEnabled = isEnabled
    setNodeChargeAndAttraction(simulation, isEnabled, width, height)
}
function toggleFixedLinkDistance(isEnabled: boolean): void {
    config.fixedLinkDistanceEnabled = isEnabled
    setFixedLinkDistance(simulation, graph.value, config, isEnabled)
}
function resetDraggableLink(): void {
    draggableLink?.classed('hidden', true).attr('marker-end', 'null')
    draggableLinkSourceNode = undefined
    draggableLinkTargetNode = undefined
    draggableLinkEnd = undefined
}
function onHandleGraphImport(importContent: string) {
    let [nodes, links] = parseTGF(importContent)
    resetGraph()
    for (let parsedNode of nodes) {
        createNode(undefined, undefined, parsedNode.idImported, parsedNode.label)
    }
    const findNodeByImportedId = (importedId: number | string) =>
        graph.value.nodes.find((node) => node.idImported === importedId)

    for (let parsedLink of links) {
        let srcNode = findNodeByImportedId(parsedLink.sourceIdImported)
        let targetNode = findNodeByImportedId(parsedLink.targetIdImported)
        if (srcNode && targetNode) {
            createLink(srcNode, targetNode, parsedLink.label)
        }
    }
}
function resetView(): void {
    simulation.stop()
    graphHost.value.selectChildren().remove()
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
    initData()
}

function resetGraph(): void {
    graph.value = new Graph()
    graphHasNodes.value = false
    resetView()
}
</script>

<template>
    <div class="graph-host uninitialised" />
    <div v-if="config.hasToolbar" class="button-container">
        <v-tooltip location="bottom" :open-delay="750" text="Create Node">
            <template #activator="{ props }">
                <v-btn
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
            :graph-as-tgf="graph.toTGF(config.showNodeLabels, config.showLinkLabels)"
            @file-imported="onHandleGraphImport"
        />
        <graph-help />
        <graph-settings
            :node-labels-enabled="config.showNodeLabels"
            :link-labels-enabled="config.showLinkLabels"
            :physics-enabled="config.nodePhysicsEnabled"
            :fixed-link-distance-enabled="config.fixedLinkDistanceEnabled"
            @toggle-node-physics="toggleForces"
            @toggle-node-labels="(isEnabled: any) => (config.showNodeLabels = isEnabled)"
            @toggle-link-labels="(isEnabled: any) => (config.showLinkLabels = isEnabled)"
            @toggle-fixed-link-distance="toggleFixedLinkDistance"
        />
    </div>
    <div v-show="!graphHasNodes" class="info-text text-h5 text-grey">Graph is empty</div>
</template>

<!--<style scoped>-->

<style lang="scss">
.graph-host {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    background-color: lightgrey;
}

.create-node-button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
}

.link {
    stroke: cadetblue;
    stroke-width: 4px;
    fill: none;

    &.hidden {
        stroke-width: 0;
    }

    &.draggable {
        stroke: lightblue;
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
    fill: cadetblue;

    &.draggable {
        fill: lightblue;
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
    }
}

.node {
    fill: lightsalmon;
    stroke: none;
    cursor: pointer;

    &:hover {
        stroke: cadetblue;
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

.info-text {
    position: absolute;
    left: 1rem;
    right: 1rem;
    top: 1rem;
    bottom: 1rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}
</style>
