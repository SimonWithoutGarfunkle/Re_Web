import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { signup } from '../api/auth';

const PASSWORD_RULES = [
  { label: '8 caractères minimum',  test: (p) => p.length >= 8 },
  { label: 'Une majuscule',   test: (p) => /[A-Z]/.test(p) },
  { label: 'Une minuscule',   test: (p) => /[a-z]/.test(p) },
  { label: 'Un chiffre',             test: (p) => /[0-9]/.test(p) },
];

function PasswordRulesHint({ password }) {
  if (!password) return null;
  return (
    <Box sx={{ mt: 1, mb: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(password);
        return (
          <Box
            key={rule.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.35,
              borderRadius: '20px',
              border: `1px solid ${ok ? 'rgba(0,200,100,0.4)' : 'rgba(255,255,255,0.12)'}`,
              bgcolor: ok ? 'rgba(0,200,100,0.07)' : 'transparent',
              transition: 'all 0.25s ease',
            }}
          >
            {ok
              ? <CheckCircleOutlineIcon sx={{ fontSize: 13, color: '#00c864' }} />
              : <RadioButtonUncheckedIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }} />
            }
            <Typography sx={{ fontSize: '0.72rem', color: ok ? '#00c864' : 'rgba(255,255,255,0.4)', transition: 'color 0.25s' }}>
              {rule.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}


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
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    telephone: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (vals) => {
    const e = {};
    if (!vals.username.trim()) e.username = "Nom d'utilisateur requis";
    else if (vals.username.trim().length < 3) e.username = 'Minimum 3 caractères';
    if (!vals.email) e.email = 'Email requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Email invalide';
    if (!vals.password) e.password = 'Mot de passe requis';
    else if (!PASSWORD_RULES.every((r) => r.test(vals.password))) e.password = 'Le mot de passe ne respecte pas les règles requises';
    if (!vals.confirmPassword) e.confirmPassword = 'Confirmation requise';
    else if (vals.password && vals.confirmPassword !== vals.password) e.confirmPassword = 'Les mots de passe ne correspondent pas';
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

    const payload = {
      username: values.username.trim(),
      email: values.email.trim(),
      password: values.password,
      // confirmPassword n'est pas envoyé à l'API
    };
    if (values.birthday) payload.birthday = values.birthday;
    if (values.telephone.trim()) payload.telephone = values.telephone.trim();

    setLoading(true);
    setApiError('');
    try {
      await signup(payload);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6, pb: 12 }}>
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
              alt="Re"
              sx={{ width: 56, height: 56, mb: 1.5, filter: 'drop-shadow(0 0 12px rgba(255,0,200,0.55))' }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
                Rejoins
              </Box>{' '}
              le Cercle
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
              Crée ton compte et retrouve-nous sur l'app
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {apiError && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.88rem' }}>
                {apiError}
              </Alert>
            )}

            {/* ── Champs obligatoires ── */}
            <TextField
              fullWidth
              label="Nom d'utilisateur"
              value={values.username}
              onChange={handleChange('username')}
              error={Boolean(errors.username)}
              helperText={errors.username}
              disabled={loading}
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
              disabled={loading}
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
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              error={Boolean(errors.password)}
              helperText={errors.password}
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 0.5 }}
            />
            <PasswordRulesHint password={values.password} />
            <Box sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3 }}
            />

            {/* ── Champs optionnels ── */}
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                mb: 2,
              }}
            >
              Optionnel
            </Typography>

            <TextField
              fullWidth
              label="Date de naissance"
              type="date"
              value={values.birthday}
              onChange={handleChange('birthday')}
              error={Boolean(errors.birthday)}
              helperText={errors.birthday}
              disabled={loading}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    '& input::-webkit-calendar-picker-indicator': {
                      filter: 'invert(1) opacity(0.5)',
                      cursor: 'pointer',
                    },
                  },
                },
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              fullWidth
              label="Téléphone"
              type="tel"
              value={values.telephone}
              onChange={handleChange('telephone')}
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon sx={{ color: 'rgba(255,0,200,0.5)', fontSize: 20 }} />
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
              disabled={loading}
              sx={{ ...magentaButtonSx, mb: 2.5 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : "S'INSCRIRE"}
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
