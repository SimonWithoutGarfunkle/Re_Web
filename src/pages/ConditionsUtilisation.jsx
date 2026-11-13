import { Box, Container, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const sections = [
  ['1. Objet et accès au service', 'Re est un service gratuit de découverte et de partage autour des films, séries et livres. L’application permet de gérer sa bibliothèque, de partager ses avis et recommandations, d’échanger avec ses amis et de jouer à des mini-jeux culturels. Le site présente l’application et permet notamment de créer et gérer un compte et de contacter l’équipe. L’accès nécessite une connexion Internet, à la charge de l’utilisateur. Aucune vente ni aucun abonnement payant n’est proposé actuellement. Toute future offre payante fera l’objet de conditions spécifiques présentées avant tout engagement.'],
  ['2. Compte et sécurité', 'Lors de l’inscription, vous fournissez des informations exactes et maintenez votre adresse email à jour. Vous protégez vos identifiants et signalez à l’équipe tout accès suspect. Il est interdit d’usurper une identité, de tenter d’accéder aux comptes d’autrui ou de perturber la sécurité et le fonctionnement du service.'],
  ['3. Utilisation et contenus', 'Les avis et recommandations publiés dans le fil concernent des œuvres culturelles. La messagerie permet également des échanges personnels, individuels ou en groupe. Dans tous les espaces du service, vous respectez les autres utilisateurs, les droits des tiers et les règles de sécurité de la politique de contenu. Vous conservez vos droits sur vos contributions et autorisez Re à les héberger et les afficher dans le cadre des fonctionnalités de partage que vous utilisez. Vous ne devez partager que des contenus que vous êtes autorisé à diffuser. Les contenus illicites, le harcèlement et les atteintes à la sécurité des mineurs sont interdits.'],
  ['4. Signalement et modération', 'Vous pouvez signaler un avis, un profil, un message ou un groupe directement dans l’application à l’aide des options « Signaler ». Vous pouvez aussi utiliser le formulaire de contact du site, en précisant les éléments permettant de retrouver le contenu ou le comportement concerné et la raison du signalement. En cas de violation de ces conditions ou de la loi, Re peut retirer le contenu concerné ou restreindre le compte de manière proportionnée à la gravité de la situation. Vous pouvez contacter l’équipe pour demander un réexamen.'],
  ['5. Disponibilité et responsabilité', 'Le service peut évoluer et être temporairement interrompu pour maintenance ou en cas d’incident. Re s’efforce de corriger les anomalies signalées. Les recommandations expriment les avis de leurs auteurs ; les informations issues de catalogues tiers peuvent comporter des erreurs. Aucune disposition de ces conditions n’exclut les responsabilités ou garanties imposées par la loi.'],
  ['6. Données personnelles et cookies', 'Les traitements de données sont décrits dans la politique de confidentialité. La mesure d’audience du site est facultative et nécessite un accord distinct. Accepter les présentes conditions, créer un compte ou poursuivre la navigation ne vaut pas consentement à Google Analytics. Le choix peut être modifié via « Gérer les cookies ».'],
  ['7. Fin du compte et évolution des conditions', 'Vous pouvez supprimer votre compte depuis les paramètres de votre profil dans l’application ou depuis la page « Supprimer mon compte » du site, après connexion et confirmation. Cette action est définitive et retire votre compte de l’application Re. La politique de confidentialité précise ce traitement. En cas de difficulté, vous pouvez contacter l’équipe. La version publiée de ces conditions porte sa date de mise à jour. Toute modification substantielle affectant l’utilisation du service sera portée à la connaissance des utilisateurs concernés.'],
  ['8. Contact et droit applicable', 'Le service est édité par Simon Lefort, en France. Pour toute question ou difficulté, contactez l’équipe via le formulaire du site. Le droit français s’applique, sous réserve des dispositions impératives protectrices dont vous bénéficiez dans votre pays de résidence. Ces conditions ne restreignent pas les voies de recours prévues par la loi.'],
];

export default function ConditionsUtilisation() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography component="h1" variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 2 }}>Conditions générales d’utilisation</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Dernière mise à jour : 14 novembre 2026</Typography>
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
          <Link component={RouterLink} to="/supprimer-mon-compte" color="secondary">Supprimer mon compte</Link>
          <Link component={RouterLink} to="/contact" color="secondary">Contact</Link>
        </Box>
      </Box>
    </Container>
  );
}
