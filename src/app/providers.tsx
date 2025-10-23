"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme, { darkTheme } from "../theme/theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect system dark mode preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
