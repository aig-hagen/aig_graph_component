import * as d3 from 'd3'
import type { GraphConfiguration } from '@/model/config'
import Graph from '@/model/graph'
import { GraphLink } from '@/model/graph-link'
import { GraphNode } from '@/model/graph-node'
import type { UnwrapRef } from 'vue'

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
        .force(
            'collision',
            d3.forceCollide<GraphNode>().radius(config.nodeRadius) //stop overlapping
        )

    simulation = updateBounds(graph, simulation, width, height, config)

    simulation = setFixedLinkDistance(simulation, graph, config, config.fixedLinkDistanceEnabled)
    simulation = setNodeChargeAndAttraction(simulation, config.nodePhysicsEnabled, width, height)

    return simulation
}

export function updateBounds(
    graph: UnwrapRef<Graph> | Graph,
    simulation: Simulation,
    width: number,
    height: number,
    config: GraphConfiguration
): Simulation {
    return simulation.force('bounds', () => {
        for (const node of graph!.nodes) {
            node.x = Math.max(config.nodeRadius, Math.min(width - config.nodeRadius, node.x!))
            node.y = Math.max(config.nodeRadius, Math.min(height - config.nodeRadius, node.y!))
        }
    })
}

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

export function setFixedLinkDistance(
    simulation: Simulation,
    graph: UnwrapRef<Graph> | Graph,
    config: GraphConfiguration,
    setForces: boolean
): Simulation {
    if (setForces) {
        return simulation.force(
            'link',
            d3
                .forceLink<GraphNode, GraphLink>()
                .links(graph!.links)
                .id((d: GraphNode) => d.id)
                .distance(config.nodeRadius * 10)
        )
    } else {
        return simulation.force('link', null)
    }
}
