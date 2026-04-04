import { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

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

export default function ConfirmEmailChange() {
  const [searchParams] = useSearchParams();

  // TODO: quand le back envoie directement le token string, remplacer par :
  // const token = searchParams.get('token');
  // et utiliser verifyEmail(token) dans le useEffect ci-dessous.
  //
  // Workaround temporaire : le back envoie une Symfony signed URL complète
  // (avec email, expires, id, signature, token) comme valeur du paramètre "token".
  // On doit appeler cette URL en GET avec tous ses paramètres pour que la
  // signature soit valide côté back.
  const rawToken = searchParams.get('token');

  const [status, setStatus] = useState(rawToken ? 'loading' : 'invalid'); // loading | success | expired | invalid | already

  useEffect(() => {
    if (!rawToken) return;

    const call = (() => {
      try {
        // rawToken est une URL complète → GET direct vers le back (signed URL)
        new URL(rawToken);
        return fetch(rawToken, { method: 'GET' });
      } catch {
        // rawToken est un token string simple → POST classique
        return fetch(`https://re.simonwithoutgarfunkle.fr/api/users/email/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: rawToken }),
        });
      }
    })();

    call
      .then(async (res) => {
        if (res.ok) { setStatus('success'); return; }
        const err = await res.json().catch(() => ({}));
        const msg = (err.detail || err.title || err.message || '').toLowerCase();
        if (msg.includes('déjà vérifié')) setStatus('already');
        else if (msg.includes('invalide') || msg.includes('expiré')) setStatus('expired');
        else setStatus('invalid');
      })
      .catch(() => setStatus('invalid'));
  }, [rawToken]);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Box sx={CARD_SX}>
          {status === 'loading' && (
            <>
              <CircularProgress sx={{ color: '#b026ff', mb: 2 }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Confirmation en cours…
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleOutlineIcon sx={{ fontSize: 52, color: '#5fffaa', mb: 1.5 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Email{' '}
                <Box component="span" sx={{ color: '#5fffaa', textShadow: '0 0 18px rgba(95,255,170,0.5)' }}>
                  mis à jour !
                </Box>
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                Ton adresse email a bien été modifiée. Tu peux continuer à utiliser l'application normalement.
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
                  confirmé
                </Box>
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Ce changement d'email a déjà été confirmé.
              </Typography>
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
              <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Ce lien de confirmation n'est plus valide. Pour relancer le changement d'email, rends-toi dans les paramètres de ton compte sur l'application.
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
