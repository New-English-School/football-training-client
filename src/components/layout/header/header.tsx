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
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const theme = useTheme();

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
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: 72,
            }}
          >
            {/* Logo / Title */}
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Football Manager
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.path}
                    sx={{
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 15,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open navigation"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={handleDrawerToggle}
              sx={{
                display: { md: "none" },
                color: theme.palette.primary.main,
              }}
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
