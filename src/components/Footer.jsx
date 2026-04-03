import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Apple from '@mui/icons-material/Apple';
import Android from '@mui/icons-material/Android';

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
          component={RouterLink}
          to="/mentions-legales"
          underline="none"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.88rem',
            transition: 'color 0.2s',
            '&:hover': { color: '#fff' },
          }}
        >
          Mentions légales
        </Link>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>|</Typography>
        <Link
          component={RouterLink}
          to="/confidentialite"
          underline="none"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.88rem',
            transition: 'color 0.2s',
            '&:hover': { color: '#fff' },
          }}
        >
          Confidentialité
        </Link>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>|</Typography>
        <Link
          component={RouterLink}
          to="/politique-contenu"
          underline="none"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.88rem',
            transition: 'color 0.2s',
            '&:hover': { color: '#fff' },
          }}
        >
          Contenu
        </Link>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>|</Typography>
        <Link
          component={RouterLink}
          to="/contact"
          underline="none"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.88rem',
            transition: 'color 0.2s',
            '&:hover': { color: '#fff' },
          }}
        >
          Contact
        </Link>
      </Box>

      {/* Right — copyright + App Store icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', mr: 0.5 }}>
          © 2026
        </Typography>
        <IconButton
          size="small"
          component={RouterLink}
          to="/ios"
          aria-label="App Store"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#fff',
              bgcolor: 'rgba(255,255,255,0.06)',
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))',
            },
          }}
        >
          <Apple sx={{ fontSize: 22 }} />
        </IconButton>
        <IconButton
          size="small"
          href="https://play.google.com/store/apps/details?id=fr.re.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Play"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#fff',
              bgcolor: 'rgba(255,255,255,0.06)',
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))',
            },
          }}
        >
          <Android sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
