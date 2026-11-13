import { apiFetch } from './client.js';

async function failure(response) {
  const body = await response.json().catch(() => ({}));
  const error = new Error(body.detail || body.message || 'Impossible de supprimer le compte. Réessaie plus tard.');
  error.status = response.status;
  const retry = response.headers.get('Retry-After');
  const date = retry && (Number.isFinite(Number(retry)) ? Date.now() + Number(retry) * 1000 : Date.parse(retry));
  error.retryAt = date || Date.now() + 3600000;
  return error;
}

export async function getDeletionProfile() {
  const response = await apiFetch('/api/users/me', { skipAuthRetry: true });
  if (!response.ok) throw await failure(response);
  const profile = await response.json();
  if (typeof profile.hasPassword !== 'boolean' || !Array.isArray(profile.linkedProviders)) {
    throw new Error('Impossible de vérifier les méthodes de connexion du compte.');
  }
  return profile;
}

export async function deleteMyAccount(payload) {
  const response = await apiFetch('/api/users/me', {
    method: 'DELETE', skipAuthRetry: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) throw await failure(response);
  if (response.status !== 204) throw new Error('Résultat de suppression non confirmé.');
}
