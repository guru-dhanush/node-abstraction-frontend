import BasicModalDialog from "./components/ui/BasicModalDialog";
import { DraggableNode } from "./draggableNode";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import { SubmitButton } from "./submit";
import DynamicNodeForm from "./components/nodeGeneration/NodeForm";

export const PipelineToolbar = ({ nodeDefinitions, onSubmit }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pipeline-toolbar">
      <div className="node-container">
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Node
        </Button>
        <BasicModalDialog open={open} setOpen={setOpen}>
          <DynamicNodeForm onSubmit={onSubmit} setOpen={setOpen} />
        </BasicModalDialog>
        {nodeDefinitions.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
      <SubmitButton clssName="custom-class" />
    </div>
  );
};
