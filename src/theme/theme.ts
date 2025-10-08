import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6c63ff" }, // playful purple-blue
    secondary: { main: "#ff6b6b" }, // warm coral pink
    info: { main: "#4cc9f0" }, // sky blue
    success: { main: "#38b000" }, // soft green
    warning: { main: "#f4a261" }, // orange beige
    background: { default: "#fdfcfb", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: 64, fontWeight: 700 }, // 8pt multiple
    h2: { fontSize: 56, fontWeight: 700 },
    h3: { fontSize: 48, fontWeight: 700 },
    h4: { fontSize: 40, fontWeight: 700 },
    h5: { fontSize: 32, fontWeight: 700 },
    h6: { fontSize: 24, fontWeight: 700 },
    body1: { fontSize: 16 }, // 8pt multiple
    body2: { fontSize: 14 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 8 }, // 8pt grid
  spacing: 8, // 1 unit = 8px
});

export default theme;
