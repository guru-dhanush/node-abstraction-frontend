import BasicModalDialog from "./components/ui/BasicModalDialog";
import { DraggableNode } from "./draggableNode";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import DynamicNodeForm from "./components/nodeGeneration/DynamicNodeForm";

export const PipelineToolbar = ({ nodeDefinitions, onSubmit }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Node
        </Button>
        <BasicModalDialog open={open} setOpen={setOpen}>
          <DynamicNodeForm onSubmit={onSubmit} />
        </BasicModalDialog>
        {nodeDefinitions.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </div>
  );
};
