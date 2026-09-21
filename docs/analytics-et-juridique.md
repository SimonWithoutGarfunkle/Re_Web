# Google Analytics et textes juridiques

Balise : `G-LJH3S47EPV`. Le script est chargé après accord uniquement (Consent Mode basique). Le refus et l’accord expirent après six mois. Le retrait désactive la propriété, vide les événements en attente, efface les cookies `_ga*` accessibles et recharge la page pour arrêter le script. Ce rechargement peut perdre un formulaire non envoyé.

Le suivi manuel est limité à une liste de pages publiques dans `src/analytics.js`. Les paramètres d’URL, fragments, référents et titres dynamiques ne sont pas envoyés dans ces événements. Aucun User-ID n’est utilisé. Les pages de formulaires et de compte sont exclues. Le stockage de connexion existant est indépendant du choix Analytics.

## Avant la mise en production : console Google Analytics

1. Administration → Flux de données → flux Web correspondant : **désactiver les mesures améliorées dans leur ensemble** (historique, formulaires, recherche, clics, etc.). `send_page_view: false` ne désactive pas les événements liés à l’historique. Ce réglage est nécessaire pour éviter les doubles vues et la collecte automatique d’URL ou de données de formulaires. Il ne peut pas être vérifié depuis ce dépôt.
2. Vérifier que Google Signals, la collecte de données fournies par les utilisateurs, les fonctions publicitaires et les associations publicitaires sont désactivés. Examiner les options de partage des données du compte et limiter les accès.
3. Définir la conservation des données utilisateur/événement (par exemple deux mois), désactiver sa réinitialisation à chaque activité si approprié, puis indiquer la **durée réellement configurée** dans la politique de confidentialité. Les rapports agrégés ont une conservation distincte. Les cookies sont configurés ici à 180 jours sans renouvellement.
4. Vérifier les conditions de traitement Google, les destinataires, les garanties de transfert et leur applicabilité au compte. La politique ne prétend pas que les données Analytics restent en France.
5. Valider dans le navigateur sur HTTPS : aucune requête `googletagmanager.com` / `google-analytics.com` avant accord et après refus ; après accord, une seule vue par navigation publique avec URL nettoyée ; aucun événement sur les parcours de compte/contact ; retrait dans le même onglet et un autre onglet ; effacement et expiration du choix ; stockage bloqué ; affichage mobile et navigation clavier. Vérifier aussi l’absence d’une deuxième balise injectée par l’hébergeur.

## Relecture des textes

- Service gratuit confirmé par l’éditeur : CGU ajoutées, aucune CGV de vente inventée. L’inscription demande une acceptation séparée du choix Analytics.
- **API à compléter** : le dépôt frontend ne contient pas le backend. L’acceptation des CGU est contrôlée dans l’interface uniquement. Pour disposer d’une preuve et d’un contrôle serveur, enregistrer côté API la version acceptée et la date et valider cette acceptation au moment de l’inscription. Adapter aussi l’application mobile ; ne pas envoyer un nouveau champ à une API dont le contrat n’a pas été modifié.
- La confidentialité couvre désormais le site, le formulaire de contact, le stockage de connexion, Analytics, le consentement et les droits. La promesse antérieure « aucun partage avec des tiers » a été supprimée.
- Les exclusions générales de responsabilité et l’affirmation de propriété sur tous les contenus ont été nuancées.
- **Informations éditeur à vérifier** : statut professionnel/non professionnel, adresse et coordonnées de contact exigibles, identification légale si applicable, coordonnées complètes de l’hébergeur. Les mentions existantes « Simon Lefort / France / OVHcloud » sont conservées sans inventer d’adresse ou de numéro. Confirmer que le frontend et le backend sont bien hébergés comme indiqué.
- **Conservation réelle à vérifier côté serveur** : suppression du compte, sauvegardes, journaux de sécurité et messages de contact. Définir et documenter les délais réellement appliqués ; le frontend ne permet pas de les attester. Compléter aussi le régime des mineurs et les procédures de modération selon le public et le fonctionnement réel du service.

Ces points doivent être complétés pour finaliser l’information juridique ; la modification du frontend ne certifie pas à elle seule la conformité du service.

## Références consultées

- CNIL : https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi
- CNIL, conservation du choix six mois : https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf
- Google, Consent Mode : https://developers.google.com/tag-platform/security/concepts/consent-mode
- Google, vues manuelles et mesures améliorées : https://developers.google.com/analytics/devguides/collection/ga4/views
- Google, confidentialité : https://support.google.com/analytics/answer/6004245?hl=fr

## Vérifications automatisées

`node --test tests/analytics.test.mjs` vérifie le chargement conditionnel, les URL, les routes exclues, le retrait, l’expiration, les autres onglets et le stockage indisponible avec un navigateur simulé. Ces tests ne remplacent pas la recette réseau avec la propriété Google réelle.
