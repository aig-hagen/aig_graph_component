import * as d3 from 'd3'
import type { GraphConfiguration, NodeCircle } from '@/model/config'
import Graph from '@/model/graph'
import { GraphLink } from '@/model/graph-link'
import { GraphNode } from '@/model/graph-node'
import { NodeShape } from '@/model/node-shape'
import type { UnwrapRef } from 'vue'
//@ts-ignore
import { bboxCollide } from 'd3-bboxCollide'

export type Simulation = d3.Simulation<GraphNode, GraphLink>

export function createSimulation(
    graph: UnwrapRef<Graph> | Graph,
    config: GraphConfiguration,
    width: number,
    height: number,
    onTick: () => void
): Simulation {
    let simulation = d3
        .forceSimulation<GraphNode, GraphLink>(graph!.nodes)
        .on('tick', () => onTick())

    simulation = updateCollide(simulation, graph, config)

    if (config.isCanvasBoundToView) {
        simulation = updateBounds(simulation, graph, width, height)
    }

    simulation = setFixedLinkDistance(simulation, graph, config, config.fixedLinkDistanceEnabled)
    simulation = setNodeChargeAndAttraction(simulation, config.nodePhysicsEnabled, width, height)

    return simulation
}

/**
 * Sets the collision force depending on the node shape to avoid overlapping of nodes.
 * @param simulation
 * @param graph
 * @param config
 */
export function updateCollide(
    simulation: Simulation,
    graph: UnwrapRef<Graph> | Graph,
    config: GraphConfiguration
): Simulation {
    const justCircles =
        !graph.nodes || graph.nodes.length === 0
            ? config.nodeProps.shape === NodeShape.CIRCLE
            : graph.nodes.every((node) => node.props.shape === NodeShape.CIRCLE)

    if (justCircles) {
        return simulation
            .force(
                'collideCircle',
                d3.forceCollide<GraphNode>().radius((d) => (d.props as NodeCircle).radius)
            )
            .force('collideBox', null)
    } else {
        return simulation
            .force(
                'collideBox',
                bboxCollide((d: GraphNode) => {
                    if (d.props.shape === NodeShape.CIRCLE) {
                        return [
                            [-d.props.radius, -d.props.radius],
                            [d.props.radius, d.props.radius]
                        ]
                    } else if (d.props.shape === NodeShape.RECTANGLE) {
                        return [
                            [-0.5 * d.props.width, -0.5 * d.props.height],
                            [0.5 * d.props.width, 0.5 * d.props.height]
                        ]
                    }
                })
            )
            .force('collideCircle', null)
    }
}

/**
 * Sets the bounds force to make sure, all nodes stay inside the canvas.
 * @param graph
 * @param simulation
 * @param width
 * @param height
 */
export function updateBounds(
    simulation: Simulation,
    graph: UnwrapRef<Graph> | Graph,
    width: number,
    height: number
): Simulation {
    return simulation.force('bounds', () => {
        for (const node of graph.nodes) {
            if (node.props.shape === NodeShape.CIRCLE) {
                node.x = Math.max(node.props.radius, Math.min(width - node.props.radius, node.x!))
                node.y = Math.max(node.props.radius, Math.min(height - node.props.radius, node.y!))
            } else if (node.props.shape === NodeShape.RECTANGLE) {
                node.x = Math.max(
                    0.5 * node.props.width,
                    Math.min(width - 0.5 * node.props.width, node.x!)
                )
                node.y = Math.max(
                    0.5 * node.props.height,
                    Math.min(height - 0.5 * node.props.height, node.y!)
                )
            }
        }
    })
}

/**
 * Sets the charge force so nodes are attracted towards the middle of the canvas, and they repel each other.
 * @param simulation
 * @param setForces
 * @param width
 * @param height
 */
export function setNodeChargeAndAttraction(
    simulation: Simulation,
    setForces: boolean,
    width: number,
    height: number
): Simulation {
    if (setForces) {
        return simulation
            .force('charge', d3.forceManyBody<GraphNode>().strength(-500)) //how strong they repel/attract each other
            .force('x', d3.forceX<GraphNode>(width / 2).strength(0.05)) //attract elements towards specific positions
            .force('y', d3.forceY<GraphNode>(height / 2).strength(0.05))
    } else {
        return simulation.force('charge', null).force('x', null).force('y', null)
    }
}

/**
 * Sets the link force so links have a fixed distance.
 * @param simulation
 * @param graph
 * @param config
 * @param setForces
 */
export function setFixedLinkDistance(
    simulation: Simulation,
    graph: UnwrapRef<Graph> | Graph,
    config: GraphConfiguration,
    setForces: boolean
): Simulation {
    if (setForces) {
        let distance = 0
        if (config.nodeProps.shape === NodeShape.CIRCLE) {
            distance = config.nodeProps.radius
        } else if (config.nodeProps.shape === NodeShape.RECTANGLE) {
            config.nodeProps.width < config.nodeProps.height
                ? (distance = config.nodeProps.width / 2)
                : (distance = config.nodeProps.height / 2)
        }

        return simulation.force(
            'link',
            d3
                .forceLink<GraphNode, GraphLink>()
                .links(graph!.links)
                .id((d: GraphNode) => d.id)
                .distance(distance * 10)
        )
    } else {
        return simulation.force('link', null)
    }
}
