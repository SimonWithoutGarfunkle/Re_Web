import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Apple from '@mui/icons-material/Apple';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        py: 1.5,
        px: { xs: 2, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1,
        borderTop: '1px solid rgba(176, 38, 255, 0.12)',
        background: 'rgba(5, 8, 21, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Left — legal links */}
      <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 3 }, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link
          href="#"
          underline="none"
          sx={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.78rem',
            transition: 'color 0.2s',
            '&:hover': { color: 'rgba(255,255,255,0.85)' },
          }}
        >
          Mentions légales
        </Link>
        <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>|</Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.78rem',
            transition: 'color 0.2s',
            '&:hover': { color: 'rgba(255,255,255,0.85)' },
          }}
        >
          Politique de confidentialité
        </Link>
      </Box>

      {/* Right — copyright + App Store icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', mr: 0.5 }}>
          © 2026
        </Typography>
        <IconButton
          size="small"
          href="#"
          aria-label="App Store"
          sx={{
            color: 'rgba(255,255,255,0.45)',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#fff',
              bgcolor: 'rgba(255,255,255,0.06)',
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))',
            },
          }}
        >
          <Apple sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
