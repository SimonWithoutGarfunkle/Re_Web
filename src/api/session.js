export function saveSession(data) {
  if (typeof data?.token !== 'string' || !data.token ||
      typeof data.refresh_token !== 'string' || !data.refresh_token ||
      !data.user || typeof data.user !== 'object' || Array.isArray(data.user)) {
    throw new Error('Réponse de connexion invalide. Réessaie plus tard.');
  }
  localStorage.setItem('token', data.token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

export function requireExistingAccount(data, provider) {
  if (data?.status === 'registration_required') {
    throw new Error(`Aucun compte Re n’est lié à ce compte ${provider}. Crée ton compte depuis l’application mobile.`);
  }
  if (data?.status === 'account_link_required') {
    throw new Error(`Lie d’abord ton compte ${provider} à ton compte Re depuis l’application mobile, puis reconnecte-toi ici. Tu peux aussi utiliser ton email et ton mot de passe.`);
  }
  return data;
}
