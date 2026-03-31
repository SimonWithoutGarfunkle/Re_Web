import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const magentaButtonSx = {
  border: '1px solid rgba(255, 0, 200, 0.65)',
  color: '#ff00c8',
  bgcolor: 'transparent',
  boxShadow: '0 0 10px rgba(255, 0, 200, 0.2)',
  fontWeight: 700,
  fontSize: '1rem',
  py: 1.4,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#ff00c8',
    bgcolor: 'rgba(255, 0, 200, 0.09)',
    boxShadow: '0 0 22px rgba(255, 0, 200, 0.55), 0 0 45px rgba(255, 0, 200, 0.2)',
    color: '#ff40d8',
    transform: 'translateY(-1px)',
  },
};

export default function Register() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (vals) => {
    const e = {};
    if (!vals.name.trim()) e.name = 'Nom requis';
    if (!vals.email) e.email = 'Email requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Email invalide';
    if (!vals.password) e.password = 'Mot de passe requis';
    else if (vals.password.length < 6) e.password = 'Minimum 6 caractères';
    return e;
  };

  const handleChange = (field) => (ev) => {
    const next = { ...values, [field]: ev.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    // Pas d'appel API — statique
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
            border: '1px solid rgba(255, 0, 200, 0.2)',
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
              background: 'radial-gradient(ellipse, rgba(255,0,200,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          {/* Logo + titre */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src="/logo_re_detour.png"
              alt="RE:"
              sx={{
                width: 56,
                height: 56,
                mb: 1.5,
                filter: 'drop-shadow(0 0 12px rgba(255,0,200,0.55))',
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
                Rejoins
              </Box>{' '}
              le Cercle
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
              Crée ton espace privé en quelques secondes
            </Typography>
          </Box>

          {/* Formulaire */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Nom"
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              error={Boolean(errors.name)}
              helperText={errors.name}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
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
              error={Boolean(errors.email)}
              helperText={errors.email}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              value={values.password}
              onChange={handleChange('password')}
              error={Boolean(errors.password)}
              helperText={errors.password || 'Minimum 6 caractères'}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
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
              sx={{ ...magentaButtonSx, mb: 2.5 }}
            >
              S'INSCRIRE
            </Button>

            <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
              Déjà un compte ?{' '}
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                sx={{
                  color: '#00e5ff',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': { color: '#6effff', textShadow: '0 0 10px rgba(0,229,255,0.5)' },
                }}
              >
                Se connecter
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
