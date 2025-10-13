import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6c63ff" },
    secondary: { main: "#ff6b6b" },
    info: { main: "#4cc9f0" },
    success: { main: "#38b000" },
    warning: { main: "#f4a261" },
    background: { default: "#fdfcfb", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: 64, fontWeight: 700, letterSpacing: 1 },
    h2: { fontSize: 56, fontWeight: 700, letterSpacing: 0.75 },
    h3: { fontSize: 48, fontWeight: 700, letterSpacing: 0.5 },
    h4: { fontSize: 40, fontWeight: 700, letterSpacing: 0.5 },
    h5: { fontSize: 32, fontWeight: 700, letterSpacing: 0.25 },
    h6: { fontSize: 24, fontWeight: 700, letterSpacing: 0.25 },
    body1: { fontSize: 16, lineHeight: 1.6 },
    body2: { fontSize: 14, lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 16 },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          textTransform: "none",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
  shadows: [
    "none",
    "0 4px 20px rgba(0,0,0,0.08)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
});

export default theme;
