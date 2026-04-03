import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ObfuscatedEmail from '../components/ObfuscatedEmail';

const SECTIONS = [
  {
    title: null,
    content:
      "Re est une application à vocation culturelle permettant de découvrir, partager et recommander des œuvres culturelles entre amis (films, séries, livres, jeux, et contenus assimilés).",
  },
  {
    title: '1. Nature du contenu autorisé',
    content:
      "Les contenus publiés sur Re doivent être directement liés à une œuvre culturelle. L'application n'a pas vocation à devenir un réseau social généraliste.",
    footer:
      "Il n'est par exemple pas possible de publier un simple message personnel ou un contenu sans rapport avec une œuvre culturelle identifiable.",
  },
  {
    title: '2. Contenus interdits',
    content: 'Les contenus suivants sont strictement interdits :',
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
      "Les données culturelles affichées dans l'application peuvent provenir de services tiers tels que TMDB (The Movie Database) et OpenLibrary. Re n'est pas responsable du contenu fourni par ces services. Certaines œuvres référencées proviennent de bases de données externes.",
    footer:
      "Les visuels associés à ces œuvres (affiches, couvertures) peuvent contenir des éléments susceptibles de heurter la sensibilité de certains utilisateurs. Re s'efforce de limiter l'affichage de contenus sensibles, mais ne peut garantir une absence totale de tels contenus. Les utilisateurs peuvent signaler tout contenu inapproprié par email.",
  },
  {
    title: '5. Modération et signalement',
    content:
      "L'application est actuellement en cours de développement. Les outils de modération sont amenés à évoluer.",
    footer: 'Toute demande de modération ou tout signalement de contenu peut être effectué par email : ',
    email: true,
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
                    {section.email && <ObfuscatedEmail />}
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
