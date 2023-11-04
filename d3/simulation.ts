import * as d3 from 'd3'
import { GraphConfiguration } from '~/model/config'
import Graph from '~/model/graph'
import { Link } from '~/model/link'
import { Node } from '~/model/node'

export type Simulation = d3.Simulation<Node, Link>

export function createSimulation(
    graph: Graph,
    config: GraphConfiguration,
    width: number,
    height: number,
    onTick: () => void
): Simulation {
    return (
        d3
            .forceSimulation<Node, Link>(graph!.nodes)
            .on('tick', () => onTick())
            // .force('charge', d3.forceManyBody<Node>().strength(-500))  //how strong they repel/attract each other
            .force(
                'collision',
                d3.forceCollide<Node>().radius(config.nodeRadius) //stop overlapping
            )
            .force(
                'link',
                d3
                    .forceLink<Node, Link>() //for links to be a fixed distance apart
                    .links(graph!.links)
                    .id((d: Node) => d.id)
                    .distance(config.nodeRadius * 10)
            )
            // .force('x', d3.forceX<Node>(width / 2).strength(0.05)) //attract elements towards specific positions
            // .force('y', d3.forceY<Node>(height / 2).strength(0.05))
            .force('bounds', () => {
                for (let node of graph!.nodes) {
                    node.x = Math.max(
                        config.nodeRadius,
                        Math.min(width - config.nodeRadius, node.x!)
                    )
                    node.y = Math.max(
                        config.nodeRadius,
                        Math.min(height - config.nodeRadius, node.y!)
                    )
                }
            })
    )
}
