// Zero-dependency static site generator for AVERLYNT.
// Usage: `node scripts/build.mjs` (writes ./dist) or `build({ outDir })` from tests.

import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as cfg from '../src/site.config.mjs';
import { renderDocument, renderNotFound } from '../src/templates/layout.mjs';
import { renderPage } from '../src/templates/pages.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = path.join(ROOT, 'src');
const STYLES = ['tokens.css', 'site.css'];

const hash = (text) => createHash('sha256').update(text).digest('hex').slice(0, 10);

/** Conservative minifier: strips comments and collapses whitespace only. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

// Clerk needs its Frontend API for script + XHR and Cloudflare Turnstile for bot checks.
const CSP = [
  "default-src 'self'",
  `script-src 'self' ${cfg.CLERK.frontendApi} https://challenges.cloudflare.com`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${cfg.CLERK.frontendApi}`,
  "worker-src 'self' blob:",
  'frame-src https://challenges.cloudflare.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const noindexPaths = cfg.ROUTES.filter((r) => r.noindex)
  .flatMap((r) => cfg.LOCALES.map((l) => `${cfg.localePath(l, r.path)}*\n  X-Robots-Tag: noindex\n`));

const headersFile = () => `/*
  Content-Security-Policy: ${CSP}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=31536000

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

${noindexPaths.join('\n')}
https://${cfg.PAGES_DEV_HOST}/*
  X-Robots-Tag: noindex

https://:branch.${cfg.PAGES_DEV_HOST}/*
  X-Robots-Tag: noindex
`;

function sitemap() {
  const urls = cfg.ROUTES.filter((route) => !route.noindex).flatMap((route) =>
    cfg.LOCALES.map((locale) => {
      const alternates = cfg.LOCALES.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${cfg.SITE_URL}${cfg.localePath(l, route.path)}"/>`,
      ).join('\n');
      return `  <url>\n    <loc>${cfg.SITE_URL}${cfg.localePath(locale, route.path)}</loc>\n${alternates}\n  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

const manifest = (description) => JSON.stringify({
  name: cfg.SITE_NAME,
  short_name: cfg.SITE_NAME,
  description,
  start_url: '/',
  display: 'browser',
  background_color: cfg.THEME_COLOR,
  theme_color: cfg.THEME_COLOR,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2) + '\n';

export async function build({ outDir = path.join(ROOT, 'dist'), quiet = false } = {}) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, 'assets'), { recursive: true });

  // 1. Static files are copied verbatim (fonts, brand assets, icons).
  await cp(path.join(SRC, 'static'), outDir, { recursive: true });

  // 2. CSS and JS are concatenated and content-hashed for immutable caching.
  const css = minifyCss((await Promise.all(STYLES.map((f) => readFile(path.join(SRC, 'styles', f), 'utf8')))).join('\n'));
  const js = await readFile(path.join(SRC, 'scripts', 'site.js'), 'utf8');
  const assets = { css: `/assets/site.${hash(css)}.css`, js: `/assets/site.${hash(js)}.js` };
  await writeFile(path.join(outDir, assets.css), css);
  await writeFile(path.join(outDir, assets.js), js);

  // 3. Pages: every route in every locale.
  const content = {};
  for (const locale of cfg.LOCALES) content[locale] = (await import(`../src/content/${locale}.mjs`)).default;

  let count = 0;
  for (const locale of cfg.LOCALES) {
    for (const route of cfg.ROUTES) {
      const ctx = { locale, route, t: content[locale], assets };
      const html = renderDocument(ctx, renderPage(ctx));
      const dir = path.join(outDir, cfg.localePath(locale, route.path));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), html);
      count += 1;
    }
  }

  // 4. Platform files. _routes.json keeps Pages Functions limited to /api/* so static pages never invoke a Function.
  await writeFile(path.join(outDir, '404.html'), renderNotFound({ content, assets }));
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${cfg.SITE_URL}/sitemap.xml\n`);
  await writeFile(path.join(outDir, 'sitemap.xml'), sitemap());
  await writeFile(path.join(outDir, '_headers'), headersFile());
  await writeFile(path.join(outDir, '_routes.json'), JSON.stringify({ version: 1, include: ['/api/*'], exclude: [] }) + '\n');
  await writeFile(path.join(outDir, 'site.webmanifest'), manifest(content[cfg.DEFAULT_LOCALE].pages.home.description));

  if (!quiet) console.log(`Built ${count} pages (+404) → ${path.relative(ROOT, outDir) || outDir}\n  ${assets.css}\n  ${assets.js}`);
  return { outDir, assets, pages: count };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
