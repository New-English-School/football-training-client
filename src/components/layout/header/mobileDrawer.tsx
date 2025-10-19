"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { usePathname } from "next/navigation";
import { headerStyles } from "./headerStyles";

export type NavItem = { label: string; path: string };

interface MobileDrawerProps {
  navItems: ReadonlyArray<NavItem>;
  onClose: () => void;
}

export default function MobileDrawer({ navItems, onClose }: MobileDrawerProps): JSX.Element {
  const pathname = usePathname();

  return (
    <Box
      sx={headerStyles.drawerBox}
      onClick={onClose}
      role="presentation"
      aria-label="mobile navigation"
    >
      {/* Drawer Logo */}
      <Typography variant="h6" sx={headerStyles.drawerLogo}>
        <Typography
          component={Link}
          href="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Football Manager
        </Typography>
      </Typography>

      {/* Navigation Items */}
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.label}>
            <ListItemButton
              component={Link}
              href={item.path}
              onClick={onClose}
              sx={{
                textAlign: "center",
                ...(pathname === item.path ? { fontWeight: 700 } : {}),
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
