"use client";

import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function DynamicModal({
  open,
  onClose,
  title,
  children,
  maxWidth = "500px",
}: DynamicModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          {title && <Typography variant="h6">{title}</Typography>}
          <IconButton onClick={onClose}>
            <Typography variant="h6">✕</Typography>
          </IconButton>
        </Box>
        <Box sx={{ maxHeight: "75vh", overflowY: "auto" }}>{children}</Box>
      </Box>
    </Modal>
  );
}
