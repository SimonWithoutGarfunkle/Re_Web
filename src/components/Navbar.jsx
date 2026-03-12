import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const NAV_LINKS = [
  { label: "L'Appli",      to: '/'          },
  { label: 'Le Projet',    to: '/projet'     },
  { label: 'Les Créateurs', to: '/createurs' },
];

export default function Navbar() {
  const [drawer, setDrawer]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(5,0,16,0.92)'
            : 'rgba(5,0,16,0.6)',
          borderBottomColor: scrolled
            ? 'rgba(168,85,247,0.25)'
            : 'rgba(168,85,247,0.1)',
          transition: 'background 0.3s ease, border-bottom-color 0.3s ease',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, lg: 6 }, minHeight: { xs: 64, sm: 72 } }}>

          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', flexShrink: 0 }}
          >
            <Box sx={{
              width: 38, height: 38, borderRadius: '50%',
              border: '2px solid #a855f7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
              boxShadow: '0 0 14px rgba(168,85,247,0.5)',
            }}>
              <AutoAwesomeIcon sx={{ fontSize: 18, color: '#d8b4fe' }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', sm: '1.4rem' }, color: '#f8fafc', letterSpacing: '0.04em' }}>
              RE:
            </Typography>
          </Box>

          {/* Nav links — desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mx: 'auto' }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Box
                key={to}
                component={Link}
                to={to}
                sx={{
                  px: 2, py: 1,
                  borderRadius: 2,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive(to) ? 600 : 400,
                  color: isActive(to) ? '#f8fafc' : 'rgba(248,250,252,0.6)',
                  background: isActive(to) ? 'rgba(168,85,247,0.15)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': { color: '#f8fafc', background: 'rgba(168,85,247,0.12)' },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>

          {/* Auth buttons — desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, ml: { md: 'auto' } }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/register')}
              sx={{
                borderColor: '#4ade80',
                color: '#4ade80',
                px: 2.5,
                '&:hover': { borderColor: '#86efac', color: '#86efac', background: 'rgba(74,222,128,0.08)', boxShadow: '0 0 14px rgba(74,222,128,0.3)' },
              }}
            >
              {"S'inscrire"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'rgba(248,250,252,0.35)',
                color: 'rgba(248,250,252,0.85)',
                px: 2.5,
                '&:hover': { borderColor: '#22d3ee', color: '#22d3ee', background: 'rgba(34,211,238,0.08)', boxShadow: '0 0 14px rgba(34,211,238,0.25)' },
              }}
            >
              Se connecter
            </Button>
          </Box>

          {/* Hamburger — mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/register')}
              sx={{ borderColor: '#4ade80', color: '#4ade80', px: 1.5, fontSize: '0.75rem', minHeight: 36 }}
            >
              {"S'inscrire"}
            </Button>
            <IconButton onClick={() => setDrawer(true)} sx={{ color: '#f8fafc' }} aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }} />

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: '78vw', sm: 300 },
            background: 'rgba(5,0,16,0.98)',
            backdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(168,85,247,0.2)',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.3rem' }}>RE:</Typography>
          <IconButton onClick={() => setDrawer(false)} sx={{ color: '#f8fafc' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(168,85,247,0.2)', mb: 2 }} />
        <List disablePadding>
          {NAV_LINKS.map(({ label, to }) => (
            <ListItemButton
              key={to}
              component={Link}
              to={to}
              onClick={() => setDrawer(false)}
              selected={isActive(to)}
              sx={{
                borderRadius: 2, mb: 0.5, minHeight: 52,
                '&.Mui-selected': { background: 'rgba(168,85,247,0.15)' },
                '&:hover': { background: 'rgba(168,85,247,0.1)' },
              }}
            >
              <ListItemText primary={label} primaryTypographyProps={{ fontWeight: isActive(to) ? 600 : 400 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ borderColor: 'rgba(168,85,247,0.2)', my: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button fullWidth variant="outlined" onClick={() => { setDrawer(false); navigate('/register'); }}
            sx={{ borderColor: '#4ade80', color: '#4ade80', minHeight: 48 }}>
            {"S'inscrire"}
          </Button>
          <Button fullWidth variant="outlined" onClick={() => { setDrawer(false); navigate('/login'); }}
            sx={{ borderColor: 'rgba(248,250,252,0.35)', color: 'rgba(248,250,252,0.85)', minHeight: 48 }}>
            Se connecter
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
