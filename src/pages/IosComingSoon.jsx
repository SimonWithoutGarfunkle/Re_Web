import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Apple from '@mui/icons-material/Apple';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { sendContact } from '../api/contact';

export default function IosComingSoon() {
  const [values, setValues] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (ev) =>
    setValues((prev) => ({ ...prev, [field]: ev.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError('');
    try {
      await sendContact({
        name: values.name.trim(),
        email: values.email.trim(),
        title: 'Notification iOS',
        message: "Inscrit pour être notifié de la sortie de l'application iOS.",
      });
      setSuccess(true);
      setValues({ name: '', email: '' });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'rgba(10, 15, 45, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(176, 38, 255, 0.25)',
            borderRadius: '24px',
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
            animation: 'fadeInUp 0.6s ease both',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '60%',
              background: 'radial-gradient(ellipse, rgba(176,38,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          {/* Icône + badge */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: '20px',
                background: 'rgba(176, 38, 255, 0.1)',
                border: '1px solid rgba(176, 38, 255, 0.3)',
                mb: 2,
                filter: 'drop-shadow(0 0 18px rgba(176,38,255,0.35))',
              }}
            >
              <Apple sx={{ fontSize: 38, color: 'rgba(255,255,255,0.85)' }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.3,
                  borderRadius: '20px',
                  background: 'rgba(176, 38, 255, 0.15)',
                  border: '1px solid rgba(176, 38, 255, 0.3)',
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', color: '#b026ff', fontWeight: 700, letterSpacing: '0.1em' }}>
                  BIENTÔT DISPONIBLE
                </Typography>
              </Box>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.2 }}>
              Re arrive sur{' '}
              <Box component="span" sx={{ color: '#b026ff', textShadow: '0 0 20px rgba(176,38,255,0.6)' }}>
                iPhone
              </Box>
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: 380,
                mx: 'auto',
              }}
            >
              L'application iOS prend un peu plus de temps mais elle arrive.
              Laisse-nous tes coordonnées, on te prévient dès que c'est dispo.
            </Typography>
          </Box>

          {/* Feedback */}
          {success && (
            <Alert
              severity="success"
              sx={{ mb: 3, bgcolor: 'rgba(0,200,100,0.08)', color: '#5fffaa', border: '1px solid rgba(0,200,100,0.2)' }}
            >
              Inscription confirmée ! On te préviendra dès que l'app iOS est disponible.
            </Alert>
          )}
          {serverError && (
            <Alert
              severity="error"
              sx={{ mb: 3, bgcolor: 'rgba(255,50,50,0.08)', color: '#ff8080', border: '1px solid rgba(255,50,50,0.2)' }}
            >
              {serverError}
            </Alert>
          )}

          {/* Formulaire */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Ton prénom"
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              fullWidth
              label="Adresse email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3.5 }}
            />

            <Button
              type="submit"
              variant="outlined"
              size="large"
              fullWidth
              disabled={loading || success}
              sx={{
                border: '1px solid rgba(176, 38, 255, 0.65)',
                color: '#b026ff',
                bgcolor: 'transparent',
                boxShadow: '0 0 10px rgba(176, 38, 255, 0.2)',
                fontWeight: 700,
                py: 1.4,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#b026ff',
                  bgcolor: 'rgba(176, 38, 255, 0.09)',
                  boxShadow: '0 0 22px rgba(176, 38, 255, 0.55), 0 0 45px rgba(176, 38, 255, 0.2)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#b026ff' }} /> : 'ME PRÉVENIR'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
