import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BrushIcon from '@mui/icons-material/Brush';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';

const DEVS = [
  {
    initials: 'FL',
    name: 'Florent',
    role: 'Co-fondateur · Lead Dev Frontend',
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.3)',
    borderColor: 'rgba(0, 229, 255, 0.3)',
    bio: "Cinéphile obsessionnel et passionné d'UX, Florent est à l'origine de RE:. Son constat : les réseaux actuels noient les recommandations dans trop de bruit. RE: est né d'une envie simple : retrouver des échanges culturels qui ont du sens.",
    anecdote: "« J'en avais marre de perdre des bonnes recos dans des feeds interminables. »",
    tags: [
      { label: 'React / Vite', Icon: CodeIcon },
      { label: 'React Native', Icon: PhoneIphoneIcon },
      { label: 'UI / UX Design', Icon: BrushIcon },
    ],
    delay: '0s',
  },
  {
    initials: 'SB',
    name: 'Simon',
    role: 'Co-fondateur · Lead Dev Backend',
    color: '#ff00c8',
    glowColor: 'rgba(255, 0, 200, 0.3)',
    borderColor: 'rgba(255, 0, 200, 0.3)',
    bio: "Passionné de séries et de lecture, Simon construit les fondations de RE:. Son rôle : rendre l'expérience fluide, fiable et durable, sans compromis sur la simplicité. Parce qu'un bon produit, ça doit tenir dans le temps.",
    anecdote: "« Si l'app disparaît, tes recos disparaissent. Donc elle ne doit jamais tomber. »",
    tags: [
      { label: 'Node.js / API', Icon: StorageIcon },
      { label: 'PostgreSQL', Icon: StorageIcon },
      { label: 'Sécurité & Infra', Icon: SecurityIcon },
      { label: 'Cloud / Docker', Icon: CloudIcon },
    ],
    delay: '0.15s',
  },
];

export default function DevsSection() {
  return (
    <Box
      id="developpeurs"
      sx={{ py: { xs: 8, md: 10 } }}
    >
      <Container maxWidth="lg">

        {/* Section title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 700, mb: 1.5 }}
          >
            Les{' '}
            <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
              Développeurs
            </Box>
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', maxWidth: 480, mx: 'auto' }}>
            Deux devs, une frustration simple : ne jamais savoir quoi regarder ou lire malgré trop de choix.
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              mx: 'auto',
              mt: 2,
              background: 'linear-gradient(90deg, #00e5ff, #ff00c8)',
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Dev cards */}
        <Grid container spacing={4} justifyContent="center">
          {DEVS.map((dev) => (
            <Grid key={dev.name} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${dev.borderColor}`,
                  animation: 'fadeInUp 0.6s ease both',
                  animationDelay: dev.delay,
                  '&:hover': {
                    border: `1px solid ${dev.color}`,
                    boxShadow: `0 0 30px ${dev.glowColor}, 0 8px 32px rgba(0,0,0,0.45)`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

                  {/* Avatar + name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '18px',
                        background: `radial-gradient(circle at 30% 30%, ${dev.color}55, rgba(10,15,40,0.8))`,
                        border: `1.5px solid ${dev.color}`,
                        boxShadow: `0 0 18px ${dev.glowColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: dev.color }}>
                        {dev.initials}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>
                        {dev.name}
                      </Typography>
                      <Typography sx={{ color: dev.color, fontSize: '0.8rem', fontWeight: 500 }}>
                        {dev.role}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Divider */}
                  <Box sx={{ height: '1px', background: `linear-gradient(90deg, ${dev.color}40, transparent)` }} />

                  {/* Bio */}
                  <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontSize: '0.9rem', flex: 1 }}>
                    {dev.bio}
                  </Typography>

                  {/* Quote */}
                  <Box
                    sx={{
                      borderLeft: `2px solid ${dev.color}`,
                      pl: 2,
                      py: 0.5,
                      background: `linear-gradient(90deg, ${dev.glowColor.replace('0.3', '0.06')}, transparent)`,
                      borderRadius: '0 8px 8px 0',
                    }}
                  >
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                      {dev.anecdote}
                    </Typography>
                  </Box>

                  {/* Tech tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                    {dev.tags.map((tag) => (
                      <Chip
                        key={tag.label}
                        label={tag.label}
                        size="small"
                        icon={<tag.Icon sx={{ fontSize: '14px !important', color: `${dev.color} !important` }} />}
                        sx={{
                          bgcolor: `${dev.glowColor.replace('0.3', '0.1')}`,
                          border: `1px solid ${dev.color}40`,
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
