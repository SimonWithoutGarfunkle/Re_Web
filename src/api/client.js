const BASE_URL = 'https://re.simonwithoutgarfunkle.fr';

function isExpired(token) {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function forceLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

async function doRefresh() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) throw new Error('no refresh token');
  const res = await fetch(`${BASE_URL}/api/auth/token/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!res.ok) throw new Error('refresh failed');
  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return data.token;
}

/**
 * Wrapper fetch authentifié.
 * - Refresh proactif si le JWT est expiré avant d'envoyer la requête.
 * - Retry une fois sur 401 (refresh réactif).
 * - Déconnexion forcée si le refresh échoue.
 */
export async function apiFetch(path, options = {}) {
  let token = localStorage.getItem('token');

  // Refresh proactif
  if (token && isExpired(token)) {
    try { token = await doRefresh(); }
    catch { forceLogout(); throw new Error('Session expirée, reconnecte-toi.'); }
  }

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...options.headers, ...authHeader },
  });

  // Refresh réactif sur 401
  if (res.status === 401) {
    try {
      token = await doRefresh();
      return fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token}` },
      });
    } catch {
      forceLogout();
      throw new Error('Session expirée, reconnecte-toi.');
    }
  }

  return res;
}
