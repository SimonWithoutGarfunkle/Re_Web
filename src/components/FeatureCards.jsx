import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';

const FEATURES = [
  {
    type: 'logo',
    title: "Re: C'est Quoi ?",
    description:
      "Un réseau social privé de découvertes culturelles. Films, séries, livres — partage ce qui te passionne avec ceux qui comptent.",
    color: '#b026ff',
    glowColor: 'rgba(176, 38, 255, 0.35)',
    borderColor: 'rgba(176, 38, 255, 0.4)',
    delay: '0s',
  },
  {
    type: 'icon',
    Icon: SecurityIcon,
    title: 'Un Cercle Privé',
    description:
      'Partage tes passions uniquement avec tes amis proches. Confidentialité totale, zéro algorithme, zéro publicité.',
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.3)',
    borderColor: 'rgba(0, 229, 255, 0.35)',
    delay: '0.15s',
  },
  {
    type: 'icon',
    Icon: CodeIcon,
    title: 'Qui Suis-Je ?',
    description:
      "Découvre le développeur passionné derrière l'appli, son parcours et sa vision d'un réseau social différent.",
    color: '#ff00c8',
    glowColor: 'rgba(255, 0, 200, 0.3)',
    borderColor: 'rgba(255, 0, 200, 0.35)',
    delay: '0.3s',
  },
];

export default function FeatureCards() {
  return (
    <Box
      id="projet"
      sx={{
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">

        {/* Section title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Pourquoi{' '}
            <Box component="span" sx={{ color: '#00e5ff', textShadow: '0 0 18px rgba(0,229,255,0.6)' }}>
              RE:
            </Box>{' '}
            ?
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              mx: 'auto',
              background: 'linear-gradient(90deg, #b026ff, #00e5ff)',
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Cards grid */}
        <Grid container spacing={3}>
          {FEATURES.map((feature, i) => (
            <Grid key={i} size={{ xs: 12, sm: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${feature.borderColor}`,
                  animation: `fadeInUp 0.6s ease both`,
                  animationDelay: feature.delay,
                  '&:hover': {
                    border: `1px solid ${feature.color}`,
                    boxShadow: `0 0 28px ${feature.glowColor}, 0 8px 32px rgba(0,0,0,0.45)`,
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, flex: 1, display: 'flex', flexDirection: 'column' }}>

                  {/* Icon container */}
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: '16px',
                      background: `radial-gradient(circle, ${feature.glowColor} 0%, rgba(10,15,40,0.6) 100%)`,
                      border: `1px solid ${feature.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      boxShadow: `0 0 16px ${feature.glowColor}`,
                    }}
                  >
                    {feature.type === 'logo' ? (
                      <Box
                        component="img"
                        src="/logo_re_detour.png"
                        alt="RE:"
                        sx={{
                          width: 34,
                          height: 34,
                          filter: `drop-shadow(0 0 6px ${feature.color})`,
                        }}
                      />
                    ) : (
                      <feature.Icon sx={{ fontSize: 28, color: feature.color }} />
                    )}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      mb: 1.5,
                      color: '#fff',
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.7,
                      fontSize: '0.88rem',
                      flex: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
