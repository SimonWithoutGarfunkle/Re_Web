import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Link, TextField, Typography } from '@mui/material';
import { getDeletionProfile, deleteMyAccount } from '../api/accountDeletion.js';
import { loadApple, authorizeAppleDeletion } from '../api/socialSdk.js';

const appleHelp = 'https://support.apple.com/fr-fr/102571';

export default function DeleteAccount() {
  const [profile, setProfile] = useState(null);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [uncertain, setUncertain] = useState(false);
  const [expired, setExpired] = useState(false);
  const [apple, setApple] = useState(null);
  const [appleUnavailable, setAppleUnavailable] = useState(false);
  const [manualApple, setManualApple] = useState(false);
  const [success, setSuccess] = useState(false);
  const [retryAt, setRetryAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const locked = useRef(false);
  const appleLinked = profile?.linkedProviders.includes('apple');
  const connected = !!localStorage.getItem('token') && !expired;

  useEffect(() => {
    if (!appleLinked) return;
    let active = true;
    loadApple().then(auth => { if (active) setApple(auth); }).catch(() => { if (active) setAppleUnavailable(true); });
    return () => { active = false; };
  }, [appleLinked]);
  useEffect(() => {
    if (!retryAt) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [retryAt]);

  async function verify() {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError('');
    setProfile(null);
    try {
      setProfile(await getDeletionProfile());
      setUncertain(false);
    } catch (failure) {
      setExpired(failure.status === 401);
      setError(failure.status === 401 ? 'Reconnecte-toi pour vérifier ton compte. Une suppression éventuelle ne peut pas être confirmée ici.' : failure.message);
    } finally { locked.current = false; setBusy(false); }
  }

  async function submit(event) {
    event.preventDefault();
    if (locked.current || !profile || uncertain || Date.now() < retryAt) return;
    if (profile.hasPassword && !password) return;
    locked.current = true;
    setBusy(true);
    setError('');
    let started = false;
    try {
      const payload = profile.hasPassword ? { currentPassword: password } : {};
      if (appleLinked && !manualApple) {
        const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
        const redirect = import.meta.env.VITE_APPLE_REDIRECT_URI;
        if (!apple || !clientId || !redirect) throw new Error('Confirmation Apple indisponible. Réessaie ou choisis la révocation manuelle.');
        payload.apple = await authorizeAppleDeletion(apple, clientId, redirect);
      }
      started = true;
      await deleteMyAccount(payload);
      setPassword('');
      setSuccess(true);
      for (const key of ['token', 'refresh_token', 'user']) {
        try { localStorage.removeItem(key); } catch { /* Server success must remain visible. */ }
      }
      window.dispatchEvent(new Event('storage'));
    } catch (failure) {
      if (['popup_closed_by_user', 'user_cancelled_authorize'].includes(failure?.error)) return;
      if (!started) {
        setAppleUnavailable(true);
        setError(failure.message || 'La confirmation Apple a échoué.');
      } else if (!failure.status) {
        setUncertain(true);
        setError('La réponse du serveur n’a pas été confirmée. La suppression peut avoir eu lieu. Vérifie l’état du compte avant de réessayer.');
      } else if (failure.status === 401) {
        setExpired(true);
        setPassword('');
        setError('Session expirée. Reconnecte-toi pour vérifier le compte ; la suppression n’a pas été confirmée.');
      } else {
        if (failure.status === 429) setRetryAt(failure.retryAt);
        if (failure.status === 400) setProfile(null);
        setError(failure.status === 429 ? 'Trop de tentatives. Patiente avant de réessayer.' : failure.message);
      }
    } finally { locked.current = false; setBusy(false); }
  }

  return <Container maxWidth="sm" sx={{ py: 6, pb: 12 }}>
    <Box sx={{ p: { xs: 3, sm: 4 }, bgcolor: 'rgba(10,15,45,0.85)', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography component="h1" variant="h4">Supprimer mon compte RE</Typography>
      {success ? <>
        <Alert severity="success">Ton compte RE a été supprimé.</Alert>
        {appleLinked && <Link href={appleHelp} target="_blank" rel="noopener noreferrer">Vérifier l’autorisation Apple</Link>}
        <Button component={RouterLink} to="/">Retour à l’accueil</Button>
      </> : <>
        <Typography>La suppression du compte et de ses données est définitive. Ton profil et les contenus partagés ne seront plus accessibles à tes amis. Ton compte Google ou Apple sera conservé.</Typography>
        <Typography>Les éventuelles données soumises à une obligation légale de conservation sont décrites dans notre <Link component={RouterLink} to="/confidentialite">politique de confidentialité</Link>.</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {!connected ? <Button component={RouterLink} to="/login?next=delete-account" variant="contained">Se connecter pour continuer</Button> : <>
          {(!profile || uncertain) && <Button onClick={verify} disabled={busy || now < retryAt} variant="outlined">{busy ? 'Vérification…' : 'Vérifier mon compte'}</Button>}
          {profile && !uncertain && <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>Compte concerné : {profile.email || profile.username}</Typography>
            {profile.hasPassword && <TextField label="Mot de passe actuel" type="password" autoComplete="current-password" required value={password} disabled={busy} onChange={e => setPassword(e.target.value)} />}
            {appleLinked && <Typography>Apple te demandera une confirmation pour révoquer l’autorisation accordée à RE.</Typography>}
            {appleLinked && appleUnavailable && <>
              <FormControlLabel control={<Checkbox checked={manualApple} disabled={busy} onChange={e => setManualApple(e.target.checked)} />} label="Supprimer mon compte RE et gérer moi-même l’autorisation Apple" />
              <Link href={appleHelp} target="_blank" rel="noopener noreferrer">Comment retirer l’autorisation Apple</Link>
            </>}
            <Button type="submit" color="error" variant="contained" disabled={busy || now < retryAt}>{busy ? 'Suppression en cours…' : 'Supprimer définitivement'}</Button>
          </Box>}
          {now < retryAt && <Typography role="status">Nouvelle tentative possible dans {Math.ceil((retryAt - now) / 60000)} min.</Typography>}
          <Button component={RouterLink} to="/profile" disabled={busy}>Annuler</Button>
        </>}
        <Link component={RouterLink} to="/contact">Un problème d’accès à ton compte ? Contacte-nous.</Link>
      </>}
    </Box>
  </Container>;
}
