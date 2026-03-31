import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import LockIcon from '@mui/icons-material/Lock';

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

export default function AdminSection() {
  return (
    <Box
      id="admin"
      sx={{
        py: { xs: 8, md: 10 },
        mb: 4,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            background: 'rgba(10, 15, 45, 0.6)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(176, 38, 255, 0.25)',
            borderRadius: '24px',
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 6 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            /* Inner radial glow */
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '80%',
              background:
                'radial-gradient(ellipse, rgba(176,38,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >

          {/* Laptop visual */}
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
            <LaptopMacIcon
              sx={{
                fontSize: { xs: 80, md: 100 },
                color: 'rgba(255,255,255,0.12)',
                filter: 'drop-shadow(0 0 20px rgba(176,38,255,0.3))',
              }}
            />
            {/* Lock icon on screen */}
            <Box
              sx={{
                position: 'absolute',
                top: '22%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LockIcon
                sx={{
                  fontSize: { xs: 22, md: 28 },
                  color: '#00e5ff',
                  filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))',
                  animation: 'glowPulse 2.5s ease-in-out infinite',
                }}
              />
            </Box>
          </Box>

          {/* Text */}
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.9rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Administrez Votre{' '}
            <Box component="span" sx={{ color: '#b026ff', textShadow: '0 0 18px rgba(176,38,255,0.6)' }}>
              Compte
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.95rem',
              mb: 4,
              maxWidth: 400,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Connectez-vous pour gérer votre compte, vos listes et votre cercle d'amis.
          </Typography>

          {/* CTA buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/register"
              sx={magentaButtonSx}
            >
              S'INSCRIRE
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/login"
            >
              SE CONNECTER
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
