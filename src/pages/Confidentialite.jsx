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
      "Cette politique concerne le site et l’application Re. Simon Lefort, éditeur de Re en France, est responsable des traitements décrits ici. La mesure d’audience Google Analytics décrite ci-dessous concerne uniquement le site web.",
  },
  {
    title: '1. Données collectées',
    content: 'Les données traitées pour le compte, les fonctionnalités et les demandes de contact comprennent :',
    list: [
      'Adresse email',
      'Nom d\'utilisateur',
      'Avatar (optionnel)',
      'Liste d\'amis (optionnel)',
      'Recommandations et historique d\'utilisation (optionnel)',
      'Informations de connexion nécessaires à l’authentification',
      'Nom, adresse email, sujet et message transmis via le formulaire de contact',
    ],
  },
  {
    title: '2. Utilisation des données',
    content: 'Ces données sont utilisées uniquement pour :',
    list: [
      'Créer et gérer le compte utilisateur',
      'Afficher les recommandations entre amis',
      'Assurer le fonctionnement normal de l\'application',
      'Répondre aux demandes adressées à l’équipe',
    ],
    footer: 'La gestion du compte et les fonctionnalités demandées reposent sur l’exécution du service. La sécurité et le traitement des demandes de contact reposent sur notre intérêt légitime à assurer et améliorer ce service. La mesure d’audience repose sur votre consentement. Nous ne vendons pas vos données.',
  },
  {
    title: '3. Stockage et Sécurité',
    content:
      'Les données du service Re sont hébergées chez OVHcloud en France. Leur accès est limité aux personnes et prestataires qui en ont besoin pour fournir le service. Les données de compte sont conservées pendant la vie du compte ; leur suppression peut être demandée à tout moment. Les données nécessaires au traitement d’une demande sont conservées le temps de son traitement, sous réserve des obligations légales applicables. Les données Analytics sont traitées séparément par Google.',
  },
  {
    title: '4. Cookies et stockage local nécessaires',
    content: 'Le navigateur conserve les éléments nécessaires à votre connexion (token, refresh_token et user) ainsi que votre choix de cookies (re-cookie-consent-v1). Ces éléments servent au fonctionnement du service et à la mémorisation de vos préférences ; ils ne sont pas utilisés pour la publicité. Le choix, positif ou négatif, est conservé six mois sur ce navigateur. Si le stockage est bloqué ou effacé, il pourra vous être demandé de nouveau.',
  },
  {
    title: '5. Mesure d’audience facultative',
    content: 'Avec votre accord uniquement, Google Analytics (Google Ireland Limited) mesure la fréquentation des pages publiques du site. Il traite des identifiants de cookies, les pages consultées, les horaires de visite et des informations techniques sur le navigateur et l’appareil. L’adresse IP est transmise lors de la connexion à Google ; Google indique ne pas la journaliser ni la stocker dans GA4. Ces données ne sont pas anonymes du seul fait de cette limitation.',
    list: [
      'Sans accord ou en cas de refus, la balise Google Analytics n’est pas chargée.',
      'Les cookies _ga et _ga_LJH3S47EPV sont configurés pour une durée maximale de 180 jours sans renouvellement automatique à chaque visite.',
      'Les pages de connexion, d’inscription, de profil, de contact, de confirmation et de réinitialisation sont exclues du suivi prévu par le site. Les paramètres d’URL et les fragments ne sont pas envoyés dans les vues de pages.',
      'Les champs des formulaires, mots de passe, adresses email et jetons de compte ne sont pas transmis par notre suivi. Les fonctions publicitaires et Google Signals sont désactivées dans la balise.',
      'Le retrait du consentement arrête le suivi et supprime les cookies Analytics accessibles au site. Il ne supprime pas rétroactivement les données déjà transmises.',
    ],
    footer: 'Vous pouvez accepter, refuser ou retirer votre accord à tout moment avec le bouton « Gérer les cookies », présent en bas de chaque page. Votre choix ne conditionne ni l’inscription ni l’accès au service.',
  },
  {
    title: '6. Destinataires et transferts internationaux',
    content: 'Google reçoit les données de mesure d’audience lorsque vous y consentez. Leur traitement peut impliquer des transferts hors de l’Union européenne, notamment vers les États-Unis. Les garanties applicables dépendent des conditions contractuelles de Google et du cadre juridique en vigueur, notamment des décisions d’adéquation applicables et, le cas échéant, des clauses contractuelles types. Les données Analytics sont conservées selon les paramètres de conservation de la propriété Google Analytics ; la durée des cookies sur votre navigateur est distincte de cette conservation.',
  },
  {
    title: '7. Vos droits et contact',
    content: 'Selon les conditions prévues par le RGPD, vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement et leur portabilité, ou vous opposer aux traitements fondés sur l’intérêt légitime. Le consentement peut être retiré à tout moment sans remettre en cause les traitements antérieurs. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr). Pour exercer vos droits ou poser une question :',
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
              Dernière mise à jour : septembre 2026
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
          <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <MuiLink component="button" type="button" color="secondary" onClick={() => window.dispatchEvent(new Event('re-open-cookies'))}>Gérer les cookies</MuiLink>
            <MuiLink href="https://policies.google.com/privacy?hl=fr" color="secondary">Confidentialité Google</MuiLink>
            <MuiLink href="https://policies.google.com/technologies/partner-sites?hl=fr" color="secondary">Utilisation des données par Google</MuiLink>
          </Box>
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
