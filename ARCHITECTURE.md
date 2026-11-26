# AVERLYNT — Architecture

## Ringkasan

Situs statis yang dihasilkan oleh satu skrip Node nol-dependensi, disajikan oleh Cloudflare Pages, dengan **satu** Pages Function yang melakukan verifikasi sesi Clerk di sisi server.

```
src/content/{id,en}.mjs ─┐
src/templates/*.mjs     ─┼─→ scripts/build.mjs ─→ dist/ ─→ Cloudflare Pages
src/styles/*.css        ─┤                             │
src/scripts/site.js     ─┤                             └─→ functions/api/session.js (runtime)
src/static/**           ─┘
```

Tidak ada framework, tidak ada bundler, tidak ada `node_modules`. `node scripts/build.mjs` adalah satu-satunya langkah build.

## Alur build

`scripts/build.mjs`:

1. Membaca `src/styles/tokens.css` + `src/styles/site.css`, menggabungkan, meminifikasi secara konservatif (hanya komentar + spasi), lalu menulis `dist/assets/site.<sha256-10>.css`.
2. Menyalin `src/scripts/site.js` → `dist/assets/site.<sha256-10>.js`.
3. Menyalin `src/static/**` ke `dist/` (font, brand, ikon, og).
4. Untuk setiap `locale × route` di `site.config.mjs` → `renderPage()` → `renderDocument()` → tulis `dist/<path>/index.html`. Total 26 dokumen (13 route × 2 locale).
5. Menulis `dist/404.html` (bilingual, `noindex`).
6. Menulis `dist/robots.txt`, `dist/sitemap.xml` (hanya route non-`noindex`; 24 URL), `dist/site.webmanifest`.
7. Menulis `dist/_headers` (CSP + header keamanan + cache immutable + `X-Robots-Tag` untuk route `noindex`).
8. Menulis `dist/_routes.json` → `{"version":1,"include":["/api/*"],"exclude":[]}` sehingga Function hanya berjalan untuk `/api/*`; semua aset statis tetap gratis dan cepat.

Build bersifat **deterministik**: hash aset sama untuk input yang sama, jadi diff repo tetap bersih.

## Rute dan locale

`src/site.config.mjs` adalah satu sumber kebenaran dan diimpor oleh build, tes, dan Function.

```js
LOCALES = ['id', 'en']; DEFAULT_LOCALE = 'id';
localePath(locale, '/platform/') === '/platform/'   // id (akar)
localePath(locale, '/platform/') === '/en/platform/' // en
```

Bahasa Indonesia di akar, English di `/en/`. Setiap halaman memuat `hreflang` resiprokal `id`, `en`, dan `x-default` → `id`. Pemilih bahasa menunjuk halaman yang sama di locale lain (diuji otomatis).

Route `noindex` (`/account/` dan `/en/account/`) diberi `X-Robots-Tag: noindex`, `meta robots noindex, nofollow`, dan dikeluarkan dari sitemap.

## Lapisan konten

`src/content/id.mjs` dan `src/content/en.mjs` memiliki **bentuk objek identik**. Tes `content.test.mjs` membandingkan jejak kunci secara rekursif, jadi menambah field di satu locale tanpa yang lain langsung gagal.

Nilai status memakai kosakata tertutup: `live`, `building`, `validating`, `planned`, `method`, `draft`. Tes memastikan hanya **dua** item bertanda `live` di papan status Home (fondasi + akun) dan hanya **satu** kanal kontak `live` (GitHub Issues).

## Autentikasi (Clerk produksi)

```
Browser (hanya di averlynt.biz.id)
  └─ /account/ memuat clerk-js dari https://clerk.averlynt.biz.id
       └─ clerk.session.getToken()  →  JWT RS256
            └─ GET /api/session  (Authorization: Bearer <jwt>)
                 └─ Pages Function
                      ├─ JWKS Clerk (cache 10 menit di isolate)
                      ├─ verifikasi RS256 (crypto.subtle)
                      ├─ cek exp / nbf / iss / azp / sub
                      └─ (opsional) GET api.clerk.com/v1/users/{sub} dengan CLERK_SECRET_KEY
                           → { userId, sessionId, email, name, exp }
```

Prinsip:

- **Browser tidak dipercaya.** Token diverifikasi tanda tangannya; klaim tidak dibaca sebelum itu.
- **Secret key tidak pernah ke browser.** `CLERK_SECRET_KEY` hanya ada sebagai Pages secret dan hanya dipakai di dalam Function.
- **Gagal tertutup.** JWKS gagal diambil → 503; token tidak valid → 401; secret tidak ada → profil dilewati, bukan error.
- **Hanya di domain produksi.** `site.js` mendeteksi `data-site-host`; di `*.pages.dev` panel menampilkan status `unavailable` dan menautkan ke domain utama, bukan memuat clerk-js.
- **Sign-out bersih.** `DELETE /api/session` mengirim `Set-Cookie` kedaluwarsa untuk `__session` dan `__client_uat`.

Konfigurasi opsional lewat Pages environment/secret:

| Nama | Wajib | Default |
| --- | --- | --- |
| `CLERK_SECRET_KEY` | untuk lookup profil | — |
| `CLERK_JWKS_URL` | tidak | `https://api.clerk.com/v1/jwks` |
| `CLERK_ISSUER` | tidak | `https://clerk.averlynt.biz.id` |
| `CLERK_AUTHORIZED_PARTIES` | tidak | `https://averlynt.biz.id` (dipisah koma) |

## Keamanan

**Content-Security-Policy** (dibangkitkan di build, ditulis ke `_headers`):

```
default-src 'self';
script-src 'self' https://clerk.averlynt.biz.id https://challenges.cloudflare.com;
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self' https://clerk.averlynt.biz.id;
worker-src 'self' blob:;
frame-src https://challenges.cloudflare.com;
object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
upgrade-insecure-requests
```

Konsekuensi yang dipatuhi kode: **tidak ada** `<script>` inline, **tidak ada** `style=""`, **tidak ada** `onclick`. Semua perilaku ada di `assets/site.*.js`; semua gaya di `assets/site.*.css`. Tes memeriksa ketiadaan inline handler dan inline style di seluruh 26 halaman.

Header lain: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (kamera/mikrofon/geolokasi/pembayaran dimatikan), `Cross-Origin-Opener-Policy: same-origin`, `Strict-Transport-Security`.

**Rahasia:** tidak ada token di repo. Tes `content.test.mjs` memindai seluruh file terlacak dan `dist/` untuk `sk_live_`, `pk_live_` (setelah publishable key resmi di-strip), `gh[pousr]_`, `CLOUDFLARE_API_TOKEN`, dan blok private key.

## Kinerja

- Nol JavaScript pihak ketiga kecuali clerk-js, dan **hanya** dimuat di `/account/` setelah halaman siap (lazy `import` via `<script src>` yang disuntik).
- Satu CSS 26.9 KB mentah / 5.9 KB gzip; satu JS 5.5 KB mentah / 1.9 KB gzip. Font WOFF2 di-`preload` dengan `font-display: swap`.
- Semua aset dengan hash → `Cache-Control: immutable, max-age=31536000`.
- Tidak ada cookie, tidak ada analytics, tidak ada request eksternal lain (diverifikasi Playwright: `external: []`).

## Batas platform yang dihormati

Cloudflare Pages Free: tidak ada server jangka panjang, tidak ada filesystem runtime, CPU per request terbatas. Karena itu:

- Semua halaman dibangkitkan **saat build**, bukan saat request.
- Function hanya melakukan verifikasi kriptografis + satu fetch opsional (JWKS di-cache).
- Tidak ada D1/KV/R2 — belum ada data yang perlu disimpan. Saat dibutuhkan, D1 adalah pilihan pertama (dukungan hosted deploy).
- Tidak ada `triggers`/cron dan tidak ada `kv_namespaces` di `wrangler.toml`, agar konfigurasi tetap kompatibel dengan jalur hosted deploy.

## Keputusan yang sengaja ditolak

| Alternatif | Alasan ditolak |
| --- | --- |
| Next.js / Astro / Vite | Build lebih berat, dependency lebih banyak, tanpa manfaat untuk 26 halaman statis |
| Verifikasi JWT di browser | Klaim dari browser tidak boleh dipercaya; kunci verifikasi harus di server |
| Form kontak tanpa backend | Akan menjadi form palsu — dilarang aturan honesty |
| Analytics / pixel | Request pihak ketiga + klaim privasi yang belum bisa dipenuhi |
| GitHub Actions | Biaya menit + tidak perlu; deploy dijalankan manual |
