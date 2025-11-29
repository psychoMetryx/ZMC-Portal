# AGENTS – ZMC Portal

This repository is a Vite + React + TypeScript patient-education portal for Zihan Medical Center. The README.md remains the primary reference for project structure, routing, and styling.

## Scope-wide instructions
- Keep to the existing visual identity: white backgrounds, ZMC red accents, rounded cards, mobile-friendly spacing, and Tailwind utility classes loaded from CDN.
- Follow the routing and article registration patterns described in `README.md` and `services/articleRegistry.tsx` when adding or adjusting pages.
- Prefer client-side state and `localStorage` for interactive widgets unless server logic is explicitly required.
- Build for a broad range of ZMC patients (anak, dewasa, lansia) — do **not** constrain new education experiences to elderly-only topics.

## Interactive article expectations
When creating or updating article components:
- Combine educational copy with at least one lightweight interactive element (e.g., slider, checklist, simple calculator, journal/log) so patients can apply the guidance.
- Ensure mobile-first layouts with generous touch targets (≈48px height), clear labels, and readable typography. Leave bottom padding so floating buttons do not hide text.
- Use simple paragraphs and bullet lists; avoid accordions for core education text so content stays visible while scrolling.
- Persist user inputs in `localStorage` with descriptive keys (e.g., `zmc-<topic>-journal`), hydrated on first render, and provide clear reset/clear actions with confirmation.
- Provide severity/priority visual cues where relevant (badges or color ramps: green for low, orange for medium, red for high).
- Reuse the WhatsApp CTA (`https://api.whatsapp.com/send/?phone=%2B6282217180432&type=phone_number&app_absent=0&wame_ctl=1`) when a contact option is helpful for follow-up.

## Example: Jurnal Nyeri (maintain, but not the only focus)
Keep the pain journal experience aligned with earlier guidance as one of several interactive articles:
- Breadcrumb `Beranda › Manajemen Nyeri Lansia`, title card "Jurnal Nyeri Lansia", and subtitle about logging daily pain for ZMC doctors.
- Pain journal card with slider 0–10, labels "Tidak Sakit"/"Sangat Sakit", numeric display, textarea placeholder `Cth: Nyeri lutut kiri setelah jalan pagi / minum parasetamol jam 08.00`, and primary button "Simpan Catatan".
- Validation + persistence: auto-fill today’s date, save entries to `localStorage` under a clear key (e.g., `zmc-nyeri-lansia-journal`), and prepend new entries to history.
- History list titled "Riwayat Catatan" that shows date (dd/mm/yyyy), note text, and a severity-colored badge (0–3 green, 4–6 orange, 7–10 red). Provide a "Hapus semua" clear action with confirmation when history exists; show "Belum ada catatan." when empty.
- Render the educational article as readable static sections (no accordion) using the supplied headings and text for pain management.
