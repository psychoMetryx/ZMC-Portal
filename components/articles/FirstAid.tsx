import React, { useState } from 'react';

const FirstAid: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8">
      {/* Interactive Steps */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Steps */}
        <div className="bg-slate-900 text-white p-6 md:w-1/3 flex flex-col gap-2">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Langkah Penanganan</h3>
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => setStep(num)}
              className={`text-left p-3 rounded-lg font-bold flex items-center gap-3 transition ${step === num ? 'bg-red-600' : 'hover:bg-slate-800'}`}
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">{num}</span>
              {num === 1 ? 'Cuci Tangan' : num === 2 ? 'Stop Darah' : num === 3 ? 'Bersihkan' : 'Tutup Luka'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 md:w-2/3 bg-white flex items-center">
          {step === 1 && (
            <div className="animate-fade-in w-full">
              <i className="fa-solid fa-hands-bubbles text-5xl text-blue-500 mb-4"></i>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Cuci Tangan Dulu</h3>
              <p className="text-slate-600">Sebelum menyentuh luka, pastikan tangan penolong steril untuk mencegah infeksi bakteri masuk.</p>
            </div>
          )}
          {step === 2 && (
            <div className="animate-fade-in w-full">
              <i className="fa-solid fa-hand-holding-medical text-5xl text-red-600 mb-4"></i>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Hentikan Pendarahan</h3>
              <p className="text-slate-600">Tekan luka dengan kain bersih atau kassa steril. Tahan tekanan selama beberapa menit. Jangan sering dibuka.</p>
            </div>
          )}
          {step === 3 && (
            <div className="animate-fade-in w-full">
              <i className="fa-solid fa-faucet-drip text-5xl text-teal-500 mb-4"></i>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Bersihkan Luka</h3>
              <p className="text-slate-600">Bilas dengan air mengalir atau cairan infus (NaCl). Bersihkan kotoran di sekitar luka. <strong>Jangan pakai alkohol</strong> di luka terbuka karena perih dan merusak jaringan.</p>
            </div>
          )}
          {step === 4 && (
            <div className="animate-fade-in w-full">
              <i className="fa-solid fa-bandage text-5xl text-yellow-500 mb-4"></i>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Tutup Luka</h3>
              <p className="text-slate-600">Gunakan plester atau kassa steril. Ganti perban minimal sehari sekali atau jika basah.</p>
            </div>
          )}
        </div>
      </div>

      {/* Infection Signs */}
      <div>
        <h3 className="font-bold text-lg text-slate-800 mb-4 text-center">Waspada Tanda Infeksi</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100">
            <span className="text-2xl block mb-2">🔴</span>
            <strong className="text-sm">Bengkak Merah</strong>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
            <span className="text-2xl block mb-2">💧</span>
            <strong className="text-sm">Bernanah</strong>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
            <span className="text-2xl block mb-2">🔥</span>
            <strong className="text-sm">Terasa Panas</strong>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
            <span className="text-2xl block mb-2">🌡️</span>
            <strong className="text-sm">Demam</strong>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Cek Pemahaman</h3>
        <div className="space-y-4">
          <details className="bg-white p-3 rounded-lg shadow-sm">
            <summary className="font-bold cursor-pointer text-sm">Luka bakar diolesi odol?</summary>
            <p className="text-sm mt-2 text-red-600 font-bold">❌ MITOS. Odol menahan panas. Cukup aliri air biasa 15 menit.</p>
          </details>
          <details className="bg-white p-3 rounded-lg shadow-sm">
            <summary className="font-bold cursor-pointer text-sm">Luka terbuka dibiarkan kering?</summary>
            <p className="text-sm mt-2 text-red-600 font-bold">❌ MITOS. Luka sembuh lebih cepat dalam kondisi lembap tertutup.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FirstAid;