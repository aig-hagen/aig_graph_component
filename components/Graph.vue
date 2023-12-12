<template>
    <div width="100%" height="100%">
        <div class="graph-host" width="100%" height="100%"></div>
        <div class="button-container">
            <v-btn
                icon
                elevation="6"
                aria-label="Create Node"
                @click="createNode()"
            >
                <v-icon v-text="'mdi-plus'" />
            </v-btn>
            <v-btn
                icon
                elevation="6"
                aria-label="Reset Graph"
                @click="resetGraph()"
            >
                <v-icon v-text="'mdi-delete'" />
            </v-btn>
            <save
                :graph-as-t-g-f="
                    this.graph.toTGF(
                        this.config.showNodeLabels,
                        this.config.showLinkLabels
                    )
                "
                :graph-as-tik-z="this.graph.toTikZ()"
            />
            <import-export @file-imported="onHandleGraphImport"></import-export>
            <help />
            <!--            for usage of resetView it is necessary to fix the reset of the labels-->
            <!--            <v-btn-->
            <!--                icon-->
            <!--                elevation="6"-->
            <!--                aria-label="Reset View"-->
            <!--                @click="resetView()"-->
            <!--            >-->
            <!--                <v-icon v-text="'mdi-image-filter-center-focus'" />-->
            <!--            </v-btn>-->
            <!--                for usage of theme-toggle it is necessary to also toggle the labels and their input-->
            <!--            <theme-toggle />-->
            <settings
                @toggle-node-physics="toggleForces"
                @toggle-node-labels="
                    (isEnabled) => (this.config.showNodeLabels = isEnabled)
                "
                @toggle-link-labels="
                    (isEnabled) => (this.config.showLinkLabels = isEnabled)
                "
                @toggle-fixed-link-distance="toggleFixedLinkDistance"
            />
        </div>
        <div v-show="!graphHasNodes" class="info-text text-h5 text--secondary">
            Graph is empty
        </div>
    </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { D3ZoomEvent } from 'd3'
import Vue from 'vue'
import { Canvas, createCanvas } from '~/d3/canvas'
import { createDrag, Drag } from '~/d3/drag'
import { createDraggableLink, DraggableLink } from '~/d3/draggable-link'
import { terminate } from '~/d3/event'
import { createLink, LinkSelection } from '~/d3/link'
import { initMarkers } from '~/d3/markers'
import { createNode, NodeSelection } from '~/d3/node'
import {
    linePath,
    paddedArcPath,
    paddedLinePath,
    paddedReflexivePath,
} from '~/d3/paths'
import {
    createSimulation,
    setNodeChargeAndAttraction,
    setFixedLinkDistance,
} from '~/d3/simulation'
import { createZoom, Zoom } from '~/d3/zoom'
import { defaultGraphConfig, GraphConfiguration } from '~/model/config'
import Graph from '~/model/graph'
import { Link } from '~/model/link'
import { Node } from '~/model/node'
import { PathType } from '~/model/path-type'
import { parseTGF } from '~/model/parser'
// @ts-ignore
import svgPathReverse from 'svg-path-reverse'

interface Data {
    graph: Graph
    graphHasNodes: Boolean
    width: number
    height: number
    simulation: any
    zoom?: Zoom
    drag?: Drag
    canvas?: Canvas
    link?: LinkSelection
    node?: NodeSelection
    draggableLink?: DraggableLink
    draggableLinkSourceNode?: Node
    draggableLinkTargetNode?: Node
    draggableLinkEnd?: [number, number]
    xOffset: number
    yOffset: number
    scale: number
    config: GraphConfiguration
}

export default Vue.extend({
    data(): Data {
        return {
            graph: new Graph(),
            graphHasNodes: false,
            width: 400,
            height: 400,
            simulation: undefined,
            zoom: undefined,
            drag: undefined,
            canvas: undefined,
            draggableLink: undefined,
            draggableLinkSourceNode: undefined,
            draggableLinkTargetNode: undefined,
            draggableLinkEnd: undefined,
            xOffset: 0,
            yOffset: 0,
            scale: 1,
            config: defaultGraphConfig,
        }
    },
    computed: {
        graphHost() {
            return d3.select<HTMLDivElement, undefined>('.graph-host')
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        init(): void {
            this.width = this.graphHost.node()!.clientWidth
            this.height = this.graphHost.node()!.clientHeight
            this.zoom = createZoom((event: D3ZoomEvent<any, any>) =>
                this.onZoom(event)
            )
            this.canvas = createCanvas(
                this.graphHost,
                this.zoom,
                (event) => this.onPointerMoved(event),
                (event) => this.onPointerUp(event),
                (event) => {
                    this.createNode(
                        d3.pointer(event, this.canvas!.node())[0],
                        d3.pointer(event, this.canvas!.node())[1]
                    )
                }
            )
            initMarkers(this.canvas, this.config)
            this.draggableLink = createDraggableLink(this.canvas)
            this.link = createLink(this.canvas)
            this.node = createNode(this.canvas)
            this.simulation = createSimulation(
                this.graph,
                this.config,
                this.width,
                this.height,
                () => this.onTick()
            )
            this.drag = createDrag(
                this.simulation,
                this.width,
                this.height,
                this.config.nodeRadius
            )
            this.restart()
        },
        onZoom(event: D3ZoomEvent<any, any>): void {
            // this.xOffset = event.transform.x
            // this.yOffset = event.transform.y
            // this.scale = event.transform.k
            //
            // this.canvas!.attr(
            //     'transform',
            //     `translate(${this.xOffset},${this.yOffset})scale(${this.scale})`
            // )
        },
        createLink(source: Node, target: Node, label?: string): void {
            this.graph!.createLink(source.id, target.id, label)
            this.restart()
        },
        createNode(x?: number, y?: number, id?: number, label?: string): void {
            this.graph.createNode(
                x ?? this.width / 2,
                y ?? this.height / 2,
                id,
                label
            )
            this.graphHasNodes = true
            this.restart()
        },
        onTick(): void {
            this.node!.attr('transform', (d) => `translate(${d.x},${d.y})`)

            this.link!.selectAll<SVGPathElement, Link>('path').attr(
                'd',
                (d: Link) => this.generatePath(d)
            )

            this.updateDraggableLinkPath()
            this.restart() /* for directly displaying the link labels
            in a proper way, todo may find a better solution in the future */
        },
        generatePath(d: Link): string {
            this.setPath(d)

            switch (d.pathType) {
                case PathType.REFLEXIVE: {
                    return paddedReflexivePath(
                        d.source,
                        [this.width / 2, this.height / 2],
                        this.config
                    )
                }
                case PathType.ARC: {
                    return paddedArcPath(d.source, d.target, this.config)
                }
                case PathType.ARCREVERSE: {
                    return svgPathReverse.reverse(
                        paddedArcPath(d.source, d.target, this.config)
                    )
                }
                case PathType.LINE: {
                    return paddedLinePath(d.source, d.target, this.config)
                }
                case PathType.LINEREVERSE: {
                    return svgPathReverse.reverse(
                        paddedLinePath(d.source, d.target, this.config)
                    )
                }
                default: {
                    return '' //should never be reached
                }
            }
        },
        setPath(d: Link) {
            if (d.source.id === d.target.id) {
                d.pathType = PathType.REFLEXIVE
            } else if (this.isBidirectional(d.source, d.target)) {
                d.pathType = this.needsReversion(d.source, d.target)
                    ? PathType.ARCREVERSE
                    : PathType.ARC
            } else {
                d.pathType = this.needsReversion(d.source, d.target)
                    ? PathType.LINEREVERSE
                    : PathType.LINE
            }
        },
        isBidirectional(source: Node, target: Node): boolean {
            return (
                source.id !== target.id &&
                this.graph!.links.some(
                    (l) =>
                        l.target.id === source.id && l.source.id === target.id
                ) &&
                this.graph!.links.some(
                    (l) =>
                        l.target.id === target.id && l.source.id === source.id
                )
            )
        },
        needsReversion(source: Node, target: Node): boolean {
            return source.x! > target.x!
        },
        updateDraggableLinkPath(): void {
            const source = this.draggableLinkSourceNode
            if (source !== undefined) {
                const target = this.draggableLinkTargetNode
                if (target !== undefined) {
                    this.draggableLink!.attr('d', () => {
                        if (source.id === target.id) {
                            return paddedReflexivePath(
                                source,
                                [this.width / 2, this.height / 2],
                                this.config
                            )
                        } else if (this.isBidirectional(source, target)) {
                            return paddedLinePath(source, target, this.config)
                        } else {
                            return paddedArcPath(source, target, this.config)
                        }
                    })
                } else if (this.draggableLinkEnd !== undefined) {
                    const from: [number, number] = [source.x!, source.y!]
                    this.draggableLink!.attr(
                        'd',
                        linePath(from, this.draggableLinkEnd)
                    )
                }
            }
        },
        restart(alpha: number = 0.5): void {
            this.link = this.link!.data(
                this.graph!.links,
                (d: Link) => d.id
            ).join(
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
                        .on('contextmenu', (event: MouseEvent, d: Link) => {
                            terminate(event)
                            this.graph.removeLink(d)
                            this.restart()
                        })
                    linkGroup
                        .append('text')
                        .append('textPath')
                        .attr('class', (d: Link) =>
                            d.label ? 'link-label' : 'link-label-placeholder'
                        )
                        .attr('href', (d) => `#${d.id}`)
                        .attr('startOffset', '50%')
                        .text((d: Link) => (d.label ? d.label : 'add label'))
                        .on('click', (event: MouseEvent, d: Link) => {
                            this.onLinkLabelClicked(event, d)
                        })
                    return linkGroup
                },
                (update) => {
                    update
                        .selectChild('path')
                        .attr('marker-start', (d) =>
                            d.pathType?.includes('REVERSE')
                                ? 'url(#link-arrow-reverse)'
                                : null
                        )
                        .attr('marker-end', (d) =>
                            d.pathType?.includes('REVERSE')
                                ? null
                                : 'url(#link-arrow)'
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
                        .classed('hidden', !this.config.showLinkLabels)
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

            this.node = this.node!.data(this.graph!.nodes, (d) => d.id).join(
                (enter) => {
                    const nodeGroup = enter
                        .append('g')
                        .call(this.drag!)
                        .on('contextmenu', (event: MouseEvent, d: Node) => {
                            terminate(event)
                            this.graph.removeNode(d)
                            this.graphHasNodes = this.graph.nodes.length > 0
                            this.resetDraggableLink()
                            this.restart()
                        })
                    nodeGroup
                        .append('circle')
                        .classed('node', true)
                        .attr('r', this.config.nodeRadius)
                        .on(
                            'mouseenter',
                            (_, d: Node) => (this.draggableLinkTargetNode = d)
                        )
                        .on(
                            'mouseout',
                            () => (this.draggableLinkTargetNode = undefined)
                        )
                        .on('pointerdown', (event: PointerEvent, d: Node) => {
                            this.onPointerDown(event, d)
                        })
                        .on('pointerup', (event: PointerEvent) => {
                            this.onPointerUp(event)
                        })
                    nodeGroup
                        .append('text')
                        .attr('class', (d: Node) =>
                            d.label ? 'node-label' : 'node-label-placeholder'
                        )
                        .text((d: Node) =>
                            d.label !== undefined ? d.label : 'add label'
                        )
                        .attr('dy', '0.33em')
                        .on('click', (event: MouseEvent, d: Node) => {
                            this.onNodeLabelClicked(event, d)
                        })
                        .on(
                            'mouseenter',
                            (_, d: Node) => (this.draggableLinkTargetNode = d)
                        )
                        .on(
                            'mouseout',
                            () => (this.draggableLinkTargetNode = undefined)
                        )
                    return nodeGroup
                },
                (update) => {
                    update
                        .selectChild('text')
                        .classed('hidden', !this.config.showNodeLabels)

                    return update
                }
            )

            this.simulation!.nodes(this.graph!.nodes)
            this.simulation!.alpha(alpha).restart()
        },
        onPointerDown(event: PointerEvent, node: Node): void {
            if (event.button !== 0) {
                return
            }
            terminate(event)
            const coordinates: [number, number] = [node.x!, node.y!]
            this.draggableLinkEnd = coordinates
            this.draggableLinkSourceNode = node
            this.draggableLink!.attr('marker-end', 'url(#draggable-link-arrow)')
                .classed('hidden', false)
                .attr('d', linePath(coordinates, coordinates))
            this.restart()
        },
        onPointerUp(event: PointerEvent): void {
            const source = this.draggableLinkSourceNode
            const target = this.draggableLinkTargetNode
            this.resetDraggableLink()
            if (source === undefined || target === undefined) {
                return
            }
            terminate(event)
            this.createLink(source, target)
        },
        onPointerMoved(event: PointerEvent): void {
            terminate(event)
            if (this.draggableLinkSourceNode !== undefined) {
                const pointer = d3.pointers(event, this.graphHost.node())[0]
                const point: [number, number] = [
                    (pointer[0] - this.xOffset) / this.scale,
                    (pointer[1] - this.yOffset) / this.scale,
                ]
                if (event.pointerType === 'touch') {
                    point[1] = point[1] - 4 * this.config.nodeRadius
                    // PointerEvents are not firing correctly for touch input.
                    // So for TouchEvents, we have to manually detect Nodes within range and set them as the current target node.
                    this.draggableLinkTargetNode = this.graph!.nodes.find(
                        (node) =>
                            Math.sqrt(
                                Math.pow(node.x! - point[0], 2) +
                                    Math.pow(node.y! - point[1], 2)
                            ) < this.config.nodeRadius
                    )
                }
                this.draggableLinkEnd = point
                this.updateDraggableLinkPath()
            }
        },
        onNodeLabelClicked(event: MouseEvent, node: Node): void {
            const textElement = event?.target as SVGTextElement

            this.handleInputForLabel(node, textElement, [node.x!, node.y!])
        },
        onLinkLabelClicked(event: MouseEvent, link: Link): void {
            const textPathElement = event.target as SVGTextPathElement
            let position = this.getTextPathPosition(textPathElement)

            this.handleInputForLabel(link, textPathElement, position)
        },
        handleInputForLabel(
            element: Node | Link,
            textContainingElement: SVGTextElement | SVGTextPathElement,
            position: [number, number]
        ) {
            let elementType = element instanceof Node ? 'node' : 'link'

            const input = document.createElement('input')
            input.setAttribute('class', 'label-input')
            element.label == undefined
                ? (input.value = '')
                : (input.value = element.label)
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
                        textContainingElement.setAttribute(
                            'class',
                            `${elementType}-label-placeholder`
                        )
                        textContainingElement.textContent = 'add label'
                        element.label = undefined
                    } else {
                        textContainingElement.setAttribute(
                            'class',
                            `${elementType}-label`
                        )
                        textContainingElement.textContent = input.value
                        element.label = textContainingElement.textContent
                    }
                }
                foreignObj.remove()
            }

            const foreignObj = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'foreignObject'
            )
            foreignObj.setAttribute('width', '100%')
            foreignObj.setAttribute('height', '100%')
            foreignObj.setAttribute('x', `${position.at(0)! - 80}`)
            foreignObj.setAttribute('y', `${position.at(1)! - 12}`)
            foreignObj.append(input)

            const parentSVG = textContainingElement.closest('svg')
            parentSVG?.querySelector('g')?.append(foreignObj)

            input.focus()
        },
        getTextPathPosition(
            textPathElement: SVGTextPathElement
        ): [number, number] {
            let rect = textPathElement.getBoundingClientRect()
            let x = (rect.x - this.xOffset) / this.scale
            let y = (rect.y - this.yOffset) / this.scale
            return [x, y]
        },
        toggleForces(isEnabled: boolean): void {
            setNodeChargeAndAttraction(
                this.simulation,
                isEnabled,
                this.width,
                this.height
            )
        },
        toggleFixedLinkDistance(isEnabled: boolean): void {
            setFixedLinkDistance(
                this.simulation,
                this.graph,
                this.config,
                isEnabled
            )
        },
        resetDraggableLink(): void {
            this.draggableLink
                ?.classed('hidden', true)
                .attr('marker-end', 'null')
            this.draggableLinkSourceNode = undefined
            this.draggableLinkTargetNode = undefined
            this.draggableLinkEnd = undefined
        },
        onHandleGraphImport(importContent: string) {
            let [nodes, links] = parseTGF(importContent)
            this.resetGraph()
            for (let parsedNode of nodes) {
                this.createNode(
                    undefined,
                    undefined,
                    parsedNode.id,
                    parsedNode.label
                )
            }
            const findNodeById = (id: number) =>
                this.graph.nodes.find((node) => node.id === id)
            for (let parsedLink of links) {
                let srcNode = findNodeById(parsedLink.sourceId)
                let targetNode = findNodeById(parsedLink.targetId)
                if (srcNode && targetNode) {
                    this.createLink(srcNode, targetNode, parsedLink.label)
                }
            }
        },
        resetView(): void {
            this.simulation!.stop()
            this.graphHost.selectChildren().remove()
            this.zoom = undefined
            this.xOffset = 0
            this.yOffset = 0
            this.scale = 1
            this.canvas = undefined
            this.draggableLink = undefined
            this.link = undefined
            this.node = undefined
            this.simulation = undefined
            this.resetDraggableLink()
            this.init()
        },
        resetGraph(): void {
            this.graph = new Graph()
            this.graphHasNodes = false
            this.resetView()
        },
    },
})
</script>

<style lang="scss">
.graph-host {
    width: 100%;
    height: 100%;
    touch-action: none;
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
