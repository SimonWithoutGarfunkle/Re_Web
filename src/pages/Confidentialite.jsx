import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link as RouterLink } from 'react-router-dom';

const SECTIONS = [
  {
    title: null,
    content:
      "Cette politique concerne le site et l’application Re. Simon Lefort, éditeur de Re en France, est responsable des traitements décrits ici. La mesure d’audience Google Analytics décrite ci-dessous concerne uniquement le site web.",
  },
  {
    title: '1. Les données que nous utilisons',
    content: 'Re utilise les informations que vous fournissez et celles nécessaires au fonctionnement du service :',
    list: [
      'Vos informations de compte et de profil, comme votre adresse email, votre pseudo et votre avatar.',
      'Vos contenus et votre activité dans l’application : préférences culturelles, bibliothèque, avis, échanges avec vos amis et activité de jeu.',
      'Les informations techniques nécessaires à la connexion, à la sécurité et aux notifications.',
      'Les informations que vous transmettez à l’équipe dans vos demandes de contact ou vos signalements.',
    ],
  },
  {
    title: '2. Utilisation des données',
    content: 'Ces données sont utilisées uniquement pour :',
    list: [
      'Créer et gérer le compte utilisateur',
      'Faire fonctionner les fonctionnalités que vous utilisez et tenir compte de vos préférences',
      'Permettre le partage et les échanges entre utilisateurs',
      'Assurer la sécurité du service et traiter les demandes et signalements',
    ],
    footer: 'La gestion du compte et les fonctionnalités demandées reposent sur l’exécution du service. La sécurité et le traitement des demandes de contact reposent sur notre intérêt légitime à assurer et améliorer ce service. La mesure d’audience repose sur votre consentement. Nous ne vendons pas vos données.',
  },
  {
    title: '3. Hébergement et conservation',
    content:
      'L’application Re et l’ensemble des données de ses utilisateurs sont hébergés en France, chez OVHcloud. Netlify héberge uniquement ce site web. Vos données sont conservées pendant la vie de votre compte. Vous pouvez supprimer votre compte à tout moment depuis l’application ou le site.',
    list: [
      'Dès la confirmation de la suppression de votre compte, votre profil et vos contenus sont supprimés dans l’application. Les dernières données techniques conservées par Re (non accessible par les utilisateurs) sont effacées sous un mois maximum.',
      'Les demandes de contact sans compte sont conservées le temps de leur traitement. Si une obligation légale impose de conserver certains éléments, seuls les éléments nécessaires sont conservés pour la durée imposée, avec un accès limité aux personnes habilitées.',
      'La suppression du compte Re ne supprime pas vos comptes Google ou Apple, ni automatiquement les données détenues par les prestataires externes. Les cookies et la mesure d’audience suivent les règles décrites ci-dessous.',
    ],
    footer: 'L’accès aux données est limité aux personnes et prestataires qui en ont besoin pour fournir et sécuriser le service. Pour toute question ou pour exercer vos droits, utilisez notre ',
    contactLink: true,
  },
  {
    title: '4. Cookies et stockage local nécessaires',
    content: 'Le navigateur conserve les éléments nécessaires à votre connexion ainsi que votre choix de cookies. Ces éléments servent au fonctionnement du service et à la mémorisation de vos préférences ; ils ne sont pas utilisés pour la publicité. Le choix, positif ou négatif, est conservé six mois sur ce navigateur. Si le stockage est bloqué ou effacé, il pourra vous être demandé de nouveau.',
  },
  {
    title: '5. Mesure d’audience facultative',
    content: 'Avec votre accord uniquement, Google Analytics (Google Ireland Limited) mesure la fréquentation des pages publiques du site. Il traite des identifiants de cookies, les pages consultées, les horaires de visite et des informations techniques sur le navigateur et l’appareil. L’adresse IP est transmise lors de la connexion à Google ; Google indique ne pas la journaliser ni la stocker dans GA4. Ces données ne sont pas anonymes du seul fait de cette limitation.',
    list: [
      'Sans accord ou en cas de refus, la balise Google Analytics n’est pas chargée.',
      'Les cookies de mesure d’audience sont configurés pour une durée maximale de 180 jours sans renouvellement automatique à chaque visite.',
      'Les pages de connexion, d’inscription, de profil, de contact, de confirmation et de réinitialisation sont exclues du suivi prévu par le site. Les paramètres d’URL et les fragments ne sont pas envoyés dans les vues de pages.',
      'Les champs des formulaires, mots de passe, adresses email et jetons de compte ne sont pas transmis par notre suivi. Les fonctions publicitaires et Google Signals sont désactivées dans la balise.',
      'Le retrait du consentement arrête le suivi et supprime les cookies Analytics accessibles au site. Il ne supprime pas rétroactivement les données déjà transmises.',
    ],
    footer: 'Vous pouvez accepter, refuser ou retirer votre accord à tout moment avec le bouton « Gérer les cookies », présent en bas de chaque page. Votre choix ne conditionne ni l’inscription ni l’accès au service.',
  },
  {
    title: '6. Qui peut recevoir vos données ?',
    content: 'Nous ne vendons pas vos données et ne les partageons pas à des fins publicitaires. Les échanges nécessaires au fonctionnement du service sont les suivants :',
    list: [
      'Les informations de profil et les contenus que vous partagez sont visibles par les utilisateurs concernés, selon les fonctionnalités utilisées. Les messages sont accessibles aux participants de la conversation.',
      'OVHcloud héberge en France l’application Re et les données de ses utilisateurs. Netlify héberge uniquement ce site web et reçoit les informations nécessaires pour afficher et sécuriser les pages que vous consultez, notamment votre adresse IP. Ce fonctionnement est indépendant de la mesure d’audience facultative.',
      'Google ou Apple interviennent si vous choisissez leur connexion. Les services de notifications mobiles, dont Expo, acheminent les notifications que vous autorisez.',
      'Google reçoit les données de mesure d’audience du site uniquement si vous y consentez.',
    ],
    footer: 'Les données nécessaires à ces services externes peuvent être traitées hors de l’Union européenne, selon leurs conditions et les garanties applicables. Cela concerne l’hébergement du site web, les connexions Google ou Apple, les notifications et la mesure d’audience facultative. Le stockage des données de l’application Re reste assuré en France par OVHcloud. Les données Analytics suivent leur propre durée de conservation, définie dans les paramètres Google Analytics, distincte de celle de votre compte Re et des cookies.',
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
              Dernière mise à jour : 14 novembre 2026
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
            <Typography sx={{ mb: 3 }}>
              L’application Re et les données de ses utilisateurs sont hébergées en France, chez OVHcloud. Netlify héberge uniquement ce site web. Vos données ne sont ni vendues ni partagées à des fins publicitaires.
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Vous pouvez <MuiLink component={RouterLink} to="/supprimer-mon-compte">supprimer votre compte RE depuis le site</MuiLink>, après connexion et confirmation, ou depuis les paramètres de votre profil dans l’application. Les services externes et la mesure d’audience facultative sont précisés ci-dessous.
            </Typography>
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
          <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <MuiLink href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer" color="secondary" aria-label="Confidentialité Google (nouvel onglet)" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              Confidentialité Google <OpenInNewIcon sx={{ fontSize: '1em' }} />
            </MuiLink>
            <MuiLink href="https://policies.google.com/technologies/partner-sites?hl=fr" target="_blank" rel="noopener noreferrer" color="secondary" aria-label="Utilisation des données par Google (nouvel onglet)" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              Utilisation des données par Google <OpenInNewIcon sx={{ fontSize: '1em' }} />
            </MuiLink>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
