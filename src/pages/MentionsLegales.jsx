import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const SECTIONS = [
  {
    title: "1. Éditeur de l'application",
    content: "Le présent site et l'application RE: sont édités par :",
    lines: [
      'Simon Lefort',
      'Développeur indépendant',
      'France',
    ],
    contactLink: true,
    footer: 'Responsable de la publication : Simon Lefort',
  },
  {
    title: '2. Hébergement',
    content: 'Le site et les services associés sont hébergés par :',
    lines: [
      'OVHcloud',
      'RCS Lille Métropole 424 761 419 00045',
      'Siège social : 2 rue Kellermann, 59100 Roubaix, France',
      'Site web : ovhcloud.com',
    ],
  },
  {
    title: '3. Propriété intellectuelle',
    content:
      "L'ensemble des éléments présents sur le site et l'application RE: (textes, visuels, logo, design, éléments graphiques, code source) sont protégés par le droit de la propriété intellectuelle.",
    footer:
      'Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation préalable est interdite.',
  },
  {
    title: '4. Données externes',
    content:
      "Les informations relatives aux œuvres culturelles (films, séries, livres) affichées dans l'application RE: proviennent de services tiers, notamment TMDB (The Movie Database) et OpenLibrary.",
    footer:
      "RE: n'est pas responsable du contenu fourni par ces services externes, notamment en ce qui concerne les visuels (affiches, couvertures), descriptions ou classifications.",
  },
  {
    title: '5. Limitation de responsabilité',
    content:
      "RE: s'efforce de fournir des informations aussi précises que possible. Toutefois, l'éditeur ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour des informations.",
    footer: "L'utilisateur est seul responsable de l'utilisation qu'il fait du site et de l'application.",
  },
  {
    title: '6. Contenus publiés par les utilisateurs',
    content:
      "Les utilisateurs peuvent publier des contenus dans l'application. Ils sont seuls responsables des contenus qu'ils partagent.",
    footer:
      "RE: se réserve le droit de supprimer tout contenu ne respectant pas la politique de contenu ou les lois en vigueur.",
  },
  {
    title: '7. Contact',
    content: 'Pour toute question ou demande :',
    footer: 'Utilisez notre ',
    contactLink: true,
  },
];

export default function MentionsLegales() {
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
              Mentions{' '}
              <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
                Légales
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
                background: 'linear-gradient(90deg, #b026ff, #00e5ff)',
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
              border: '1px solid rgba(0, 229, 255, 0.12)',
              borderRadius: '20px',
              px: { xs: 3, sm: 5 },
              py: { xs: 4, sm: 5 },
            }}
          >
            {SECTIONS.map((section, i) => (
              <Box key={i}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1rem', mb: 1.5, color: '#fff' }}
                >
                  {section.title}
                </Typography>
                <Typography
                  sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '0.92rem' }}
                >
                  {section.content}
                </Typography>
                {section.lines && (
                  <Box
                    sx={{
                      mt: 1.5,
                      mb: section.footer ? 1.5 : 0,
                      pl: 2,
                      borderLeft: '2px solid rgba(0,229,255,0.2)',
                    }}
                  >
                    {section.lines.map((line, j) => (
                      <Typography
                        key={j}
                        sx={{
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.92rem',
                          lineHeight: 1.8,
                        }}
                      >
                        {line}
                      </Typography>
                    ))}
                    {section.contactLink && (
                      <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                        Contact :{' '}
                        <MuiLink component={RouterLink} to="/contact" sx={{ color: '#b026ff', textDecorationColor: '#b026ff' }}>
                          formulaire de contact
                        </MuiLink>
                      </Typography>
                    )}
                  </Box>
                )}
                {section.footer && (
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.8,
                      fontSize: '0.92rem',
                      mt: section.lines ? 0 : 1,
                    }}
                  >
                    {section.footer}
                    {section.contactLink && (
                      <MuiLink component={RouterLink} to="/contact" sx={{ color: '#b026ff', textDecorationColor: '#b026ff' }}>
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
