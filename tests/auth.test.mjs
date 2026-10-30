import test from 'node:test';
import assert from 'node:assert/strict';
import { loginWithProvider, login } from '../src/api/auth.js';
import { saveSession } from '../src/api/session.js';
import { apiFetch } from '../src/api/client.js';
import { signInApple } from '../src/api/socialSdk.js';

const user = {
  userId: 123, username: 'alice', email: 'alice@example.test',
  hasPassword: false, linkedProviders: ['apple', 'google'], pendingEmail: null,
};
const session = { token: 're-token', refresh_token: 're-refresh', user };

function setup(responses) {
  const storage = new Map();
  const requests = [];
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  };
  globalThis.fetch = async (url, options) => {
    requests.push({ url, ...options });
    const next = responses.shift();
    assert.ok(next, 'unexpected API call');
    return new Response(JSON.stringify(next.body), { status: next.status ?? 200 });
  };
  return { storage, requests };
}

test('email and both external logins preserve the enriched private profile', async () => {
  const { storage, requests } = setup([{ body: session }, { body: session }, { body: session }]);
  saveSession(await login('alice@example.test', 'unchanged password'));
  for (const provider of ['google', 'apple']) {
    saveSession(await loginWithProvider(provider, 'provider-id-token'));
    assert.deepEqual(JSON.parse(storage.get('user')), user);
  }
  assert.equal(storage.get('token'), session.token);
  assert.equal(storage.get('refresh_token'), session.refresh_token);
  assert.deepEqual(requests.slice(1).map((r) => JSON.parse(r.body)), [
    { idToken: 'provider-id-token' }, { idToken: 'provider-id-token' },
  ]);
  assert.ok(requests[1].url.endsWith('/api/auth/google'));
  assert.ok(requests[2].url.endsWith('/api/auth/apple'));
});

test('registration and linking never authenticate or call a completion endpoint', async () => {
  for (const provider of ['google', 'apple']) {
    for (const status of ['registration_required', 'account_link_required']) {
      const { storage, requests } = setup([{ body: { status, email: user.email } }]);
      saveSession(session);
      await assert.rejects(async () => saveSession(await loginWithProvider(provider, 'id-token')), /application mobile/);
      assert.equal(requests.length, 1);
      assert.equal(storage.get('token'), session.token);
      assert.deepEqual(JSON.parse(storage.get('user')), user);
    }
  }
});

test('malformed sessions and missing credentials never write session data', async () => {
  const { storage, requests } = setup([]);
  for (const invalid of [{}, { token: 'token' }, { ...session, user: null }, { ...session, refresh_token: '' }]) {
    assert.throws(() => saveSession(invalid), /invalide/);
  }
  await assert.rejects(loginWithProvider('google', ''), /invalide/);
  await assert.rejects(loginWithProvider('unknown', 'token'), /invalide/);
  assert.equal(storage.size, 0);
  assert.equal(requests.length, 0);
});

test('API failures keep existing session and expose useful errors', async () => {
  const { storage } = setup([
    { status: 429, body: {} }, { status: 503, body: {} },
    { status: 401, body: { detail: 'Identité invalide' } },
  ]);
  saveSession(session);
  await assert.rejects(loginWithProvider('google', 'id-token'), /Trop de tentatives/);
  await assert.rejects(loginWithProvider('apple', 'id-token'), /temporairement indisponible/);
  await assert.rejects(loginWithProvider('apple', 'id-token'), /Identité invalide/);
  assert.equal(storage.get('token'), session.token);
});

test('refresh updates private profile as well as tokens', async () => {
  const refreshedUser = { ...user, hasPassword: true, linkedProviders: ['google'] };
  const { storage, requests } = setup([
    { body: { ...session, user: refreshedUser } }, { body: { ok: true } },
  ]);
  storage.set('token', 'expired');
  storage.set('refresh_token', 'old-refresh');
  await apiFetch('/api/users/me');
  assert.deepEqual(JSON.parse(storage.get('user')), refreshedUser);
  assert.ok(requests[0].url.endsWith('/api/auth/token/refresh'));
  assert.equal(requests[1].headers.Authorization, 'Bearer re-token');
});

test('Apple popup checks state before passing the ID token to the API', async () => {
  let config;
  const auth = {
    init: (value) => { config = value; },
    signIn: async () => ({ authorization: { state: config.state, id_token: 'apple-id-token' } }),
  };
  assert.equal(await signInApple(auth, 'web.service.id', 'https://re.example/login'), 'apple-id-token');
  assert.equal(config.usePopup, true);
  assert.equal(config.clientId, 'web.service.id');
  auth.signIn = async () => ({ authorization: { state: 'wrong-state', id_token: 'token' } });
  await assert.rejects(signInApple(auth, 'web.service.id', 'https://re.example/login'), /invalide/);
  auth.signIn = async () => { throw { error: 'popup_closed_by_user' }; };
  await assert.rejects(signInApple(auth, 'web.service.id', 'https://re.example/login'), { error: 'popup_closed_by_user' });
});
