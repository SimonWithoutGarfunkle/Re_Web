import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Apple from '@mui/icons-material/Apple';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GooglePlayIcon from './GooglePlayIcon';
import StoreButtons from './StoreButtons';
import { getStoreLinks } from '../utils/storeLinks';

const NAV_LINKS = [
  { label: "L'Appli", id: 'appli' },
  { label: 'Le Projet', id: 'projet' },
  { label: 'Les Développeurs', id: 'developpeurs' },
  { label: 'Soutenir', path: '/soutenir' },
];


// Bouton S'inscrire — magenta néon
const magentaButtonSx = {
  border: '1px solid rgba(255, 0, 200, 0.65)',
  color: '#ff00c8',
  bgcolor: 'transparent',
  boxShadow: '0 0 10px rgba(255, 0, 200, 0.2)',
  fontWeight: 700,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#ff00c8',
    bgcolor: 'rgba(255, 0, 200, 0.09)',
    boxShadow: '0 0 22px rgba(255, 0, 200, 0.55), 0 0 45px rgba(255, 0, 200, 0.2)',
    color: '#ff40d8',
    transform: 'translateY(-1px)',
  },
};

const PLATFORM_ICONS = { ios: Apple, android: GooglePlayIcon, desktop: FileDownloadOutlined };

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id) => {
    if (!id) return;
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const storeLinks = getStoreLinks();
  const DownloadIcon = PLATFORM_ICONS[storeLinks.platform];
  // On a phone, go straight to its store; elsewhere, show both stores and the QR code.
  const nativeStoreHref = { ios: storeLinks.apple, android: storeLinks.google }[storeLinks.platform];
  const downloadProps = nativeStoreHref
    ? { component: 'a', href: nativeStoreHref, target: storeLinks.target }
    : { onClick: () => handleNavClick('telecharger') };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 60, md: 64 } }}>

          {/* ── Logo ── */}
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
          >
            <Box
              component="img"
              src="/logo_re_detour.png"
              alt="Re logo"
              sx={{
                height: 60,
                width: 60,
                filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))',
              }}
            />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#fff',
                letterSpacing: '0.06em',
                textShadow: '0 0 14px rgba(176, 38, 255, 0.7)',
              }}
            >
              RE
            </Typography>
          </Box>

          {/* ── Desktop nav links ── */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  component={link.path ? RouterLink : 'button'}
                  to={link.path}
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 500,
                    fontSize: '0.97rem',
                    px: 2,
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%) scaleX(0)',
                      width: '60%',
                      height: '1.5px',
                      background: 'linear-gradient(90deg, #b026ff, #00e5ff)',
                      borderRadius: '2px',
                      transition: 'transform 0.25s ease',
                    },
                    '&:hover': {
                      color: '#fff',
                      bgcolor: 'rgba(176, 38, 255, 0.08)',
                      textShadow: '0 0 12px rgba(176, 38, 255, 0.7)',
                      '&::after': {
                        transform: 'translateX(-50%) scaleX(1)',
                      },
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* ── Desktop CTA buttons ── */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                {...downloadProps}
                sx={magentaButtonSx}
              >
                TÉLÉCHARGER
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to="/login"
                size="small"
              >
                SE CONNECTER
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                {...downloadProps}
                sx={{ ...magentaButtonSx, px: 1.5, py: 0.6, fontSize: '0.85rem', letterSpacing: 0, '& .MuiButton-startIcon': { mr: 0.75 } }}
              >
                Télécharger
              </Button>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: '#fff' }}
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 270,
              background: 'rgba(8, 10, 35, 0.97)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(176, 38, 255, 0.2)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(176, 38, 255, 0.15)' }} />

        <List sx={{ pt: 1 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={link.path ? RouterLink : 'button'}
                to={link.path}
                onClick={() => { handleNavClick(link.id); setDrawerOpen(false); }}
                sx={{ py: 1.5, px: 3, '&:hover': { bgcolor: 'rgba(176, 38, 255, 0.08)' } }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{ primary: { style: { fontWeight: 500, fontSize: '0.97rem' } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 2.5, mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <StoreButtons />
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/login"
            onClick={() => setDrawerOpen(false)}
            fullWidth
          >
            SE CONNECTER
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
