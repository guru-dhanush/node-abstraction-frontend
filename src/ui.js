import React, { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { generateNodeComponent } from "./components/nodeGeneration/generateNodeComponent ";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  updateNodeData: state.updateNodeData,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ nodeDefinitions }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    updateNodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const nodeTypes = useMemo(() => {
    const types = {};
    nodeDefinitions.forEach((nodeDef) => {
      types[nodeDef.type] = generateNodeComponent(nodeDef, updateNodeData);
    });
    return types;
  }, [nodeDefinitions, updateNodeData]);
  console.log(nodeTypes);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { nodeType } = JSON.parse(data);
      if (!nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(nodeType); // Ensure this generates a unique ID

      const initialData = { label: nodeType };
      nodeDefinitions.forEach((nodeDef) => {
        if (nodeDef.type === nodeType) {
          nodeDef.fields.forEach((field) => {
            initialData[field.name] = field.default || "";
          });
        }
      });

      const newNode = {
        id: nodeID,
        type: nodeType,
        position,
        data: initialData,
      };

      addNode(newNode); // Ensure addNode adds to the list and does not replace it
    },
    [reactFlowInstance, getNodeID, addNode, nodeDefinitions]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: "100vw", height: "70vh", background: "#f0f0f0" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
