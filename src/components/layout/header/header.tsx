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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { headerStyles } from "./headerStyles";

type NavItem = { label: string; path: string };
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
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, handleClose]);

  const drawer = (
    <Box
      sx={headerStyles.drawerBox}
      onClick={handleClose}
      role="presentation"
      aria-label="mobile navigation"
    >
      <Typography variant="h6" sx={headerStyles.drawerLogo}>
        <Link href="/" legacyBehavior passHref>
          <Typography
            component="a"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Football Manager
          </Typography>
        </Link>
      </Typography>

      <List>
        {navItems.map((item) => (
          <Link href={item.path} legacyBehavior passHref key={item.label}>
            {/* ListItem is the structural element (li), ListItemButton renders as <a> */}
            <ListItem disablePadding component="li">
              <ListItemButton
                component="a"
                onClick={handleClose}
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
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <header>
      <AppBar position="static" color="primary" sx={{ boxShadow: "none" }}>
        <Container maxWidth="lg">
          <Toolbar sx={headerStyles.toolbar}>
            {/* Logo */}
            <Link href="/" legacyBehavior passHref>
              <Typography
                variant="h6"
                component="a"
                aria-label="Football Manager Home"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                Football Manager
              </Typography>
            </Link>

            {/* Desktop Nav (hidden on small screens via headerStyles) */}
            <Box sx={headerStyles.desktopNav}>
              {navItems.map((item) => (
                <Link href={item.path} legacyBehavior passHref key={item.label}>
                  <Button
                    component="a"
                    sx={{
                      ...headerStyles.navButton,
                      ...(pathname === item.path ? { fontWeight: 700 } : {}),
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Mobile Burger */}
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
        {drawer}
      </Drawer>
    </header>
  );
}
