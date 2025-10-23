"use client";

import {
  Box,
  useMediaQuery,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import theme from "@/theme/theme";

interface TwoColumnLayoutProps {
  form: ReactNode;
  content: ReactNode;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  fixedHeight?: string | number;
  fixedWidth?: string | number;
}

export default function TwoColumnLayout({
  form,
  content,
  loading = false,
  empty = false,
  emptyMessage = "No data found.",
  fixedHeight,
  fixedWidth,
}: TwoColumnLayoutProps) {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const flexDirection = isDesktop ? "row" : "column";

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 8 },
        maxWidth: 1400,
        mx: "auto",
        width: fixedWidth || "100%",
        height: fixedHeight || "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection,
          alignItems: "stretch",
          gap: { xs: 4, md: theme.spacing(6) },
          flexGrow: 1,
          height: "100%",
        }}
      >
        {/* Left: Form */}
        <Box
          sx={{
            flex: isDesktop ? 1 : "none",
            width: { xs: "100%", md: "auto" },
            minWidth: { xs: "100%", md: 400 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {form}
        </Box>

        {/* Right: Table/Grid/Etc */}
        <Box
          sx={{
            flex: isDesktop ? 2 : "none",
            width: { xs: "100%", md: "auto" },
            mt: isDesktop ? 0 : 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            height: isDesktop ? "100%" : "auto",
          }}
        >
          {loading ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : empty ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                {emptyMessage}
              </Typography>
            </Box>
          ) : (
            content
          )}
        </Box>
      </Box>
    </Box>
  );
}
