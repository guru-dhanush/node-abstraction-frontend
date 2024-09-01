import React, { useState } from "react";
import {
  Button,
  Select,
  Option,
  FormControl,
  FormLabel,
  Box,
  DialogTitle,
  DialogContent,
  Input,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";

const DynamicNodeForm = ({ onSubmit, setOpen }) => {
  const [nodeType, setNodeType] = useState("");
  const [label, setLabel] = useState("");
  const [fields, setFields] = useState([]);
  const [handles, setHandles] = useState([]);

  const handleAddField = () => {
    setFields([
      ...fields,
      { name: "", type: "textArea", options: [], default: "" },
    ]);
  };

  const handleAddHandle = () => {
    setHandles([...handles, { type: "source", position: "Right", name: "" }]);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleHandleChange = (index, key, value) => {
    const newHandles = [...handles];
    newHandles[index][key] = value;
    setHandles(newHandles);
  };

  const handleSubmit = () => {
    const newNode = {
      type: nodeType,
      label,
      fields,
      handles,
    };
    setOpen(false);
    onSubmit(newNode);
  };

  const isSubmitDisabled = !nodeType || !label;

  return (
    <Box sx={{ width: "600px" }}>
      <DialogTitle sx={{ fontSize: "xx-large" }}>Create new node</DialogTitle>
      <DialogContent>Fill in the information of the node.</DialogContent>
      <FormControl fullWidth sx={{ marginY: 2 }}>
        <FormLabel>Node Type</FormLabel>
        <Input value={nodeType} onChange={(e) => setNodeType(e.target.value)} />
      </FormControl>
      <FormControl fullWidth sx={{ marginY: 2 }}>
        <FormLabel>Label</FormLabel>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} />
      </FormControl>

      <Box
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ marginY: 2, fontSize: "x-large" }}>Fields</FormLabel>
        <Button
          variant="outlined"
          onClick={handleAddField}
          sx={{ margin: "2 0", height: "20px", width: "150px" }}
          startDecorator={<Add />}
        >
          Add Field
        </Button>
      </Box>
      {fields.map((field, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <FormLabel>Name</FormLabel>
            <Input
              value={field.name}
              onChange={(e) => handleFieldChange(index, "name", e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <FormLabel>Type</FormLabel>
            <Select
              value={field.type}
              onChange={(e, newvalue) =>
                handleFieldChange(index, "type", newvalue)
              }
            >
              <Option value="textArea">Text Area</Option>
              <Option value="select">Select</Option>
              <Option value="checkbox">Checkbox</Option>
            </Select>
          </FormControl>
          {field.type === "select" && (
            <FormControl fullWidth sx={{ marginY: 2 }}>
              <FormLabel>Options (comma separated)</FormLabel>
              <Input
                value={field.options.join(",")}
                onChange={(e) =>
                  handleFieldChange(index, "options", e.target.value.split(","))
                }
              />
            </FormControl>
          )}
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <FormLabel>Default Value</FormLabel>
            <Input
              value={field.default}
              onChange={(e) =>
                handleFieldChange(index, "default", e.target.value)
              }
            />
          </FormControl>
        </Box>
      ))}

      {/* Handle Configuration */}
      <Box
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ marginY: 2, fontSize: "x-large" }}>Handles</FormLabel>
        <Button
          variant="outlined"
          onClick={handleAddHandle}
          sx={{ margin: "2", height: "20px", width: "150px" }}
          startDecorator={<Add />}
        >
          Add Handle
        </Button>
      </Box>
      {handles.map((handle, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <FormLabel>Name</FormLabel> {/* Added input for handle name */}
            <Input
              value={handle.name}
              onChange={(e) =>
                handleHandleChange(index, "name", e.target.value)
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <FormLabel>Type</FormLabel>
            <Select
              value={handle.type}
              onChange={(e, newvalue) =>
                handleHandleChange(index, "type", newvalue)
              }
            >
              <Option value="source">Source</Option>
              <Option value="target">Target</Option>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <FormLabel>Position</FormLabel>
            <Select
              value={handle.position}
              onChange={(e, newvalue) =>
                handleHandleChange(index, "position", newvalue)
              }
            >
              <Option value="Top">Top</Option>
              <Option value="Bottom">Bottom</Option>
              <Option value="Left">Left</Option>
              <Option value="Right">Right</Option>
            </Select>
          </FormControl>
        </Box>
      ))}

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="solid"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Create Node
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicNodeForm;
