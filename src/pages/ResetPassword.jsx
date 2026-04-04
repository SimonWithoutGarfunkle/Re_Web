import { useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { resetPassword } from '../api/auth';

const PASSWORD_RULES = [
  { label: '8 caractères minimum', test: (p) => p.length >= 8 },
  { label: 'Une majuscule',        test: (p) => /[A-Z]/.test(p) },
  { label: 'Une minuscule',        test: (p) => /[a-z]/.test(p) },
  { label: 'Un chiffre',           test: (p) => /[0-9]/.test(p) },
];

function PasswordRulesHint({ password }) {
  if (!password) return null;
  return (
    <Box sx={{ mt: 1, mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
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

const CARD_SX = {
  background: 'rgba(10, 15, 45, 0.65)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(176, 38, 255, 0.25)',
  borderRadius: '24px',
  px: { xs: 3, sm: 5 },
  py: { xs: 4, sm: 5 },
  animation: 'fadeInUp 0.6s ease both',
};

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('form'); // form | success | invalid

  const validate = () => {
    const e = {};
    if (!PASSWORD_RULES.every((r) => r.test(password))) e.password = 'Le mot de passe ne respecte pas les règles requises.';
    if (confirm !== password) e.confirm = 'Les mots de passe ne correspondent pas';
    return e;
  };

  if (!token) {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
        <Container maxWidth="sm">
          <Box sx={{ ...CARD_SX, textAlign: 'center' }}>
            <ErrorOutlineIcon sx={{ fontSize: 52, color: '#ff6060', mb: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              Lien{' '}
              <Box component="span" sx={{ color: '#ff6060', textShadow: '0 0 18px rgba(255,96,96,0.5)' }}>
                invalide
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Ce lien est invalide. Vérifie l'URL ou fais une nouvelle demande de réinitialisation.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await resetPassword(token, password);
      setStatus('success');
    } catch (err) {
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('invalide') || msg.includes('expiré')) setStatus('invalid');
      else setErrors({ server: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
        <Container maxWidth="sm">
          <Box sx={{ ...CARD_SX, textAlign: 'center' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 52, color: '#5fffaa', mb: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              Mot de passe{' '}
              <Box component="span" sx={{ color: '#5fffaa', textShadow: '0 0 18px rgba(95,255,170,0.5)' }}>
                réinitialisé !
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
              Ton mot de passe a bien été modifié. Tu peux maintenant te connecter sur l'application.
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/login"
              sx={{
                border: '1px solid rgba(176,38,255,0.65)',
                color: '#b026ff',
                fontWeight: 700,
                '&:hover': { bgcolor: 'rgba(176,38,255,0.09)', borderColor: '#b026ff' },
              }}
            >
              SE CONNECTER
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  if (status === 'invalid') {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
        <Container maxWidth="sm">
          <Box sx={{ ...CARD_SX, textAlign: 'center' }}>
            <ErrorOutlineIcon sx={{ fontSize: 52, color: '#ff6060', mb: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              Lien{' '}
              <Box component="span" sx={{ color: '#ff6060', textShadow: '0 0 18px rgba(255,96,96,0.5)' }}>
                expiré
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Ce lien de réinitialisation est invalide ou a expiré. Fais une nouvelle demande depuis l'application.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Box sx={CARD_SX}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src="/logo_re_detour.png"
              alt="Re"
              sx={{ width: 52, height: 52, mb: 1.5, filter: 'drop-shadow(0 0 12px rgba(176,38,255,0.55))' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              Nouveau{' '}
              <Box component="span" sx={{ color: '#b026ff', textShadow: '0 0 18px rgba(176,38,255,0.6)' }}>
                mot de passe
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              Choisis un mot de passe d'au moins 8 caractères.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {errors.server && (
              <Typography sx={{ color: '#ff6060', fontSize: '0.88rem', mb: 2, textAlign: 'center' }}>
                {errors.server}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Nouveau mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
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
              sx={{ mb: 0 }}
            />
            <PasswordRulesHint password={password} />

            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={Boolean(errors.confirm)}
              helperText={errors.confirm}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
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
              sx={{
                border: '1px solid rgba(176,38,255,0.65)',
                color: '#b026ff',
                bgcolor: 'transparent',
                fontWeight: 700,
                py: 1.4,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#b026ff',
                  bgcolor: 'rgba(176,38,255,0.09)',
                  boxShadow: '0 0 22px rgba(176,38,255,0.55)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#b026ff' }} /> : 'RÉINITIALISER'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
