import React, { useState } from 'react';

const Typhoid: React.FC = () => {
  const [activeMyth, setActiveMyth] = useState<number | null>(null);

  const myths = [
    { q: "Tipes karena kerja capek?", a: "MITOS. Tipes karena BAKTERI Salmonella typhi dari makanan/air kotor. Capek hanya menurunkan imun." },
    { q: "Sudah kena tipes, berarti kebal?", a: "MITOS. Bisa kena lagi jika makan sembarangan (re-infeksi)." },
    { q: "Obat cacing tanah paling ampuh?", a: "BELUM TERBUKTI MEDIS. Standar emas adalah Antibiotik dokter untuk membunuh bakteri." }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg">
        <h3 className="font-bold text-xl mb-2">Apa itu Tipes?</h3>
        <p className="text-sm opacity-90">Infeksi bakteri <em>Salmonella typhi</em> yang menyerang usus dan menyebar ke darah. Menular lewat makanan/minuman tercemar.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-2xl block mb-2">🌡️</span>
          <strong className="text-slate-800 text-sm">Demam Tangga</strong>
          <p className="text-xs text-slate-500 mt-1">Suhu naik bertahap, tinggi di sore/malam.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-2xl block mb-2">🤢</span>
          <strong className="text-slate-800 text-sm">Pencernaan</strong>
          <p className="text-xs text-slate-500 mt-1">Diare (anak) atau Sembelit (dewasa), mual.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-2xl block mb-2">🤕</span>
          <strong className="text-slate-800 text-sm">Nyeri Kepala</strong>
          <p className="text-xs text-slate-500 mt-1">Sakit kepala hebat di depan (frontal).</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-2xl block mb-2">👅</span>
          <strong className="text-slate-800 text-sm">Lidah Tifoid</strong>
          <p className="text-xs text-slate-500 mt-1">Tengah putih kotor, pinggir merah.</p>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-800 mb-4">Mitos vs Fakta</h3>
        <div className="space-y-3">
          {myths.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveMyth(activeMyth === idx ? null : idx)}
                className="w-full text-left p-4 font-bold text-slate-700 flex justify-between items-center"
              >
                {item.q}
                <i className={`fa-solid fa-chevron-down transition ${activeMyth === idx ? 'rotate-180' : ''}`}></i>
              </button>
              {activeMyth === idx && (
                <div className="p-4 bg-yellow-50 text-sm text-slate-700 border-t border-yellow-100 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-100 p-4 rounded-xl text-center text-sm text-slate-600">
        <strong>Pencegahan:</strong> Cuci tangan pakai sabun, makan makanan matang & panas, Vaksinasi Tifoid.
      </div>
    </div>
  );
};

export default Typhoid;