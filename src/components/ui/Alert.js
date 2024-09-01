import * as React from "react";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";

export default function AlertWithDecorators({ alert }) {
  return (
    <Box
      sx={{
        position: "fixed", 
        top: "5%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "auto"
      }}
    >
      <Alert
        variant={alert.variant || "soft"}
        color={alert.color || "neutral"}
        startDecorator={alert.startDecorator || null}
        endDecorator={alert.endDecorator || null}
      >
        {alert.message}
      </Alert>
    </Box>
  );
}
