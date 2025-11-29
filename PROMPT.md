You are an expert TypeScript + React + Vite developer working on the EduZMC patient-education portal (see README.md for layout, routing via `App.tsx`, and article registration in `services/articleRegistry.tsx`).

Goal:
Expand the portal with multiple interactive health-education experiences for diverse Zihan Medical Center patients (anak, dewasa, lansia). Each article must pair readable Indonesian education copy with a lightweight client-side tool that stores data in `localStorage` so it works without login.

General requirements (apply to every new article):
- Use the existing ZMC visual identity: white background, red primary accent, rounded cards, Tailwind utilities, and generous touch targets (~48px height) for mobile-first layouts.
- Keep layouts single-column on small screens; add breathing room at the bottom so floating WhatsApp button doesn’t cover text.
- Include breadcrumb and title/subtitle cards consistent with surrounding category (e.g., Beranda › Anak, Beranda › Penyakit Umum, Beranda › Manajemen Nyeri Lansia).
- Persist user input to `localStorage` under descriptive keys (e.g., `zmc-<topic>-journal`) and hydrate on first render. Provide a clear “Hapus semua”/reset with confirmation.
- Show severity/priority badges where meaningful (0–3 green, 4–6 orange, 7–10 red, or similar low/medium/high mapping).
- Keep educational text visible (no accordions) with simple headings and bullets; use slightly larger font for readability.
- Reuse the WhatsApp CTA: `https://api.whatsapp.com/send/?phone=%2B6282217180432&type=phone_number&app_absent=0&wame_ctl=1`.

Interactive article set to build
1) **Jurnal Nyeri Lansia** (maintain existing behavior)
   - Breadcrumb `Beranda › Manajemen Nyeri Lansia`, title card "Jurnal Nyeri Lansia", subtitle about mencatat nyeri harian untuk kontrol ke dokter ZMC.
   - Pain journal card: slider 0–10 with labels "Tidak Sakit"/"Sangat Sakit", numeric display, textarea placeholder `Cth: Nyeri lutut kiri setelah jalan pagi / minum parasetamol jam 08.00`, button "Simpan Catatan".
   - Auto-fill today’s date, save to `localStorage` (key `zmc-nyeri-lansia-journal`), prepend to history list.
   - History "Riwayat Catatan" shows date (dd/mm/yyyy), note text, severity badge (0–3 green, 4–6 orange, 7–10 red), and "Hapus semua" clear action with confirmation; show "Belum ada catatan." when empty.
   - Educational article headings (static text): "Apa itu Jurnal Nyeri Lansia?", "Cara Menggunakan Halaman Ini", "Contoh Pengisian", "Tanda Bahaya – Kapan Harus Segera ke Klinik / IGD?", "Hal yang Membantu Mengurangi Nyeri", "Catatan Obat Nyeri", "Pesan dari Zihan Medical Center".

2) **Catatan Demam & Batuk Anak**
   - Breadcrumb `Beranda › Anak`, title "Catatan Demam & Batuk Anak", subtitle "Pantau suhu, batuk, dan aktivitas harian anak di rumah".
   - Inputs: numeric temperature (°C) with quick buttons (36.5, 37.5, 38.5), slider for batuk/breathing effort (0–10) with labels "Ringan"/"Berat", textarea for catatan (makan/minum, obat, napas cepat, tarikan dada).
   - On save: auto-fill today’s date & time, store entries under `zmc-anak-demam-batuk`, prepend to history.
   - History shows date/time, temperature badge (<=37.5 green, 37.6–38.4 orange, ≥38.5 red), batuk severity badge using 0–3/4–6/7–10 mapping, and notes.
   - Warning text block (static): kapan harus ke IGD (demam ≥39°C tidak turun, napas cepat/tarikan dada, bayi <3 bulan demam, tampak lemah/dehidrasi, kejang demam >5 menit).

3) **Checklist Obat & Kontrol Kronis (Dewasa/Lansia)**
   - Breadcrumb `Beranda › Penyakit Umum`, title "Checklist Obat & Kontrol", subtitle "Bantu Bapak/Ibu minum obat rutin dan siap kontrol".
   - Form: list builder for obat (nama, dosis, jadwal pagi/siang/malam checkbox), toggle "Sudah diminum hari ini" per item, and textarea catatan efek samping.
   - Persist list and daily status to `zmc-obat-kontrol`; allow resetting harian tanpa menghapus daftar obat.
   - Provide quick tips section: kapan obat harus diminum setelah makan/ sebelum tidur, catatan bawa daftar obat saat kontrol, cek ulang stok.

4) **Log Tekanan Darah & Gaya Hidup**
   - Breadcrumb `Beranda › Gaya Hidup`, title "Tekanan Darah & Aktivitas", subtitle "Catat tekanan darah rumahan dan kebiasaan pendukung jantung sehat".
   - Inputs: sistolik/diastolik fields, optional detak jantung, slider aktivitas harian (0–10: minim–sangat aktif), checklist singkat (kurangi garam, jalan 20 menit, cukup minum), textarea catatan.
   - Save to `zmc-td-gaya-hidup` with timestamp; history shows badges: BP <130/80 green, 130–139/80–89 orange, ≥140/90 red; activity badge using low/medium/high mapping.
   - Education blocks: cara ukur tensi di rumah, tanda bahaya (nyeri dada, sesak, pusing berat), kebiasaan harian (jalan, tidur cukup, batasi garam & rokok), kapan hubungi ZMC.

Education copy (Indonesian – ready to render)
- Demam & Batuk Anak – poin cepat:
  - "Pantau suhu 3–4×/hari saat anak demam."
  - "Perhatikan napas cepat, tarikan dada, atau suara grok-grok."
  - "Pastikan anak cukup minum; ASI/on demand untuk bayi."
  - "Gunakan parasetamol sesuai berat badan; hindari aspirin pada anak."
  - "Segera ke klinik jika demam >3 hari, muntah terus, atau anak tampak lemas."
- Checklist Obat & Kontrol – poin cepat:
  - "Tandai obat yang sudah diminum pagi/siang/malam agar tidak terlewat."
  - "Catat keluhan seperti pusing, mual, bengkak kaki untuk dibawa saat kontrol."
  - "Simpan obat pada wadah terpisah dan periksa tanggal kedaluwarsa."
  - "Bawa daftar obat, alergi, dan dosis saat kunjungan ke ZMC."
- Tekanan Darah & Aktivitas – poin cepat:
  - "Ukur setelah duduk tenang 5 menit; letakkan manset setinggi jantung."
  - "Catat waktu minum obat antihipertensi supaya hasil bacaan bisa dibandingkan."
  - "Segera cari pertolongan jika ada nyeri dada, sesak berat, atau pusing mendadak."
  - "Aktivitas ringan 20–30 menit, 5 hari/minggu, dan kurangi garam <1 sdt/hari."

Testing checklist
- Mobile: sliders easy to drag, buttons large, history updates immediately, page refresh keeps data.
- Desktop: layouts stay centered single-column; severity badges remain legible.
- No TypeScript or ESLint errors.
