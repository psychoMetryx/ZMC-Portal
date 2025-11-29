import React, { useState } from 'react';

const Smoking: React.FC = () => {
  const [price, setPrice] = useState<number>(35000);
  const [packs, setPacks] = useState<number>(1);
  const [years, setYears] = useState<number>(5);

  const daily = price * packs;
  const monthly = daily * 30;
  const yearly = daily * 365;
  const totalLost = yearly * years;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="bg-gradient-to-r from-red-50 to-white border-l-4 border-zmc-red p-8 rounded-r-xl shadow-sm">
        <h2 className="text-3xl font-bold text-zmc-red mb-3">Kembalikan Napas Lega</h2>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Strategi Medis Berhenti Merokok Bersama Zihan Medical Center</h3>
        <p className="text-slate-700 leading-relaxed">
          Berhenti merokok seringkali dianggap hanya soal "niat", padahal secara medis, ini adalah proses pemulihan kesehatan yang membutuhkan strategi terukur. 
          Zihan Medical Center (ZMC) menghadirkan layanan komprehensif untuk membantu masyarakat lepas dari jeratan rokok dan mendapatkan kembali kesehatan paru-paru mereka.
        </p>
      </div>

      {/* Timeline Pemulihan */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Apa yang Terjadi Saat Anda Berhenti?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">⏱️</div>
            <strong className="block text-lg text-slate-800 mb-2">20 Menit</strong>
            <p className="text-sm text-slate-600">Detak jantung dan tekanan darah mulai turun kembali ke angka normal.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">🫁</div>
            <strong className="block text-lg text-slate-800 mb-2">12 Jam</strong>
            <p className="text-sm text-slate-600">Kadar karbon monoksida (racun asap) di dalam darah kembali normal.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">🏃‍♂️</div>
            <strong className="block text-lg text-slate-800 mb-2">2 Minggu</strong>
            <p className="text-sm text-slate-600">Sirkulasi darah membaik dan fungsi paru-paru mulai meningkat.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">❤️</div>
            <strong className="block text-lg text-slate-800 mb-2">1 Tahun</strong>
            <p className="text-sm text-slate-600">Risiko terkena penyakit jantung koroner turun hingga 50% dibandingkan perokok aktif.</p>
          </div>
        </div>
      </div>

      {/* Metode 5A */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Pendekatan Medis: Metode 5A</h3>
        <p className="text-slate-600 mb-6">Zihan Medical Center menggunakan protokol standar medis untuk mendampingi pasien:</p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <strong className="block text-lg text-slate-900">Ask (Tanyakan)</strong>
              <p className="text-slate-600">Tahap identifikasi status perokok, jumlah konsumsi harian, dan riwayat merokok.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <strong className="block text-lg text-slate-900">Advise (Nasihati)</strong>
              <p className="text-slate-600">Dokter memberikan saran medis yang kuat dan personal, menghubungkan keluhan kesehatan pasien saat ini (seperti batuk atau sesak) dengan kebiasaan merokok.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <strong className="block text-lg text-slate-900">Assess (Nilai)</strong>
              <p className="text-slate-600">Menilai tingkat motivasi dan ketergantungan. Apakah pasien siap berhenti dalam 30 hari ke depan? Jika belum, akan dilakukan pendekatan motivasional.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
            <div>
              <strong className="block text-lg text-slate-900">Assist (Bantu)</strong>
              <p className="text-slate-600">Menyusun rencana aksi konkret, seperti menetapkan "Tanggal Berhenti" (Quit Date), mengidentifikasi pemicu stres, hingga pemberian terapi obat jika diperlukan.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
            <div>
              <strong className="block text-lg text-slate-900">Arrange (Atur Jadwal)</strong>
              <p className="text-slate-600">Mengatur jadwal kontrol (follow-up), terutama di minggu pertama yang krusial untuk mencegah relapse (kambuh) akibat gejala putus nikotin.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opsi Terapi */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <i className="fa-solid fa-user-doctor text-3xl text-blue-600 mb-4"></i>
          <h4 className="font-bold text-lg text-slate-900 mb-2">Konsultasi Medis</h4>
          <p className="text-sm text-slate-700">Pemeriksaan awal dampak rokok terhadap tensi, jantung, dan paru di Poli Umum ZMC.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <i className="fa-solid fa-pills text-3xl text-green-600 mb-4"></i>
          <h4 className="font-bold text-lg text-slate-900 mb-2">Terapi Farmakologi</h4>
          <p className="text-sm text-slate-700">Penggunaan obat-obatan atau NRT yang tersedia di farmasi ZMC, dengan resep dan pengawasan dokter.</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
          <i className="fa-solid fa-headset text-3xl text-purple-600 mb-4"></i>
          <h4 className="font-bold text-lg text-slate-900 mb-2">Dukungan Eksternal</h4>
          <p className="text-sm text-slate-700">Akses ke Quitline Kemenkes (0-800-177-6565) untuk layanan konseling via telepon.</p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-fire text-orange-500"></i> Motivasi Finansial: Bakar Rokok = Bakar Uang
          </h3>
          <p className="text-slate-400 text-sm">Rokok bukan hanya membakar paru-paru, tapi juga membakar aset masa depan.</p>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Harga Rokok per Bungkus</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Bungkus per Hari</label>
              <input 
                type="number" 
                value={packs} 
                onChange={(e) => setPacks(Number(e.target.value))}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Lama Merokok (Tahun)</label>
              <input 
                type="number" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-xl flex flex-col justify-center space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Total Uang Terbakar</p>
              <p className="text-2xl md:text-3xl font-black text-zmc-red">{formatRupiah(totalLost)}</p>
            </div>
            <div className="border-t border-red-200 pt-4">
              <p className="text-xs text-slate-500 uppercase font-bold">Potensi Tabungan 10 Tahun</p>
              <p className="text-xl font-bold text-slate-800">{formatRupiah(yearly * 10)}</p>
              <p className="text-xs text-slate-600 mt-1 italic">Cukup untuk membeli kendaraan atau uang muka rumah.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smoking;
