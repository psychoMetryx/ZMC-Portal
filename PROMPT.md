You are an expert TypeScript + React + Next.js developer.

Goal:
Implement a mobile-first patient-education page for Zihan Medical Center called **"Jurnal Nyeri Lansia"** inside the existing ZMC Portal. The page combines:
1) a pain journal feature (daily pain score + notes with history), and
2) an educational article for caregivers and elderly patients (in Indonesian, text provided below).

Overall requirements:
- Use the existing ZMC visual identity: white background, red primary accent, rounded cards, and large touch targets.
- The layout must work very well on small mobile screens (top navigation bar, single-column content, bottom spacing so FAB/WhatsApp button doesn't cover text).
- Keep the interactive functionality completely client-side using React state and `localStorage` so the journal works even without login.

URL / routing:
- Add a page or route for elderly pain management journal, e.g. `/manajemen-nyeri-lansia/jurnal` depending on the current routing convention in this repo.

Page structure (from top to bottom):
1. **Breadcrumb + Title**
   - Show breadcrumb like: "Beranda › Manajemen Nyeri Lansia".
   - Large title card: "Jurnal Nyeri Lansia".
   - Short subtitle: "Catat kondisi nyeri harian Bapak/Ibu untuk dilaporkan saat kontrol ke dokter ZMC."

2. **Pain Journal Card**
   - Card component with:
     - Label: "Skala Nyeri Hari Ini (0 – 10)".
     - An accessible slider input from 0 to 10 (step 1). Show labels "Tidak Sakit" on the left and "Sangat Sakit" on the right.
     - A big numeric display of the currently selected pain score on the right (like the design in the screenshot).
     - A multiline textarea or input for notes with placeholder: "Cth: Nyeri lutut kiri setelah jalan pagi / minum parasetamol jam 08.00".
     - Primary button: "Simpan Catatan".
   - On save:
     - Validate that at least the date and pain score are present. Auto-fill today's date.
     - Save each entry into `localStorage` under a clear key (e.g. `zmc-nyeri-lansia-journal`).
     - Prepend the new entry to the history list.

3. **History Section ("Riwayat Catatan")**
   - Title: "Riwayat Catatan".
   - If there is no data, show grey text: "Belum ada catatan.".
   - Otherwise, display a list (or table on larger screens) of previous entries.
     - Each item should show: date (dd/mm/yyyy), pain score badge, location/note text.
     - The pain score badge should be colored based on severity:
       - 0–3: green
       - 4–6: orange
       - 7–10: red
   - Include a small "Hapus semua" text button that clears history from `localStorage` with a confirm dialog.

4. **Educational Article Section**
   - Below the journal and history, render the provided article content in Indonesian.
   - Use simple headings, paragraphs, and bullet points. Make the font slightly larger than default for elderly readability.
   - Each main heading should map to a distinct block with clear spacing:
     - "Apa itu Jurnal Nyeri Lansia?"
     - "Cara Menggunakan Halaman Ini"
     - "Contoh Pengisian"
     - "Tanda Bahaya – Kapan Harus Segera ke Klinik / IGD?"
     - "Hal yang Membantu Mengurangi Nyeri"
     - "Catatan Obat Nyeri"
     - "Pesan dari Zihan Medical Center"
   - Do NOT nest this article in an accordion; keep it scrollable and easy to read.

5. **WhatsApp CTA (optional but nice)**
   - At the bottom of the page, reuse the existing ZMC floating WhatsApp button or CTA section to contact the clinic.
   - Link: `https://api.whatsapp.com/send/?phone=%2B6282217180432&type=phone_number&app_absent=0&wame_ctl=1`.

State management and persistence:
- On first render, load saved entries from `localStorage` and hydrate the history.
- When saving a new entry, update both React state and `localStorage`.
- Use a small TypeScript interface to define the journal entry shape, e.g.:
  interface PainEntry {
    id: string;
    date: string;        // ISO or dd/mm/yyyy
    score: number;       // 0–10
    note: string;        // free text
  }

Styling:
- Use the existing design system or Tailwind (depending on this repo's conventions).
- Large tap targets for slider and buttons (min-height ~48px).
- Respect the existing header/navigation components of the portal.
- Ensure contrast is sufficient for elderly eyes (no light grey on white for main text).

Article content (copy to render as static text):

Apa itu Jurnal Nyeri Lansia?

Halaman ini membantu Bapak/Ibu dan keluarga mencatat nyeri setiap hari.
Catatan ini penting supaya dokter bisa:

melihat pola nyeri (kapan muncul, apa pemicunya),

menilai efek obat / fisioterapi,

mencegah nyeri makin parah atau berujung jatuh.


Tidak perlu menulis panjang–panjang. Yang penting rutin dan konsisten.



Cara Menggunakan Halaman Ini

1. Pilih Skala Nyeri Hari Ini (0–10)

0 : tidak nyeri sama sekali.

1–3 : nyeri ringan, masih bisa beraktivitas.

4–6 : nyeri sedang, mulai mengganggu aktivitas.

7–8 : nyeri berat, sulit bergerak atau beraktivitas.

9–10 : nyeri sangat berat / tak tertahankan.



2. Tulis Catatan Singkat
Di kotak catatan, tuliskan hal-hal penting, misalnya:

Lokasi nyeri – contoh: “lutut kanan”, “pinggang kiri”, “betis kiri”.

Kapan muncul – contoh: “setelah naik tangga”, “saat bangun tidur”.

Apa yang sudah dilakukan – contoh: “kompres hangat”, “minum parasetamol 500 mg”, “jalan pelan 10 menit”.



3. Klik “Simpan Catatan”

Catatan akan muncul di bagian Riwayat Catatan.

Saat kontrol ke Zihan Medical Center, cukup tunjukkan riwayat ini ke dokter/perawat.





Contoh Pengisian

Skala nyeri: 3
Catatan: “Nyeri lutut kiri ringan setelah jalan pagi 10 menit, membaik setelah istirahat.”

Skala nyeri: 6
Catatan: “Nyeri pinggang kanan kalau berdiri lama, minum parasetamol jam 08.00, nyeri berkurang jadi 3.”

Skala nyeri: 8
Catatan: “Nyeri betis kiri, terasa tegang dan agak bengkak sejak kemarin sore.”





Tanda Bahaya – Kapan Harus Segera ke Klinik / IGD?

Walaupun jurnal ini membantu pantau nyeri di rumah, ada beberapa kondisi yang tidak boleh ditunda. Segera ke klinik / IGD bila: 

Nyeri tiba-tiba sangat hebat atau tidak membaik meski sudah minum obat.

Kaki terasa lemah atau kebas sampai sulit berdiri atau berjalan.

Nyeri punggung bawah disertai:

sulit buang air kecil,

mengompol tiba-tiba,

atau sulit buang air besar.


Nyeri disertai demam tinggi atau turun berat badan tanpa sebab jelas.

Nyeri tetap sangat mengganggu walau sedang istirahat / malam hari.

Betis atau kaki:

bengkak, merah, hangat; atau sebaliknya, pucat dan dingin.



Jika ragu, lebih baik kontrol lebih cepat daripada terlambat.



Hal yang Membantu Mengurangi Nyeri

Beberapa kebiasaan sederhana yang bisa membantu: 

Tetap bergerak pelan: jalan santai 5–10 menit, 2–3 kali sehari, sesuai kemampuan.

Gunakan kompres dingin bila ada bengkak baru (<3 hari), dan kompres hangat untuk otot kaku/nyeri lama.

Hindari duduk atau tiduran terus-menerus; setiap 30–40 menit usahakan berdiri & regangkan badan sebentar.

Gunakan alas kaki tidak licin dan stabil, terutama di kamar mandi.

Minum obat nyeri sesuai anjuran dokter, jangan menambah dosis sendiri.



Catatan Obat Nyeri

Parasetamol biasanya pilihan pertama dan relatif aman bila diminum sesuai dosis.

Obat anti-nyeri lain (misalnya golongan NSAID) sebaiknya hanya diminum setelah makan dan tidak jangka panjang tanpa pemantauan dokter. 

Untuk pasien dengan riwayat sakit lambung, ginjal, atau jantung, wajib konsultasi dulu sebelum minum obat nyeri rutin.


Tuliskan obat yang diminum di kolom catatan (contoh: “parasetamol 500 mg jam 08.00”), sehingga dokter bisa menilai apakah obat masih cukup atau perlu penyesuaian.



Pesan dari Zihan Medical Center

Tujuan kami adalah membantu Bapak/Ibu tetap aman dan tetap aktif.
Jurnal nyeri ini bukan untuk “menakuti”, tetapi supaya:

keluhan Bapak/Ibu tidak diremehkan,

terapi bisa lebih tepat,

 dan hari-hari lansia tetap bisa dinikmati dengan nyaman.


Jika nyeri menetap lebih dari 2–4 minggu atau sudah mengganggu tidur dan aktivitas harian, silakan buat janji kontrol ke Zihan Medical Center atau hubungi kami melalui WhatsApp yang tersedia di halaman ini. 
