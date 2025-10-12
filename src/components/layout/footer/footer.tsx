"use client";

import React, { JSX } from "react";
import { Box, Typography } from "@mui/material";
import { footerStyles } from "./footerStyles";

export default function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={footerStyles.footerContainer}
      role="contentinfo"
    >
      <Box sx={footerStyles.maxWidthBox}>
        <Typography variant="body2" sx={footerStyles.copyright}>
          &copy; {new Date().getFullYear()} Football Manager. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
}
