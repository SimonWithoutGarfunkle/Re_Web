import test from 'node:test';
import assert from 'node:assert/strict';
import { getStoreLinks, getAutoRedirectUrl, getAppleReviewUrl, detectPlatform, APP_STORE_URL, PLAY_STORE_URL } from '../src/utils/storeLinks.js';

const IPHONE = { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' };
const IPAD = { userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)' };
const IPAD_DESKTOP_MODE = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', maxTouchPoints: 5 };
const ANDROID = { userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9)' };
const WINDOWS = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

test('desktop and unknown devices retain the supplied web links', () => {
  for (const device of [null, {}, WINDOWS]) {
    assert.deepEqual(getStoreLinks(device), { platform: 'desktop', apple: APP_STORE_URL, google: PLAY_STORE_URL, target: '_blank' });
  }
});

test('iPhone and both iPad browser modes target the native App Store', () => {
  for (const device of [IPHONE, IPAD, IPAD_DESKTOP_MODE]) {
    const links = getStoreLinks(device);
    assert.equal(links.platform, 'ios');
    assert.equal(links.apple, 'itms-apps://apps.apple.com/app/id6783426060');
    assert.equal(links.google, PLAY_STORE_URL);
    assert.equal(links.target, '_self');
  }
  assert.equal(getStoreLinks({ userAgent: 'Macintosh', maxTouchPoints: 0 }).apple, APP_STORE_URL);
});

test('Android targets Google Play with the correct listing and a web fallback', () => {
  const links = getStoreLinks(ANDROID);
  assert.equal(links.platform, 'android');
  assert.equal(links.apple, APP_STORE_URL);
  assert.equal(links.target, '_self');
  const url = new URL(links.google);
  assert.equal(url.protocol, 'intent:');
  assert.equal(url.searchParams.get('id'), 'fr.re.app');
  assert.match(url.hash, /scheme=market;package=com.android.vending;/);
  const fallback = url.hash.match(/S.browser_fallback_url=([^;]+);/)[1];
  assert.equal(decodeURIComponent(fallback), PLAY_STORE_URL);
});

test('detectPlatform classifies a Mac without touch as desktop', () => {
  assert.equal(detectPlatform({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', maxTouchPoints: 0 }), 'desktop');
});

test('automatic redirect uses web store URLs on mobile and stays put on desktop', () => {
  assert.equal(getAutoRedirectUrl(IPHONE), APP_STORE_URL);
  assert.equal(getAutoRedirectUrl(IPAD_DESKTOP_MODE), APP_STORE_URL);
  assert.equal(getAutoRedirectUrl(ANDROID), PLAY_STORE_URL);
  assert.equal(getAutoRedirectUrl(WINDOWS), null);
  assert.equal(getAutoRedirectUrl(null), null);
});

test('App Store review link opens the review sheet natively on iOS, on the web elsewhere', () => {
  assert.equal(getAppleReviewUrl(IPHONE), 'itms-apps://apps.apple.com/app/id6783426060?action=write-review');
  assert.equal(getAppleReviewUrl(IPAD_DESKTOP_MODE), 'itms-apps://apps.apple.com/app/id6783426060?action=write-review');
  for (const device of [ANDROID, WINDOWS, null]) {
    const url = new URL(getAppleReviewUrl(device));
    assert.equal(url.origin + url.pathname, APP_STORE_URL);
    assert.equal(url.searchParams.get('action'), 'write-review');
  }
});
