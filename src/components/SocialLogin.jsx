import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppleIcon from '@mui/icons-material/Apple';
import { loadApple, loadGoogle, signInApple } from '../api/socialSdk.js';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
const appleRedirectURI = import.meta.env.VITE_APPLE_REDIRECT_URI;

export default function SocialLogin({ disabled, onCredential, onError, onPending }) {
  const googleButton = useRef(null);
  const callbacks = useRef({ onCredential, onError, onPending });
  const mounted = useRef(true);
  const [apple, setApple] = useState(null);
  const [retry, setRetry] = useState(0);
  const [sdkError, setSdkError] = useState('');
  const appleBusy = useRef(false);

  useEffect(() => { callbacks.current = { onCredential, onError, onPending }; }, [onCredential, onError, onPending]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const container = googleButton.current;
    const report = (error) => { if (active) setSdkError(error.message); };
    if (googleClientId) {
      loadGoogle().then((google) => {
        if (!active) return;
        google.initialize({
          client_id: googleClientId,
          auto_select: false,
          callback: (response) => {
            if (active) callbacks.current.onCredential('google', response.credential);
          },
        });
        google.renderButton(container, {
          type: 'standard', theme: 'outline', size: 'large', text: 'signin_with', locale: 'fr',
        });
      }).catch(report);
    }
    if (appleClientId && appleRedirectURI) {
      loadApple().then((auth) => { if (active) setApple(auth); }).catch(report);
    }
    return () => { active = false; container?.replaceChildren(); };
  }, [retry]);

  const startApple = async () => {
    if (disabled || appleBusy.current) return;
    appleBusy.current = true;
    callbacks.current.onPending(true);
    try {
      const idToken = await signInApple(apple, appleClientId, appleRedirectURI);
      if (mounted.current) await callbacks.current.onCredential('apple', idToken);
    } catch (error) {
      if (mounted.current && !['popup_closed_by_user', 'user_cancelled_authorize'].includes(error?.error)) {
        callbacks.current.onError(error.message || 'Connexion Apple indisponible. Autorise les fenêtres de connexion et réessaie.');
      }
    } finally {
      appleBusy.current = false;
      if (mounted.current) callbacks.current.onPending(false);
    }
  };

  if (!googleClientId && !appleClientId) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Box inert={disabled ? true : undefined} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, opacity: disabled ? 0.5 : 1 }}>
        {googleClientId && <div ref={googleButton} />}
        {appleClientId && appleRedirectURI && (
          <Button type="button" onClick={startApple} disabled={disabled || !apple} startIcon={<AppleIcon />}
            sx={{ bgcolor: '#fff', color: '#000', textTransform: 'none', minHeight: 40, px: 3, '&:hover': { bgcolor: '#eee' } }}>
            Se connecter avec Apple
          </Button>
        )}
      </Box>
      {sdkError && (
        <Typography role="alert" sx={{ textAlign: 'center', mt: 1, fontSize: '0.85rem' }}>
          {sdkError}{' '}
          <Button size="small" disabled={disabled} onClick={() => { setSdkError(''); setRetry((v) => v + 1); }}>Réessayer</Button>
        </Typography>
      )}
      <Divider sx={{ mt: 3, color: 'rgba(255,255,255,0.45)' }}>ou avec ton email</Divider>
    </Box>
  );
}
