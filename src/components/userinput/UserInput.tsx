import { FormEvent, useRef } from "react";

interface UserInputProps {
    handleNodeInput: (value: string) => void;
    handleLinkInput: (value: string) => void;
}

const UserInput = ({ handleNodeInput, handleLinkInput }: UserInputProps) => {
    const nodesRef = useRef<HTMLInputElement>(null);
    const linksRef = useRef<HTMLInputElement>(null);
    const graphInput = { nodes: "", links: "" };

    const handleNodeSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (nodesRef.current != null) {
            graphInput.nodes = nodesRef.current.value;
            nodesRef.current.value = "";
        }
        handleNodeInput(graphInput.nodes);
    };
    const handleLinkSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (linksRef.current != null) {
            graphInput.links = linksRef.current.value;
            linksRef.current.value = "";
        }
        handleLinkInput(graphInput.links);
    };
    return (
        <>
            <form onSubmit={handleNodeSubmit}>
                <div className="mb-3">
                    <label htmlFor="nodes" className="col-form-label-lg">
                        Nodes
                    </label>
                    <input
                        ref={nodesRef}
                        id="nodes"
                        type="text"
                        className="form-control"
                        placeholder={"Input nodes like: A, B, C, ..."}
                    />
                </div>
                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    onSubmit={handleNodeSubmit}
                >
                    +
                </button>
            </form>
            <p style={{ margin: "20px 0" }}></p>
            <form onSubmit={handleLinkSubmit}>
                <div className="mb-3">
                    <label htmlFor="links" className="col-form-label-lg">
                        Links
                    </label>
                    <input
                        ref={linksRef}
                        id="links"
                        type="text"
                        className="form-control"
                        placeholder={"Input links like A-B, B-C, A ..."}
                    />
                </div>
                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    onSubmit={handleLinkSubmit}
                >
                    +
                </button>
            </form>
        </>
    );
};

export default UserInput;
