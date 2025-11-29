# EduZMC – Portal Edukasi Pasien Zihan Medical Center

EduZMC adalah aplikasi React + TypeScript berbasis Vite yang menghadirkan kumpulan artikel edukasi pasien Zihan Medical Center (ZMC). Aplikasi ini menampilkan materi kesehatan interaktif, kalkulator sederhana, dan tautan cepat untuk menghubungi fasilitas.

Dokumen ini merangkum arsitektur, alur data, serta panduan kontribusi sehingga mudah dipelajari oleh anggota tim baru maupun tenaga medis yang ingin menambahkan konten edukasi.

## Fitur Utama
- **Navigasi Home & Artikel** – Router sederhana di `App.tsx` menampilkan halaman utama atau detail artikel berdasarkan ID dan menyediakan breadcrumb serta tombol kembali. 
- **Katalog Artikel** – Berbagai artikel didefinisikan di `services/articleRegistry.tsx`, mencakup topik batuk, radang, GERD, kolesterol, P3K, dan lain-lain dengan komponen React khusus.
- **Filter Kategori** – Halaman beranda (`pages/Home.tsx`) menampilkan filter kategori (Semua, Anak, Lansia, Penyakit Umum, Gaya Hidup, P3K & Darurat) dan kartu artikel yang dapat diklik.
- **CTA Fasilitas** – Tombol cepat untuk WhatsApp, panggilan gawat darurat, dan Instagram, ditarik dari konfigurasi `ZMC_INFO` pada `constants.ts`.
- **UI Responsif** – Layout (`components/Layout.tsx`) mencakup navigasi desktop/mobile, footer kontak, dan floating tombol WhatsApp dengan Tailwind CSS dan Font Awesome via CDN (`index.html`).

## Arsitektur & Alur Utama

- **Entry** – `index.tsx` merender `App.tsx` di dalam `StrictMode`.
- **Router sederhana** – `App.tsx` memakai state lokal `currentView` (`home` atau `articleId`). Pergantian view menggulirkan halaman ke atas dan menampilkan komponen artikel dari registri.
- **Registri artikel** – `services/articleRegistry.tsx` berisi daftar `ARTICLES` bertipe `Article` yang memetakan ID, judul, kategori, ikon, deskripsi ringkas, dan komponen React siap pakai.
- **Beranda dengan filter** – `pages/Home.tsx` merender filter kategori (`Category`) dan kartu artikel menggunakan `ArticleCard` untuk navigasi.
- **Layout responsif** – `components/Layout.tsx` menyediakan header, navigasi mobile/desktop, footer kontak, serta tombol WhatsApp melayang. Tailwind CSS dan Font Awesome dimuat via CDN dari `index.html`.
- **Tipe & konstanta** – `types.ts` mendefinisikan tipe `Article`, `Category`, serta utilitas; `constants.ts` memusatkan info kontak, branding, dan tautan CTA.

## Struktur Proyek
```
├── App.tsx                 # Router sederhana dan wadah layout
├── components
│   ├── Layout.tsx          # Navigasi, footer, dan tombol WhatsApp
│   ├── ArticleCard.tsx     # Kartu artikel pada beranda
│   └── articles/           # Komponen konten artikel (Batuk, GERD, Kolesterol, dsb.)
├── pages/Home.tsx          # Halaman beranda dengan filter kategori
├── services/articleRegistry.tsx # Registrasi metadata artikel
├── constants.ts            # Info kontak & branding ZMC
├── index.tsx               # Entry ReactDOM dengan StrictMode
├── index.html              # Template Vite, CDN Tailwind & Font Awesome
├── types.ts                # Tipe `Article`, `Category`, dan utilitas lain
└── package.json            # Skrip npm dan dependensi
```

## Persiapan & Menjalankan
1. **Install dependensi**
   ```bash
   npm install
   ```
2. **Jalankan mode pengembangan**
   ```bash
   npm run dev
   ```
   Vite akan menampilkan URL lokal (default `http://localhost:5173`).
3. **Build untuk produksi**
   ```bash
   npm run build
   ```
4. **Pratinjau build produksi secara lokal**
   ```bash
   npm run preview
   ```

## Panduan Menambah Artikel Baru
1. **Buat komponen konten** di `components/articles/` dengan nama yang deskriptif, misalnya `Hipertensi.tsx`. Gunakan paragraf, daftar poin, dan sertakan interaksi ringan (contoh: slider, checklist, kalkulator sederhana) sesuai kebutuhan edukasi pasien.
2. **Simpan dan pulihkan state** interaktif via `localStorage` bila relevan, dengan key yang jelas misal `zmc-<topik>-journal`. Sertakan tombol reset dengan konfirmasi.
3. **Daftarkan artikel** di `services/articleRegistry.tsx` dengan menambahkan objek ke array `ARTICLES`:
   - `id`: string unik untuk router.
   - `title`: judul tampil.
   - `category`: salah satu nilai `Category` (mis. `kids`, `elderly`, `general`, `lifestyle`, `emergency`).
   - `icon`: kelas Font Awesome (contoh `fa-heartbeat`).
   - `description`: ringkasan singkat untuk kartu beranda.
   - `component`: elemen JSX yang merujuk ke komponen baru.
4. **Uji navigasi** dengan menjalankan `npm run dev`, pastikan breadcrumb, tombol kembali, dan CTA WhatsApp tetap bekerja.

## Praktik Desain & Aksesibilitas
- Terapkan gaya ZMC: latar putih, aksen merah (#ec1c24), sudut membulat, bayangan ringan, dan spasi nyaman untuk layar mobile.
- Gunakan ukuran target sentuh ±48px untuk tombol/slider; berikan label jelas dan kontras cukup.
- Hindari menyembunyikan teks edukasi utama di balik accordion; gunakan paragraf terbuka agar mudah dibaca sambil menggulir.
- Tambahkan badge warna (hijau/oranye/merah) untuk menandai tingkat keparahan atau prioritas bila relevan.
- Sertakan CTA kontak (WhatsApp, telepon darurat, Instagram) bila pasien perlu tindak lanjut cepat.

## Catatan Pengembangan
- Tailwind dan Font Awesome dimuat langsung dari CDN pada `index.html`; tidak memerlukan konfigurasi build tambahan.
- Informasi kontak, tautan WhatsApp, dan branding dapat disesuaikan lewat `constants.ts`.
- Artikel baru dapat ditambahkan dengan membuat komponen di `components/articles/` dan meregistrasikannya pada `services/articleRegistry.tsx` beserta metadata `Article` dan `Category`.
