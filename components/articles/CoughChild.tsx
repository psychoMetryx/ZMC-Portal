import React, { useState } from 'react';

const CoughChild: React.FC = () => {
  const [activeTab, setActiveTab] = useState('selesma');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Triage Banner */}
      <div className="bg-white border-l-4 border-red-600 p-4 rounded-r-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-red-700 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i> CEK TANDA BAHAYA
          </h3>
          <p className="text-sm text-slate-600">Apakah anak bernapas sangat cepat atau dada cekung ke dalam?</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-red-700 transition animate-pulse"
        >
          Cek Napas Sekarang
        </button>
      </div>

      {/* Diagnosis Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-slate-100 p-2 gap-2">
          {['selesma', 'pneumonia', 'tbc', 'asma'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${
                activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'selesma' && (
            <div className="animate-fade-in">
              <h4 className="font-bold text-lg mb-2">🤧 Selesma (Common Cold)</h4>
              <p className="text-slate-600 text-sm mb-4">Infeksi virus ringan. Paling umum dan sembuh sendiri.</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-blue-500">💧</span> Ingus bening lalu kental.</li>
                <li className="flex gap-2"><span className="text-orange-500">🤒</span> Demam ringan (&lt; 3 hari).</li>
                <li className="flex gap-2"><span className="text-green-500">🧸</span> Anak tetap aktif main & mau makan.</li>
              </ul>
            </div>
          )}
          {activeTab === 'pneumonia' && (
            <div className="animate-fade-in">
              <h4 className="font-bold text-lg mb-2 text-red-600">🫁 Pneumonia (Radang Paru)</h4>
              <p className="text-slate-600 text-sm mb-4"><strong>SERIUS.</strong> Infeksi paru yang butuh antibiotik dokter.</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-red-500">⚠️</span> <strong>Napas Cepat.</strong></li>
                <li className="flex gap-2"><span className="text-red-500">⚠️</span> <strong>Retraksi:</strong> Dada cekung ke dalam saat napas.</li>
                <li className="flex gap-2"><span className="text-red-500">⚠️</span> Demam tinggi & lemas.</li>
              </ul>
            </div>
          )}
          {activeTab === 'tbc' && (
            <div className="animate-fade-in">
              <h4 className="font-bold text-lg mb-2">🦠 TBC / Flek</h4>
              <p className="text-slate-600 text-sm mb-4">Infeksi bakteri kronis. Sering tertular dewasa serumah.</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span>🗓️</span> Batuk &gt; 2 minggu.</li>
                <li className="flex gap-2"><span>📉</span> Berat badan turun / tidak naik.</li>
                <li className="flex gap-2"><span>🌡️</span> Demam sumer (tidak tinggi) lama.</li>
              </ul>
            </div>
          )}
          {activeTab === 'asma' && (
            <div className="animate-fade-in">
              <h4 className="font-bold text-lg mb-2">🌬️ Asma</h4>
              <p className="text-slate-600 text-sm mb-4">Penyempitan saluran napas karena bakat alergi.</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span>🔊</span> Mengi (bunyi "ngik").</li>
                <li className="flex gap-2"><span>🌙</span> Batuk malam/dini hari.</li>
                <li className="flex gap-2"><span>🏃</span> Pemicu: Lari, tertawa, dingin.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in-up">
            <h3 className="font-bold text-xl text-red-600 mb-4">🚑 Cek Napas (1 Menit)</h3>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 text-sm">
              <p className="font-bold mb-2">Batas Aman (Maksimal):</p>
              <ul className="space-y-1 text-slate-700">
                <li>👶 &lt; 2 bln: <strong>60x</strong>/menit</li>
                <li>👶 2-12 bln: <strong>50x</strong>/menit</li>
                <li>🧒 1-5 thn: <strong>40x</strong>/menit</li>
              </ul>
            </div>
            <p className="font-bold text-slate-800 mb-6">Apakah napas LEBIH CEPAT dari angka di atas?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => { alert('BAHAYA: Curiga Pneumonia. Segera ke IGD ZMC!'); setShowModal(false); }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700"
              >
                YA
              </button>
              <button 
                onClick={() => { alert('Bagus. Pantau terus di rumah.'); setShowModal(false); }}
                className="flex-1 bg-slate-200 text-slate-800 py-2 rounded-lg font-bold hover:bg-slate-300"
              >
                TIDAK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoughChild;