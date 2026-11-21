export const APP_STORE_URL = 'https://apps.apple.com/us/app/re/id6783426060';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=fr.re.app';

// Hardcoded (not window.location) so the QR code and shared link always point to production.
export const DOWNLOAD_PAGE_URL = 'https://web.simonwithoutgarfunkle.fr/telecharger';

export function detectPlatform(device = globalThis.navigator) {
  const userAgent = device?.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && device?.maxTouchPoints > 1)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'desktop';
}

// Keep desktop/cross-platform links usable; native links open in the same tab
// following a user gesture, so mobile browsers can hand off to the store.
export function getStoreLinks(device = globalThis.navigator) {
  const platform = detectPlatform(device);
  const isIOS = platform === 'ios';
  const isAndroid = platform === 'android';

  return {
    platform,
    target: isIOS || isAndroid ? '_self' : '_blank',
    apple: isIOS ? 'itms-apps://apps.apple.com/app/id6783426060' : APP_STORE_URL,
    google: isAndroid
      ? `intent://details?id=fr.re.app#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
      : PLAY_STORE_URL,
  };
}

// Opens the "Write a review" sheet directly. Google Play has no equivalent link,
// so reviews there go through the regular listing.
export function getAppleReviewUrl(device = globalThis.navigator) {
  return detectPlatform(device) === 'ios'
    ? 'itms-apps://apps.apple.com/app/id6783426060?action=write-review'
    : `${APP_STORE_URL}?action=write-review`;
}

// Web URL to open without a user gesture (automatic redirect), or null on desktop.
export function getAutoRedirectUrl(device = globalThis.navigator) {
  const platform = detectPlatform(device);
  if (platform === 'ios') return APP_STORE_URL;
  if (platform === 'android') return PLAY_STORE_URL;
  return null;
}
