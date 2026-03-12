import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MovieIcon from '@mui/icons-material/Movie';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const PILLARS = [
  {
    Icon: LockIcon, color: '#a855f7',
    title: 'Intimité totale',
    body: 'Pas de flux public, pas de "likes" visibles par tous. RE: fonctionne uniquement en cercle fermé — vous choisissez qui voit vos recommandations.',
  },
  {
    Icon: MovieIcon, color: '#22d3ee',
    title: 'Culture sans frontières',
    body: 'Films, séries, livres, podcasts, jeux vidéo… Tout ce qui vous passionne peut être partagé et commenté dans votre groupe.',
  },
  {
    Icon: GroupIcon, color: '#4ade80',
    title: 'Des liens authentiques',
    body: "L'objectif n'est pas d'accumuler des followers, mais de renforcer les liens avec les gens qui comptent vraiment pour vous.",
  },
];

const ROADMAP = [
  { done: true,  label: 'v0.1',  desc: 'Prototype — Listes de films et séries entre amis' },
  { done: true,  label: 'v0.2',  desc: 'Ajout des livres et des quizzes culturels du jour' },
  { done: true,  label: 'v0.3',  desc: "Système de cercles privés et gestion des invitations" },
  { done: false, label: 'v0.4',  desc: 'Notifications en temps réel et fil d\'activité' },
  { done: false, label: 'v0.5',  desc: 'Recommandations basées sur vos goûts communs' },
  { done: false, label: 'v1.0',  desc: 'Lancement public — iOS & Android' },
];

const STACK = ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'AWS S3', 'Expo', 'TypeScript', 'GraphQL'];

export default function ProjetPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 7, sm: 9 },
          px: { xs: 2, sm: 3 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '60%',
          background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(168,85,247,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <Container maxWidth="md">
          <Chip
            label="Le Projet"
            icon={<TipsAndUpdatesIcon sx={{ fontSize: 16 }} />}
            sx={{
              mb: 3,
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.4)',
              color: '#d8b4fe',
              fontWeight: 600,
              fontSize: '0.8rem',
              '& .MuiChip-icon': { color: '#d8b4fe' },
            }}
          />
          <Typography
            component="h1"
            className="anim-fade-up"
            sx={{ fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2.5 }}
          >
            Pourquoi{' '}
            <Box component="span" sx={{ color: '#a855f7', textShadow: '0 0 25px rgba(168,85,247,0.5)' }}>
              RE:
            </Box>
            {' '}existe
          </Typography>
          <Typography
            className="anim-fade-up anim-delay-1"
            sx={{
              color: 'rgba(248,250,252,0.62)',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
              lineHeight: 1.8,
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            Un soir de 2022, frustré de ne plus savoir ce que mes amis regardaient,
            j&apos;ai cherché une app pour partager des recommandations en privé.
            Elle n&apos;existait pas. Alors je l&apos;ai construite.
          </Typography>
        </Container>
      </Box>

      {/* ══ GENESE ════════════════════════════════════════════════ */}
      <Box component="section" sx={{ py: { xs: 7, sm: 9 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, fontWeight: 700, mb: 2.5, color: '#d8b4fe' }}>
                La genèse du projet
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  "Les réseaux sociaux grand public sont bruyants. L'algorithme décide ce que vous voyez, pas vos amis. Les vraies recommandations — celles qui viennent du cœur — se perdent dans le flux.",
                  "RE: est né d'une conviction simple : vos proches ont un meilleur goût que n'importe quel algorithme. Une série conseillée par un ami vaut infiniment plus qu'une suggestion auto-générée.",
                  "L'application est pensée pour être radicalement simple. Pas de métriques d'engagement, pas de publicité, pas de manipulation. Juste vous, vos amis, et vos découvertes culturelles.",
                ].map((text, i) => (
                  <Typography
                    key={i}
                    sx={{ color: 'rgba(248,250,252,0.65)', lineHeight: 1.8, fontSize: { xs: '0.92rem', sm: '0.98rem' } }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: 3,
                backdropFilter: 'blur(12px)',
              }}>
                <Typography variant="overline" sx={{ color: '#a855f7', letterSpacing: '0.15em', fontSize: '0.72rem' }}>
                  En chiffres
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                  {[
                    { value: '2022', label: 'Année de lancement du projet' },
                    { value: '3+',   label: 'Années de développement actif' },
                    { value: '120+', label: 'Beta-testeurs impliqués' },
                    { value: '5K+',  label: 'Recommandations échangées en beta' },
                  ].map(({ value, label }) => (
                    <Box key={label}>
                      <Typography sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' }, fontWeight: 800, color: '#a855f7', lineHeight: 1 }}>
                        {value}
                      </Typography>
                      <Typography sx={{ color: 'rgba(248,250,252,0.5)', fontSize: '0.85rem', mt: 0.25 }}>
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ PILIERS ═══════════════════════════════════════════════ */}
      <Box component="section" sx={{
        py: { xs: 7, sm: 9 },
        px: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(168,85,247,0.1)',
        background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.04), transparent)',
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{
            fontWeight: 700, textAlign: 'center', mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.1rem' },
          }}>
            Les piliers de RE:
          </Typography>
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mb: { xs: 5, sm: 6 }, fontSize: '0.95rem' }}>
            Ce qui guide chaque décision de conception
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {PILLARS.map(({ Icon, color, title, body }, i) => (
              <Grid key={i} item xs={12} sm={4}>
                <Card className={`anim-fade-up anim-delay-${i + 1}`} sx={{ height: '100%', borderColor: `${color}33` }}>
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{
                      width: 48, height: 48, borderRadius: '12px',
                      background: `${color}18`,
                      border: `1px solid ${color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon sx={{ color, fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.05rem' } }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: '0.87rem' }}>
                      {body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ ROADMAP ═══════════════════════════════════════════════ */}
      <Box component="section" sx={{ py: { xs: 7, sm: 9 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 1, fontSize: { xs: '1.5rem', sm: '1.9rem' } }}>
            Roadmap
          </Typography>
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mb: { xs: 5, sm: 6 }, fontSize: '0.95rem' }}>
            {"L'état d'avancement du développement"}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {ROADMAP.map(({ done, label, desc }, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, py: 2.5 }}>
                  {done
                    ? <CheckCircleIcon sx={{ color: '#4ade80', mt: 0.2, flexShrink: 0 }} />
                    : <RadioButtonUncheckedIcon sx={{ color: 'rgba(248,250,252,0.2)', mt: 0.2, flexShrink: 0 }} />
                  }
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
                      <Chip
                        label={label}
                        size="small"
                        sx={{
                          background: done ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)',
                          border: `1px solid ${done ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.12)'}`,
                          color: done ? '#4ade80' : 'rgba(248,250,252,0.4)',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      />
                      {done && (
                        <Chip label="Terminé" size="small" sx={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', fontSize: '0.7rem' }} />
                      )}
                    </Box>
                    <Typography sx={{ color: done ? 'text.primary' : 'rgba(248,250,252,0.45)', fontSize: '0.93rem', lineHeight: 1.5 }}>
                      {desc}
                    </Typography>
                  </Box>
                </Box>
                {i < ROADMAP.length - 1 && <Divider sx={{ borderColor: 'rgba(168,85,247,0.1)' }} />}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══ STACK ═════════════════════════════════════════════════ */}
      <Box component="section" sx={{
        py: { xs: 7, sm: 9 },
        px: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(168,85,247,0.1)',
        background: 'rgba(168,85,247,0.03)',
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.3rem', sm: '1.6rem' } }}>
            Stack technique
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, fontSize: '0.9rem' }}>
            Les technologies qui font tourner RE:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {STACK.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                sx={{
                  background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  color: '#d8b4fe',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  px: 0.5,
                  '&:hover': { background: 'rgba(168,85,247,0.2)', borderColor: 'rgba(168,85,247,0.5)' },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══ CTA ═══════════════════════════════════════════════════ */}
      <Box component="section" sx={{ py: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <RocketLaunchIcon sx={{ fontSize: { xs: 48, sm: 56 }, color: '#a855f7', mb: 2, filter: 'drop-shadow(0 0 16px rgba(168,85,247,0.6))' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.5rem', sm: '1.9rem' } }}>
            Rejoignez l&apos;aventure
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7, fontSize: '0.95rem' }}>
            RE: est en accès anticipé. Inscrivez-vous dès maintenant pour faire partie des premiers utilisateurs et façonner le produit.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained" size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                px: 4,
                boxShadow: '0 0 24px rgba(168,85,247,0.45)',
                '&:hover': { boxShadow: '0 0 36px rgba(168,85,247,0.65)', transform: 'translateY(-1px)' },
              }}
            >
              {"Rejoindre l'accès anticipé"}
            </Button>
            <Button
              variant="outlined" size="large"
              onClick={() => navigate('/createurs')}
              sx={{ borderColor: 'rgba(248,250,252,0.3)', color: 'rgba(248,250,252,0.7)', px: 4,
                '&:hover': { borderColor: '#a855f7', color: '#d8b4fe', background: 'rgba(168,85,247,0.07)' },
              }}
            >
              {"L'équipe"}
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
