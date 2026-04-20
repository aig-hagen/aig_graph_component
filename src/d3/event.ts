import type Graph from '@/model/graph'

export enum EVENT_CAUSE {
    /**
     * Indicates that an event was caused by a user action.
     */
    USER_ACTION = 'user-action',
    /**
     * Indicates that an event was caused by a programmatic action.
     */
    PROGRAMMATIC_ACTION = 'programmatic-action'
}

export function terminate(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
}

export type PositionSnapshot = {
    nodeId: number
    x: number
    y: number
}

export function getPositionSnapshots(graph: Graph): PositionSnapshot[] {
    return graph.nodes
        .filter((node) => node.x !== undefined && node.y !== undefined)
        .map((n) => ({
            nodeId: n.id,
            x: n.x!,
            y: n.y!
        }))
}
