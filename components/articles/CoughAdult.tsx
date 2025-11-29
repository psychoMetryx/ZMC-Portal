import React, { useState } from 'react';

const CoughAdult: React.FC = () => {
  const [quizResult, setQuizResult] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="space-y-8">
      {/* Red Flags */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6">
        <h3 className="font-bold text-red-800 flex items-center gap-2 mb-4">
          <i className="fa-solid fa-triangle-exclamation"></i> RED FLAGS (Segera ke Dokter)
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-red-700">
            <i className="fa-solid fa-droplet"></i> Batuk Darah
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <i className="fa-solid fa-lungs"></i> Sesak Napas Berat
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <i className="fa-solid fa-temperature-full"></i> Demam &gt; 39°C
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <i className="fa-solid fa-calendar-xmark"></i> Batuk &gt; 2 Minggu
          </div>
        </div>
      </div>

      {/* Causes Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Kenali Penyebabnya</h3>
        <div className="space-y-4">
          <details className="group border-b pb-2">
            <summary className="font-bold text-slate-700 cursor-pointer flex justify-between">
              Virus (Flu)
              <span className="text-slate-400 group-open:rotate-180 transition"><i className="fa-solid fa-chevron-down"></i></span>
            </summary>
            <p className="text-sm text-slate-600 mt-2">Penyebab 80-90%. Gejala: Meler, bersin, demam ringan. Sembuh sendiri dalam 5-7 hari. <strong>Tidak butuh antibiotik.</strong></p>
          </details>
          <details className="group border-b pb-2">
            <summary className="font-bold text-slate-700 cursor-pointer flex justify-between">
              Bakteri (Pneumonia)
              <span className="text-slate-400 group-open:rotate-180 transition"><i className="fa-solid fa-chevron-down"></i></span>
            </summary>
            <p className="text-sm text-slate-600 mt-2">Dahak hijau pekat, sesak napas, demam tinggi >3 hari. Butuh antibiotik resep dokter.</p>
          </details>
          <details className="group border-b pb-2">
            <summary className="font-bold text-slate-700 cursor-pointer flex justify-between">
              TBC (Kronis)
              <span className="text-slate-400 group-open:rotate-180 transition"><i className="fa-solid fa-chevron-down"></i></span>
            </summary>
            <p className="text-sm text-slate-600 mt-2">Batuk >2 minggu, keringat malam, BB turun. Wajib cek dahak.</p>
          </details>
          <details className="group">
            <summary className="font-bold text-slate-700 cursor-pointer flex justify-between">
              Asam Lambung (GERD)
              <span className="text-slate-400 group-open:rotate-180 transition"><i className="fa-solid fa-chevron-down"></i></span>
            </summary>
            <p className="text-sm text-slate-600 mt-2">Batuk kering terutama saat berbaring/tidur, mulut pahit.</p>
          </details>
        </div>
      </div>

      {/* Antibiotic Checker */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center shadow-lg">
        <h3 className="font-bold text-xl mb-2">💊 Kuis Antibiotik</h3>
        <p className="text-slate-300 text-sm mb-6">"Saya batuk pilek 2 hari, tenggorokan sakit, napas lega. Butuh <strong>Amoxicillin</strong>?"</p>
        
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => setQuizResult('yes')} className="px-6 py-2 border-2 border-white rounded-full font-bold hover:bg-white hover:text-slate-900 transition">YA</button>
          <button onClick={() => setQuizResult('no')} className="px-6 py-2 border-2 border-white rounded-full font-bold hover:bg-white hover:text-slate-900 transition">TIDAK</button>
        </div>

        {quizResult === 'yes' && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-xl text-left animate-fade-in">
            <strong className="text-red-400 block mb-1">❌ Kurang Tepat</strong>
            <p className="text-sm text-slate-200">Batuk pilek &lt; 3 hari biasanya <strong>Virus</strong>. Antibiotik hanya membunuh Bakteri. Minum sembarangan bikin kuman kebal!</p>
          </div>
        )}
        {quizResult === 'no' && (
          <div className="bg-green-500/20 border border-green-500 p-4 rounded-xl text-left animate-fade-in">
            <strong className="text-green-400 block mb-1">✅ Benar!</strong>
            <p className="text-sm text-slate-200">Virus sembuh sendiri dengan istirahat. Fokus pada obat pereda gejala (Parasetamol/Obat Batuk).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoughAdult;