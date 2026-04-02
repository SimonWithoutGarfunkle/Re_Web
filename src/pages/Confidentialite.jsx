import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const SECTIONS = [
  {
    title: '1. Données collectées',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: '2. Finalités du traitement',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: '3. Base légale',
    content:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    title: '4. Durée de conservation',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: '5. Vos droits',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: '6. Cookies',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: '7. Contact',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export default function Confidentialite() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: { xs: 6, md: 8 }, pb: 12 }}>
      <Container maxWidth="md">
        <Box sx={{ animation: 'fadeInUp 0.6s ease both' }}>

          {/* Header */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
            >
              Politique de{' '}
              <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
                Confidentialité
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              Dernière mise à jour : avril 2026
            </Typography>
            <Box
              sx={{
                mt: 2,
                width: 50,
                height: 3,
                background: 'linear-gradient(90deg, #00e5ff, #ff00c8)',
                borderRadius: '2px',
              }}
            />
          </Box>

          {/* Sections */}
          <Box
            sx={{
              background: 'rgba(10, 15, 45, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 0, 200, 0.12)',
              borderRadius: '20px',
              px: { xs: 3, sm: 5 },
              py: { xs: 4, sm: 5 },
            }}
          >
            {SECTIONS.map((section, i) => (
              <Box key={i}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1rem', mb: 1.5, color: '#fff' }}
                >
                  {section.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.8,
                    fontSize: '0.92rem',
                  }}
                >
                  {section.content}
                </Typography>
                {i < SECTIONS.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 3 }} />
                )}
              </Box>
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
