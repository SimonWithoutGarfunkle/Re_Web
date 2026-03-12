import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import smartphone from '../assets/smartphone.png';

/* ── Feature cards data ──────────────────────────────────────── */
const FEATURES = [
  {
    Icon: AutoAwesomeIcon,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    title: 'Re: C\'est Quoi ?',
    body: 'Un réseau social privé de découvertes culturelles — films, séries, livres et bien plus.',
  },
  {
    Icon: ShieldIcon,
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.3)',
    title: 'Un Cercle Privé Ultra-Personnel',
    body: 'Partagez vos passions uniquement avec vos amis proches, loin des algorithmes intrusifs.',
  },
  {
    Icon: PersonSearchIcon,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    title: 'Qui Suis-Je ?',
    body: 'Découvrez le développeur passionné derrière l\'appli et la vision qui anime ce projet.',
  },
];

export default function AppliPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{
          pt: { xs: 5, sm: 7, md: 8 },
          pb: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3, lg: 0 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Halo violet derrière le texte */}
        <Box sx={{
          position: 'absolute',
          top: 0, left: '-10%',
          width: { xs: '120%', md: '55%' },
          height: '100%',
          background: 'radial-gradient(ellipse 60% 70% at 30% 40%, rgba(120,40,200,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 2 }} alignItems="center">

            {/* Texte */}
            <Grid item xs={12} md={6}>
              <Box
                className="anim-fade-up"
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
              >
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem', lg: '3.8rem' },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    mb: 2.5,
                  }}
                >
                  <Box component="span" sx={{ color: '#a855f7', textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
                    RE:
                  </Box>
                  {' '}La Culture,
                  <br />
                  Version{' '}
                  <Box component="span" sx={{ color: '#22d3ee', textShadow: '0 0 25px rgba(34,211,238,0.5)' }}>
                    Privée
                  </Box>
                  {' '}entre{' '}
                  <Box component="span" sx={{ color: '#d8b4fe', textShadow: '0 0 25px rgba(168,85,247,0.4)' }}>
                    Amis
                  </Box>
                  {' '}!
                </Typography>

                <Typography
                  sx={{
                    color: 'rgba(248,250,252,0.65)',
                    fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
                    lineHeight: 1.75,
                    mb: { xs: 3.5, md: 4.5 },
                    maxWidth: { xs: 480, md: '100%' },
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  Partage tes films, séries et livres favoris dans un espace privé réservé à tes proches&nbsp;!
                </Typography>

                {/* Boutons */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{
                      borderColor: 'rgba(248,250,252,0.45)',
                      color: '#f8fafc',
                      px: { xs: 3, sm: 3.5 },
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        borderColor: '#22d3ee',
                        color: '#22d3ee',
                        boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                        background: 'rgba(34,211,238,0.06)',
                      },
                    }}
                  >
                    {"Découvrir l'appli"}
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: 'linear-gradient(135deg, #16a34a 0%, #4ade80 100%)',
                      color: '#052e16',
                      fontWeight: 800,
                      px: { xs: 3, sm: 3.5 },
                      width: { xs: '100%', sm: 'auto' },
                      boxShadow: '0 0 20px rgba(74,222,128,0.35)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #15803d 0%, #86efac 100%)',
                        boxShadow: '0 0 32px rgba(74,222,128,0.55)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    Inscription
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Smartphone */}
            <Grid item xs={12} md={6}>
              <Box
                className="anim-fade-in anim-delay-2"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Box
                  component="img"
                  src={smartphone}
                  alt="Aperçu de l'application RE:"
                  sx={{
                    width: { xs: '82%', sm: '60%', md: '95%' },
                    maxWidth: { xs: 300, sm: 380, md: 540 },
                    height: 'auto',
                    filter: [
                      'drop-shadow(0 0 35px rgba(168,85,247,0.55))',
                      'drop-shadow(0 0 70px rgba(168,85,247,0.2))',
                      'drop-shadow(0 20px 60px rgba(0,0,0,0.6))',
                    ].join(' '),
                    animation: 'float 5s ease-in-out infinite',
                    '@keyframes float': {
                      '0%,100%': { transform: 'translateY(0)' },
                      '50%':     { transform: 'translateY(-14px)' },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ FEATURES ══════════════════════════════════════════════ */}
      <Box
        id="features"
        component="section"
        sx={{ py: { xs: 7, sm: 9 }, px: { xs: 2, sm: 3, lg: 0 } }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {FEATURES.map(({ Icon, color, glow, title, body }, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card
                  className={`anim-fade-up anim-delay-${i + 1}`}
                  sx={{ height: '100%', borderColor: `${color}33` }}
                >
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Icône */}
                    <Box sx={{
                      width: 50, height: 50, borderRadius: '12px',
                      background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
                      border: `1px solid ${color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 16px ${glow}`,
                    }}>
                      <Icon sx={{ color, fontSize: 26 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.05rem' }, fontWeight: 700, lineHeight: 1.3 }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: '0.88rem' }}>
                      {body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ ADMIN CTA ═════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, sm: 10, md: 12 },
          px: { xs: 2, sm: 3 },
          background: 'linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.05) 50%, transparent 100%)',
          borderTop: '1px solid rgba(168,85,247,0.12)',
          borderBottom: '1px solid rgba(168,85,247,0.12)',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3 }}>

            {/* Icône laptop avec halo pulsant */}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{
                position: 'absolute',
                width: { xs: 130, sm: 170 }, height: { xs: 130, sm: 170 },
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 65%)',
                animation: 'halo 2.8s ease-in-out infinite',
                '@keyframes halo': {
                  '0%,100%': { transform: 'scale(1)', opacity: 0.7 },
                  '50%': { transform: 'scale(1.2)', opacity: 1 },
                },
              }} />
              {/* Représentation visuelle d'un laptop avec du CSS */}
              <Box sx={{ position: 'relative', width: { xs: 90, sm: 110 }, zIndex: 1 }}>
                {/* Écran */}
                <Box sx={{
                  width: '100%',
                  aspectRatio: '16/10',
                  borderRadius: '6px 6px 0 0',
                  border: '2px solid #a855f7',
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(34,211,238,0.08) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(168,85,247,0.4), inset 0 0 20px rgba(168,85,247,0.05)',
                  mb: 0,
                }}>
                  <Typography sx={{ color: '#a855f7', fontWeight: 800, fontSize: { xs: '0.9rem', sm: '1.05rem' }, textShadow: '0 0 10px rgba(168,85,247,0.8)' }}>
                    RE:
                  </Typography>
                </Box>
                {/* Base */}
                <Box sx={{
                  width: '115%', height: { xs: 7, sm: 8 },
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  borderRadius: '0 0 3px 3px',
                  ml: '-7.5%',
                  boxShadow: '0 4px 16px rgba(168,85,247,0.4)',
                }} />
                <Box sx={{
                  width: '140%', height: { xs: 4, sm: 5 },
                  background: 'rgba(168,85,247,0.3)',
                  borderRadius: '0 0 6px 6px',
                  ml: '-20%',
                  mt: '-1px',
                }} />
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.1rem' } }}>
                Administrez Votre Compte
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.7 }}>
                Connectez-vous pour gérer votre compte, vos listes et vos préférences.
              </Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #4ade80 100%)',
                  color: '#052e16', fontWeight: 800,
                  px: 4, minWidth: { sm: 150 },
                  width: { xs: '100%', sm: 'auto' },
                  boxShadow: '0 0 20px rgba(74,222,128,0.35)',
                  '&:hover': { boxShadow: '0 0 32px rgba(74,222,128,0.55)', transform: 'translateY(-1px)' },
                }}
              >
                {"S'inscrire"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: '#22d3ee', color: '#22d3ee',
                  px: 4, minWidth: { sm: 150 },
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': { boxShadow: '0 0 20px rgba(34,211,238,0.35)', background: 'rgba(34,211,238,0.07)' },
                }}
              >
                Se connecter
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
