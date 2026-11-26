# AVERLYNT — Design Direction

## Tesis

Sebuah **rute yang disusun dari frame modular**: niat yang berserakan dirapikan menjadi garis, garis menjadi frame, frame menjadi sistem yang terlihat bekerja. AVERLYNT harus terasa presisi, mampu, tenang, dan manusiawi — bukan template startup AI generik.

Tiga kata pegangan: **Carbon** (permukaan gelap, tenang), **Signal Teal** (satu warna aksi yang tegas), **Route-Frame** (bahasa grafis: garis, frame, modul, simpul).

## Palet

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `--carbon-950` | `#070b0e` | Latar terdalam, area di luar frame |
| `--carbon-900` | `#0b1115` | Latar utama halaman |
| `--carbon-800` | `#131c21` | Kartu, panel |
| `--slate-700` | `#17232a` | Kartu terangkat, header lengket |
| `--slate-600` | `#22333b` | Garis rambut, batas |
| `--cloud-100` | `#f1f4f2` | Teks utama |
| `--cloud-200` | `#dde4e1` | Teks utama pada panel |
| `--mist-400` | `#9ba9a8` | Teks sekunder |
| `--mist-500` | `#7f8f8e` | Teks tersier, label mono |
| `--teal-300` | `#8ceae0` | Teks aksen, label aktif |
| `--teal-400` | `#58d6c1` | Tombol utama, sinyal rute |
| `--teal-500` | `#38b7a3` | Hover/pressed |
| `--brass-400` | `#d8b47a` | Penekanan langka (peringatan draf) |

Aturan: teal adalah **satu-satunya** warna aksi. Brass hanya untuk penanda status draf. Tidak ada gradien dekoratif, tidak ada glassmorphism, tidak ada bayangan berwarna.

Kontras pasangan teks/latar diuji otomatis pada WCAG AA (`tests/a11y-seo.test.mjs`), dihitung dengan rumus kontras WCAG:

| Pasangan | Rasio |
| --- | --- |
| `cloud-100` / `carbon-900` | 17.16:1 |
| `cloud-100` / `carbon-800` | 15.60:1 |
| `cloud-200` / `carbon-800` | 13.37:1 |
| `mist-400` / `carbon-900` | 7.81:1 |
| `mist-400` / `carbon-800` | 7.10:1 |
| `mist-500` / `carbon-900` | 5.63:1 |
| `teal-300` / `carbon-900` | 13.54:1 |
| `teal-400` / `carbon-900` | 10.68:1 |
| `carbon-950` / `teal-400` | 11.10:1 |
| `brass-400` / `carbon-900` | 9.71:1 |

Semua di atas ambang AA 4.5:1 untuk teks normal; `mist-500` (5.63:1) adalah batas terendah dan hanya dipakai untuk label mono besar/meta.

## Tipografi

| Peran | Keluarga | Berat | Catatan |
| --- | --- | --- | --- |
| Display | Space Grotesk (variable) | 500–700 | Judul, angka besar, `letter-spacing` negatif tipis |
| Body | Inter (variable) | 400–600 | Paragraf, UI |
| Utility | DM Mono | 400–500 | Label bernomor (`01 —`), meta, kode, status |

Semua font **self-hosted** (`src/static/fonts/`, WOFF2) dengan lisensi OFL yang disertakan. Tidak ada request ke Google Fonts — dijaga oleh tes "no third-party requests".

Skala: judul hero `clamp(2.5rem, 6vw, 4.5rem)`, judul bagian `clamp(1.75rem, 3.2vw, 2.75rem)`, body `1rem/1.65`, label mono `0.72rem` dengan `letter-spacing: 0.14em` huruf kapital.

## Bahasa grafis Route-Frame

1. **Garis rute** — garis vertikal/horizontal tipis yang menghubungkan modul. Tidak menghias; ia menunjukkan alur.
2. **Frame** — kotak bersudut tegas dengan garis rambut `1px`, latar `carbon-800`, label mono di kiri atas (`01`, `02`, …).
3. **Simbol A** — tanda AVERLYNT: huruf A yang dilukis sebagai frame terbuka dengan satu garis rute di tengah. Dipakai di header, favicon, dan kartu OG.
4. **Sinyal** — satu titik/segmen teal yang bergerak sepanjang garis rute (animasi `stroke-dashoffset`). Ini satu-satunya gerak dekoratif; mati total saat `prefers-reduced-motion`.

Peta kapabilitas di Home memakai SVG dengan empat simpul `data-node` (AI, Automation, SaaS, Digital Commerce) yang dihubungkan ke satu titik tengah — empat kapabilitas, satu jalur kerja.

## Tata letak

- Lebar konten: `76rem`, melebar ke `82rem` pada ≥1400px.
- Grid 12 kolom dengan gutter `clamp(1rem, 2.5vw, 2rem)`; komposisi asimetris (judul kiri, penjelas kanan) pada bagian bernomor.
- Setiap bagian memakai label mono bernomor + `h2` + intro. Konsisten di semua halaman.
- Garis rambut horizontal sebagai pemisah, bukan kartu bertumpuk.
- Breakpoint: 1400 (lebar), 1080 (grid 4→2), 900 (nav off-canvas), 620 (satu kolom, tombol penuh).

## Gerak

Satu pola: elemen masuk dengan `translateY(12px)` → `0` dan opasitas `0` → `1`, dipicu `IntersectionObserver`, durasi 420ms, `--ease` `cubic-bezier(0.22, 0.61, 0.36, 1)`. Tidak ada parallax, tidak ada animasi loop yang mengganggu.

`prefers-reduced-motion: reduce` mematikan transisi, animasi sinyal rute, dan reveal — semuanya jatuh ke keadaan akhir. Diuji otomatis.

## Aksesibilitas

- HTML semantik: `header`, `nav` berlabel, `main#main`, `section` dengan `aria-labelledby`, `footer`.
- Skip link sebagai elemen pertama yang bisa difokus.
- Fokus terlihat: `outline: 2px solid var(--teal-300)` dengan `outline-offset: 3px`, tidak pernah `outline: none` tanpa pengganti.
- Menu mobile: `<button aria-expanded aria-controls>`, tutup dengan Escape dan klik di luar.
- `aria-current="page"` pada item nav aktif.
- Ikon dekoratif `aria-hidden="true"`; SVG bermakna diberi `role="img"` + `<title>`.
- Bahasa: `lang="id"`/`lang="en"` di `<html>`; istilah produk berbahasa Inggris di halaman ID dibungkus `<span lang="en">` agar dibaca benar oleh screen reader.
- Semua `img` punya `alt` dan `width`/`height` untuk mencegah layout shift.

## Aturan konten visual

- Jangan mengarang pelanggan, testimoni, metrik, sertifikasi, atau jaminan performa.
- Status selalu ditampilkan sebagai pill berlabel (`live`, `building`, `validating`, `planned`, `method`, `draft`) — tidak pernah disamarkan dengan kata "segera hadir".
- Jika sesuatu belum dibangun, tulis belum dibangun. Tidak ada mockup palsu yang terlihat seperti produk jadi.
- Angka bernomor (`01`, `02`, …) adalah urutan, bukan metrik. Jangan pernah memakai angka yang bisa dibaca sebagai bukti kinerja.

## Aset brand

| Aset | Berkas | Ukuran |
| --- | --- | --- |
| Simbol | `/brand/averlynt-symbol.svg` | 64×64 |
| Logotype horizontal | `/brand/averlynt-logo-horizontal.svg` | 300×64 |
| Logotype horizontal (latar terang) | `/brand/averlynt-logo-horizontal-on-light.svg` | 300×64 |
| Logotype bertumpuk | `/brand/averlynt-logo-stacked.svg` | 220×132 |
| Favicon | `/favicon.svg`, `/favicon.ico` (16/32/48) | — |
| Ikon aplikasi | `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png` | — |
| Kartu OG | `/og/averlynt-og-id.png`, `/og/averlynt-og-en.png` | 1200×630 |

Dihasilkan ulang dengan `python3 tools/logo.py && python3 tools/assets.py` (butuh `fonttools`, `Pillow`, `rsvg-convert`). Hasilnya sudah di-commit, jadi build situs tidak butuh Python.
