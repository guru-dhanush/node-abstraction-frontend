import React, { useState, useCallback } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { useNodeDefinitions } from "./hooks/useNodeDefinitions";

function App() {
  const [nodeDefinitions, setNodeDefinitions] = useState([
    {
      type: "Info",
      label: "Customer Info",
      fields: [
        { name: "First Name", type: "text", default: "" },
        {
          name: "File",
          type: "select",
          options: ["Text", "File"],
          default: "Text",
        },
      ],
      handles: [
        {
          name: "LLM",
          type: "target",
          position: "Right",
        },
      ],
    },
  ]);
  const handleAddNodeDefinition = useNodeDefinitions(setNodeDefinitions);

  return (
    <div>
      <PipelineToolbar
        nodeDefinitions={nodeDefinitions}
        onSubmit={handleAddNodeDefinition}
      />
      <PipelineUI nodeDefinitions={nodeDefinitions} />
    </div>
  );
}

export default App;
