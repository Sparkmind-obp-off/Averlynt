import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');

test('Indonesian-first page and product thesis', () => {
  assert.match(html, /<html lang="id">/);
  assert.match(html, /Ubah ide menjadi sistem yang bekerja\./);
  assert.match(html, /AI, automasi, software, dan commerce/i);
  assert.match(html, /name="description"/);
});
test('navigation anchors resolve', () => {
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  const hrefs = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  assert.ok(hrefs.length >= 4);
  for (const href of hrefs) assert.ok(ids.has(href), 'missing section: ' + href);
});
test('language and mobile navigation are accessible', () => {
  assert.match(html, /aria-label="Change language"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /data-copy-id/);
  assert.match(html, /data-copy-en/);
  assert.match(html, /dataset\.copyId/);
});
test('responsive and reduced-motion support are present', () => {
  assert.match(html, /@media\(max-width:/);
  assert.match(html, /:focus-visible/);
  assert.match(html, /prefers-reduced-motion:reduce/);
});
test('no fabricated social proof or live-feature claims', () => {
  assert.match(html, /sedang dikembangkan bertahap/i);
  assert.doesNotMatch(html, /10,000\+|99\.9%|trusted by|dipercaya oleh/i);
});