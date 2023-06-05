import { useEffect, useRef } from "react";
import { defineGraphConfig, Graph, GraphController } from "d3-graph-controller";
import "./graph.css";

interface GraphProps {
    graph: Graph;
}

const GraphContainer = ({ graph }: GraphProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const controller = new GraphController(
                containerRef.current,
                graph,
                defineGraphConfig({})
            );

            return () => {
                controller.shutdown();
            };
        }
    }, [graph]);

    return <div ref={containerRef} id="graph" />;
};

export default GraphContainer;
