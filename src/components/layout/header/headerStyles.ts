import { SxProps, Theme } from "@mui/material";

export const headerStyles: Record<string, SxProps<Theme>> = {
  toolbar: (theme: Theme) => ({
    justifyContent: "space-between",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: theme.spacing(8),
  }),
  desktopNav: (theme: Theme) => ({
    display: { xs: "none", md: "flex" },
    gap: theme.spacing(2),
  }),
  navButton: (theme: Theme) => ({
    color: theme.palette.common.white,
    textTransform: "none",
    fontWeight: 500,
    minWidth: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }),
  drawerBox: (theme: Theme) => ({
    textAlign: "center",
    width: theme.spacing(32),
  }),
  drawerLogo: (theme: Theme) => ({
    marginBottom: theme.spacing(4),
  }),
};
