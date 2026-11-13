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
      "Re permet de découvrir et de partager des films, séries et livres, d’échanger entre amis et de jouer à des mini-jeux culturels. Cette politique s’applique aux contenus et aux comportements dans l’ensemble de l’application.",
  },
  {
    title: '1. Nature du contenu autorisé',
    content:
      "Les avis et recommandations publiés dans le fil concernent des œuvres culturelles. La messagerie permet aussi des conversations personnelles, individuelles ou en groupe, avec du texte, des images et des liens.",
    footer:
      "Dans tous les espaces, y compris les profils et les conversations privées, respectez les autres utilisateurs et ne partagez que des contenus que vous êtes autorisé à diffuser. Les règles ci-dessous s’appliquent également aux images et aux liens partagés.",
  },
  {
    title: '2. Contenus interdits',
    content: 'Les contenus et comportements suivants sont interdits dans tous les espaces de Re :',
    list: [
      'Tout contenu illégal ou contraire aux lois en vigueur',
      'Les propos haineux, diffamatoires ou discriminatoires',
      "Le harcèlement ou l'intimidation d'autres utilisateurs",
      'Les contenus violents ou choquants',
      'Tout contenu à caractère sexuel, et en particulier tout contenu impliquant des mineurs',
    ],
  },
  {
    title: '3. Sécurité des enfants',
    content:
      "Re accorde une importance particulière à la protection des mineurs. Tout contenu impliquant l'exploitation, la sexualisation, le harcèlement ou la mise en danger d'enfants est formellement interdit.",
    footer:
      "Les signalements liés à la sécurité des enfants sont traités en priorité et peuvent entraîner la suppression immédiate du contenu concerné ainsi que la suspension ou la suppression du compte utilisateur.",
  },
  {
    title: '4. Sources externes',
    content:
      "Les données culturelles affichées dans l’application peuvent provenir de services tiers tels que TMDB (The Movie Database) et OpenLibrary. Les droits sur ces ressources appartiennent à leurs titulaires respectifs, sans préjudice des obligations légales de Re.",
    footer:
      "Les visuels associés aux œuvres (affiches, couvertures) peuvent heurter la sensibilité de certains utilisateurs. Pour signaler une fiche ou un visuel inapproprié provenant d’un catalogue externe, indiquez l’œuvre concernée et le problème rencontré dans notre ",
    contactLink: true,
  },
  {
    title: '5. Modération et signalement',
    content:
      "Vous pouvez signaler un avis, un profil, un message ou un groupe directement dans l’application, à l’aide de l’option « Signaler » du contenu concerné. Précisez la raison du signalement pour aider l’équipe à examiner la situation.",
    list: [
      'En cas de violation des règles, Re peut retirer le contenu concerné ou restreindre, suspendre ou supprimer un compte, selon la gravité de la situation.',
      'Vous pouvez contacter l’équipe pour demander le réexamen d’une décision de modération.',
    ],
    footer: 'Si le signalement intégré ne convient pas à votre situation, vous pouvez aussi décrire le problème et les éléments permettant de retrouver le contenu via notre ',
    contactLink: true,
  },
];

export default function PolitiqueContenu() {
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
                Contenu
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              Dernière mise à jour : 13 novembre 2026
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
                  sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '0.92rem' }}
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
                      <MuiLink component={RouterLink} to="/contact?sujet=Demande de modération" sx={{ color: '#b026ff', textDecorationColor: '#b026ff' }}>
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
