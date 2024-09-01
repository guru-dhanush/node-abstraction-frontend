import React, { useState, useCallback } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { useNodeDefinitions } from "./hooks/useNodeDefinitions";

function App() {
  const [nodeDefinitions, setNodeDefinitions] = useState([
    {
      type: "customInput",
      label: "Input",
      fields: [
        { name: "inputName", type: "text", default: "" },
        {
          name: "inputType",
          type: "select",
          options: ["Text", "File"],
          default: "Text",
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
      <SubmitButton />
    </div>
  );
}

export default App;
