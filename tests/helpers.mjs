import { readFile, mkdtemp } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

let cached;

/** Build the site once per test process into an isolated temp directory. */
export function site() {
  cached ??= (async () => {
    const { build } = await import('../scripts/build.mjs');
    const cfg = await import('../src/site.config.mjs');
    const outDir = await mkdtemp(path.join(tmpdir(), 'averlynt-dist-'));
    await build({ outDir, quiet: true });
    const pages = [];
    for (const locale of cfg.LOCALES) {
      for (const route of cfg.ROUTES) {
        const urlPath = cfg.localePath(locale, route.path);
        const file = path.join(outDir, urlPath, 'index.html');
        const html = existsSync(file) ? await readFile(file, 'utf8') : '';
        pages.push({ locale, route, urlPath, file, html });
      }
    }
    const content = {};
    for (const locale of cfg.LOCALES) {
      content[locale] = (await import(`../src/content/${locale}.mjs`)).default;
    }
    return { cfg, pages, outDir, content };
  })();
  return cached;
}

/** All values of `name` on `<tag …>` elements. */
export function attrs(html, tag, name) {
  const re = new RegExp(`<${tag}\\b[^>]*?\\s${name}="([^"]*)"`, 'g');
  return [...html.matchAll(re)].map((m) => m[1]);
}

/** Opening tags of a given element. */
export function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map((m) => m[0]);
}

/** Human-visible text: drops scripts, svg internals, tags and collapses whitespace. */
export function visibleText(html, { dropLang } = {}) {
  let out = html
    .replace(/<head[\s\S]*?<\/head>/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ');
  if (dropLang) {
    // Remove elements explicitly marked as another language (e.g. the language switcher).
    out = out.replace(new RegExp(`<(\\w+)\\b[^>]*\\slang="${dropLang}"[^>]*>[\\s\\S]*?<\\/\\1>`, 'g'), ' ');
  }
  return out
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Map a root-relative URL to a file inside the build output, or null when missing. */
export function resolveToFile(outDir, url) {
  const clean = url.split('#')[0].split('?')[0];
  let file = path.join(outDir, decodeURI(clean));
  if (clean.endsWith('/')) file = path.join(file, 'index.html');
  if (existsSync(file) && statSync(file).isFile()) return file;
  return null;
}

/** WCAG 2.x relative luminance contrast ratio for two #rrggbb colours. */
export function contrast(a, b) {
  const lum = (hex) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
