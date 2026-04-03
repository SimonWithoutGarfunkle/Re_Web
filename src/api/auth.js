const BASE_URL = 'https://re.simonwithoutgarfunkle.fr';

// Messages exacts retournés par LexikJWTAuthenticationBundle (Symfony)
const MESSAGES_FR = {
  // Login — mauvais identifiants (message exact de Lexik)
  'invalid credentials':          'Email ou mot de passe incorrect.',
  'bad credentials':              'Email ou mot de passe incorrect.',

  // Token JWT — utilisé pour les routes protégées
  'jwt token not found':          'Session introuvable, merci de te reconnecter.',
  'invalid jwt token':            'Session invalide, merci de te reconnecter.',
  'expired jwt token':            'Ta session a expiré, merci de te reconnecter.',
  'jwt blocked':                  'Session révoquée, merci de te reconnecter.',
  'unable to load an user':       'Compte introuvable, merci de te reconnecter.',
  'unable to find key':           'Token mal formé, merci de te reconnecter.',

  // Inscription — erreurs métier (côté Symfony/API custom)
  'email already used':           'Cette adresse email est déjà utilisée.',
  'email already exists':         'Cette adresse email est déjà utilisée.',
  'username already used':        "Ce nom d'utilisateur est déjà pris.",
  'username already exists':      "Ce nom d'utilisateur est déjà pris.",
};

function translateError(message) {
  const raw = (message || '').toLowerCase();
  const match = Object.entries(MESSAGES_FR).find(([k]) => raw.includes(k));
  return match ? match[1] : message || 'Une erreur est survenue, réessaie plus tard.';
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(translateError(err.message));
  }

  return res.json();
}

export async function verifyEmail(token) {
  const res = await fetch(`${BASE_URL}/api/users/email/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.title || 'Une erreur est survenue.');
  }
}

export async function resendVerification(email) {
  await fetch(`${BASE_URL}/api/users/email/resend-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  // Toujours 200 côté back, pas d'erreur exposée
}

export async function requestPasswordReset(email) {
  const res = await fetch(`${BASE_URL}/api/reset-password/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (res.status === 429) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Trop de tentatives. Réessaie dans une heure.');
  }
  // Tous les autres cas → 200 (anti-énumération)
}

export async function resetPassword(token, password) {
  const res = await fetch(`${BASE_URL}/api/reset-password/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.title || 'Une erreur est survenue.');
  }
}

export async function signup(payload) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Le back renvoie un format RFC 7807 : { title, status, detail }
    // Les messages sont déjà en français — on affiche detail en priorité
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.title || 'Une erreur est survenue, réessaie plus tard.');
  }

  return res.json();
}
