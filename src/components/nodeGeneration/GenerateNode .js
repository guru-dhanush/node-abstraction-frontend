import React, { useState, useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";
import {
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  Typography,
  Box,
  Select,
  Option,
} from "@mui/joy";
import { FormControlLabel } from "@mui/material";
import { useStore } from "../../store";

export const generateNodeComponent = (nodeDef) => {
  return ({ id, data, selected }) => {
    const [nodeData, setNodeData] = useState(data);
    const [handles, setHandles] = useState(null);

    const { nodes, edges, updateNodeData } = useStore((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      updateNodeData: state.updateNodeData,
    }));

    useEffect(() => {
      if (handles) {
        updateNodeData(id, handles);
      }
    }, [id, handles]);

    const handleChange = useCallback((fieldName, value) => {
      setNodeData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }, []);

    // Function to extract variables from the text
    const extractVariables = (text) => {
      const variableRegex = /{{\s*(\w+)\s*}}/g;
      const variables = [];
      let match;
      while ((match = variableRegex.exec(text)) !== null) {
        variables.push(match[1]);
      }
      return variables;
    };

    // Function to update the handles based on the text
    const updateHandles = (e, fieldName) => {
      if (e.key !== "Enter") return;

      const currText = nodeData[fieldName];
      const variables = extractVariables(currText);
      console.log(variables);

      if (variables.length !== 1) return;
      const newHandles = {
        name: variables[0],
        position: Position.Left,
        type: "target",
      };
      setHandles(newHandles);
    };

    const calculateTopPosition = (index, totalHandles) => {
      return `${(index + 1) * (100 / (totalHandles + 1))}%`;
    };

    return (
      <Box
        key={nodeDef}
        sx={{
          padding: 2,
          border: selected ? "2px solid #0074D9" : "1px solid #bbb",
          borderRadius: "10px",
          backgroundColor: "#f7f9fc",
          minWidth: 240,
          minHeight: 200,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography level="h6" sx={{ mb: 2 }}>
          {nodeDef.label}
        </Typography>
        {nodeDef.fields.map((field) => {
          switch (field.type) {
            case "textArea" || "text":
              return (
                <FormControl key={field.name} sx={{ mb: 2 }}>
                  <FormLabel>{field.name}</FormLabel>
                  <Input
                    value={nodeData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onKeyDown={(e) => updateHandles(e, field.name)}
                    variant="outlined"
                    size="sm"
                  />
                </FormControl>
              );
            case "select":
              return (
                <FormControl key={field.name} sx={{ mb: 2 }}>
                  <FormLabel>{field.name}</FormLabel>
                  <Select
                    value={nodeData[field.name] || ""}
                    onChange={(e, newValue) =>
                      handleChange(field.name, newValue)
                    }
                    size="sm"
                  >
                    {field.options.map((option) => (
                      <Option value={option} key={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              );
            case "checkbox":
              return (
                <FormControlLabel
                  key={field.name}
                  control={
                    <Checkbox
                      checked={nodeData[field.name] || false}
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked)
                      }
                    />
                  }
                  label={field.name}
                  sx={{ mb: 2 }}
                />
              );
            default:
              return null;
          }
        })}
        {nodeDef.handles &&
          nodeDef.handles.map((handle, index) => (
            <Handle
              key={index}
              type={handle.type}
              style={{
                top: calculateTopPosition(index, nodeDef?.handle?.length),
              }}
              position={Position[handle.position]}
            >
              <div style={{ margin: "10px", color: "#808080		" }}>
                {handle.name}
              </div>
            </Handle>
          ))}
        {nodes
          .filter((node) => node.id === id)
          .map((node, index) => (
            <React.Fragment key={index}>
              {node?.handles?.length > 0 &&
                node.handles.map((handle, ind) => {
                  return (
                    <Handle
                      key={ind}
                      type={handle.type}
                      position={handle.position}
                      id={handle.name}
                      style={{
                        top: calculateTopPosition(index, node?.handles?.length),
                      }}
                    >
                      <div style={{ margin: "10px", color: "#808080" }}>
                        {handle.name}
                      </div>
                    </Handle>
                  );
                })}
            </React.Fragment>
          ))}
      </Box>
    );
  };
};
