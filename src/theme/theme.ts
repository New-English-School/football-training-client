import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6c63ff" },
    secondary: { main: "#ff6b6b" },
    background: { default: "#fdfcfb", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    h1: { fontSize: "4rem", fontWeight: 700 },
    h2: { fontSize: "3.5rem", fontWeight: 700 },
    h3: { fontSize: "2.5rem", fontWeight: 700 },
    h4: { fontSize: "2rem", fontWeight: 700 },
    h5: { fontSize: "1.5rem", fontWeight: 700 },
    h6: { fontSize: "1.25rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
});

theme = responsiveFontSizes(theme);

export default theme;
