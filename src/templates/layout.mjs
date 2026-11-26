// Document shell: <head> metadata, header, main landmark, footer.

import * as cfg from '../site.config.mjs';
import { esc, header, footer, symbol, icon } from './components.mjs';

const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Runtime configuration for src/scripts/site.js, passed as data attributes (no inline script).
const htmlAttrs = (locale) =>
  `lang="${locale}" data-site-host="${cfg.SITE_HOST}" data-clerk-key="${cfg.CLERK.publishableKey}" data-clerk-js="${cfg.CLERK.script}"`;

function head({ locale, title, description, urlPath, alternates, ogAlt, assets, robots = '', structured = '' }) {
  const url = cfg.SITE_URL + urlPath;
  const image = `${cfg.SITE_URL}/og/averlynt-og-${locale}.png`;
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots ? `<meta name="robots" content="${robots}">\n` : ''}${alternates ? `<link rel="canonical" href="${url}">
${cfg.LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${cfg.SITE_URL}${alternates(l)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${cfg.SITE_URL}${alternates(cfg.DEFAULT_LOCALE)}">
` : ''}<meta name="theme-color" content="${cfg.THEME_COLOR}">
<meta name="color-scheme" content="dark">
<meta property="og:site_name" content="${cfg.SITE_NAME}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${cfg.OG_LOCALE[locale]}">
${cfg.LOCALES.filter((l) => l !== locale).map((l) => `<meta property="og:locale:alternate" content="${cfg.OG_LOCALE[l]}">`).join('\n')}
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/SpaceGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets.css}">
<script src="${assets.js}" defer></script>${structured ? `\n${structured}` : ''}`;
}

export function renderDocument(ctx, page) {
  const { locale, route, t, assets } = ctx;
  const urlPath = cfg.localePath(locale, route.path);
  const title = route.key === 'home' ? page.title : `${page.title} — ${cfg.SITE_NAME}`;
  const structured = route.key === 'home'
    ? jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: cfg.SITE_NAME,
      url: `${cfg.SITE_URL}/`,
      description: page.description,
      inLanguage: cfg.LOCALES,
    })
    : '';
  return `<!doctype html>
<html ${htmlAttrs(locale)}>
<head>
${head({ locale, title, description: page.description, urlPath, alternates: (l) => cfg.localePath(l, route.path), ogAlt: t.common.ogAlt, assets, structured, robots: route.noindex ? 'noindex, follow' : '' })}
</head>
<body class="page page--${route.key.replace(':', '-')}">
<a class="skip-link" href="#main">${esc(t.common.skip)}</a>
${header(ctx)}
<main id="main">
${page.body}
</main>
${footer(ctx)}
</body>
</html>
`;
}

/** Cloudflare Pages serves /404.html for unknown paths, so it must work in both languages at once. */
export function renderNotFound({ content, assets }) {
  const id = content.id.pages.notFound;
  const en = content.en.pages.notFound;
  const block = (t, locale, attr) => `<div class="not-found__block"${attr}><p class="label"><span class="label__index">404</span><span class="label__rule" aria-hidden="true"></span>${esc(t.label)}</p><p class="not-found__title">${esc(t.title)}</p><p class="lede">${esc(t.text)}</p><a class="btn btn--${locale === 'id' ? 'primary' : 'ghost'}" href="${cfg.localePath(locale, '/')}"><span>${esc(t.cta)}</span>${icon.arrow}</a></div>`;
  return `<!doctype html>
<html ${htmlAttrs('id')}>
<head>
${head({ locale: 'id', title: `${id.title} — ${cfg.SITE_NAME}`, description: id.text, urlPath: '/404.html', alternates: null, ogAlt: content.id.common.ogAlt, assets, robots: 'noindex, follow' })}
</head>
<body class="page page--not-found">
<a class="skip-link" href="#main">${esc(content.id.common.skip)}</a>
<header class="site-header">
<div class="frame site-header__inner">
<a class="brand" href="/" aria-label="AVERLYNT — ${esc(content.id.nav.home)}">${symbol()}<span class="brand__word" aria-hidden="true">AVERLYNT</span></a>
</div>
</header>
<main id="main">
<section class="page-hero not-found">
<div class="frame page-hero__inner">
<h1 class="vh">${esc(id.title)}</h1>
<div class="not-found__grid">
${block(id, 'id', '')}
${block(en, 'en', ' lang="en"')}
</div>
</div>
</section>
</main>
</body>
</html>
`;
}
