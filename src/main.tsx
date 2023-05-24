import React from "react";
import ReactDOM from "react-dom/client";
import GraphComponent from "./components/graph/GraphComponent.tsx";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GraphComponent />
    </React.StrictMode>
);
