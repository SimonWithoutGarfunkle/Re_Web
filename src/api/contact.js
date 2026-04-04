const BASE_URL = 'https://re.simonwithoutgarfunkle.fr';

/**
 * @param {{ name: string, email: string, title: string, message: string }} payload
 */
export async function sendContact(payload) {
  // TODO: décommenter quand le back est déployé
  // const res = await fetch(`${BASE_URL}/api/contact`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err.detail || err.title || 'Une erreur est survenue, réessaie plus tard.');
  // }
  // return res.ok;

  console.log('[sendContact] payload:', payload);
  return true;
}
