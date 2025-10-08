import { SxProps, Theme } from '@mui/material';

export const footerStyles: Record<string, SxProps<Theme>> = {
  footerContainer: (theme: Theme) => ({
    mt: 'auto',
    py: theme.spacing(4),        // 32px
    px: { xs: theme.spacing(2), md: theme.spacing(6) }, // 16px / 48px
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  maxWidthBox: () => ({
    maxWidth: 1280,
    width: '100%',
  }),
  gridContainer: (theme: Theme) => ({
    mb: theme.spacing(2),        // 16px
    justifyContent: 'center',
    textAlign: 'center',
  }),
  copyright: (theme: Theme) => ({
    textAlign: 'center',
    pt: theme.spacing(2),        // 16px
    borderTop: '1px solid rgba(255,255,255,0.2)',
    width: '100%',
  }),
};
