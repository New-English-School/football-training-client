"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { footerStyles } from "./footerStyles";

export default function Footer() {
  return (
    <Box component="footer" sx={footerStyles.footerContainer}>
      <Box sx={footerStyles.maxWidthBox}>
        {/* Copyright */}
        <Typography variant="body2" sx={footerStyles.copyright}>
          &copy; {new Date().getFullYear()} Football Manager. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
}
