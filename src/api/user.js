import { apiFetch } from './client';

function handleError(err) {
  return new Error(err.detail || err.title || 'Une erreur est survenue, réessaie plus tard.');
}

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiFetch('/api/users/me/avatar', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json();
}

export async function updateProfile({ email, username, telephone, birthday }) {
  const res = await apiFetch('/api/users/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      username,
      telephone: telephone || null,
      description: null,
      birthday: birthday || null,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json();
}

export async function updateUsername(username) {
  const res = await apiFetch('/api/users/username', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json();
}

export async function updateEmail(email) {
  const res = await apiFetch('/api/users/email', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json();
}

export async function updatePassword(currentPassword, newPassword) {
  const res = await apiFetch('/api/users/password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  // 204 No Content
}
