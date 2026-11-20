import test from 'node:test';
import assert from 'node:assert/strict';
import { getStoreLinks, APP_STORE_URL, PLAY_STORE_URL } from '../src/utils/storeLinks.js';

test('desktop and unknown devices retain the supplied web links', () => {
  for (const device of [null, {}, { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }]) {
    assert.deepEqual(getStoreLinks(device), { apple: APP_STORE_URL, google: PLAY_STORE_URL, target: '_blank' });
  }
});

test('iPhone and both iPad browser modes target the native App Store', () => {
  for (const device of [
    { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' },
    { userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)' },
    { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', maxTouchPoints: 5 },
  ]) {
    assert.equal(getStoreLinks(device).apple, 'itms-apps://apps.apple.com/app/id6783426060');
    assert.equal(getStoreLinks(device).google, PLAY_STORE_URL);
    assert.equal(getStoreLinks(device).target, '_self');
  }
  assert.equal(getStoreLinks({ userAgent: 'Macintosh', maxTouchPoints: 0 }).apple, APP_STORE_URL);
});

test('Android targets Google Play with the correct listing and a web fallback', () => {
  const links = getStoreLinks({ userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9)' });
  assert.equal(links.apple, APP_STORE_URL);
  assert.equal(links.target, '_self');
  const url = new URL(links.google);
  assert.equal(url.protocol, 'intent:');
  assert.equal(url.searchParams.get('id'), 'fr.re.app');
  assert.match(url.hash, /scheme=market;package=com.android.vending;/);
  const fallback = url.hash.match(/S.browser_fallback_url=([^;]+);/)[1];
  assert.equal(decodeURIComponent(fallback), PLAY_STORE_URL);
});
