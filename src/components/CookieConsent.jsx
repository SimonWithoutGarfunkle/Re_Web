import { useEffect, useState, useSyncExternalStore } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { readConsent, saveConsent, subscribeConsent, trackPage, watchConsent } from '../analytics';

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => watchConsent(), []);
  useEffect(() => { trackPage(pathname); }, [pathname, consent]);
  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener('re-open-cookies', open);
    return () => window.removeEventListener('re-open-cookies', open);
  }, []);

  if (consent !== null && !settingsOpen) return null;
  const choose = (value) => { saveConsent(value); setSettingsOpen(false); };
  return (
    <Paper component="section" aria-labelledby="cookies-title" elevation={12}
      sx={{ position: 'fixed', bottom: 16, left: { xs: 12, sm: 24 }, right: { xs: 12, sm: 'auto' },
        maxWidth: 560, maxHeight: '80dvh', overflowY: 'auto', p: { xs: 2, sm: 3 }, zIndex: 1400,
        bgcolor: '#0a0f28', border: '1px solid rgba(0,229,255,0.4)' }}>
      <Typography id="cookies-title" component="h2" variant="h6" gutterBottom>Votre choix pour les cookies</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
        Avec votre accord, Re utilise Google Analytics pour mesurer la fréquentation des pages publiques.
        Google reçoit des données de navigation et des informations techniques, avec de possibles
        transferts hors de l’Union européenne. Aucun chargement de Google Analytics avant votre accord.
        Le refus ne limite pas l’accès au site.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Votre choix est conservé six mois et modifiable via « Gérer les cookies ».
        Le stockage nécessaire au compte et à ce choix reste actif.{' '}
        <Link component={RouterLink} to="/confidentialite" color="secondary" onClick={() => setSettingsOpen(false)}>En savoir plus</Link>
      </Typography>
      {consent !== null && <Typography variant="body2" sx={{ mb: 1.5 }}>Mesure d’audience actuellement {consent ? 'acceptée' : 'refusée'}.</Typography>}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button variant="outlined" color="secondary" sx={{ flex: 1 }} onClick={() => choose(false)}>Refuser</Button>
        <Button variant="outlined" color="secondary" sx={{ flex: 1 }} onClick={() => choose(true)}>Accepter</Button>
        {consent !== null && <Button color="inherit" onClick={() => setSettingsOpen(false)}>Fermer</Button>}
      </Box>
    </Paper>
  );
}
