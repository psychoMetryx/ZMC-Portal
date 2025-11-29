# EduZMC – Portal Edukasi Pasien Zihan Medical Center

EduZMC adalah aplikasi frontend **multi-halaman** berbasis React, TypeScript, dan Vite yang menyajikan artikel edukasi pasien, alat interaktif ringan, serta tombol kontak cepat untuk fasilitas Zihan Medical Center (ZMC). Seluruh fitur berjalan di browser tanpa autentikasi atau backend; data untuk alat interaktif disimpan di `localStorage` sehingga pasien dapat menggunakan portal secara anonim dan tetap bisa membuka artikel langsung lewat URL (deep-link).

## Tujuan & Ruang Lingkup
- Menyediakan konten kesehatan berbahasa Indonesia untuk pasien anak, dewasa, dan lansia tanpa login.
- Menggabungkan edukasi statis dengan alat sederhana (kuis, kalkulator, jurnal) yang dapat disimpan secara lokal.
- Memastikan akses cepat ke kontak ZMC (WhatsApp, telepon darurat, lokasi, Instagram) dari setiap halaman.

## Identitas Sistem
| Properti | Nilai | Sumber |
| --- | --- | --- |
| Nama aplikasi | EduZMC – Portal Edukasi Pasien | App bar & branding di `Layout` | 
| Organisasi | Klinik Pratama Zihan Medical Center (ZMC) | `ZMC_INFO.name` | 
| Model deploy | SPA statis dengan React Router (multi-halaman), tanpa backend | Tidak ada pemanggilan API atau server-side rendering |
| Bahasa utama | Bahasa Indonesia | Teks UI & artikel | 
| Autentikasi | Tidak ada (akses anonim) | Seluruh state lokal | 

## Fitur Utama
- **Router multi-halaman dengan deep-link.** `App.tsx` memakai React Router untuk rute `/` (beranda) dan `/artikel/:id` (artikel). Kartu artikel memakai `<Link>` ke `/artikel/<slug>`, breadcrumb dan tombol kembali merutekan ke beranda, dan direct-access URL akan memuat artikel yang sama tanpa state sebelumnya.【F:App.tsx†L6-L43】【F:components/ArticleCard.tsx†L1-L39】【F:pages/ArticlePage.tsx†L1-L60】
- **Katalog artikel tunggal.** Semua konten (metadata dan komponen React) didefinisikan di `services/articleRegistry.tsx`, lalu dirender sebagai kartu beranda melalui `Home.tsx`. Filter kategori memakai enum `Category` dari `types.ts` dan preferensi kategori terakhir disimpan di `localStorage` agar tetap berlaku setelah kembali dari artikel.【F:services/articleRegistry.tsx†L19-L121】【F:pages/Home.tsx†L1-L83】【F:types.ts†L3-L18】
- **Alat interaktif dengan persistensi lokal.** Artikel seperti "Manajemen Nyeri Lansia" memuat slider skala nyeri, catatan teks, dan checklist edukasi; data disimpan ke `localStorage` menggunakan key deskriptif seperti `zmc-nyeri-lansia-journal` dan menyediakan aksi reset dengan konfirmasi.【F:components/articles/PainDiary.tsx†L9-L126】【F:components/articles/PainDiary.tsx†L146-L209】
- **Konten edukatif & kuis triase.** Artikel lain mencakup kalkulator BMR/TDEE, tabel diet asam urat, kuis batuk anak/dewasa, panduan P3K, dan edukasi radang tenggorokan atau vertigo. Semua komponen terhubung lewat registri yang sama.【F:services/articleRegistry.tsx†L21-L119】
- **CTA fasilitas konsisten.** `Layout.tsx` menampilkan tautan WhatsApp, telepon darurat, peta, dan Instagram di header, menu responsif, footer, serta tombol mengambang sehingga pasien dapat langsung menghubungi ZMC.【F:components/Layout.tsx†L15-L152】【F:components/Layout.tsx†L178-L247】

## Tumpukan Teknologi & Keputusan
| Lapisan | Detail | Sumber |
| --- | --- | --- |
| Framework | React 19 + TypeScript | `package.json` | 
| Bundler | Vite 6 | `package.json` | 
| Styling & ikon | Tailwind CSS 3 (CDN), FontAwesome 6.4 (CDN), Plus Jakarta Sans | `index.html` | 
| Routing | React Router DOM (`/` dan `/artikel/:id`) | `App.tsx` |
| State & persistensi | React hooks + `localStorage` pada artikel interaktif | `PainDiary.tsx` | 
| Hosting | SPA statis (hanya asset frontend) | Struktur repo | 

## Arsitektur & Alur
1. `index.html` memuat CDN Tailwind, FontAwesome, dan Google Fonts serta memasang konfigurasi warna ZMC sebelum menjalankan bundel Vite.【F:index.html†L1-L40】
2. `index.tsx` mencari elemen `#root` lalu merender `<App />` di dalam `StrictMode`.【F:index.tsx†L1-L15】
3. `App.tsx` mengaktifkan React Router, menyiapkan rute `/` dan `/artikel/:id`, serta membungkus semua tampilan dengan `Layout` agar CTA dan navigasi konsisten.【F:App.tsx†L6-L48】
4. `Home.tsx` membuat daftar kategori dari enum `Category`, menerapkan filter, dan menampilkan kartu artikel untuk setiap entri registri; klik kartu memindahkan rute ke `/artikel/<id>`.【F:pages/Home.tsx†L14-L61】
5. `ArticlePage.tsx` membaca parameter `id` dari URL, mencari komponen di registri, menampilkan breadcrumb, dan memunculkan fallback 404 jika slug tidak valid.【F:pages/ArticlePage.tsx†L9-L58】
6. `Layout.tsx` menyediakan header, menu mobile, footer, dan tombol WhatsApp mengambang sehingga kontak utama tetap tersedia di setiap halaman.【F:components/Layout.tsx†L15-L247】

Diagram alur baru:

```
index.tsx → App (BrowserRouter) → Layout → Home (/)
                                     → ArticlePage (/artikel/:id)
```

## Registri Konten & Kategori
- Enum `Category` mencakup `Kesehatan Anak`, `Lansia`, `Penyakit Umum`, `Gaya Hidup`, serta `P3K & Darurat`. Setiap artikel memuat `id`, `title`, `description`, `icon`, `category`, dan elemen `component` sesuai antarmuka `Article`.【F:types.ts†L3-L18】
- Contoh entri registri:
  - **Manajemen Nyeri Lansia** – jurnal nyeri dengan badge severitas dan riwayat terurut terbaru.【F:services/articleRegistry.tsx†L33-L48】
  - **Cek Metabolisme & Diet** – kalkulator BMR/TDEE dengan panduan isi piring.【F:services/articleRegistry.tsx†L23-L32】
  - **Batuk Pilek Anak/Dewasa** – triase napas cepat atau cek mandiri tanda bahaya.【F:services/articleRegistry.tsx†L49-L74】
  - **Diet Asam Urat & Kolesterol** – tabel makanan dengan status hijau/kuning/merah.【F:services/articleRegistry.tsx†L25-L119】
  - **P3K Luka Ringan** – langkah awal dan tanda infeksi untuk cedera minor.【F:services/articleRegistry.tsx†L111-L119】

## Cara Menjalankan
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
1. **Buat komponen** di `components/articles/` dengan nama deskriptif. Gunakan paragraf terbuka atau daftar poin; tambahkan interaksi ringan (slider, checklist, kalkulator) sesuai kebutuhan pasien.
2. **Persistensi opsional**: bila menyimpan data, gunakan `localStorage` dengan key bermakna (mis. `zmc-<topik>-journal`), hidrasi pada render awal, dan sediakan aksi reset dengan konfirmasi seperti pada `PainDiary.tsx`.【F:components/articles/PainDiary.tsx†L80-L123】【F:components/articles/PainDiary.tsx†L146-L209】
3. **Registrasi & rute slug**: tambahkan entri ke array `ARTICLES` di `services/articleRegistry.tsx` dengan `id` (slug yang akan dipakai pada URL `/artikel/<id>`), `title`, `description`, `icon` FontAwesome, `category`, serta `component` yang merender artikel baru.【F:services/articleRegistry.tsx†L19-L121】
4. **Uji navigasi & deep-link**: jalankan `npm run dev`, pastikan kartu beranda muncul, klik kartu memuat artikel di `/artikel/<slug>`, breadcrumb dan tombol kembali berfungsi, serta memuat langsung URL `/artikel/<slug>` di browser memunculkan artikel yang sama. Pastikan slug yang tidak dikenal menampilkan pesan 404 dengan tombol kembali ke beranda.【F:App.tsx†L24-L43】【F:pages/ArticlePage.tsx†L9-L60】【F:components/Layout.tsx†L15-L247】

## Uji Manual Navigasi
- Buka artikel lewat klik kartu di beranda dan pastikan diarahkan ke `/artikel/<slug>`.
- Akses artikel langsung via URL `/artikel/<slug>` dan verifikasi konten dimuat dengan benar.
- Gunakan breadcrumb atau tombol “Kembali ke Daftar Artikel”/“Menu Utama” untuk kembali ke `/` dan pastikan filter kategori beranda sesuai preferensi terakhir atau kembali ke “Semua” bila belum ada pilihan.【F:pages/ArticlePage.tsx†L15-L60】【F:pages/Home.tsx†L1-L83】

## Praktik Desain & Aksesibilitas
- Gunakan identitas visual ZMC: latar terang, aksen merah (`zmc.red`/`zmc.darkRed`), sudut membulat, dan bayangan ringan sesuai konfigurasi Tailwind di `index.html`.【F:index.html†L8-L37】
- Pastikan ukuran target sentuh memadai pada menu dan tombol; contoh implementasi dapat dilihat pada tombol menu mobile, CTA WhatsApp, serta badge/buton di artikel nyeri.【F:components/Layout.tsx†L34-L105】【F:components/articles/PainDiary.tsx†L25-L76】【F:components/articles/PainDiary.tsx†L146-L206】
- Hindari menyembunyikan teks edukasi utama di balik accordion; tampilkan paragraf terbuka agar mudah dibaca sambil menggulir. Semua artikel pada registri menggunakan konten statis atau form langsung tanpa collapsible.【F:services/articleRegistry.tsx†L19-L121】
- Berikan penanda visual untuk prioritas atau severitas ketika relevan, misalnya badge warna hijau/oranye/merah pada skala nyeri lansia.【F:components/articles/PainDiary.tsx†L25-L40】

## Kontak & Meta
Informasi kontak, nomor darurat, WhatsApp, lokasi, Instagram, logo, dan jam operasional berada pada `constants.ts` untuk memudahkan pemutakhiran terpusat.【F:constants.ts†L2-L15】
