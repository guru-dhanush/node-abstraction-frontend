import React, { useState } from "react";
import { useStore } from "./store";
import Button from "@mui/joy/Button";
import AlertWithDecorators from "./components/ui/Alert";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [alert, setAlert] = useState(null);

  const handleClick = async () => {
    console.log({
      nodes,
      edges,
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      console.log(data);

      setAlert({
        variant: "soft",
        color: "success",
        message: `Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, Is DAG: ${data.is_dag}`,
      });
    } catch (error) {
      setAlert({
        variant: "soft",
        color: "danger",
        message: "An error occurred while submitting the data.",
      });
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="outlined" color="neutral" onClick={handleClick}>
        Submit
      </Button>

      {alert && <AlertWithDecorators alert={alert} />}
    </div>
  );
};
