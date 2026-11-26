import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { site, visibleText, ROOT } from './helpers.mjs';

const { cfg, pages, outDir, content } = await site();

function shape(value, trail = '') {
  if (Array.isArray(value)) return value.flatMap((v, i) => shape(v, `${trail}[${i}]`));
  if (value && typeof value === 'object') return Object.keys(value).sort().flatMap((k) => shape(value[k], `${trail}.${k}`));
  return [trail];
}
function leaves(value, trail = '') {
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${trail}[${i}]`));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => leaves(v, `${trail}.${k}`));
  return [[trail, value]];
}

test('locales share an identical content shape with no empty strings', () => {
  const [base, ...rest] = cfg.LOCALES;
  for (const locale of rest) assert.deepEqual(shape(content[locale]), shape(content[base]), `${locale} differs from ${base}`);
  for (const locale of cfg.LOCALES) {
    for (const [key, value] of leaves(content[locale])) {
      assert.equal(typeof value, 'string', `${locale}${key} must be a string`);
      assert.ok(value.trim().length > 0, `${locale}${key} is empty`);
    }
  }
});

test('capability names are product terms shared by every locale', () => {
  const names = (locale) => cfg.CAPABILITIES.map((c) => content[locale].capabilities[c].name);
  assert.deepEqual(names('id'), ['AI', 'Automation', 'SaaS', 'Digital Commerce']);
  assert.deepEqual(names('en'), names('id'));
});

test('no unintended language mixing in visible copy', () => {
  const english = /\b(the|and|with|your|our|from|that|this|are)\b/i;
  const indonesian = /\b(yang|dan|dengan|untuk|dari|adalah|kami|belum|tidak)\b/i;
  for (const p of pages) {
    if (p.locale === 'id') {
      const hit = english.exec(visibleText(p.html, { dropLang: 'en' }));
      assert.equal(hit, null, `${p.urlPath}: English word "${hit?.[0]}" in Indonesian copy`);
    } else {
      const hit = indonesian.exec(visibleText(p.html, { dropLang: 'id' }));
      assert.equal(hit, null, `${p.urlPath}: Indonesian word "${hit?.[0]}" in English copy`);
    }
  }
});

test('no fabricated proof, performance numbers or legal claims', () => {
  const banned = [
    /trusted by|dipercaya oleh|loved by|as seen (in|on)/i,
    /\d[\d.,]*\s?(%|\+|x\b|k\b|rb\b|juta\b|million\b|users\b|pengguna\b|pelanggan\b|customers\b)/i,
    /[®™]|registered trademark|merek terdaftar resmi/i,
    /\b(GDPR|ISO ?27001|SOC ?2|UU PDP|HIPAA)\b|certified|bersertifikat/i,
    /revolutionary|revolusioner|world-class|kelas dunia|#1|nomor satu|terbaik di/i,
    /guarantee[ds]? (results|revenue)|menjamin (hasil|pendapatan|omzet)/i,
  ];
  for (const p of pages) {
    const text = visibleText(p.html);
    for (const pattern of banned) {
      const hit = pattern.exec(text);
      assert.equal(hit, null, `${p.urlPath}: banned claim "${hit?.[0]}"`);
    }
  }
});

test('no placeholder content is left behind', () => {
  for (const p of pages) {
    const hit = /lorem ipsum|example\.com|coming soon|segera hadir|\[object Object\]/i.exec(p.html)
      // Case-sensitive on purpose: "NaN" must not match Indonesian words such as "layanan".
      ?? /\bTODO\b|\bTBD\b|\bFIXME\b|\bundefined\b|\bNaN\b/.exec(p.html);
    assert.equal(hit, null, `${p.urlPath}: placeholder "${hit?.[0]}"`);
  }
});

test('status vocabulary stays honest: only the foundation and one contact channel are live', () => {
  for (const locale of cfg.LOCALES) {
    const t = content[locale];
    for (const cap of cfg.CAPABILITIES) assert.notEqual(t.capabilities[cap].status, 'live', `${locale}: ${cap} must not be marked live`);
    const live = t.pages.home.status.items.filter((i) => i.status === 'live');
    // Exactly two things are live: the website foundation and the account sign-in. Nothing else.
    assert.equal(live.length, 2, `${locale}: expected exactly 2 live items, found ${live.length}`);
    assert.ok(live.some((i) => /fondasi|foundation/i.test(i.title)), `${locale}: foundation must be live`);
    assert.ok(live.some((i) => /akun|account/i.test(i.title)), `${locale}: account must be live`);
    assert.equal(t.pages.home.status.items[0].status, 'live');
    const channels = t.pages.contact.channels.items;
    assert.deepEqual(channels.map((c) => c.status), ['live', 'planned', 'planned'], `${locale}: contact channel statuses`);
    for (const key of Object.keys(t.common.status)) assert.ok(['live', 'building', 'validating', 'planned', 'method', 'draft'].includes(key));
  }
});

test('contact page states its limits and offers the one verified channel', () => {
  for (const p of pages.filter((q) => q.route.key === 'contact')) {
    assert.ok(p.html.includes(`href="${cfg.ISSUES_URL}"`), `${p.urlPath}: verified channel link missing`);
    assert.match(visibleText(p.html), p.locale === 'id' ? /belum ditetapkan/ : /not been set up yet/);
    assert.doesNotMatch(p.html, /mailto:|tel:|wa\.me/i, `${p.urlPath}: no unverified contact endpoints`);
  }
});

test('legal pages are clearly labelled as drafts', () => {
  for (const p of pages.filter((q) => ['privacy', 'terms'].includes(q.route.key))) {
    const text = visibleText(p.html);
    assert.match(text, p.locale === 'id' ? /Draf/ : /Draft/, p.urlPath);
    assert.match(text, p.locale === 'id' ? /belum ditinjau oleh penasihat hukum/ : /has not been reviewed by legal counsel/, p.urlPath);
  }
});

test('no secrets in tracked source or build output', async () => {
  const patterns = [
    /sk_(live|test)_[A-Za-z0-9]{8,}/, /pk_(live|test)_[A-Za-z0-9]{8,}/, /gh[pousr]_[A-Za-z0-9]{20,}/,
    /CLOUDFLARE_API_TOKEN\s*[=:]\s*["']?[A-Za-z0-9_-]{20,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  ];
  const tracked = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' })
    .split('\n').filter(Boolean).map((f) => path.join(ROOT, f));
  const built = (await readdir(outDir, { recursive: true })).map((f) => path.join(outDir, f));
    for (const file of [...tracked, ...built]) {
    if (/\.(woff2|png|ico|jpg|webp)$/.test(file)) continue;
    let body;
    try { body = await readFile(file, 'utf8'); } catch { continue; }
    // The Clerk *publishable* key is public by design (it only encodes the Frontend API host),
    // so it is removed before scanning; any secret key must still never appear anywhere.
    body = body.split(cfg.CLERK.publishableKey).join('[clerk-publishable-key]');
    for (const pattern of patterns) assert.doesNotMatch(body, pattern, `secret-like value in ${path.relative(ROOT, file)}`);
  }
});
