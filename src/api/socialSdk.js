const scripts = new Map();

export function loadScript(src) {
  if (scripts.has(src)) return scripts.get(src);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    const timer = setTimeout(() => fail(), 15000);
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      scripts.delete(src);
      reject(new Error('Le service de connexion est indisponible. Vérifie ta connexion et réessaie.'));
    };
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  scripts.set(src, promise);
  return promise;
}

export async function loadGoogle() {
  await loadScript('https://accounts.google.com/gsi/client?hl=fr');
  if (!window.google?.accounts?.id) throw new Error('Connexion Google indisponible.');
  return window.google.accounts.id;
}

export async function loadApple() {
  await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/fr_FR/appleid.auth.js');
  if (!window.AppleID?.auth) throw new Error('Connexion Apple indisponible.');
  return window.AppleID.auth;
}

export async function signInApple(auth, clientId, redirectURI) {
  const state = crypto.randomUUID();
  auth.init({ clientId, redirectURI, scope: 'email', state, usePopup: true });
  const result = await auth.signIn();
  if (result?.authorization?.state !== state || !result.authorization.id_token) {
    throw new Error('Réponse Apple invalide. Recommence la connexion.');
  }
  return result.authorization.id_token;
}
