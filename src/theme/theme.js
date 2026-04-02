import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b026ff',
      light: '#cc5eff',
      dark: '#7a00cc',
    },
    secondary: {
      main: '#00e5ff',
      light: '#6effff',
      dark: '#00b2cc',
    },
    success: {
      main: '#00c853',
      light: '#00e676',
      dark: '#009624',
      contrastText: '#000000',
    },
    background: {
      default: '#050815',
      paper: 'rgba(10, 15, 40, 0.85)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 700,
          textTransform: 'none',
          padding: '10px 28px',
          fontSize: '0.95rem',
          transition: 'all 0.3s ease',
          letterSpacing: '0.03em',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #b026ff 0%, #6a1aff 100%)',
          boxShadow: '0 0 18px rgba(176, 38, 255, 0.45), inset 0 0 0 1px rgba(255,255,255,0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #cc5eff 0%, #8a3aff 100%)',
            boxShadow: '0 0 30px rgba(176, 38, 255, 0.75), 0 0 60px rgba(176, 38, 255, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          border: '1px solid rgba(176, 38, 255, 0.7)',
          color: '#cc5eff',
          boxShadow: '0 0 10px rgba(176, 38, 255, 0.2)',
          '&:hover': {
            borderColor: '#b026ff',
            backgroundColor: 'rgba(176, 38, 255, 0.08)',
            boxShadow: '0 0 20px rgba(176, 38, 255, 0.5)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedSecondary: {
          border: '1px solid rgba(0, 229, 255, 0.6)',
          color: '#00e5ff',
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.15)',
          '&:hover': {
            borderColor: '#00e5ff',
            backgroundColor: 'rgba(0, 229, 255, 0.08)',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
          boxShadow: '0 0 18px rgba(0, 200, 83, 0.45)',
          color: '#000000',
          fontWeight: 800,
          '&:hover': {
            background: 'linear-gradient(135deg, #00e676 0%, #69f0ae 100%)',
            boxShadow: '0 0 30px rgba(0, 230, 118, 0.7)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedSuccess: {
          border: '1px solid rgba(0, 200, 83, 0.7)',
          color: '#00e676',
          '&:hover': {
            borderColor: '#00e676',
            backgroundColor: 'rgba(0, 200, 83, 0.08)',
            boxShadow: '0 0 20px rgba(0, 200, 83, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 15, 50, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(176, 38, 255, 0.25)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(176, 38, 255, 0.55)',
            boxShadow: '0 0 25px rgba(176, 38, 255, 0.2), 0 8px 32px rgba(0,0,0,0.4)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(176, 38, 255, 0.35)',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(176, 38, 255, 0.7)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b026ff',
              boxShadow: '0 0 10px rgba(176, 38, 255, 0.35)',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#b026ff',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(5, 8, 21, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(176, 38, 255, 0.15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

export default theme;
