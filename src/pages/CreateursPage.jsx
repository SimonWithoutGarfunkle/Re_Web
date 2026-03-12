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
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const TEAM = [
  {
    initials: 'TM',
    name: 'Thomas Marceau',
    role: 'Fondateur & Lead Dev',
    color: '#a855f7',
    bg: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    bio: "À l'origine du projet RE:, Thomas est un développeur full-stack passionné de cinéma et de littérature. Il a conçu l'architecture de l'application de A à Z et continue de l'améliorer chaque jour.",
    skills: ['React Native', 'Node.js', 'PostgreSQL', 'UI/UX'],
    fav: '"Dune" de Denis Villeneuve',
    social: { x: true, github: true, linkedin: true },
  },
  {
    initials: 'LB',
    name: 'Léa Bertrand',
    role: 'Designer UI/UX',
    color: '#22d3ee',
    bg: 'linear-gradient(135deg, #0891b2, #22d3ee)',
    bio: "Léa a façonné l'identité visuelle de RE: — de la palette de couleurs aux micro-interactions. Elle veille à ce que chaque écran soit aussi beau qu'intuitif sur mobile.",
    skills: ['Figma', 'Motion Design', 'Design System', 'Accessibilité'],
    fav: '"Shogun" — la série',
    social: { x: true, github: false, linkedin: true },
  },
  {
    initials: 'MK',
    name: 'Maxime Kohler',
    role: 'Développeur Backend',
    color: '#4ade80',
    bg: 'linear-gradient(135deg, #16a34a, #4ade80)',
    bio: "Maxime s'occupe de tout ce qui se passe côté serveur : APIs, sécurité, performance et infrastructure cloud. Féru de SF, il a intégré le projet pour voir son genre de prédilection enfin bien représenté.",
    skills: ['Go', 'Redis', 'AWS', 'GraphQL'],
    fav: '"Fondation" d\'Isaac Asimov',
    social: { x: false, github: true, linkedin: true },
  },
];

const VALUES = [
  { emoji: '🔒', title: 'Privacy first', body: "Vos données ne seront jamais revendues ni partagées. C'est une promesse, pas juste une clause CGU." },
  { emoji: '🎯', title: 'Simple par choix', body: "Nous refusons volontairement les fonctionnalités superflues. Chaque élément de l'app doit avoir un sens réel." },
  { emoji: '💜', title: 'Fait avec passion', body: "RE: est un projet personnel avant d'être un produit. Nous l'utilisons nous-mêmes chaque jour." },
];

export default function CreateursPage() {
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
          width: '70%', height: '70%',
          background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(34,211,238,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <Container maxWidth="md">
          <Chip
            label="Les Créateurs"
            icon={<GroupsIcon sx={{ fontSize: 16 }} />}
            sx={{
              mb: 3,
              background: 'rgba(34,211,238,0.12)',
              border: '1px solid rgba(34,211,238,0.35)',
              color: '#67e8f9',
              fontWeight: 600,
              fontSize: '0.8rem',
              '& .MuiChip-icon': { color: '#67e8f9' },
            }}
          />
          <Typography
            component="h1"
            className="anim-fade-up"
            sx={{ fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2.5 }}
          >
            L&apos;équipe derrière{' '}
            <Box component="span" sx={{ color: '#a855f7', textShadow: '0 0 25px rgba(168,85,247,0.5)' }}>
              RE:
            </Box>
          </Typography>
          <Typography
            className="anim-fade-up anim-delay-1"
            sx={{
              color: 'rgba(248,250,252,0.62)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.8,
              maxWidth: 580,
              mx: 'auto',
            }}
          >
            Une petite équipe de passionnés qui partage la même conviction : les meilleures recommandations viennent des gens qu&apos;on aime.
          </Typography>
        </Container>
      </Box>

      {/* ══ EQUIPE ════════════════════════════════════════════════ */}
      <Box component="section" sx={{ py: { xs: 7, sm: 9 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }} justifyContent="center">
            {TEAM.map(({ initials, name, role, color, bg, bio, skills, fav, social }, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card
                  className={`anim-fade-up anim-delay-${i + 1}`}
                  sx={{ height: '100%', borderColor: `${color}33` }}
                >
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Avatar + nom */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 60, height: 60,
                          background: bg,
                          fontSize: '1.2rem', fontWeight: 800,
                          boxShadow: `0 0 20px ${color}55`,
                          flexShrink: 0,
                        }}
                      >
                        {initials}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.05rem' }, lineHeight: 1.2 }}>
                          {name}
                        </Typography>
                        <Typography sx={{ color, fontSize: '0.82rem', fontWeight: 600, mt: 0.3 }}>
                          {role}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Bio */}
                    <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.62)', lineHeight: 1.7, fontSize: '0.87rem' }}>
                      {bio}
                    </Typography>

                    {/* Skills */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {skills.map((s) => (
                        <Chip
                          key={s} label={s} size="small"
                          sx={{
                            background: `${color}14`,
                            border: `1px solid ${color}33`,
                            color,
                            fontSize: '0.72rem', fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>

                    {/* Favori */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1.5, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <FavoriteIcon sx={{ color, fontSize: 15, mt: 0.15, flexShrink: 0 }} />
                      <Typography sx={{ color: 'rgba(248,250,252,0.5)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                        <Box component="span" sx={{ color: 'rgba(248,250,252,0.3)', mr: 0.5 }}>Favori :</Box>
                        {fav}
                      </Typography>
                    </Box>

                    {/* Socials */}
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto' }}>
                      {social.x && (
                        <IconButton size="small" href="#" sx={{ color: 'rgba(248,250,252,0.35)', '&:hover': { color: '#f8fafc' } }}>
                          <XIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                      )}
                      {social.github && (
                        <IconButton size="small" href="#" sx={{ color: 'rgba(248,250,252,0.35)', '&:hover': { color: '#f8fafc' } }}>
                          <GitHubIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                      )}
                      {social.linkedin && (
                        <IconButton size="small" href="#" sx={{ color: 'rgba(248,250,252,0.35)', '&:hover': { color: '#0A66C2' } }}>
                          <LinkedInIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ VALEURS ═══════════════════════════════════════════════ */}
      <Box component="section" sx={{
        py: { xs: 7, sm: 9 },
        px: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(168,85,247,0.1)',
        background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.04), transparent)',
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 1, fontSize: { xs: '1.5rem', sm: '1.9rem' } }}>
            Ce en quoi on croit
          </Typography>
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mb: { xs: 5, sm: 6 }, fontSize: '0.95rem' }}>
            Les valeurs qui guident chaque décision
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {VALUES.map(({ emoji, title, body }, i) => (
              <Grid key={i} item xs={12} sm={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, lineHeight: 1 }}>{emoji}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.05rem' } }}>{title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: '0.87rem' }}>{body}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ ON RECRUTE ════════════════════════════════════════════ */}
      <Box component="section" sx={{ py: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, lineHeight: 1, mb: 2 }}>🚀</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.5rem', sm: '1.9rem' } }}>
            On cherche des gens passionnés
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7, fontSize: '0.95rem' }}>
            RE: est un projet en pleine croissance. Si vous aimez la culture, le code ou le design — et que vous voulez construire quelque chose qui compte — parlez-nous.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained" size="large"
              href="mailto:hello@re-app.fr"
              sx={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                px: 4,
                boxShadow: '0 0 24px rgba(168,85,247,0.4)',
                '&:hover': { boxShadow: '0 0 36px rgba(168,85,247,0.6)', transform: 'translateY(-1px)' },
              }}
            >
              Nous contacter
            </Button>
            <Button
              variant="outlined" size="large"
              onClick={() => navigate('/projet')}
              sx={{
                borderColor: 'rgba(248,250,252,0.3)', color: 'rgba(248,250,252,0.7)', px: 4,
                '&:hover': { borderColor: '#a855f7', color: '#d8b4fe', background: 'rgba(168,85,247,0.07)' },
              }}
            >
              Voir le projet
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
