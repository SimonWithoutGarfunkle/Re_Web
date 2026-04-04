import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.registered === true;
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (vals) => {
    const e = {};
    if (!vals.email) e.email = 'Email requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Email invalide';
    if (!vals.password) e.password = 'Mot de passe requis';
    return e;
  };

  const handleChange = (field) => (ev) => {
    const next = { ...values, [field]: ev.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setApiError('');
    try {
      const data = await login(values.email, values.password);
      localStorage.setItem('token', data.token ?? '');
      localStorage.setItem('refresh_token', data.refresh_token ?? '');
      localStorage.setItem('user', JSON.stringify(data.user ?? {}));
      navigate('/profile');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'rgba(10, 15, 45, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
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
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          {/* Logo + titre */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src="/logo_re_detour.png"
              alt="Re"
              sx={{ width: 56, height: 56, mb: 1.5, filter: 'drop-shadow(0 0 12px rgba(0,229,255,0.55))' }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              Se{' '}
              <Box component="span" sx={{ color: '#00e5ff', textShadow: '0 0 18px rgba(0,229,255,0.6)' }}>
                Connecter
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
              Accède à ton espace privé
            </Typography>
          </Box>

          {/* Formulaire */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {justRegistered && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.88rem' }}>
                Compte créé ! Tu peux maintenant te connecter.
              </Alert>
            )}
            {apiError && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.88rem' }}>
                {apiError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Adresse email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              error={Boolean(errors.email)}
              helperText={errors.email}
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'rgba(0,229,255,0.5)', fontSize: 20 }} />
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
              helperText={errors.password}
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'rgba(0,229,255,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3.5 }}
            />

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ mb: 2.5, py: 1.4, fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'SE CONNECTER'}
            </Button>

            <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
              Pas encore de compte ?{' '}
              <Link
                component={RouterLink}
                to="/register"
                underline="none"
                sx={{
                  color: '#ff00c8',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': { color: '#ff40d8', textShadow: '0 0 10px rgba(255,0,200,0.5)' },
                }}
              >
                S'inscrire
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
