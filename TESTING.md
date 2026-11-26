# AVERLYNT — Testing

## Ringkasan

```bash
npm test        # node --test  → 33 tes
npm run build   # node scripts/build.mjs → dist
```

Nol dependency. Tes memakai `node:test` + `node:assert/strict` bawaan Node ≥ 20, dan mem-build situs ke direktori sementara sekali (`tests/helpers.mjs`), jadi tes selalu menguji output build nyata — bukan fixture yang bisa basi.

**Status terakhir: 33 tes, 33 lulus, 0 gagal.**

## Pembagian berkas

| Berkas | Tes | Fokus |
| --- | --- | --- |
| `tests/site.test.mjs` | 12 | Struktur build, route, tautan, CSP, aset platform, kecukupan isi kapabilitas |
| `tests/a11y-seo.test.mjs` | 12 | Heading, judul/deskripsi, canonical/hreflang, OG/Twitter, skip link, nav, menu, kontras, JSON-LD |
| `tests/content.test.mjs` | 9 | Paritas locale, larangan klaim palsu, kejujuran status, draf legal, pemindaian rahasia |
| `tests/helpers.mjs` | — | Build sekali, parser atribut/tag, `visibleText`, `resolveToFile`, `contrast` |

## Daftar tes

### site.test.mjs — struktur dan tautan
1. Membangun setiap route di setiap locale dengan `lang` yang benar (26 dokumen).
2. Bahasa Indonesia di akar, English di `/en/`.
3. Setiap tautan internal dan referensi aset menunjuk berkas yang benar-benar ada di `dist/`.
4. Setiap anchor dalam halaman (`#...`) menunjuk `id` yang ada.
5. Tidak ada tombol mati, tautan kosong, atau form yang berpura-pura bekerja (tombol harus ada di allowlist `data-menu-toggle|data-auth-signout`; tidak boleh ada `<form>`).
6. Tautan eksternal hanya ke allowlist (repo GitHub, Clerk Account Portal, Clerk FAPI) dan memakai `rel="noopener"`.
7. Halaman tidak memuat resource pihak ketiga (tanpa `fonts.googleapis`, CDN, analytics, pixel).
8. Markup kompatibel CSP ketat: tidak ada `onclick`/handler inline, tidak ada atribut `style=""`.
9. Berkas platform ada: `404.html`, `robots.txt`, `sitemap.xml`, `_headers`, `_routes.json`, `site.webmanifest`, favicon, ikon.
10. Setiap halaman kapabilitas memuat empat bagian: deskripsi, manfaat, batasan, use case (anchor `#description`, `#benefits`, `#limits`, `#use-cases`).
11. Enam tahap muncul berurutan di Home dan How It Works.
12. Peta Route-Frame menyebut keempat kapabilitas di Home dan Platform.

### a11y-seo.test.mjs — aksesibilitas dan SEO
1. Tepat satu `h1` per halaman; level heading tidak melompat.
2. Judul unik 15–70 karakter, deskripsi unik 70–165 karakter, di seluruh 26 halaman.
3. `canonical` + `hreflang` resiprokal (`id`, `en`, `x-default`).
4. Open Graph dan Twitter card lengkap (title, description, image absolut 1200×630, locale, alt).
5. Skip link adalah elemen pertama yang bisa difokus dan menunjuk `main#main`.
6. Navigasi berlabel (`aria-label`) dan menandai halaman aktif dengan `aria-current="page"`.
7. Tombol menu mobile terhubung ke panel yang benar-benar ada (`aria-controls` → `id`).
8. Pemilih bahasa menunjuk halaman yang sama di locale lain.
9. Setiap `img` punya `alt` dan `width`/`height`; SVG dekoratif `aria-hidden`, SVG bermakna punya `role="img"` + `<title>`.
10. Stylesheet memuat aturan fokus terlihat, `prefers-reduced-motion`, breakpoint responsif, dan `font-display`.
11. Token warna memenuhi WCAG AA untuk pasangan teks/latar yang dipakai.
12. Structured data valid dan minimal: hanya `WebSite` yang faktual (tanpa `aggregateRating`, `offers`, `review`).

### content.test.mjs — kejujuran isi
1. Locale berbagi bentuk konten identik, tanpa string kosong.
2. Nama kapabilitas adalah istilah produk yang sama di kedua locale.
3. Tidak ada pencampuran bahasa tak sengaja pada copy yang terlihat.
4. Tidak ada bukti, angka performa, atau klaim hukum yang dikarang (pola: jumlah pelanggan, "% lebih", "terbaik di", sertifikasi ISO, "garansi", "testimoni").
5. Tidak ada placeholder (`lorem ipsum`, `TODO`, `TBD`, `xxx`, `John Doe`).
6. Status jujur: tepat 2 item `live` di papan status (fondasi + akun); kanal kontak `['live','planned','planned']`.
7. Halaman kontak menyatakan batasannya dan hanya menautkan satu kanal terverifikasi.
8. Halaman legal ditandai jelas sebagai draf.
9. Tidak ada rahasia di sumber terlacak maupun `dist/` (`sk_live_`, `pk_live_` setelah publishable key resmi di-strip, `gh[pousr]_`, `CLOUDFLARE_API_TOKEN`, blok private key).

## QA visual dan runtime (di luar `npm test`)

Dijalankan manual dengan Playwright di `/tmp/qa` (sengaja **di luar repo** agar tidak menambah dependency), terhadap server statis lokal:

- 16 route × 3 viewport (1440×900, 834×1112, 390×844) → 48 screenshot.
- Kumpulkan pesan console `error`/`warning`, `pageerror`, serta setiap request non-lokal.
- Ukur `scrollWidth` vs `clientWidth` untuk mendeteksi overflow horizontal.
- Uji interaksi menu mobile: buka → `aria-expanded="true"` → Escape → tertutup.

Hasil terakhir:

```json
{ "console": [], "overflow": [], "external": [],
  "menu": { "before": false, "after": true, "expanded": "true", "closedAfterEsc": false } }
```

Artinya: nol error console, nol overflow horizontal di tiga ukuran layar, nol request pihak ketiga, dan menu mobile berperilaku benar (tertutup → terbuka → tertutup dengan Escape).

## Yang belum tercakup otomatis

- **Verifikasi JWT Clerk terhadap instance produksi.** Butuh token nyata dari sesi login. Unit test untuk `verifyToken` tidak ada karena modul Function mengimpor `Response`/`crypto.subtle` (tersedia di Node 20, tetapi token uji harus dibuat); verifikasi dilakukan manual di produksi setelah deploy.
- **Tampilan panel akun saat login.** Diuji dengan status `unavailable` (host non-produksi) saat QA lokal; jalur `signed-in` baru bisa diuji setelah domain aktif.
- **Lighthouse.** Tidak dijalankan sebagai bagian test suite agar tetap Rp0 dan deterministik; metrik diukur manual bila perlu.

## Cara menambah tes

1. Taruh di berkas yang sesuai; impor `site()` dari `tests/helpers.mjs` (build di-cache per proses).
2. Uji **output build**, bukan string sumber, kecuali untuk aturan konten.
3. Jangan menambah dependency. Jika butuh browser, pakai Playwright manual di luar repo.
