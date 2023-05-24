import GraphContainer from "./GraphContainer.tsx";
import {
    defineGraph,
    defineLink,
    defineNode,
    GraphLink,
    GraphNode,
} from "d3-graph-controller";
import { useState } from "react";
import UserInput from "../userinput/UserInput.tsx";

const GraphComponent = () => {
    // const [nodes, addNodes] = useState<GraphNode[]>([]);
    const [nodes, addNodes] = useState<GraphNode[]>([]);
    const [links, addLinks] = useState<GraphLink[]>([]);
    const graph = defineGraph({ nodes, links });

    const handleNewNodes = (nodesInput: string) => {
        const extractedNodesInput = nodesInput.replace(/[^A-Za-z]/g, "");
        const newNodes: GraphNode[] = [];
        for (let i = 0; i < extractedNodesInput.length; i++) {
            newNodes.push(createNewNode(extractedNodesInput[i]));
        }
        addNodes([...nodes, ...newNodes]);
    };

    const createNewNode = (nodeText: string): GraphNode => {
        return defineNode({
            type: "primary",
            id: "" + nodeText,
            label: {
                color: "black",
                fontSize: "1rem",
                text: "" + nodeText,
            },
            color: "lightsalmon",
            isFocused: false,
            size: 300,
        });
    };

    const handleNewLinks = (linksInput: string) => {
        const extractedLinksInput = linksInput
            .replace(/\s*-\s*/g, "-")
            .split(",")
            .map((pair) => pair.trim().split("-"));
        const newLinks: GraphLink[] = [];

        for (let i = 0; i < extractedLinksInput.length; i++) {
            const linkPair = extractedLinksInput[i];
            const source = nodes.find((node) => node.id === linkPair[0]);
            const target = nodes.find((node) => node.id === linkPair[1]);

            if (source && target) newLinks.push(createNewLink(source, target));
        }
        addLinks([...links, ...newLinks]);
    };

    const createNewLink = (
        linkSource: GraphNode,
        linkTarget: GraphNode
    ): GraphLink => {
        return defineLink({
            source: linkSource,
            target: linkTarget,
            color: "darkgray",
            label: false,
        });
    };

    return (
        <div className="GraphComponent">
            <UserInput
                handleNodeInput={handleNewNodes}
                handleLinkInput={handleNewLinks}
            ></UserInput>
            <GraphContainer graph={graph} />
        </div>
    );
};

export default GraphComponent;
