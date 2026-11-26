import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { site, attrs, tags, resolveToFile, contrast, ROOT } from './helpers.mjs';

const { cfg, pages, outDir } = await site();
const other = (locale) => cfg.LOCALES.find((l) => l !== locale);
const meta = (html, key) => new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`).exec(html)?.[1];

test('exactly one h1 per page and headings never skip a level', () => {
  for (const p of pages) {
    const levels = [...p.html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    assert.equal(levels.filter((l) => l === 1).length, 1, `${p.urlPath}: h1 count`);
    assert.equal(levels[0], 1, `${p.urlPath}: first heading must be the h1`);
    levels.reduce((prev, cur) => {
      assert.ok(cur <= prev + 1, `${p.urlPath}: heading jumps from h${prev} to h${cur}`);
      return cur;
    });
  }
});

test('titles and descriptions are unique and sensibly sized', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const p of pages) {
    const title = /<title>([^<]*)<\/title>/.exec(p.html)?.[1] ?? '';
    const description = meta(p.html, 'description') ?? '';
    assert.ok(title.length >= 15 && title.length <= 70, `${p.urlPath}: title length ${title.length}`);
    assert.ok(description.length >= 70 && description.length <= 165, `${p.urlPath}: description length ${description.length}`);
    assert.ok(!titles.has(title), `${p.urlPath}: duplicate title`);
    assert.ok(!descriptions.has(description), `${p.urlPath}: duplicate description`);
    titles.add(title);
    descriptions.add(description);
  }
});

test('canonical and reciprocal hreflang alternates are present', () => {
  for (const p of pages) {
    const canonical = /<link rel="canonical" href="([^"]*)"/.exec(p.html)?.[1];
    assert.equal(canonical, cfg.SITE_URL + p.urlPath, p.urlPath);
    const alternates = Object.fromEntries(
      [...p.html.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => [m[1], m[2]]),
    );
    for (const locale of cfg.LOCALES) {
      assert.equal(alternates[locale], cfg.SITE_URL + cfg.localePath(locale, p.route.path), `${p.urlPath}: hreflang ${locale}`);
    }
    assert.equal(alternates['x-default'], cfg.SITE_URL + cfg.localePath(cfg.DEFAULT_LOCALE, p.route.path), p.urlPath);
  }
});

test('Open Graph and Twitter metadata are complete', () => {
  for (const p of pages) {
    for (const key of ['og:title', 'og:description', 'og:type', 'og:url', 'og:image', 'og:image:alt', 'og:locale', 'og:site_name', 'twitter:card']) {
      assert.ok(meta(p.html, key), `${p.urlPath}: missing ${key}`);
    }
    assert.equal(meta(p.html, 'og:url'), cfg.SITE_URL + p.urlPath);
    const image = meta(p.html, 'og:image');
    assert.ok(image.startsWith(cfg.SITE_URL + '/'), `${p.urlPath}: og:image must be absolute`);
    assert.ok(resolveToFile(outDir, image.slice(cfg.SITE_URL.length)), `${p.urlPath}: og:image file missing`);
  }
});

test('skip link comes first and targets the main landmark', () => {
  for (const p of pages) {
    const body = p.html.slice(p.html.indexOf('<body'));
    assert.match(tags(body, 'a')[0], /class="skip-link"[^>]*href="#main"|href="#main"[^>]*class="skip-link"/, p.urlPath);
    assert.match(p.html, /<main id="main"/, p.urlPath);
    assert.equal(tags(p.html, 'main').length, 1, p.urlPath);
    assert.equal(tags(p.html, 'header').length >= 1 && tags(p.html, 'footer').length >= 1, true, p.urlPath);
  }
});

test('navigation is labelled and marks the current page', () => {
  const inNav = new Set(['platform', 'capabilities', 'how', 'about', 'contact']);
  for (const p of pages) {
    for (const nav of tags(p.html, 'nav')) assert.match(nav, /aria-label="[^"]+"/, `${p.urlPath}: unlabelled nav`);
    if (inNav.has(p.route.key)) {
      const current = /<a\b[^>]*aria-current="page"[^>]*>/.exec(p.html)?.[0] ?? '';
      assert.ok(current.includes(`href="${p.urlPath}"`), `${p.urlPath}: current nav item not marked`);
    }
  }
});

test('mobile menu button is wired to an existing panel', () => {
  for (const p of pages) {
    const button = tags(p.html, 'button').find((b) => b.includes('data-menu-toggle'));
    assert.ok(button, `${p.urlPath}: no menu button`);
    assert.match(button, /aria-expanded="false"/);
    const controls = /aria-controls="([^"]+)"/.exec(button)?.[1];
    assert.ok(controls && p.html.includes(`id="${controls}"`), `${p.urlPath}: aria-controls target missing`);
  }
});

test('language switcher links to the same page in the other locale', () => {
  for (const p of pages) {
    const target = other(p.locale);
    const link = tags(p.html, 'a').find((a) => a.includes('data-lang-switch'));
    assert.ok(link, `${p.urlPath}: no language switch`);
    assert.ok(link.includes(`href="${cfg.localePath(target, p.route.path)}"`), `${p.urlPath}: wrong switch target in ${link}`);
    assert.ok(link.includes(`hreflang="${target}"`) && link.includes(`lang="${target}"`), p.urlPath);
  }
});

test('images carry alt text and inline SVGs are hidden or labelled', () => {
  for (const p of pages) {
    for (const img of tags(p.html, 'img')) {
      assert.match(img, /\salt="/, `${p.urlPath}: ${img}`);
      assert.match(img, /\swidth="\d+"[^>]*\sheight="\d+"|\sheight="\d+"[^>]*\swidth="\d+"/, `${p.urlPath}: img needs dimensions`);
    }
    for (const svg of tags(p.html, 'svg')) {
      assert.ok(/aria-hidden="true"/.test(svg) || (/role="img"/.test(svg) && /aria-label="[^"]+"/.test(svg)), `${p.urlPath}: ${svg}`);
    }
  }
});

test('stylesheet ships focus, reduced-motion and responsive rules', async () => {
  const href = attrs(pages[0].html, 'link', 'href').find((h) => h.endsWith('.css'));
  const css = await readFile(resolveToFile(outDir, href), 'utf8');
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(min-width:/);
  assert.match(css, /font-display:\s*swap/);
  assert.doesNotMatch(css, /outline:\s*(none|0)\s*[;}]/, 'focus outlines must not be removed');
});

test('design tokens meet WCAG AA contrast for text pairs', async () => {
  const tokens = await readFile(path.join(ROOT, 'src/styles/tokens.css'), 'utf8');
  const hex = Object.fromEntries([...tokens.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\b/gi)].map((m) => [m[1], m[2].toLowerCase()]));
  const pairs = [
    ['cloud-100', 'carbon-900', 7], ['cloud-100', 'carbon-800', 7], ['cloud-100', 'slate-700', 7],
    ['mist-400', 'carbon-900', 4.5], ['mist-400', 'carbon-800', 4.5], ['mist-400', 'slate-700', 4.5],
    ['mist-500', 'carbon-900', 4.5], ['teal-400', 'carbon-900', 4.5], ['teal-400', 'slate-700', 4.5],
    ['brass-400', 'carbon-900', 4.5], ['carbon-950', 'teal-400', 4.5], ['carbon-950', 'teal-300', 4.5],
    ['carbon-900', 'cloud-100', 7], ['slate-600', 'cloud-100', 4.5],
  ];
  for (const [fg, bg, min] of pairs) {
    assert.ok(hex[fg] && hex[bg], `token missing: ${fg} or ${bg}`);
    const ratio = contrast(hex[fg], hex[bg]);
    assert.ok(ratio >= min, `${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`);
  }
});

test('structured data is valid, minimal and factual', () => {
  for (const p of pages.filter((q) => q.route.key === 'home')) {
    const raw = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(p.html)?.[1];
    assert.ok(raw, `${p.urlPath}: missing JSON-LD`);
    const data = JSON.parse(raw);
    assert.equal(data['@type'], 'WebSite');
    assert.equal(data.name, 'AVERLYNT');
    assert.equal(data.url, cfg.SITE_URL + '/');
    assert.doesNotMatch(raw, /aggregateRating|review|award|foundingDate|numberOfEmployees/i);
  }
});
