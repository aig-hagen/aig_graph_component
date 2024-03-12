import type { SimulationNodeDatum } from 'd3'

export interface D3Node extends SimulationNodeDatum {
    id: number
    idImported?: string | number
    x?: number
    y?: number
    fx?: number
    fy?: number
    label?: string
}

export class GraphNode implements D3Node {
    // eslint-disable-next-line no-useless-constructor
    /**
     * @param id - The internal ID which is used for node referencing.
     * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
     * @param x
     * @param y
     * @param fx
     * @param fy
     * @param label
     */
    public constructor(
        public readonly id: number,
        public idImported?: string | number,
        public x?: number,
        public y?: number,
        public fx?: number,
        public fy?: number,
        public label?: string
    ) {}
}
