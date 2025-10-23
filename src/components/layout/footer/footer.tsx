"use client";

import React, { JSX } from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function Footer(): JSX.Element {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        px: 4,
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.04)",
      }}
      role="contentinfo"
    >
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 400,
          letterSpacing: 0.2,
        }}
      >
        &copy; {new Date().getFullYear()}{" "}
        <Box
          component="span"
          sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
        >
          Football Manager
        </Box>{" "}
        — All rights reserved.
      </Typography>
    </Box>
  );
}
