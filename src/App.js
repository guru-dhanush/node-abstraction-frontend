import React, { useState, useCallback } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { useNodeDefinitions } from "./hooks/useNodeDefinitions";
import { sampleNodeDefinitions } from "./utils/constant";

function App() {
  const [nodeDefinitions, setNodeDefinitions] = useState(sampleNodeDefinitions);
  const handleAddNodeDefinition = useNodeDefinitions(setNodeDefinitions);

  return (
    <div>
      <PipelineToolbar nodeDefinitions={nodeDefinitions}  onSubmit={handleAddNodeDefinition}  />
      <PipelineUI nodeDefinitions={nodeDefinitions} />
    </div>
  );
}

export default App;
