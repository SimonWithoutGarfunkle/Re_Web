import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FeatureCards from '../components/FeatureCards';
import DevsSection from '../components/DevsSection';

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

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Retry once DOM is ready
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <Box>

      {/* ════════════════════════════════
          #appli — Hero
      ════════════════════════════════ */}
      <Box
        id="appli"
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: { xs: 8, md: 6 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ animation: 'fadeInUp 0.7s ease both' }}>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              <Box
                component="span"
                sx={{ color: '#00e5ff', textShadow: '0 0 28px rgba(0,229,255,0.7)' }}
              >
                RE:
              </Box>{' '}
              La Culture,
              <Box component="span" sx={{ display: 'block' }}>
                Version{' '}
                <Box
                  component="span"
                  sx={{ color: '#ff00c8', textShadow: '0 0 28px rgba(255,0,200,0.75)' }}
                >
                  Privée
                </Box>{' '}
                entre{' '}
                <Box
                  component="span"
                  sx={{ color: '#ff00c8', textShadow: '0 0 28px rgba(255,0,200,0.75)' }}
                >
                  Amis
                </Box>{' '}
                !
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.75,
                mb: 5,
                maxWidth: 540,
                mx: 'auto',
              }}
            >
              Partage tes films, séries et livres favoris dans un espace privé réservé à tes proches.
              Zéro algorithme, zéro publicité — juste toi et tes amis.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => document.getElementById('projet')?.scrollIntoView({ behavior: 'smooth' })}
              >
                DÉCOUVRIR L'APPLI
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/register"
                sx={magentaButtonSx}
              >
                INSCRIPTION
              </Button>
            </Box>

          </Box>
        </Container>
      </Box>

      {/* ════════════════════════════════
          #projet — Le Projet
      ════════════════════════════════ */}
      <FeatureCards />

      {/* ════════════════════════════════
          #developpeurs — Les Devs
      ════════════════════════════════ */}
      <DevsSection />

    </Box>
  );
}
