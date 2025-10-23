"use client";

import { Modal, Box, Typography } from "@mui/material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName?: string;
}

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  entityName = "item",
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", md: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" textAlign="center">
          Are you sure you want to delete this {entityName}?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Box
            component="button"
            onClick={onConfirm}
            sx={{
              px: 3,
              py: 1,
              bgcolor: "error.main",
              color: "white",
              border: "none",
              borderRadius: 1,
              cursor: "pointer",
            }}
          >
            Yes
          </Box>
          <Box
            component="button"
            onClick={onClose}
            sx={{
              px: 3,
              py: 1,
              bgcolor: "grey.300",
              border: "none",
              borderRadius: 1,
              cursor: "pointer",
            }}
          >
            No
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
