import React, { useState, useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Button,
} from "@mui/material";
import { Option, Select } from "@mui/joy";

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

    console.log(nodeDef);

    return (
      <div
        key={nodeDef}
        style={{
          padding: 10,
          border: selected ? "2px solid #0074D9" : "1px solid #bbb",
          borderRadius: 5,
          backgroundColor: "#fff",
          minWidth: 200,
        }}
      >
        <strong>{nodeDef.label}</strong>
        {nodeDef.fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <TextField
                  key={field.name}
                  label={field.name}
                  value={nodeData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                />
              );
            case "select":
              return (
                <Select
                  key={field.name}
                  label={field.name}
                  value={nodeData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                >
                  {field.options.map((option) => (
                    <Option value={option}>{option}</Option>

                    //   <MenuItem key={option} value={option}>
                    //   {option}
                    // </MenuItem>
                  ))}
                </Select>
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
      </div>
    );
  };
};
