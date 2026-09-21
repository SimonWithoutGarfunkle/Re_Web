export const MEASUREMENT_ID = 'G-LJH3S47EPV';
export const CONSENT_KEY = 're-cookie-consent-v1';
const VERSION = 1;
const COOKIE_SECONDS = 180 * 24 * 60 * 60;
const PUBLIC_PAGES = new Set(['/', '/ios', '/mentions-legales', '/confidentialite', '/conditions-utilisation', '/politique-contenu', '/testeurs']);
let memoryChoice;
let started = false;
let consentGranted = false;
let lastPage;
const listeners = new Set();

export function readConsent() {
  let choice;
  try {
    choice = memoryChoice ?? JSON.parse(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    choice = memoryChoice;
  }
  if (!choice || choice.version !== VERSION || typeof choice.analytics !== 'boolean'
    || !Number.isFinite(choice.expiresAt) || choice.expiresAt <= Date.now()) return null;
  return choice.analytics;
}

export function subscribeConsent(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function clearAnalyticsCookies() {
  const domains = window.location.hostname.split('.');
  const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0]);
  for (const name of names.filter((name) => name === '_ga' || name.startsWith('_ga_'))) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (let i = 0; i < domains.length - 1; i += 1) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domains.slice(i).join('.')}`;
    }
  }
}

function stopAnalytics() {
  window[`ga-disable-${MEASUREMENT_ID}`] = true;
  if (consentGranted) {
    // Discard pending hits/grants before queuing the withdrawal, never after it.
    // Keep this page alive so gtag can process the consent update.
    for (let i = window.dataLayer.length - 1; i >= 0; i -= 1) {
      const command = window.dataLayer[i];
      if (command[0] === 'event' || (command[0] === 'consent' && command[1] === 'update')) {
        window.dataLayer.splice(i, 1);
      }
    }
    window.gtag('consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
    consentGranted = false;
    lastPage = undefined;
  }
  clearAnalyticsCookies();
}

export function saveConsent(analytics) {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 6);
  memoryChoice = { version: VERSION, analytics, expiresAt: expiry.getTime() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(memoryChoice));
  } catch {
    // A quota error must not leave an older agreement active after a reload.
    try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage unavailable. */ }
  }
  if (!analytics) stopAnalytics();
  else if (started && !consentGranted) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    consentGranted = true;
  }
  notify();
}

// Check expiry while a tab stays open, and synchronize withdrawal across tabs.
export function watchConsent() {
  const check = () => {
    if (readConsent() !== true) stopAnalytics();
    notify();
  };
  const onStorage = (event) => {
    if (event.key === CONSENT_KEY || event.key === null) {
      memoryChoice = undefined;
      check();
    }
  };
  check();
  const timer = window.setInterval(check, 1000);
  window.addEventListener('storage', onStorage);
  window.addEventListener('focus', check);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('focus', check);
  };
}

export function trackPage(pathname) {
  if (readConsent() !== true) return;
  const allowed = PUBLIC_PAGES.has(pathname);
  window[`ga-disable-${MEASUREMENT_ID}`] = !allowed;
  if (!allowed) {
    lastPage = undefined;
    // Keep initialization commands if the script is still loading.
    if (window.dataLayer) {
      for (let i = window.dataLayer.length - 1; i >= 0; i -= 1) {
        if (window.dataLayer[i][0] === 'event') window.dataLayer.splice(i, 1);
      }
    }
    return;
  }
  if (started && !consentGranted) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    consentGranted = true;
  }
  if (lastPage === pathname) return;
  const page = {
    page_location: `${window.location.origin}${pathname}`,
    page_referrer: '',
    page_title: pathname === '/' ? 'Re — Accueil' : `Re — ${pathname.slice(1)}`,
  };
  if (!started) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    consentGranted = true;
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      ...page, send_page_view: false,
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: COOKIE_SECONDS, cookie_update: false,
      cookie_flags: 'SameSite=Lax;Secure',
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.referrerPolicy = 'no-referrer';
    document.head.appendChild(script);
    started = true;
  }
  window.gtag('set', page);
  window.gtag('event', 'page_view', { ...page, send_to: MEASUREMENT_ID });
  lastPage = pathname;
}
