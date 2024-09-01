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

export const generateNodeComponent = (nodeDef, updateNodeData) => {
  return ({ id, data, selected }) => {
    const [nodeData, setNodeData] = useState(data);

    useEffect(() => {
      updateNodeData(id, nodeData);
    }, [id, nodeData, updateNodeData]);

    const handleChange = useCallback((fieldName, value) => {
      setNodeData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }, []);

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
            case "text":
              return (
                <FormControl key={field.name} sx={{ mb: 2 }}>
                  <FormLabel>{field.name}</FormLabel>
                  <Input
                    value={nodeData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    variant="outlined"
                    size="sm"
                    fullWidth
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
                    fullWidth
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
              position={Position[handle.position]}
            />
          ))}
      </Box>
    );
  };
};
