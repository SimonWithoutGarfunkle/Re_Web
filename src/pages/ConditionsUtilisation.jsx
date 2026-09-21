import { Box, Container, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const sections = [
  ['1. Objet et accès au service', 'Re est un service gratuit de découverte et de partage de recommandations culturelles entre amis. Le site présente l’application et permet notamment de créer et gérer un compte et de contacter l’équipe. L’accès nécessite une connexion Internet, à la charge de l’utilisateur. Aucune vente ni aucun abonnement payant n’est proposé actuellement. Toute future offre payante fera l’objet de conditions spécifiques présentées avant tout engagement.'],
  ['2. Compte et sécurité', 'Lors de l’inscription, vous fournissez des informations exactes et maintenez votre adresse email à jour. Vous protégez vos identifiants et signalez à l’équipe tout accès suspect. Il est interdit d’usurper une identité, de tenter d’accéder aux comptes d’autrui ou de perturber la sécurité et le fonctionnement du service.'],
  ['3. Utilisation et contenus', 'Les recommandations doivent concerner des œuvres culturelles et respecter les droits des tiers ainsi que la politique de contenu. Vous conservez vos droits sur vos contributions et autorisez Re à les héberger et les afficher dans le cadre des fonctionnalités de partage que vous utilisez. Vous ne devez publier que des contenus que vous êtes autorisé à partager. Les contenus illicites, le harcèlement et les atteintes à la sécurité des mineurs sont interdits.'],
  ['4. Signalement et modération', 'Vous pouvez signaler un contenu ou un comportement via le formulaire de contact, en précisant les éléments permettant de le retrouver et la raison du signalement. En cas de violation de ces conditions ou de la loi, Re peut retirer le contenu concerné ou restreindre le compte de manière proportionnée à la gravité de la situation. Vous pouvez contacter l’équipe pour demander un réexamen.'],
  ['5. Disponibilité et responsabilité', 'Le service peut évoluer et être temporairement interrompu pour maintenance ou en cas d’incident. Re s’efforce de corriger les anomalies signalées. Les recommandations expriment les avis de leurs auteurs ; les informations issues de catalogues tiers peuvent comporter des erreurs. Aucune disposition de ces conditions n’exclut les responsabilités ou garanties imposées par la loi.'],
  ['6. Données personnelles et cookies', 'Les traitements de données sont décrits dans la politique de confidentialité. La mesure d’audience du site est facultative et nécessite un accord distinct. Accepter les présentes conditions, créer un compte ou poursuivre la navigation ne vaut pas consentement à Google Analytics. Le choix peut être modifié via « Gérer les cookies ».'],
  ['7. Fin du compte et évolution des conditions', 'Vous pouvez demander la suppression de votre compte uniquement via le formulaire de contact du site. La politique de confidentialité précise les règles applicables aux données. La version publiée de ces conditions porte sa date de mise à jour. Toute modification substantielle affectant l’utilisation du service sera portée à la connaissance des utilisateurs concernés.'],
  ['8. Contact et droit applicable', 'Le service est édité par Simon Lefort, en France. Pour toute question ou difficulté, contactez l’équipe via le formulaire du site. Le droit français s’applique, sous réserve des dispositions impératives protectrices dont vous bénéficiez dans votre pays de résidence. Ces conditions ne restreignent pas les voies de recours prévues par la loi.'],
];

export default function ConditionsUtilisation() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography component="h1" variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 2 }}>Conditions générales d’utilisation</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Dernière mise à jour : 21 septembre 2026</Typography>
      <Box sx={{ bgcolor: 'rgba(10,15,45,0.8)', borderRadius: 3, p: { xs: 3, sm: 5 } }}>
        {sections.map(([title, body], i) => <Box key={title}>
          {i > 0 && <Divider sx={{ my: 3 }} />}
          <Typography component="h2" variant="h6" sx={{ mb: 1 }}>{title}</Typography>
          <Typography sx={{ lineHeight: 1.8 }} color="text.secondary">{body}</Typography>
        </Box>)}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
          <Link component={RouterLink} to="/mentions-legales" color="secondary">Mentions légales</Link>
          <Link component={RouterLink} to="/confidentialite" color="secondary">Confidentialité</Link>
          <Link component={RouterLink} to="/politique-contenu" color="secondary">Politique de contenu</Link>
          <Link component={RouterLink} to="/contact" color="secondary">Contact</Link>
        </Box>
      </Box>
    </Container>
  );
}
