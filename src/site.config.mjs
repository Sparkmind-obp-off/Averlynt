// Single source of truth for routes, locales and public URLs.
// Imported by the build, the tests and the Pages Function, so it must stay dependency-free.

export const SITE_NAME = 'AVERLYNT';
export const SITE_HOST = 'averlynt.biz.id';
export const SITE_URL = `https://${SITE_HOST}`;
export const PAGES_DEV_HOST = 'averlynt.pages.dev';
export const REPO_URL = 'https://github.com/Sparkmind-obp-off/Averlynt';
export const ISSUES_URL = `${REPO_URL}/issues/new`;
export const COPYRIGHT_YEAR = '2026';
export const THEME_COLOR = '#0b1115';

// Clerk (production instance bound to averlynt.biz.id).
// The publishable key is public by design: it only encodes the Frontend API host.
// The secret key is NEVER stored here; it lives as a Cloudflare Pages secret (CLERK_SECRET_KEY).
export const CLERK = {
  publishableKey: 'pk_live_Y2xlcmsuYXZlcmx5bnQuYml6LmlkJA',
  frontendApi: 'https://clerk.averlynt.biz.id',
  accountPortal: 'https://accounts.averlynt.biz.id',
  script: 'https://clerk.averlynt.biz.id/npm/@clerk/clerk-js@5/dist/clerk.headless.browser.js',
  issuer: 'https://clerk.averlynt.biz.id',
  authorizedParties: [SITE_URL],
  jwksUrl: 'https://api.clerk.com/v1/jwks',
};

export const LOCALES = ['id', 'en'];
export const DEFAULT_LOCALE = 'id';
export const OG_LOCALE = { id: 'id_ID', en: 'en_US' };

// Shown in the *target* language on purpose, so they are announced correctly.
export const LANG_CODE = { id: 'ID', en: 'EN' };
export const LANG_NAME = { id: 'Bahasa Indonesia', en: 'English' };
export const LANG_SWITCH_LABEL = { id: 'Ganti ke Bahasa Indonesia', en: 'Switch to English' };

export const CAPABILITIES = ['ai', 'automation', 'saas', 'commerce'];
export const CAPABILITY_SLUG = { ai: 'ai', automation: 'automation', saas: 'saas', commerce: 'digital-commerce' };
export const STEPS = ['discover', 'validate', 'design', 'build', 'operate', 'improve'];

export const ROUTES = [
  { key: 'home', path: '/' },
  { key: 'platform', path: '/platform/' },
  { key: 'capabilities', path: '/capabilities/' },
  ...CAPABILITIES.map((capability) => ({
    key: `capability:${capability}`,
    path: `/capabilities/${CAPABILITY_SLUG[capability]}/`,
    capability,
  })),
  { key: 'how', path: '/how-it-works/' },
  { key: 'about', path: '/about/' },
  { key: 'contact', path: '/contact/' },
  { key: 'account', path: '/account/', noindex: true },
  { key: 'privacy', path: '/legal/privacy/' },
  { key: 'terms', path: '/legal/terms/' },
];

/** Indonesian lives at the root; every other locale is prefixed. */
export function localePath(locale, routePath) {
  return locale === DEFAULT_LOCALE ? routePath : `/${locale}${routePath}`;
}

export function routePath(key) {
  const route = ROUTES.find((r) => r.key === key);
  if (!route) throw new Error(`Unknown route: ${key}`);
  return route.path;
}

const portalUrl = (page, locale) =>
  `${CLERK.accountPortal}/${page}?redirect_url=${encodeURIComponent(SITE_URL + localePath(locale, routePath('account')))}`;
export const signInUrl = (locale) => portalUrl('sign-in', locale);
export const signUpUrl = (locale) => portalUrl('sign-up', locale);
export const manageAccountUrl = `${CLERK.accountPortal}/user`;

export const BRAND_ASSETS = [
  { key: 'symbol', file: '/brand/averlynt-symbol.svg', width: 64, height: 64, surface: 'dark' },
  { key: 'horizontal', file: '/brand/averlynt-logo-horizontal.svg', width: 300, height: 64, surface: 'dark' },
  { key: 'stacked', file: '/brand/averlynt-logo-stacked.svg', width: 220, height: 132, surface: 'dark' },
  { key: 'horizontalLight', file: '/brand/averlynt-logo-horizontal-on-light.svg', width: 300, height: 64, surface: 'light' },
];
