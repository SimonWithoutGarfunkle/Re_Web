import test from 'node:test';
import assert from 'node:assert/strict';
import { deleteMyAccount, getDeletionProfile } from '../src/api/accountDeletion.js';
import { authorizeAppleDeletion } from '../src/api/socialSdk.js';

globalThis.localStorage = { getItem: () => 'session-token' };

test('deletion sends password and Apple proof together and accepts an empty 204', async () => {
  const payload = { currentPassword: 'secret', apple: { authorizationCode: 'fresh', clientId: 'web' } };
  globalThis.fetch = async (url, options) => {
    assert.ok(url.endsWith('/api/users/me'));
    assert.equal(options.method, 'DELETE');
    assert.deepEqual(JSON.parse(options.body), payload);
    assert.equal(options.headers.Authorization, 'Bearer session-token');
    return new Response(null, { status: 204 });
  };
  await deleteMyAccount(payload);
});

test('Google-only deletion sends an empty object; a 401 is never replayed', async () => {
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    calls++;
    assert.equal(options.body, '{}');
    return new Response('{}', { status: 401 });
  };
  await assert.rejects(deleteMyAccount({}), error => error.status === 401);
  assert.equal(calls, 1);
});

test('profile must contain explicit authentication methods', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ hasPassword: false }));
  await assert.rejects(getDeletionProfile(), /méthodes/);
});

test('rate limits preserve Retry-After and unexpected success remains uncertain', async () => {
  globalThis.fetch = async () => new Response('{}', { status: 429, headers: { 'Retry-After': '120' } });
  const before = Date.now();
  await assert.rejects(deleteMyAccount({}), error => error.status === 429 && error.retryAt >= before + 120000);
  globalThis.fetch = async () => new Response('{}');
  await assert.rejects(deleteMyAccount({}), /non confirmé/);
});

test('Apple deletion requires matching state and returns the fresh authorization code', async () => {
  let config;
  const auth = {
    init: value => { config = value; },
    signIn: async () => ({ authorization: { state: config.state, code: 'fresh-code' } }),
  };
  assert.deepEqual(await authorizeAppleDeletion(auth, 'web-id', 'https://example.com/login'), {
    authorizationCode: 'fresh-code', clientId: 'web-id',
  });
  assert.equal(config.redirectURI, 'https://example.com/login');
  auth.signIn = async () => ({ authorization: { state: 'wrong', code: 'fresh-code' } });
  await assert.rejects(authorizeAppleDeletion(auth, 'web-id', 'https://example.com/login'), /invalide/);
});
