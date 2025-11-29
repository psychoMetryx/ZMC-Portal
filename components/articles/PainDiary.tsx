import React, { useEffect, useMemo, useState } from 'react';
import { ZMC_INFO } from '../../constants';

interface PainEntry {
  id: string;
  date: string; // ISO string
  score: number; // 0-10
  note: string;
}

const STORAGE_KEY = 'zmc-nyeri-lansia-journal';
const LEGACY_STORAGE_KEY = 'zmc_pain_diary';
const ACTION_STORAGE_KEY = 'zmc-nyeri-lansia-actions';
const TOPIC_LINKS = [
  { id: 'cara-pakai', label: 'Cara pakai jurnal' },
  { id: 'tanda-bahaya', label: 'Tanda bahaya' },
  { id: 'kurangi-nyeri', label: 'Kurangi nyeri' },
  { id: 'catatan-obat', label: 'Catatan obat' },
];

const DAILY_ACTIONS = [
  {
    id: 'gerak',
    title: 'Gerak 5–10 menit',
    detail: 'Jalan santai atau peregangan ringan supaya sendi tidak kaku.',
  },
  {
    id: 'kompres',
    title: 'Kompres tepat',
    detail: 'Dingin untuk bengkak baru, hangat untuk otot kaku/nyeri lama.',
  },
  {
    id: 'alas-kaki',
    title: 'Alas kaki aman',
    detail: 'Gunakan sandal/sepatu anti-slip dan stabil, terutama di kamar mandi.',
  },
  {
    id: 'obat-teratur',
    title: 'Minum obat teratur',
    detail: 'Sesuai anjuran dokter, catat jam minum obat di jurnal.',
  },
];

const PainScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const color = score >= 7 ? 'bg-red-500' : score >= 4 ? 'bg-orange-500' : 'bg-green-500';
  return (
    <span
      className={`${color} text-white font-bold text-sm px-3 py-1 rounded-full min-w-[44px] text-center inline-flex justify-center`}
      aria-label={`Skala nyeri ${score}`}
    >
      {score}
    </span>
  );
};

const PainDiary: React.FC = () => {
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [score, setScore] = useState<number>(3);
  const [note, setNote] = useState<string>('');
  const [actionsDone, setActionsDone] = useState<Record<string, boolean>>({});

  const defaultActionState = useMemo(
    () =>
      DAILY_ACTIONS.reduce<Record<string, boolean>>((acc, action) => {
        acc[action.id] = false;
        return acc;
      }, {}),
    []
  );

  // Load saved entries on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const parseEntries = (raw: string | null) => {
      if (!raw) return null;
      try {
        const parsed: PainEntry[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error('Failed to parse journal data', error);
      }
      return null;
    };

    const currentEntries = parseEntries(localStorage.getItem(STORAGE_KEY));
    if (currentEntries) {
      setEntries(currentEntries);
      return;
    }

    const legacyEntries = parseEntries(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (legacyEntries) {
      setEntries(legacyEntries);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyEntries));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }, []);

  // Load action checklist on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(ACTION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, boolean>;
        setActionsDone({ ...defaultActionState, ...parsed });
        return;
      }
    } catch (error) {
      console.error('Failed to parse action checklist', error);
    }
    setActionsDone(defaultActionState);
  }, [defaultActionState]);

  const formattedEntries = useMemo(
    () =>
      entries.map(entry => ({
        ...entry,
        displayDate: new Date(entry.date).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      })),
    [entries]
  );

  const persistEntries = (next: PainEntry[]) => {
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  };

  const toggleAction = (id: string) => {
    const updated = { ...actionsDone, [id]: !actionsDone[id] };
    setActionsDone(updated);
    localStorage.setItem(ACTION_STORAGE_KEY, JSON.stringify(updated));
  };

  const resetActions = () => {
    if (confirm('Reset checklist edukasi hari ini?')) {
      setActionsDone(defaultActionState);
      localStorage.setItem(ACTION_STORAGE_KEY, JSON.stringify(defaultActionState));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSave = () => {
    const today = new Date();
    const newEntry: PainEntry = {
      id: crypto.randomUUID(),
      date: today.toISOString(),
      score,
      note: note.trim(),
    };

    const updated = [newEntry, ...entries];
    persistEntries(updated);
    setNote('');
  };

  const handleClear = () => {
    if (confirm('Hapus semua riwayat nyeri?')) {
      setEntries([]);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  };

  const severityLabel = score >= 7 ? 'Nyeri berat' : score >= 4 ? 'Nyeri sedang' : 'Nyeri ringan';

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="cursor-pointer hover:text-zmc-red" onClick={() => window.history.back()}>
          Beranda
        </span>
        <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
        <span className="text-slate-700 font-semibold">Manajemen Nyeri Lansia</span>
      </div>

      {/* Title card */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-3xl shadow-lg">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/80">ZMC Care</p>
        <h1 className="text-3xl font-extrabold leading-tight mt-2 mb-1">Jurnal Nyeri Lansia</h1>
        <p className="text-white/90 text-sm md:text-base max-w-2xl">
          Catat kondisi nyeri harian Bapak/Ibu untuk dilaporkan saat kontrol ke dokter ZMC.
        </p>
      </div>

      {/* Education spotlight */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 md:p-7 space-y-4">
        <div className="flex flex-col md:flex-row gap-5 md:items-center">
          <div className="flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.15em] font-bold text-red-600">Edukasi Cepat</p>
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">Mulai dari edukasi, lalu isi jurnal</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Baca poin penting sebelum menulis catatan agar keluarga tahu apa yang harus dilakukan hari ini.
            </p>
            <div className="flex flex-wrap gap-2">
              {TOPIC_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-3 py-2 text-sm rounded-full border border-slate-200 bg-slate-50 hover:border-red-500 hover:text-red-600 transition"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-900">Segera hubungi klinik bila…</p>
                <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                  <li>Nyeri tiba-tiba berat atau kaki lemas/kebas.</li>
                  <li>Demam tinggi, bengkak merah panas, atau sulit BAK/BAB.</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-900">Tips cepat hari ini</p>
                <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                  <li>Batasi duduk lama, berdiri &amp; regangkan tiap 30–40 menit.</li>
                  <li>Tanyakan keluarga untuk menemani saat bergerak atau ke kamar mandi.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-slate-900 text-white rounded-3xl p-5 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-white/70 font-bold">Checklist edukasi hari ini</p>
                <p className="text-lg font-extrabold leading-tight">Sudah dilakukan?</p>
              </div>
              <button
                onClick={resetActions}
                className="text-xs px-3 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
              >
                Reset
              </button>
            </div>
            <div className="space-y-2">
              {DAILY_ACTIONS.map(action => (
                <label
                  key={action.id}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-red-500"
                    checked={Boolean(actionsDone[action.id])}
                    onChange={() => toggleAction(action.id)}
                  />
                  <div>
                    <p className="font-semibold leading-tight">{action.title}</p>
                    <p className="text-sm text-white/80 leading-relaxed">{action.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pain journal card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 md:p-7 space-y-5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <label className="block font-bold text-slate-800 mb-3">Skala Nyeri Hari Ini (0 – 10)</label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={score}
                  onChange={e => setScore(Number(e.target.value))}
                  className="w-full accent-red-600 h-2 bg-slate-200 rounded-full cursor-pointer"
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-valuenow={score}
                  aria-label="Skala nyeri hari ini"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Tidak Sakit</span>
                  <span>Sangat Sakit</span>
                </div>
              </div>
              <div className="min-w-[88px] bg-slate-900 text-white rounded-2xl p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-white/60 font-bold">Nilai</p>
                <p className="text-3xl font-extrabold leading-none">{score}</p>
                <p className="text-xs mt-1 text-white/80">{severityLabel}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-bold text-slate-800">Catatan Singkat</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            placeholder="Cth: Nyeri lutut kiri setelah jalan pagi / minum parasetamol jam 08.00"
            className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-slate-50"
          />
          <p className="text-xs text-slate-500">
            Tulis lokasi nyeri, kapan muncul, dan apa yang sudah dilakukan.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-[0.99]"
        >
          Simpan Catatan
        </button>
      </div>

      {/* History */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-5 md:p-7 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Riwayat Catatan</h2>
            <p className="text-sm text-slate-500">Catatan terbaru muncul paling atas.</p>
          </div>
          {entries.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-red-600 font-semibold hover:underline"
            >
              Hapus semua
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="text-slate-400 text-center py-6 italic">Belum ada catatan.</p>
        ) : (
          <div className="space-y-3">
            {formattedEntries.map(entry => (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4"
              >
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 font-bold">{entry.displayDate}</p>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                    {entry.note || 'Tidak ada catatan'}
                  </p>
                </div>
                <PainScoreBadge score={entry.score} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-5 md:p-7 space-y-5 leading-relaxed text-slate-800 text-[15px]">
        <section className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Apa itu Jurnal Nyeri Lansia?</h2>
          <p>Halaman ini membantu Bapak/Ibu dan keluarga mencatat nyeri setiap hari. Catatan ini penting supaya dokter bisa:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>melihat pola nyeri (kapan muncul, apa pemicunya),</li>
            <li>menilai efek obat / fisioterapi,</li>
            <li>mencegah nyeri makin parah atau berujung jatuh.</li>
          </ul>
          <p>Tidak perlu menulis panjang–panjang. Yang penting rutin dan konsisten.</p>
        </section>

        <section className="space-y-3" id="cara-pakai">
          <h2 className="text-2xl font-extrabold text-slate-900">Cara Menggunakan Halaman Ini</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <p className="font-semibold">Pilih Skala Nyeri Hari Ini (0–10)</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>0 : tidak nyeri sama sekali.</li>
                <li>1–3 : nyeri ringan, masih bisa beraktivitas.</li>
                <li>4–6 : nyeri sedang, mulai mengganggu aktivitas.</li>
                <li>7–8 : nyeri berat, sulit bergerak atau beraktivitas.</li>
                <li>9–10 : nyeri sangat berat / tak tertahankan.</li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">Tulis Catatan Singkat</p>
              <p>Di kotak catatan, tuliskan hal-hal penting, misalnya:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lokasi nyeri – contoh: “lutut kanan”, “pinggang kiri”, “betis kiri”.</li>
                <li>Kapan muncul – contoh: “setelah naik tangga”, “saat bangun tidur”.</li>
                <li>Apa yang sudah dilakukan – contoh: “kompres hangat”, “minum parasetamol 500 mg”, “jalan pelan 10 menit”.</li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">Klik “Simpan Catatan”</p>
              <p>Catatan akan muncul di bagian Riwayat Catatan. Saat kontrol ke Zihan Medical Center, cukup tunjukkan riwayat ini ke dokter/perawat.</p>
            </li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Contoh Pengisian</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <p className="font-semibold">Skala nyeri: 3</p>
              <p>Catatan: “Nyeri lutut kiri ringan setelah jalan pagi 10 menit, membaik setelah istirahat.”</p>
            </li>
            <li>
              <p className="font-semibold">Skala nyeri: 6</p>
              <p>Catatan: “Nyeri pinggang kanan kalau berdiri lama, minum parasetamol jam 08.00, nyeri berkurang jadi 3.”</p>
            </li>
            <li>
              <p className="font-semibold">Skala nyeri: 8</p>
              <p>Catatan: “Nyeri betis kiri, terasa tegang dan agak bengkak sejak kemarin sore.”</p>
            </li>
          </ul>
        </section>

        <section className="space-y-3" id="tanda-bahaya">
          <h2 className="text-2xl font-extrabold text-slate-900">Tanda Bahaya – Kapan Harus Segera ke Klinik / IGD?</h2>
          <p>Walaupun jurnal ini membantu pantau nyeri di rumah, ada beberapa kondisi yang tidak boleh ditunda. Segera ke klinik / IGD bila:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nyeri tiba-tiba sangat hebat atau tidak membaik meski sudah minum obat.</li>
            <li>Kaki terasa lemah atau kebas sampai sulit berdiri atau berjalan.</li>
            <li>
              Nyeri punggung bawah disertai:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>sulit buang air kecil,</li>
                <li>mengompol tiba-tiba,</li>
                <li>atau sulit buang air besar.</li>
              </ul>
            </li>
            <li>Nyeri disertai demam tinggi atau turun berat badan tanpa sebab jelas.</li>
            <li>Nyeri tetap sangat mengganggu walau sedang istirahat / malam hari.</li>
            <li>
              Betis atau kaki:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>bengkak, merah, hangat; atau sebaliknya, pucat dan dingin.</li>
              </ul>
            </li>
          </ul>
          <p>Jika ragu, lebih baik kontrol lebih cepat daripada terlambat.</p>
        </section>

        <section className="space-y-2" id="kurangi-nyeri">
          <h2 className="text-2xl font-extrabold text-slate-900">Hal yang Membantu Mengurangi Nyeri</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tetap bergerak pelan: jalan santai 5–10 menit, 2–3 kali sehari, sesuai kemampuan.</li>
            <li>Gunakan kompres dingin bila ada bengkak baru (&lt;3 hari), dan kompres hangat untuk otot kaku/nyeri lama.</li>
            <li>Hindari duduk atau tiduran terus-menerus; setiap 30–40 menit usahakan berdiri &amp; regangkan badan sebentar.</li>
            <li>Gunakan alas kaki tidak licin dan stabil, terutama di kamar mandi.</li>
            <li>Minum obat nyeri sesuai anjuran dokter, jangan menambah dosis sendiri.</li>
          </ul>
        </section>

        <section className="space-y-2" id="catatan-obat">
          <h2 className="text-2xl font-extrabold text-slate-900">Catatan Obat Nyeri</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Parasetamol biasanya pilihan pertama dan relatif aman bila diminum sesuai dosis.</li>
            <li>Obat anti-nyeri lain (misalnya golongan NSAID) sebaiknya hanya diminum setelah makan dan tidak jangka panjang tanpa pemantauan dokter.</li>
            <li>Untuk pasien dengan riwayat sakit lambung, ginjal, atau jantung, wajib konsultasi dulu sebelum minum obat nyeri rutin.</li>
          </ul>
          <p>Tuliskan obat yang diminum di kolom catatan (contoh: “parasetamol 500 mg jam 08.00”), sehingga dokter bisa menilai apakah obat masih cukup atau perlu penyesuaian.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Pesan dari Zihan Medical Center</h2>
          <p>
            Tujuan kami adalah membantu Bapak/Ibu tetap aman dan tetap aktif. Jurnal nyeri ini bukan untuk “menakuti”, tetapi supaya:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>keluhan Bapak/Ibu tidak diremehkan,</li>
            <li>terapi bisa lebih tepat,</li>
            <li>dan hari-hari lansia tetap bisa dinikmati dengan nyaman.</li>
          </ul>
          <p>
            Jika nyeri menetap lebih dari 2–4 minggu atau sudah mengganggu tidur dan aktivitas harian, silakan buat janji kontrol ke Zihan Medical Center atau hubungi kami melalui WhatsApp yang tersedia di halaman ini.
          </p>
        </section>
      </div>

      {/* CTA spacing for floating button */}
      <div className="h-10" aria-hidden />

      <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">Butuh bantuan?</p>
          <p className="text-base font-semibold text-slate-900">Hubungi Zihan Medical Center via WhatsApp</p>
        </div>
        <a
          href={ZMC_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-2xl shadow-md text-sm whitespace-nowrap"
        >
          <i className="fa-brands fa-whatsapp mr-2"></i>
          Chat Admin
        </a>
      </div>
    </div>
  );
};

export default PainDiary;
