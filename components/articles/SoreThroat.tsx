import React, { useState } from 'react';

const SoreThroat: React.FC = () => {
  const [activeTab, setActiveTab] = useState('virus');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-4">
          <h3 className="font-bold text-slate-800">Deteksi Penyebabnya</h3>
        </div>
        
        <div className="flex border-b border-slate-100">
          <button onClick={() => setActiveTab('virus')} className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'virus' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Virus (Flu)</button>
          <button onClick={() => setActiveTab('bakteri')} className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'bakteri' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500'}`}>Bakteri</button>
          <button onClick={() => setActiveTab('iritasi')} className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'iritasi' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-500'}`}>Iritasi</button>
        </div>

        <div className="p-6">
          {activeTab === 'virus' && (
            <div className="animate-fade-in">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">80-90% Kasus</span>
              <p className="text-slate-600 mb-4">Biasanya disertai pilek, batuk kering, dan meriang. Sembuh sendiri 5-7 hari.</p>
              <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                <strong>Solusi:</strong> Istirahat, minum hangat. Tidak perlu antibiotik.
              </div>
            </div>
          )}
          {activeTab === 'bakteri' && (
            <div className="animate-fade-in">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">Butuh Dokter</span>
              <p className="text-slate-600 mb-4">Ciri khas: Demam tinggi mendadak, amandel bengkak/ada bercak putih (nanah), <strong>tanpa batuk</strong>.</p>
              <div className="bg-red-50 p-4 rounded-lg text-red-800 text-sm">
                <strong>Solusi:</strong> Segera ke ZMC. Mungkin butuh antibiotik.
              </div>
            </div>
          )}
          {activeTab === 'iritasi' && (
            <div className="animate-fade-in">
              <p className="text-slate-600 mb-4">Akibat polusi, rokok, makanan pedas, atau gorengan berminyak.</p>
              <div className="bg-orange-50 p-4 rounded-lg text-orange-800 text-sm">
                <strong>Solusi:</strong> Hindari pemicu, banyak minum air putih.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-800">Pertolongan Pertama</h3>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">🧂</div>
            <div>
              <strong className="block text-slate-800">Kumur Air Garam</strong>
              <p className="text-xs text-slate-500">1/2 sdt garam + air hangat. Kumur di pangkal tenggorokan.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">💧</div>
            <div>
              <strong className="block text-slate-800">Hidrasi Ekstra</strong>
              <p className="text-xs text-slate-500">Air hangat atau kuah sup membantu melegakan mukosa.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">🤫</div>
            <div>
              <strong className="block text-slate-800">Istirahat Suara</strong>
              <p className="text-xs text-slate-500">Jangan berbisik! Bicara normal seperlunya atau diam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoreThroat;