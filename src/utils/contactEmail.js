// Split so basic scrapers don't find the address in the bundle or the HTML.
export const EMAIL_USER = 're.lasoce';
export const EMAIL_DOMAIN = 'gmail.com';

export function getEmailAddress() {
  return `${EMAIL_USER}@${EMAIL_DOMAIN}`;
}

export function buildMailto(subject) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${getEmailAddress()}${query}`;
}
