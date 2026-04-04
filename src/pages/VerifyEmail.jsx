import { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { verifyEmail, resendVerification } from '../api/auth';

const CARD_SX = {
  background: 'rgba(10, 15, 45, 0.65)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(176, 38, 255, 0.25)',
  borderRadius: '24px',
  px: { xs: 3, sm: 5 },
  py: { xs: 4, sm: 5 },
  animation: 'fadeInUp 0.6s ease both',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState(token ? 'loading' : 'invalid'); // loading | success | expired | invalid | already
  const [resendEmail, setResendEmail] = useState('');
  const [resendSent, setResendSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch((err) => {
        const msg = (err.message || '').toLowerCase();
        if (msg.includes('déjà vérifié')) setStatus('already');
        else if (msg.includes('invalide') || msg.includes('expiré')) setStatus('expired');
        else setStatus('invalid');
      });
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    await resendVerification(resendEmail.trim());
    setResendSent(true);
    setResendLoading(false);
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Box sx={CARD_SX}>
          {status === 'loading' && (
            <>
              <CircularProgress sx={{ color: '#b026ff', mb: 2 }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Vérification en cours…
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleOutlineIcon sx={{ fontSize: 52, color: '#5fffaa', mb: 1.5 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Email{' '}
                <Box component="span" sx={{ color: '#5fffaa', textShadow: '0 0 18px rgba(95,255,170,0.5)' }}>
                  vérifié !
                </Box>
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                Ton compte est actif. Tu peux maintenant te connecter sur l'application.
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
            </>
          )}

          {status === 'already' && (
            <>
              <MarkEmailReadIcon sx={{ fontSize: 52, color: '#00e5ff', mb: 1.5 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Déjà{' '}
                <Box component="span" sx={{ color: '#00e5ff', textShadow: '0 0 18px rgba(0,229,255,0.5)' }}>
                  vérifié
                </Box>
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                Cet email a déjà été confirmé. Tu peux te connecter directement.
              </Typography>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  border: '1px solid rgba(0,229,255,0.65)',
                  color: '#00e5ff',
                  fontWeight: 700,
                  '&:hover': { bgcolor: 'rgba(0,229,255,0.09)', borderColor: '#00e5ff' },
                }}
              >
                SE CONNECTER
              </Button>
            </>
          )}

          {(status === 'expired' || status === 'invalid') && (
            <>
              <ErrorOutlineIcon sx={{ fontSize: 52, color: '#ff6060', mb: 1.5 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Lien{' '}
                <Box component="span" sx={{ color: '#ff6060', textShadow: '0 0 18px rgba(255,96,96,0.5)' }}>
                  {status === 'expired' ? 'expiré' : 'invalide'}
                </Box>
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                {status === 'expired'
                  ? "Ce lien de vérification a expiré. Saisis ton email pour en recevoir un nouveau."
                  : "Ce lien est invalide. Vérifie l'URL ou demande un nouveau lien."}
              </Typography>

              {!resendSent ? (
                <Box component="form" onSubmit={handleResend} noValidate>
                  <TextField
                    fullWidth
                    label="Adresse email"
                    type="email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    required
                    sx={{ mb: 2, textAlign: 'left' }}
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    disabled={resendLoading || !resendEmail.trim()}
                    sx={{
                      border: '1px solid rgba(176,38,255,0.65)',
                      color: '#b026ff',
                      fontWeight: 700,
                      '&:hover': { bgcolor: 'rgba(176,38,255,0.09)', borderColor: '#b026ff' },
                    }}
                  >
                    {resendLoading ? <CircularProgress size={20} sx={{ color: '#b026ff' }} /> : 'RENVOYER LE LIEN'}
                  </Button>
                </Box>
              ) : (
                <Typography sx={{ color: '#5fffaa', fontWeight: 600 }}>
                  Si un compte correspond à cet email, un nouveau lien vient d'être envoyé.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
