import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a855f7',   // violet néon
      light: '#d8b4fe',
      dark: '#7c3aed',
    },
    secondary: {
      main: '#22d3ee',   // cyan électrique
      light: '#67e8f9',
      dark: '#0891b2',
    },
    success: {
      main: '#4ade80',   // vert émeraude
      light: '#86efac',
      dark: '#16a34a',
    },
    background: {
      default: '#050010',
      paper: 'rgba(15, 0, 35, 0.65)',
    },
    text: {
      primary: '#f8fafc',
      secondary: 'rgba(248,250,252,0.6)',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        body: { overflowX: 'hidden' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontSize: '0.8rem',
          minHeight: 44,
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(168,85,247,0.2)',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'rgba(168,85,247,0.55)',
            boxShadow: '0 12px 40px rgba(168,85,247,0.2)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
            borderRadius: 10,
            '& fieldset': { borderColor: 'rgba(168,85,247,0.3)' },
            '&:hover fieldset': { borderColor: 'rgba(168,85,247,0.55)' },
            '&.Mui-focused fieldset': { borderColor: '#a855f7' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#a855f7' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(5, 0, 16, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(168,85,247,0.15)',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
