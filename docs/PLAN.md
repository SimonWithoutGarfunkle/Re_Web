# Plan d'Implémentation — RE: Landing Page

## Contexte

Vitrine technologique du projet **RE:** (réseau social culturel privé).
Stack imposée : React + Vite + MUI v6 + Emotion. Pas de Tailwind.
3 pages : Landing, Login, Register. Aucun appel API.

---

## Étape 1 — Installation des dépendances

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom
```

- `@mui/material` + `@mui/icons-material` : composants et icônes
- `@emotion/react` + `@emotion/styled` : engine de styling requis par MUI
- `react-router-dom` : navigation entre les 3 pages

---

## Étape 2 — Organisation des fichiers

```
src/
├── theme/
│   └── theme.js              # ThemeProvider MUI dark mode + overrides
├── components/
│   ├── Navbar.jsx             # Logo, liens, boutons, Drawer mobile
│   ├── Footer.jsx             # Mentions légales, copyright, icônes sociales
│   ├── FeatureCard.jsx        # Card glassmorphism + bordure néon (réutilisable)
│   └── GlowButton.jsx         # Bouton avec bordure dégradée + glow effect
├── pages/
│   ├── Home.jsx               # Page principale (toutes les sections)
│   ├── Login.jsx              # Formulaire connexion
│   └── Register.jsx           # Formulaire inscription
├── styles/
│   ├── global.css             # Background nebula fixe + reset
│   └── animations.css         # Transitions scroll, hover cards
└── assets/
    └── smartphone.png         # Image Hero (copiée depuis docs/)
```

---

## Étape 3 — Thème MUI (`src/theme/theme.js`)

| Token       | Valeur             | Usage                          |
|-------------|--------------------|---------------------------------|
| mode        | dark               | Background sombre par défaut    |
| primary     | `#9c27b0`          | Violet néon (logo, accents)     |
| secondary   | `#00e5ff`          | Cyan électrique (liens, icons)  |
| accent      | `#00e676`          | Vert émeraude (bouton Inscription) |
| background  | `#0a0010`          | Noir violet profond             |
| font        | Inter (Google Fonts) | Sans-serif moderne             |

**Overrides composants :**
- `MuiButton` : bordure dégradée violet→cyan, box-shadow glow au hover
- `MuiCard` : background semi-transparent, backdrop-filter blur, bordure néon 1px
- `MuiTextField` : outline coloré primary, fond semi-transparent

---

## Étape 4 — Background Nebula (`src/styles/global.css`)

CSS pur, sans image de fond de page :
- `body` : `background: radial-gradient(ellipse at center, #1a0033 0%, #0a0010 60%, #000 100%)`
- Couches de `box-shadow` diffuses et de `linear-gradient` pour simuler les nébuleuses colorées
- `background-attachment: fixed` pour l'effet parallaxe
- L'image `smartphone.png` (docs/) sert uniquement dans la Hero section (pas en fond de page)

---

## Étape 5 — Composants détaillés

### `Navbar.jsx`
- AppBar MUI transparent avec `backdrop-filter: blur`
- Gauche : logo "RE:" (typographie + icône cercle violet)
- Centre : liens `Accueil`, `L'Appli`, `Le Projet`, `Le Développeur`
- Droite : `GlowButton` "S'INSCRIRE" (vert) + "SE CONNECTER" (contour violet)
- Responsive : collapse en Drawer (hamburger) sur mobile

### `Home.jsx` — Sections

#### Hero Section
- `Grid2` MUI : 2 colonnes (md: 6/6, xs: empilé)
- Gauche : titre H1 ("RE: La Culture, Version **Privée** entre **Amis** !"), texte descriptif, 2 `GlowButton` ("Découvrir l'appli", "Inscription")
- Droite : `<img src={smartphone} />` stylisée avec glow violet autour

#### Features Section (3 colonnes)
- `Grid2` : 3 colonnes (md: 4/4/4, xs: 12 empilé)
- Composant `FeatureCard` réutilisable pour chaque carte :
  - "Re: C'est Quoi ?" — réseau social de découvertes
  - "Un Cercle Privé Ultra-Personnel" — confidentialité amis proches
  - "Qui Suis-Je ?" — présentation du développeur

#### Section Administration
- Titre "Administrez Votre Compte" + sous-titre
- Icône `LaptopMac` de MUI (taille ~200px, colorée en violet néon, glow effect)
- 2 boutons côte à côte : "S'INSCRIRE" (vert) + "SE CONNECTER" (contour violet)

### `Footer.jsx`
- Bas de page : liens "Mentions légales" | "Politique de confidentialité"
- Centre : Copyright 2024
- Droite : icônes X/Twitter + Instagram (`@mui/icons-material`)

### `FeatureCard.jsx`
- `Card` MUI avec `sx` : `background: rgba(255,255,255,0.05)`, `backdropFilter: blur(10px)`, `border: 1px solid rgba(156,39,176,0.4)`
- Icône MUI en en-tête (colorée primary)
- Titre + texte descriptif
- Hover : `border-color` → primary + légère montée (`translateY(-4px)`)

### `GlowButton.jsx`
- Wrapper `Button` MUI avec override style
- Variante "filled" : fond dégradé violet→cyan + box-shadow néon
- Variante "outlined" : bordure dégradée + glow subtil au hover

---

## Étape 6 — Pages Auth

### `Login.jsx`
- Centré verticalement (min-height: 100vh)
- Card glassmorphism
- `TextField` email + password (type="password")
- `GlowButton` "Se Connecter" → `e.preventDefault()`
- Lien "Pas encore inscrit ? S'inscrire"

### `Register.jsx`
- Même structure que Login
- `TextField` : Nom, Email, Mot de passe
- `GlowButton` "S'inscrire" (vert) → `e.preventDefault()`
- Lien "Déjà un compte ? Se connecter"

---

## Étape 7 — Routing (`main.jsx`)

```
/          → Home
/login     → Login
/register  → Register
```

`BrowserRouter` + `Routes` + `Route` via `react-router-dom`.

---

## Étape 8 — Animations (`src/styles/animations.css`)

- Boutons : `transition: all 0.2s ease` + glow au hover/focus
- Cards : `transition: transform 0.3s ease, border-color 0.3s ease`
- Entrée au scroll : classe `.fade-in-up` avec `@keyframes` (opacity 0→1 + translateY 20px→0), activée via `IntersectionObserver` dans les composants

---

## Étape 9 — Responsive (priorité mobile-first)

Le site cible en priorité des visiteurs sur **téléphone** (vitrine d'une app mobile).
Approche : **mobile-first** — on code d'abord le mobile, on adapte ensuite pour les grands écrans.

### Breakpoints MUI utilisés
| Breakpoint | Largeur     | Comportement                                      |
|------------|-------------|---------------------------------------------------|
| xs         | 0–599px     | **Base mobile** : tout en colonne, padding réduit  |
| sm         | 600–899px   | Tablet portrait : cards 2 col, nav compacte       |
| md         | 900–1199px  | Tablet paysage / petit desktop                    |
| lg+        | 1200px+     | Layout full maquette desktop                      |

### Règles par composant
- **Navbar** : hamburger + Drawer sur xs/sm, barre complète sur md+
- **Hero** : colonne unique sur mobile (texte au-dessus, image en dessous, image max 80vw), Grid2 2 colonnes sur md+
- **Titre Hero** : `fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }`
- **Feature Cards** : 1 col xs, 2 col sm, 3 col md+
- **Section Admin** : empilé (icône au-dessus, boutons en dessous) sur mobile
- **Footer** : liens en colonne centrée sur mobile, row sur md+
- **Boutons** : `fullWidth` sur xs pour faciliter le tap
- **Formulaires Auth** : card plein écran sur mobile (no margin), centrée avec padding sur md+
- **Typographie** : tailles fluides via `sx` responsive à chaque composant
- **Touch** : zones de tap minimum 48px de hauteur sur tous les éléments interactifs

---

## Statut

**✅ TERMINÉ** — Build propre (`npm run build` OK, 0 erreur).

Toutes les étapes réalisées dans l'ordre ci-dessous.

## Ordre d'exécution

1. `npm install` des dépendances
2. Copier `smartphone.png` dans `src/assets/`
3. Configurer `theme.js` + `ThemeProvider` dans `main.jsx`
4. Écrire `global.css` (background nebula)
5. Créer `GlowButton` + `FeatureCard` (composants de base)
6. Créer `Navbar` + `Footer`
7. Assembler `Home.jsx` (Hero → Features → Admin)
8. Créer `Login.jsx` + `Register.jsx`
9. Configurer le routing dans `main.jsx`
10. Ajuster responsive + animations

---

## Décisions techniques retenues

| Sujet | Décision |
|-------|----------|
| Background | CSS pur (dégradé radial + box-shadows nébuleuse) |
| Image smartphone | Utilisée dans Hero section droite |
| Visuel laptop Admin | Icône `LaptopMac` MUI stylisée (200px, glow violet) |
| Routing | React Router v6 |
| Validation formulaires | Visuelle uniquement, `e.preventDefault()` |
| Google Fonts | Import via `<link>` dans `index.html` (Inter) |
