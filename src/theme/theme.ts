import {
  createTheme,
  responsiveFontSizes,
  CSSObject,
  Theme,
} from "@mui/material/styles";

const lightPalette = {
  primary: { main: "#6c63ff" },
  secondary: { main: "#ff6b6b" },
  info: { main: "#4cc9f0" },
  success: { main: "#38b000" },
  warning: { main: "#f4a261" },
  background: { default: "#fdfcfb", paper: "#ffffff" },
  text: { primary: "#1e293b", secondary: "#64748b" },
};

const darkPalette = {
  primary: { main: "#6c63ff" },
  secondary: { main: "#ff6b6b" },
  info: { main: "#4cc9f0" },
  success: { main: "#38b000" },
  warning: { main: "#f4a261" },
  background: {
    default: "#1c1c1e",
    paper: "#2c2c2e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#d1d1d6",
  },
  divider: "rgba(255,255,255,0.15)",
};

const baseThemeOptions = {
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
    button: { textTransform: "none" as const, fontWeight: 500 },
  },
  shape: { borderRadius: 16 },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        } as CSSObject,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          textTransform: "none" as const,
          "&:hover": {
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          },
        } as CSSObject,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "& fieldset": {
              borderColor: theme.palette.mode === "dark" ? "#555" : "#cbd5e1",
              borderWidth: 1.5,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
          },
          "& input": {
            color: theme.palette.text.primary,
          },
          "& label": {
            color: theme.palette.text.secondary,
          },
        }),
      },
    },
  },
  shadows: ["none", "0 4px 20px rgba(0,0,0,0.08)", ...Array(23).fill("none")],
};

const shadows = [
  "none",
  "0 4px 20px rgba(0,0,0,0.08)",
  "0 1px 3px rgba(0,0,0,0.12)",
  "0 1px 5px rgba(0,0,0,0.12)",
  "0 2px 4px rgba(0,0,0,0.12)",
  "0 2px 8px rgba(0,0,0,0.12)",
  "0 3px 6px rgba(0,0,0,0.12)",
  "0 3px 10px rgba(0,0,0,0.12)",
  "0 4px 12px rgba(0,0,0,0.12)",
  "0 5px 15px rgba(0,0,0,0.12)",
  "0 6px 18px rgba(0,0,0,0.12)",
  "0 7px 21px rgba(0,0,0,0.12)",
  "0 8px 24px rgba(0,0,0,0.12)",
  "0 9px 27px rgba(0,0,0,0.12)",
  "0 10px 30px rgba(0,0,0,0.12)",
  "0 11px 33px rgba(0,0,0,0.12)",
  "0 12px 36px rgba(0,0,0,0.12)",
  "0 13px 39px rgba(0,0,0,0.12)",
  "0 14px 42px rgba(0,0,0,0.12)",
  "0 15px 45px rgba(0,0,0,0.12)",
  "0 16px 48px rgba(0,0,0,0.12)",
  "0 17px 51px rgba(0,0,0,0.12)",
  "0 18px 54px rgba(0,0,0,0.12)",
  "0 19px 57px rgba(0,0,0,0.12)",
  "0 20px 60px rgba(0,0,0,0.12)",
] as [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: lightPalette,
    shadows,
  })
);

const darkTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: darkPalette,
    shadows,
  })
);

export { lightTheme, darkTheme };

export default lightTheme;
