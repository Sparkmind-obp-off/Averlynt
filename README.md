# AVERLYNT — averlynt.biz.id

Website publik AVERLYNT: ekosistem digital independen yang menghubungkan **AI, Automation, SaaS, dan Digital Commerce** dalam satu jalur kerja.

Situs ini adalah **situs brand + arah produk**, bukan klaim bahwa semua kapabilitas sudah live. Setiap status di situs ditulis apa adanya (`live`, `building`, `validating`, `planned`), dan tidak ada produk, pelanggan, testimoni, metrik, atau integrasi yang dikarang.

- **Produksi:** https://averlynt.biz.id
- **Bahasa:** Bahasa Indonesia di `/` (default), English di `/en/`
- **Repo:** https://github.com/Sparkmind-obp-off/Averlynt
- **Stack:** static site generator nol-dependensi (Node ESM) + satu Cloudflare Pages Function
- **Biaya:** Rp0 — Cloudflare Pages Free, tanpa layanan berbayar, tanpa CI

## Mulai cepat

```bash
npm run build     # tulis ./dist (26 halaman + 404)
npm test          # 33 tes node --test
npm run preview   # build lalu wrangler pages dev dist di :3000
npm run deploy    # test + build + wrangler pages deploy dist --project-name averlynt --branch main
```

Butuh Node.js ≥ 20. Tidak ada `npm install` — proyek ini tidak punya dependency runtime.

## Struktur

```
src/site.config.mjs      Satu sumber kebenaran: route, locale, URL publik, konfigurasi Clerk (publishable only)
src/content/id.mjs       Seluruh copy Bahasa Indonesia
src/content/en.mjs       Seluruh copy English (bentuk identik dengan id.mjs)
src/templates/*.mjs      Komponen, layout (head/meta/OG), dan 9 renderer halaman
src/styles/              tokens.css (Carbon + Signal Teal) dan site.css
src/scripts/site.js      Nav mobile, reveal on-scroll, dan logika akun
src/static/              Font OFL, logo SVG, favicon, ikon PNG, kartu OG
scripts/build.mjs        Generator statis: hashed assets, _headers, _routes.json, sitemap, robots, manifest, 404
functions/api/session.js Pages Function: verifikasi JWT Clerk di server
tests/*.mjs              33 tes (build/route, link, a11y, SEO, CSP, kontras, konten, rahasia)
tools/                   Generator aset brand (logo.py, assets.py)
```

## Halaman

| Path | Isi |
| --- | --- |
| `/` | Hero, value prop, ringkasan ekosistem, 4 kapabilitas, Route-Frame, cara kerja, use case, papan status, CTA |
| `/platform/` | Model ekosistem dan hubungan antar kapabilitas |
| `/capabilities/` | Indeks empat kapabilitas |
| `/capabilities/ai/` | Deskripsi, manfaat, batasan, use case AI |
| `/capabilities/automation/` | Deskripsi, manfaat, batasan, use case automation |
| `/capabilities/saas/` | Deskripsi, manfaat, batasan, use case SaaS |
| `/capabilities/digital-commerce/` | Deskripsi, manfaat, batasan, use case digital commerce |
| `/how-it-works/` | Discover → Validate → Design → Build → Operate → Improve |
| `/about/` | Karakter brand, prinsip, unduhan aset brand |
| `/contact/` | Jalur kontak (GitHub Issues aktif; kanal lain berstatus planned) |
| `/account/` | Panel akun Clerk (noindex, hanya aktif di domain produksi) |
| `/legal/privacy/` | Draf Kebijakan Privasi — ditandai jelas sebagai draf |
| `/legal/terms/` | Draf Ketentuan Layanan — ditandai jelas sebagai draf |

Semua path di atas tersedia juga di `/en/...`. Halaman `/account/` sengaja `noindex` dan tidak masuk sitemap.

## Akun (Clerk, produksi)

- Instance Clerk produksi terikat ke `averlynt.biz.id`; Frontend API `clerk.averlynt.biz.id`, Account Portal `accounts.averlynt.biz.id`.
- Situs **tidak pernah** mempercayai klaim dari browser. `site.js` mengambil session token dari `clerk-js`, mengirimnya sebagai `Bearer` ke `GET /api/session`, dan Function itu memverifikasi tanda tangan **RS256** terhadap JWKS Clerk, lalu memeriksa `iss`, `azp`, `exp`, `nbf`, dan `sub` sebelum mengembalikan apa pun.
- `CLERK_SECRET_KEY` hanya ada sebagai **Cloudflare Pages secret** (`wrangler pages secret put`). Tidak pernah masuk repo, build, atau bundle browser. `grep` untuk `sk_live_` dijaga oleh tes.
- `DELETE /api/session` membersihkan cookie `__session` / `__client_uat` saat sign-out.
- Hati-hati: baris `agent` header JSON di halaman akun sengaja tidak ada; tidak ada form login buatan di situs ini.

## Status jujur (per 2026-11-26)

| Item | Status |
| --- | --- |
| Fondasi brand + situs publik bilingual | `live` — sudah terpasang dan diuji |
| Akun (Clerk) | `live` — verifikasi server aktif |
| Kanal kontak GitHub Issues | `live` |
| Email, WhatsApp, form kontak | `planned` — ditampilkan sebagai belum ada |
| Produk AI / Automation / SaaS / Commerce | `validating` — belum dirilis sebagai produk |
| Kebijakan Privasi & Ketentuan Layanan | `draft` — belum ditinjau ahli hukum |

## Batasan yang disengaja

- Tidak ada form yang berpura-pura bekerja (tidak ada backend form, jadi tidak ada form).
- Tidak ada nomor, logo pelanggan, testimoni, sertifikasi, atau klaim performa.
- Tidak ada request ke domain pihak ketiga selain Clerk FAPI (diuji otomatis).
- Tidak ada GitHub Actions, tidak ada cron, tidak ada layanan berbayar.
- Cloudflare Pages Free: static assets + 1 Function ringan (`/api/session`).

Dokumentasi lain: [PRODUCT.md](./PRODUCT.md) · [DESIGN.md](./DESIGN.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [TESTING.md](./TESTING.md) · [CHANGELOG.md](./CHANGELOG.md)
