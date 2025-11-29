# AGENTS – ZMC Portal

This repository is a Vite + React + TypeScript patient-education portal for Zihan Medical Center. Use the README.md as the primary reference for project structure, tooling, and how the overall website should behave.

## Scope-wide instructions
- Keep to the existing visual identity: white backgrounds, ZMC red accents, rounded cards, mobile-friendly spacing, and Tailwind utility classes loaded from CDN.
- Follow the routing and article registration patterns described in `README.md` and `services/articleRegistry.tsx` when adding or adjusting pages.
- Prefer client-side state and localStorage for interactive widgets unless server logic is explicitly required.

## Jurnal Nyeri Lansia page requirements (from the prior prompt)
When working on the elderly pain journal experience, ensure the page includes:
- Breadcrumb `Beranda › Manajemen Nyeri Lansia`, a prominent title card "Jurnal Nyeri Lansia", and subtitle about logging daily pain for ZMC doctors.
- Pain journal card with slider 0–10, labels "Tidak Sakit"/"Sangat Sakit", numeric display, textarea placeholder `Cth: Nyeri lutut kiri setelah jalan pagi / minum parasetamol jam 08.00`, and primary button "Simpan Catatan".
- Validation + persistence: auto-fill today’s date, save entries to `localStorage` under a clear key (e.g., `zmc-nyeri-lansia-journal`), and prepend new entries to history.
- History list titled "Riwayat Catatan" that shows date (dd/mm/yyyy), note text, and a severity-colored badge (0–3 green, 4–6 orange, 7–10 red). Provide a "Hapus semua" clear action with confirmation when history exists; show "Belum ada catatan." when empty.
- Educational article rendered as readable static sections (no accordion) with headings:
  - Apa itu Jurnal Nyeri Lansia?
  - Cara Menggunakan Halaman Ini
  - Contoh Pengisian
  - Tanda Bahaya – Kapan Harus Segera ke Klinik / IGD?
  - Hal yang Membantu Mengurangi Nyeri
  - Catatan Obat Nyeri
  - Pesan dari Zihan Medical Center
- Use simple paragraphs/bullets, slightly larger font for readability, and leave bottom spacing so floating buttons do not cover content.
- Optionally include the WhatsApp CTA linking to `https://api.whatsapp.com/send/?phone=%2B6282217180432&type=phone_number&app_absent=0&wame_ctl=1`.
