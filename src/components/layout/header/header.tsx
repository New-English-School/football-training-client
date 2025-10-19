"use client";

import React, { useState, useCallback, useEffect, JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { headerStyles } from "./headerStyles";
import MobileDrawer, { NavItem } from "./mobileDrawer";

const navItems: ReadonlyArray<NavItem> = [
  { label: "Calendar", path: "/calendar" },
  { label: "Teams", path: "/teams" },
  { label: "Students", path: "/students" },
  { label: "Coaches", path: "/coaches" },
];

export default function Header(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = useCallback(() => setMobileOpen((s) => !s), []);
  const handleClose = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, handleClose]);

  return (
    <header>
      <AppBar position="static" color="primary" sx={{ boxShadow: "none" }}>
        <Container maxWidth="lg">
          <Toolbar sx={headerStyles.toolbar}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
            >
              Football Manager
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={headerStyles.desktopNav}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.path}
                  sx={{
                    ...headerStyles.navButton,
                    ...(pathname === item.path ? { fontWeight: 700 } : {}),
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Burger Icon */}
            <IconButton
              color="inherit"
              aria-label="open navigation"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
        id="mobile-menu"
      >
        <MobileDrawer navItems={navItems} onClose={handleClose} />
      </Drawer>
    </header>
  );
}
