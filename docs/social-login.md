# Connexion Google et Apple sur le site

Le site appelle les mêmes routes que Re-app : `POST /api/auth/google` et
`POST /api/auth/apple`, avec `{ "idToken": "…" }`. Le backend vérifie le token
fournisseur et renvoie les tokens Re et le profil privé complet.

Seuls les comptes déjà liés se connectent ici. Les réponses
`registration_required` et `account_link_required` affichent une explication
orientant vers l’application mobile, sans créer de session ni appeler les routes
d’inscription ou de liaison. L’inscription email existante est inchangée.

## Configuration avant déploiement

Copier `.env.example` vers `.env.local` ou définir les variables dans le système
de build, puis reconstruire le site :

- `VITE_GOOGLE_CLIENT_ID` : client OAuth de type application Web. Le client web
  utilisé par l’app mobile peut être réutilisé si sa configuration le permet.
  Ajouter l’origine exacte du site aux origines JavaScript autorisées, ainsi que
  l’origine locale utilisée pour les tests (par exemple `http://localhost:5173`).
- `VITE_APPLE_CLIENT_ID` : Services ID Apple pour le web, associé à l’application
  mobile existante afin de retrouver les mêmes identités Apple.
- `VITE_APPLE_REDIRECT_URI` : URL HTTPS de retour enregistrée exactement dans
  Apple Developer pour ce Services ID. Le SDK utilise une popup ; cette URL reste
  obligatoire. Apple ne prend pas en charge localhost : utiliser un domaine HTTPS
  enregistré pour la recette Apple.

Le backend doit accepter les audiences des clients web en plus des clients mobiles
et autoriser l’origine du site via CORS. Vérifier aussi `APPLE_CLIENT_IDS` et la
configuration web `APPLE_REDIRECT_URIS` décrites dans la documentation backend.
Aucun secret OAuth ni clé privée ne doit être fourni à Vite.

Un fournisseur sans configuration n’est pas affiché. Les SDK sont chargés seulement
sur la page de connexion. Autoriser leurs domaines dans la CSP si elle est gérée
par l’hébergement et vérifier que les en-têtes COOP permettent les popups OAuth.

## Profil enrichi

La connexion conserve l’objet `user` entier, notamment `hasPassword`,
`linkedProviders` et `pendingEmail`. Le refresh remplace aussi le profil local
lorsque l’API renvoie `user`. Aucun champ absent d’un ancien cache n’est converti
en `false`. Le formulaire de changement de mot de passe est masqué uniquement si
`hasPassword === false`. Un compte connecté avec Google/Apple ayant un mot de
passe conserve ce formulaire. La suppression de compte sera intégrée plus tard.

## Recette avec les fournisseurs réels

- Connexion email existante, Google lié et Apple lié : arrivée sur `/profile`,
  conservation des tokens Re et du profil enrichi, puis déconnexion.
- Compte externe inconnu : invitation à créer le compte dans l’app, aucune session.
- Compte nécessitant une liaison : invitation à effectuer la liaison dans l’app.
- Annulation de popup, popup bloquée, SDK bloqué, erreur API et limitation 429 :
  aucun écrasement de session ; possibilité de réessayer ou de se connecter par email.
- Compte externe sans mot de passe, puis compte externe avec mot de passe :
  formulaire de mot de passe respectivement masqué et présent.
- Expiration du JWT : renouvellement des tokens et du profil privé dans le stockage.

Références :
[Google Identity Services](https://developers.google.com/identity/gsi/web/reference/js-reference),
[Sign in with Apple JS](https://developer.apple.com/documentation/signinwithapple/configuring-your-webpage-for-sign-in-with-apple).
