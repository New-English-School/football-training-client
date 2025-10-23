"use client";

import React, { JSX } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";

export type NavItem = { label: string; path: string };

interface MobileDrawerProps {
  navItems: ReadonlyArray<NavItem>;
  onClose: () => void;
}

export default function MobileDrawer({
  navItems,
  onClose,
}: MobileDrawerProps): JSX.Element {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
      role="presentation"
      aria-label="mobile navigation"
    >
      {/* Drawer Header */}
      <Box
        sx={{
          py: 3,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          href="/"
          onClick={onClose}
          sx={{
            textDecoration: "none",
            color: theme.palette.primary.main,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Football Manager
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, py: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={onClose}
                sx={{
                  py: 1.5,
                  px: 3,
                  textAlign: "left",
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  backgroundColor: isActive
                    ? theme.palette.action.selected
                    : "transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 15,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.secondary,
          fontSize: 13,
        }}
      >
        &copy; {new Date().getFullYear()} Football Manager
      </Box>
    </Box>
  );
}
