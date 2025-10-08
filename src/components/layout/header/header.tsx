"use client";

import React, { useState } from "react";
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
import NextLink from "next/link";
import { headerStyles } from "./headerStyles";

const navItems = [
  { label: "Calendar", path: "/calendar" },
  { label: "Teams", path: "/teams" },
  { label: "Students", path: "/students" },
  { label: "Coaches", path: "/coaches" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={headerStyles.drawerBox} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={headerStyles.drawerLogo}>
        Football Manager
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NextLink}
              href={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary" sx={{ boxShadow: "none" }}>
        <Container maxWidth="lg">
          <Toolbar sx={headerStyles.toolbar}>
            {/* Logo */}
            <Typography variant="h6" component="div">
              Football Manager
            </Typography>

            {/* Desktop Nav */}
            <Box sx={headerStyles.desktopNav}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={NextLink}
                  href={item.path}
                  sx={headerStyles.navButton}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Burger */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
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
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
