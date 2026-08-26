import { createElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AndroidIcon from '@mui/icons-material/Android';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import InstallMobileOutlinedIcon from '@mui/icons-material/InstallMobileOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

const sections = [
  {
    icon: FavoriteBorderOutlinedIcon,
    title: "Pourquoi RE ?",
    text: "RE permet de partager les œuvres qui nous ont vraiment marqués. Films, séries, livres... on garde une trace de ce qu'on aime, et on découvre les goûts de ses proches. Pas d'algo, pas de bruit. Juste des recommandations qui comptent vraiment.",
  },
  {
    icon: TipsAndUpdatesOutlinedIcon,
    title: 'Encore en construction',
    text: "RE est encore en cours de développement. L'app va évoluer, certaines choses peuvent changer, et il peut rester des bugs. Si une fonctionnalité te manque ou si tu as une idée, dis-le-nous : c'est le bon moment pour proposer.",
  },
  {
    icon: InstallMobileOutlinedIcon,
    title: "Installer l'app",
    text: (
      <>
        <Box component="span" sx={{ display: 'block', mb: 1 }}>
          1. Ouvre cette {' '}
          <Link
            href="https://play.google.com/apps/testing/fr.re.app?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: '#00e5ff',
              fontWeight: 700,
              textShadow: '0 0 12px rgba(0,229,255,0.45)',
              '&:hover': { color: '#6effff' },
            }}
          >
            page Google
          </Link>{' '}
          avec le compte Google que tu nous as donné.
        </Box>
        <Box component="span" sx={{ display: 'block', mb: 1 }}>
          2. Appuie sur Devenir testeur/Become a tester. Si tu vois "You are a tester" c'est validé!

        </Box>
        <Box component="span" sx={{ display: 'block' }}>
          3. Ouvre ensuite la{' '}
          <Link
            href="https://play.google.com/store/apps/details?id=fr.re.app&hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: '#00e5ff',
              fontWeight: 700,
              textShadow: '0 0 12px rgba(0,229,255,0.45)',
              '&:hover': { color: '#6effff' },
            }}
          >
            page Play Store
          </Link>{' '}
          et installe RE comme une app classique.
        </Box>
      </>
    ),
  },
  {
    icon: FlashOnOutlinedIcon,
    title: 'Testeur pressé ?',
    text: "Installe l'application et lance la. Même sans aller plus loin, c'est déjà très utile❤️",
  },
  {
    icon: BugReportOutlinedIcon,
    title: 'Testeur disponible ?',
    text: "Promène-toi dans l'app librement. Clique partout, ajoute des contenus, teste les reco, note ce qui te plaît et ce qui bloque. Les retours francs (positifs comme négatifs), les bugs et les captures d'écran sont les plus précieux.",
  },
  {
    icon: GroupAddOutlinedIcon,
    title: "Tu n'as pas encore accès ?",
    text: (
      <>
        Le test Android passe par un programme fermé sur le Play Store. Pour recevoir l'accès, envoie-nous un message via le{' '}
        <Link
          component={RouterLink}
          to="/contact?sujet=Demande%20programme%20testeurs"
          underline="none"
          sx={{
            color: '#00e5ff',
            fontWeight: 700,
            textShadow: '0 0 12px rgba(0,229,255,0.45)',
            '&:hover': { color: '#6effff' },
          }}
        >
          formulaire de contact
        </Link>{' '}
        avec l'adresse Gmail utilisée sur Google Play.
        <Box component="span" sx={{ display: 'block', mt: 1.5 }}>
          Le test sur iPhone commence bientôt !
        </Box>
      </>
    ),
  },
];

const cardSx = {
  height: '100%',
  borderRadius: '8px',
  background: 'rgba(10, 15, 45, 0.66)',
  border: '1px solid rgba(176, 38, 255, 0.24)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
};

export default function Testeurs() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 780, mb: { xs: 4, md: 5 }, animation: 'fadeInUp 0.6s ease both' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.7rem' },
              fontWeight: 800,
              lineHeight: 1.08,
              mb: 2,
              textShadow: '0 2px 18px rgba(0,0,0,0.95), 0 0 34px rgba(176,38,255,0.5)',
            }}
          >
            Tester{' '}
            <Box component="span" sx={{ color: '#00e5ff', textShadow: '0 0 24px rgba(0,229,255,0.65)' }}>
              RE
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.75,
              maxWidth: 660,
              textShadow: '0 1px 12px rgba(0,0,0,0.95)',
            }}
          >
            Tu fais partie des premiers à essayer notre application RE.
            Merci de nous donner un coup de main : ça aide beaucoup à faire avancer le projet ❤️
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              href="https://play.google.com/store/apps/details?id=fr.re.app&hl=fr"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<AndroidIcon />}
            >
              Ouvrir sur Play Store
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/contact?sujet=Demande%20programme%20testeurs"
            >
              Demander l'accès
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 2.5,
            animation: 'fadeInUp 0.7s ease 0.08s both',
          }}
        >
          {sections.map(({ icon, title, text }) => (
            <Card key={title} sx={cardSx}>
              <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.6,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '8px',
                      display: 'grid',
                      placeItems: 'center',
                      flex: '0 0 44px',
                      color: '#00e5ff',
                      background: 'rgba(0, 229, 255, 0.08)',
                      border: '1px solid rgba(0, 229, 255, 0.24)',
                      boxShadow: '0 0 18px rgba(0, 229, 255, 0.16)',
                    }}
                  >
                    {createElement(icon, { fontSize: 'small' })}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                    {title}
                  </Typography>
                </Box>
                <Typography component="div" sx={{ color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>
                  {text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
