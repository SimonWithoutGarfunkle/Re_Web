export const APP_STORE_URL = 'https://apps.apple.com/us/app/re/id6783426060';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=fr.re.app';

// Keep desktop/cross-platform links usable; native links open in the same tab
// following a user gesture, so mobile browsers can hand off to the store.
export function getStoreLinks(device = globalThis.navigator) {
  const userAgent = device?.userAgent || '';
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
    || (/Macintosh/i.test(userAgent) && device?.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);

  return {
    target: isIOS || isAndroid ? '_self' : '_blank',
    apple: isIOS ? 'itms-apps://apps.apple.com/app/id6783426060' : APP_STORE_URL,
    google: isAndroid
      ? `intent://details?id=fr.re.app#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
      : PLAY_STORE_URL,
  };
}
