import test from 'node:test';
import assert from 'node:assert/strict';

let instance = 0;
function assertWithdrawn(api) {
  assert.equal(window[`ga-disable-${api.MEASUREMENT_ID}`], true);
  assert.equal(window.dataLayer.some((args) => args[0] === 'event'), false);
  const updates = window.dataLayer.filter((args) => args[0] === 'consent' && args[1] === 'update');
  assert.equal(updates.length, 1);
  assert.deepEqual(updates[0][2], {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
}
async function setup({ blocked = false } = {}) {
  const storage = new Map();
  const scripts = [];
  const cookies = [];
  const handlers = {};
  let reloads = 0;
  globalThis.window = {
    localStorage: {
      getItem: (key) => { if (blocked) throw Error('blocked'); return storage.get(key) ?? null; },
      setItem: (key, value) => { if (blocked) throw Error('blocked'); storage.set(key, value); },
      removeItem: (key) => storage.delete(key),
    },
    location: { origin: 'https://re.example', hostname: 'www.re.example', reload: () => { reloads += 1; } },
    setInterval: (fn) => { handlers.timer = fn; return 1; }, clearInterval: () => {},
    addEventListener: (name, fn) => { handlers[name] = fn; }, removeEventListener: (name) => { delete handlers[name]; },
  };
  globalThis.document = {
    get cookie() { return '_ga=123; _ga_LJH3S47EPV=456; session=keep'; },
    set cookie(value) { cookies.push(value); },
    createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) },
  };
  const api = await import(`../src/analytics.js?test=${instance++}`);
  return { api, storage, scripts, cookies, handlers, reloads: () => reloads };
}

test('no Google script without consent, after refusal, or on account pages', async () => {
  const { api, scripts } = await setup();
  api.trackPage('/');
  assert.equal(scripts.length, 0);
  api.saveConsent(false);
  api.trackPage('/');
  assert.equal(scripts.length, 0);
  api.saveConsent(true);
  for (const path of ['/profile', '/login', '/register', '/contact', '/reset-password', '/verify-email', '/confirm-email-change', '/unknown']) api.trackPage(path);
  assert.equal(scripts.length, 0);
});

test('single initialization and deduplicated public views, no URL parameters', async () => {
  const { api, scripts } = await setup();
  api.saveConsent(true);
  api.trackPage('/');
  api.trackPage('/');
  api.trackPage('/ios');
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].referrerPolicy, 'no-referrer');
  const events = window.dataLayer.filter((args) => args[0] === 'event');
  assert.equal(events.length, 2);
  assert.equal(events[1][2].page_location, 'https://re.example/ios');
  assert.equal(events[1][2].page_referrer, '');
  const config = window.dataLayer.find((args) => args[0] === 'config')[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.cookie_update, false);
  api.trackPage('/ios?email=private');
  assert.equal(window[`ga-disable-${api.MEASUREMENT_ID}`], true);
});

test('withdrawal clears queued events, disables Google and removes only Analytics cookies', async () => {
  const env = await setup();
  env.api.saveConsent(true);
  env.api.trackPage('/');
  env.api.saveConsent(false);
  assert.equal(env.api.readConsent(), false);
  assertWithdrawn(env.api);
  assert.equal(env.reloads(), 0);
  assert.ok(env.cookies.some((cookie) => cookie.includes('domain=re.example')));
  assert.ok(env.cookies.every((cookie) => cookie.startsWith('_ga')));
});

test('blocked storage allows choices for this page without crashing', async () => {
  const { api, scripts } = await setup({ blocked: true });
  assert.equal(api.readConsent(), null);
  api.saveConsent(true);
  api.trackPage('/');
  assert.equal(scripts.length, 1);
  api.saveConsent(false);
  assert.equal(api.readConsent(), false);
});

test('expired, corrupt and old-version consent never load Google', async () => {
  const { api, storage, scripts } = await setup();
  for (const choice of ['broken', JSON.stringify({ version: 0, analytics: true, expiresAt: Date.now() + 10000 }), JSON.stringify({ version: 1, analytics: true, expiresAt: Date.now() - 1 })]) {
    storage.set(api.CONSENT_KEY, choice);
    assert.equal(api.readConsent(), null);
    api.trackPage('/');
  }
  assert.equal(scripts.length, 0);
});

test('another tab withdrawing consent stops an already loaded tag', async () => {
  const { api, storage, handlers, reloads } = await setup();
  api.saveConsent(true);
  api.trackPage('/');
  const stop = api.watchConsent();
  storage.set(api.CONSENT_KEY, JSON.stringify({ version: 1, analytics: false, expiresAt: Date.now() + 10000 }));
  handlers.storage({ key: api.CONSENT_KEY });
  assert.equal(api.readConsent(), false);
  assertWithdrawn(api);
  assert.equal(reloads(), 0);
  stop();
});

test('consent expiring in an open tab disables tracking', async () => {
  const { api, handlers, reloads } = await setup();
  api.saveConsent(true);
  api.trackPage('/');
  const stop = api.watchConsent();
  const now = Date.now;
  try {
    Date.now = () => now() + 366 * 24 * 60 * 60 * 1000;
    handlers.timer();
    assert.equal(api.readConsent(), null);
    assertWithdrawn(api);
    assert.equal(reloads(), 0);
    assert.equal(window[`ga-disable-${api.MEASUREMENT_ID}`], true);
  } finally { Date.now = now; stop(); }
});

test('withdrawal with full storage removes the older saved agreement', async () => {
  const { api, storage } = await setup();
  api.saveConsent(true);
  window.localStorage.setItem = () => { throw Error('quota'); };
  api.saveConsent(false);
  assert.equal(api.readConsent(), false);
  assert.equal(storage.has(api.CONSENT_KEY), false);
});

test('repeated consent checks preserve the withdrawal while the script loads', async () => {
  const { api, handlers } = await setup();
  api.saveConsent(true);
  api.trackPage('/');
  const stop = api.watchConsent();
  api.saveConsent(false);
  handlers.timer();
  handlers.focus();
  api.trackPage('/ios');
  assertWithdrawn(api);
  assert.ok(window.dataLayer.some((args) => args[0] === 'config'));
  stop();
});

test('reacceptance updates consent before tracking without loading a second script', async () => {
  const { api, scripts } = await setup();
  api.saveConsent(true);
  api.trackPage('/');
  api.saveConsent(false);
  api.saveConsent(true);
  api.trackPage('/');
  assert.equal(scripts.length, 1);
  assert.equal(window[`ga-disable-${api.MEASUREMENT_ID}`], false);
  const grantIndex = window.dataLayer.findIndex((args) => args[0] === 'consent' && args[2].analytics_storage === 'granted');
  const eventIndex = window.dataLayer.findIndex((args) => args[0] === 'event');
  assert.ok(grantIndex >= 0 && eventIndex > grantIndex);
});
