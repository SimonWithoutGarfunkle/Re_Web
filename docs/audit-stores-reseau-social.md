# Audit du site RE pour les stores — 26 octobre 2026

## Conclusion et périmètre

La version locale fournit une base documentaire utile, mais ne permet pas de valider la conformité de RE pour l’App Store et Google Play. La suppression uniquement via le support est un écart avec le parcours attendu par Apple. Le parcours web Google manque de visibilité explicite. Plusieurs contrôles essentiels dépendent de l’application, du serveur et des consoles, absents du périmètre.

Audit du code de Re_Web et comparaison avec les sources officielles ci-dessous. Aucun changement apporté au fonctionnement du site. Ni audit du dépôt mobile, ni vérification du backend, ni recette dans un navigateur en production. L’ouverture de la fiche Google Play fr.re.app avec l’outil web n’a pas abouti : cela ne démontre pas qu’elle est indisponible pour les utilisateurs. L’origine API trouvée dans le code ne suffit pas à identifier l’URL du site vitrine déployé.

Le positionnement « culturel » ne dispense pas des règles sur les contributions des utilisateurs : recommandations, avis et avatars partagés sont concernés. Les exigences Google Child Safety Standards s’appliquent notamment aux applications de la catégorie Social ; confirmer la catégorie réelle dans Play Console.

## Constats prioritaires

### 1. Suppression du compte — priorité haute

- `src/pages/ConditionsUtilisation.jsx`, section 7 : suppression « uniquement via le formulaire de contact du site ».
- `src/pages/Profile.jsx` : aucune action de suppression trouvée.
- `src/App.jsx` et le footer : aucune page ou entrée explicite de suppression.
- `src/pages/Contact.jsx` : formulaire générique avec nom, email, sujet et message ; aucune instruction spécifique aux comptes et données à effacer.

Apple demande une initiation depuis l’app et exclut le recours obligatoire au support pour une app ordinaire. Un traitement manuel différé reste possible avec information et confirmation. Google accepte un formulaire web, à condition que la demande de suppression soit clairement visible et accessible, avec un parcours depuis l’app.

À réaliser : un parcours dédié, une vérification d’identité proportionnée, l’effacement effectif des données associées et une confirmation. Préciser délais, sauvegardes et exceptions réelles. Une route `/suppression-compte` serait pratique ; ce nom de route n’est pas imposé. Mettre ensuite à jour les CGU et renseigner l’URL dans Play Console.

### 2. Modération et blocage — contrôle mobile indispensable

`src/pages/PolitiqueContenu.jsx` interdit plusieurs catégories de contenus et annonce des outils en développement. Les CGU et la politique renvoient au formulaire de contact. Aucun engagement opérationnel précis ni description du blocage n’a été trouvé dans ces textes.

Apple exige filtrage, signalement, traitement rapide, blocage des utilisateurs abusifs et contact publié. Google impose une modération effective et des outils de signalement/blocage adaptés aux interactions proposées. Un formulaire externe seul ne permet pas d’attester ces fonctions.

À vérifier dans l’app : signaler un avis/avatar/profil, bloquer un utilisateur et constater l’effet du blocage. À vérifier côté équipe : réception, traitement des signalements et retrait des contenus. Aligner ensuite la politique sur le fonctionnement réel.

### 3. Protection des enfants — base présente, dispositif à vérifier

La section 3 de la politique interdit déjà exploitation, sexualisation, harcèlement et mise en danger des enfants et annonce un traitement prioritaire.

Elle ne décrit pas le signalement des CSAM confirmés aux autorités compétentes. Le référent sécurité des enfants et les déclarations Play Console ne sont pas vérifiables ici. Google exige aussi un mécanisme accessible dans l’app et une procédure de traitement des CSAM.

À réaliser : documenter les pratiques réelles, préciser explicitement abus et exploitation sexuels des enfants (CSAE), confirmer le circuit de signalement aux autorités et désigner un référent dans Play Console. Une section dans la politique existante peut convenir ; une nouvelle page n’est pas obligatoire. Définir également le public visé et les conditions d’accès des mineurs, puis vérifier la cohérence avec les questionnaires d’âge des stores.

### 4. Confidentialité — informations à compléter

`src/pages/Confidentialite.jsx` couvre déjà le site et l’app, l’éditeur, des catégories de données, leurs usages, OVHcloud, Analytics et les droits. Des liens publics existent dans le footer.

Points incomplets ou impossibles à confirmer : durée réelle de conservation Analytics, sort des contributions après suppression, délais d’effacement et de purge des sauvegardes, journaux serveur, mesures de sécurité et destinataires de l’application mobile. Inventorier les SDK et prestataires mobiles éventuels avant de compléter le texte ; leur absence dans ce dépôt ne prouve pas leur absence dans l’app.

Apple et Google demandent une politique accessible dans l’app et renseignée dans leur console. Elle doit correspondre aux traitements réels, y compris conservation et suppression. Vérifier la concordance avec App Privacy et Data safety, sans déclarer Analytics web comme un SDK mobile si ce n’est pas le cas.

### 5. Acceptation des CGU et consentement

`src/pages/Register.jsx` exige une case d’acceptation des CGU. Le contrôle est visible côté interface ; aucune preuve serveur n’est vérifiable ici. Vérifier le parcours mobile avant toute publication de contenu. Conserver la version et la date acceptées côté serveur est une recommandation de traçabilité, pas un format imposé par les stores.

Le consentement Analytics est séparé et le refus est possible. `npm test` : 10 tests réussis. Ces tests simulent le navigateur ; ils ne prouvent pas la configuration distante de Google Analytics. Les vérifications restantes sont déjà détaillées dans `docs/analytics-et-juridique.md`.

## Recette avant soumission

1. Ouvrir les URL légales et de suppression depuis un navigateur privé, sur mobile, sans compte ; vérifier les accès directs aux routes et les liens des consoles.
2. Tester une suppression de compte avec des contributions existantes, puis vérifier l’effacement côté serveur.
3. Tester signalements et blocage avec deux comptes ; vérifier la réception et le traitement côté modération.
4. Vérifier le référent et les déclarations de sécurité des enfants si RE entre dans le périmètre Google.
5. Comparer données, SDK, autorisations, politique et déclarations des stores ; vérifier le public cible et les classifications d’âge.
6. Fournir aux équipes de revue l’accès nécessaire aux fonctions de compte et de modération.

## Sources officielles consultées

- Apple : [App Review Guidelines, notamment 1.2 et 5.1.1](https://developer.apple.com/app-store/review/guidelines/).
- Apple : [Offering account deletion in your app](https://developer.apple.com/support/offering-account-deletion-in-your-app/).
- Google : [Account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en).
- Google : [User-generated content](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en).
- Google : [Child Safety Standards](https://support.google.com/googleplay/android-developer/answer/14747720?hl=en).
- Google : [Child Endangerment](https://support.google.com/googleplay/android-developer/answer/9878809?hl=en).
- Google : [User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en).
