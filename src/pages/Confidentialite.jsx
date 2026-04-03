import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const SECTIONS = [
  {
    title: null,
    content:
      "L'application Re permet de partager et découvrir des recommandations culturelles entre amis. Afin de proposer ces fonctionnalités, certaines données personnelles sont nécessaires.",
  },
  {
    title: '1. Données collectées',
    content: 'Nous collectons uniquement les informations fournies volontairement par l\'utilisateur :',
    list: [
      'Adresse email',
      'Nom d\'utilisateur',
      'Avatar (optionnel)',
      'Téléphone (optionnel)',
      'Date de naissance (optionnel)',
      'Liste d\'amis (optionnel)',
      'Recommandations et historique d\'utilisation (optionnel)',
    ],
  },
  {
    title: '2. Utilisation des données',
    content: 'Ces données sont utilisées uniquement pour :',
    list: [
      'Créer et gérer le compte utilisateur',
      'Afficher les recommandations entre amis',
      'Assurer le fonctionnement normal de l\'application',
    ],
    footer: 'Nous ne revendons ni ne partageons aucune donnée à des tiers.',
  },
  {
    title: '3. Stockage et Sécurité',
    content:
      'Les données sont stockées sur nos serveurs sécurisés en France. Les utilisateurs peuvent demander la suppression de leur compte et de toutes leurs données à tout moment.',
  },
  {
    title: '4. Contact',
    content: 'Pour toute question ou demande concernant vos données personnelles :',
    footer: 'Utilisez notre ',
    contactLink: true,
  },
];

export default function Confidentialite() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: { xs: 6, md: 8 }, pb: 12 }}>
      <Container maxWidth="md">
        <Box sx={{ animation: 'fadeInUp 0.6s ease both' }}>

          {/* Header */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
            >
              Politique de{' '}
              <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
                Confidentialité
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              Dernière mise à jour : avril 2026
            </Typography>
            <Box
              sx={{
                mt: 2,
                width: 50,
                height: 3,
                background: 'linear-gradient(90deg, #00e5ff, #ff00c8)',
                borderRadius: '2px',
              }}
            />
          </Box>

          {/* Sections */}
          <Box
            sx={{
              background: 'rgba(10, 15, 45, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 0, 200, 0.12)',
              borderRadius: '20px',
              px: { xs: 3, sm: 5 },
              py: { xs: 4, sm: 5 },
            }}
          >
            {SECTIONS.map((section, i) => (
              <Box key={i}>
                {section.title && (
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: '1rem', mb: 1.5, color: '#fff' }}
                  >
                    {section.title}
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.8,
                    fontSize: '0.92rem',
                  }}
                >
                  {section.content}
                </Typography>
                {section.list && (
                  <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5 }}>
                    {section.list.map((item, j) => (
                      <Box
                        component="li"
                        key={j}
                        sx={{
                          color: 'rgba(255,255,255,0.85)',
                          fontSize: '0.92rem',
                          lineHeight: 1.8,
                          mb: 0.25,
                        }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                )}
                {section.footer && (
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.8,
                      fontSize: '0.92rem',
                      mt: 1,
                    }}
                  >
                    {section.footer}
                    {section.contactLink && (
                      <MuiLink component={RouterLink} to="/contact?sujet=Mes données personnelles" sx={{ color: '#b026ff', textDecorationColor: '#b026ff' }}>
                        formulaire de contact
                      </MuiLink>
                    )}
                  </Typography>
                )}
                {i < SECTIONS.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 3 }} />
                )}
              </Box>
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
