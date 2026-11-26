# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Tanggal dalam UTC.

## [0.2.0] — 2026-11-26

Rilis situs publik bilingual penuh, menggantikan halaman tunggal 0.1.0.

### Added
- **Generator statis nol-dependensi** (`scripts/build.mjs`): 13 route × 2 locale = 26 halaman + `404.html`, tanpa bundler dan tanpa `node_modules`.
- **Routing sadar-locale**: Bahasa Indonesia di akar, English di `/en/`, dengan `hreflang` resiprokal dan `x-default` → `id`.
- **Halaman**: Home, Platform, Capabilities, empat sub-halaman kapabilitas (AI, Automation, SaaS, Digital Commerce — masing-masing dengan deskripsi, manfaat, batasan, use case), How It Works (enam tahap), About, Contact, Account, Privacy, Terms.
- **Konten bilingual terpisah** (`src/content/id.mjs`, `src/content/en.mjs`) dengan bentuk identik yang dijaga tes.
- **Bahasa grafis Route-Frame**: simbol A ber-frame, peta kapabilitas SVG dengan empat simpul dan satu sinyal rute beranimasi, label mono bernomor.
- **Sistem token** Carbon + Signal Teal (`src/styles/tokens.css`) dan stylesheet tunggal responsif dengan breakpoint 1400/1080/900/620.
- **Aset brand nyata**: logotype horizontal/bertumpuk/latar-terang, simbol, favicon SVG + ICO multi-ukuran, ikon 192/512, apple-touch-icon, kartu OG 1200×630 untuk ID dan EN (`tools/logo.py`, `tools/assets.py`).
- **Font self-hosted** bervariasi: Space Grotesk, Inter, DM Mono (WOFF2 + lisensi OFL).
- **Akun Clerk produksi** dengan verifikasi sisi server: `functions/api/session.js` memverifikasi JWT RS256 terhadap JWKS Clerk (`iss`, `azp`, `exp`, `nbf`, `sub`), lookup profil opsional, dan `DELETE` yang membersihkan cookie `__session` / `__client_uat`.
- **Keamanan**: CSP ketat tanpa inline script/style, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, HSTS; `_routes.json` membatasi Function hanya ke `/api/*`.
- **SEO/platform**: `sitemap.xml` (24 URL, route `noindex` dikecualikan), `robots.txt`, `site.webmanifest`, canonical, OG/Twitter, JSON-LD `WebSite` minimal.
- **Suite tes 33 kasus** (`node --test`, nol dependency) mencakup build/route, tautan, a11y, SEO, CSP, kontras AA, paritas konten, kejujuran status, dan pemindaian rahasia.
- **Dokumentasi**: `README.md`, `PRODUCT.md`, `DESIGN.md`, `ARCHITECTURE.md`, `TESTING.md`, `CHANGELOG.md`.

### Changed
- `wrangler.toml` → project `averlynt`, `pages_build_output_dir = "./dist"`, compatibility date 2026-11-26.
- Teks judul Platform di locale ID menjadi "Platform dan ekosistem" agar unik terhadap Home.
- Seluruh copy ditulis ulang: menghapus klaim yang tidak dapat diverifikasi, menambahkan batasan eksplisit per kapabilitas.

### Removed
- `public/index.html` — halaman tunggal versi 0.1.0, digantikan generator statis.
- Ketergantungan pada CDN pihak ketiga (Tailwind/Font Awesome) — diganti CSS dan font lokal.

### Fixed
- Tujuh kegagalan tes awal: judul Platform duplikat, media query `min-width` yang hilang, hitungan status `live`, positif palsu publishable key saat pemindaian rahasia, allowlist tombol sign-out, allowlist tautan Account Portal Clerk, dan route `noindex` yang bocor ke sitemap.

### Verified
- Build: `Built 26 pages (+404)`.
- Tes: 33/33 lulus.
- QA Playwright (48 screenshot, 3 viewport): 0 console error, 0 overflow horizontal, 0 request pihak ketiga; menu mobile `aria-expanded` benar dan tertutup dengan Escape.

### Known limitations
- Email, WhatsApp, dan form kontak **belum ada** dan ditampilkan sebagai `planned`.
- Kebijakan Privasi dan Ketentuan Layanan masih **draf**, belum ditinjau ahli hukum.
- Kapabilitas AI/Automation/SaaS/Digital Commerce berstatus `validating` — belum ada produk yang bisa dipakai.
- Instance Clerk produksi masih memakai `home_url` dengan huruf kapital (`https://Averlynt.biz.id`) dan hanya mengaktifkan Google OAuth sebagai faktor pertama; perlu dirapikan di dashboard Clerk.

## [0.1.0] — 2026-11-26

### Added
- Halaman tunggal brand + arah produk (`public/index.html`) sebagai fondasi awal.
- Konfigurasi Cloudflare Pages dasar dan tes awal.
