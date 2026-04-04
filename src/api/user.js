const BASE_URL = 'https://re.simonwithoutgarfunkle.fr';

function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

function handleError(err) {
  return new Error(err.detail || err.title || 'Une erreur est survenue, réessaie plus tard.');
}

export async function uploadAvatar(token, file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${BASE_URL}/api/users/me/avatar`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json(); // { url, key, ... }
}

export async function updateProfile(token, { email, username, telephone, birthday }) {
  const res = await fetch(`${BASE_URL}/api/users/`, {
    method: 'PUT',
    headers: authHeaders(token),
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

export async function updateUsername(token, username) {
  const res = await fetch(`${BASE_URL}/api/users/username`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ username }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json(); // { username, email }
}

export async function updateEmail(token, email) {
  const res = await fetch(`${BASE_URL}/api/users/email`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  return res.json();
}

export async function updatePassword(token, currentPassword, newPassword) {
  const res = await fetch(`${BASE_URL}/api/users/password`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw handleError(err);
  }
  // 204 No Content
}
