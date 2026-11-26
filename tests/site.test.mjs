import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { site, attrs, tags, resolveToFile } from './helpers.mjs';

const { cfg, pages, outDir } = await site();
const page = (locale, key) => pages.find((p) => p.locale === locale && p.route.key === key);

test('builds every route in every locale with the right document language', () => {
  assert.equal(pages.length, cfg.LOCALES.length * cfg.ROUTES.length);
  assert.ok(cfg.ROUTES.length >= 12, 'home, platform, capabilities (+4), how, about, contact, privacy, terms');
  for (const p of pages) {
    assert.ok(p.html, `missing page ${p.urlPath}`);
    assert.match(p.html, /^<!doctype html>/i, p.urlPath);
    assert.match(p.html, new RegExp(`<html lang="${p.locale}"`), p.urlPath);
  }
});

test('Indonesian is the default at the root and English lives under /en/', () => {
  assert.equal(cfg.DEFAULT_LOCALE, 'id');
  assert.equal(page('id', 'home').urlPath, '/');
  assert.equal(page('en', 'home').urlPath, '/en/');
  assert.match(page('id', 'home').html, /Ubah ide menjadi sistem yang bekerja\./);
  assert.match(page('en', 'home').html, /Turn ideas into systems that work\./);
});

test('every internal link and asset reference resolves to a built file', () => {
  for (const p of pages) {
    const refs = [
      ...attrs(p.html, 'a', 'href'),
      ...attrs(p.html, 'link', 'href'),
      ...attrs(p.html, 'script', 'src'),
      ...attrs(p.html, 'img', 'src'),
    ];
    for (const ref of refs) {
      if (ref.startsWith('#')) continue;
      const local = ref.startsWith(cfg.SITE_URL) ? ref.slice(cfg.SITE_URL.length) || '/' : ref;
      if (/^https?:/.test(local)) continue; // external; covered by the allowlist test
      assert.ok(local.startsWith('/'), `${p.urlPath}: links must be root-relative, got "${ref}"`);
      assert.ok(resolveToFile(outDir, local), `${p.urlPath}: broken reference "${ref}"`);
    }
  }
});

test('every in-page anchor points at an existing id', () => {
  for (const p of pages) {
    const ids = new Set(attrs(p.html, '\\w+', 'id'));
    for (const href of attrs(p.html, 'a', 'href')) {
      const hash = href.includes('#') ? href.split('#')[1] : '';
      if (!hash) continue;
      const target = href.startsWith('#') ? p : pages.find((q) => q.urlPath === href.split('#')[0]);
      assert.ok(target, `${p.urlPath}: anchor to unknown page "${href}"`);
      const targetIds = target === p ? ids : new Set(attrs(target.html, '\\w+', 'id'));
      assert.ok(targetIds.has(hash), `${p.urlPath}: missing anchor target "${href}"`);
    }
  }
});

test('no dead buttons, empty links or forms that pretend to work', () => {
  for (const p of pages) {
    assert.doesNotMatch(p.html, /<form\b/i, `${p.urlPath}: no form may exist without a real backend`);
    assert.doesNotMatch(p.html, /<input\b|<textarea\b|<select\b/i, p.urlPath);
    assert.doesNotMatch(p.html, /href="(#|)"|href="javascript:/i, p.urlPath);
    for (const button of tags(p.html, 'button')) {
      assert.match(button, /type="button"/, p.urlPath);
      assert.match(button, /data-menu-toggle|data-auth-signout/, `${p.urlPath}: unexpected button without behaviour: ${button}`);
    }
  }
});

test('external links are allowlisted and marked safe', () => {
  for (const p of pages) {
    for (const tag of tags(p.html, 'a')) {
      const href = /href="([^"]*)"/.exec(tag)?.[1] ?? '';
      if (!/^https?:/.test(href) || href.startsWith(cfg.SITE_URL)) continue;
      const allowed = [cfg.REPO_URL, cfg.CLERK.accountPortal, cfg.CLERK.frontendApi];
      assert.ok(allowed.some((prefix) => href.startsWith(prefix)), `${p.urlPath}: external link not allowlisted: ${href}`);
      assert.match(tag, /rel="[^"]*noopener[^"]*"/, `${p.urlPath}: ${href} needs rel=noopener`);
    }
  }
});

test('pages make no third-party resource requests', async () => {
  for (const p of pages) {
    for (const ref of [...attrs(p.html, 'link', 'href'), ...attrs(p.html, 'script', 'src'), ...attrs(p.html, 'img', 'src')]) {
      assert.ok(!/^(https?:)?\/\//.test(ref) || ref.startsWith(cfg.SITE_URL), `${p.urlPath}: third-party resource ${ref}`);
    }
  }
  const cssHref = attrs(pages[0].html, 'link', 'href').find((h) => h.endsWith('.css'));
  const css = await readFile(resolveToFile(outDir, cssHref), 'utf8');
  assert.doesNotMatch(css, /@import|url\(\s*["']?(https?:)?\/\//, 'CSS must not load remote assets');
});

test('markup is compatible with a strict Content-Security-Policy', () => {
  for (const p of pages) {
    assert.doesNotMatch(p.html, /\sstyle="/, `${p.urlPath}: inline style attribute`);
    assert.doesNotMatch(p.html, /<style\b/, `${p.urlPath}: inline <style>`);
    assert.doesNotMatch(p.html, /\son[a-z]+="/, `${p.urlPath}: inline event handler`);
    for (const script of tags(p.html, 'script')) {
      assert.ok(/\ssrc="/.test(script) || /type="application\/ld\+json"/.test(script), `${p.urlPath}: inline script ${script}`);
    }
  }
});

test('platform files exist: 404, robots, sitemap, headers, manifest, icons', async () => {
  for (const file of ['404.html', 'robots.txt', 'sitemap.xml', '_headers', 'site.webmanifest', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png']) {
    assert.ok(existsSync(path.join(outDir, file)), `missing ${file}`);
  }
  const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8');
  for (const p of pages.filter((q) => !q.route.noindex)) {
    assert.ok(sitemap.includes(`<loc>${cfg.SITE_URL}${p.urlPath}</loc>`), `sitemap missing ${p.urlPath}`);
  }
  for (const p of pages.filter((q) => q.route.noindex)) {
    assert.ok(!sitemap.includes(`<loc>${cfg.SITE_URL}${p.urlPath}</loc>`), `noindex route must stay out of sitemap: ${p.urlPath}`);
  }
  const robots = await readFile(path.join(outDir, 'robots.txt'), 'utf8');
  assert.match(robots, new RegExp(`Sitemap: ${cfg.SITE_URL}/sitemap.xml`));
  const headers = await readFile(path.join(outDir, '_headers'), 'utf8');
  assert.match(headers, /Content-Security-Policy: .*default-src 'self'/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /frame-ancestors 'none'/);
  const notFound = await readFile(path.join(outDir, '404.html'), 'utf8');
  assert.match(notFound, /<meta name="robots" content="noindex/);
  JSON.parse(await readFile(path.join(outDir, 'site.webmanifest'), 'utf8'));
});

test('each capability page covers description, benefits, limits and use cases', () => {
  assert.deepEqual(cfg.CAPABILITIES, ['ai', 'automation', 'saas', 'commerce']);
  for (const locale of cfg.LOCALES) {
    for (const cap of cfg.CAPABILITIES) {
      const p = page(locale, `capability:${cap}`);
      for (const id of ['description', 'benefits', 'limits', 'use-cases']) {
        const section = new RegExp(`<section[^>]*\\sid="${id}"[\\s\\S]*?</section>`).exec(p.html)?.[0];
        assert.ok(section, `${p.urlPath}: missing #${id}`);
        if (id !== 'description') assert.ok((section.match(/<li\b/g) ?? []).length >= 3, `${p.urlPath}: #${id} needs at least 3 items`);
      }
    }
  }
});

test('the six stages appear in order on Home and How It Works', () => {
  assert.deepEqual(cfg.STEPS, ['discover', 'validate', 'design', 'build', 'operate', 'improve']);
  for (const locale of cfg.LOCALES) {
    for (const key of ['home', 'how']) {
      assert.deepEqual(attrs(page(locale, key).html, 'li', 'data-step'), cfg.STEPS, `${locale}/${key}`);
    }
  }
});

test('the Route-Frame map names all four capabilities on Home and Platform', () => {
  for (const locale of cfg.LOCALES) {
    for (const key of ['home', 'platform']) {
      assert.deepEqual(attrs(page(locale, key).html, 'li', 'data-node'), cfg.CAPABILITIES, `${locale}/${key}`);
    }
  }
});
