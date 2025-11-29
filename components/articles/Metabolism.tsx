import React, { useState } from 'react';

const Metabolism: React.FC = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<string>('1.375');
  const [result, setResult] = useState<{ bmr: number; tdee: number; deficit: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'serat' | 'protein' | 'karbo'>('serat');

  const calculate = () => {
    let s = (gender === 'male') ? 5 : -161;
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + s;
    let tdee = bmr * parseFloat(activity);
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      deficit: Math.round(tdee - 500)
    });
  };

  return (
    <div className="space-y-12">
      {/* Intro Section */}
      <div className="bg-gradient-to-r from-red-50 to-white border-l-4 border-zmc-red p-8 rounded-r-xl shadow-sm">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Sehat Bukan Sekadar Angka Timbangan</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Banyak orang terjebak pada angka di timbangan saat mencoba menurunkan berat badan. Padahal, menurut <strong>Zihan Medical Center (ZMC)</strong>, kunci utama kesehatan adalah pemahaman medis mengenai metabolisme, nutrisi seimbang, dan pola hidup aktif, bukan sekadar menahan lapar.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Berikut adalah rangkuman strategi medis yang ditawarkan ZMC untuk mencapai berat badan ideal secara sehat.
        </p>
      </div>

      {/* Calculator Section (Memahami Matematika Tubuh) */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-calculator text-red-500"></i> Memahami Matematika Tubuh: Defisit Kalori
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Penurunan berat badan efektif bekerja pada prinsip <strong>Defisit Kalori</strong>.
          </p>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 mb-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <strong className="block text-slate-900 mb-1">BMR (Basal Metabolic Rate)</strong>
              Energi yang digunakan tubuh untuk fungsi dasar 24 jam seperti memompa jantung dan bernapas, bahkan saat tidur.
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <strong className="block text-slate-900 mb-1">TDEE (Total Daily Energy Expenditure)</strong>
              Total energi harian ditambah aktivitas fisik.
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h4 className="font-bold text-slate-800 mb-4">Kalkulator Kebutuhan Kalori</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none">
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Usia</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Berat (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Tinggi (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-xs font-bold text-slate-500 uppercase">Aktivitas</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none">
                <option value="1.2">Sedenter (Jarang Olahraga)</option>
                <option value="1.375">Ringan (1-3 hari/minggu)</option>
                <option value="1.55">Sedang (3-5 hari/minggu)</option>
                <option value="1.725">Berat (Fisik/Atlet)</option>
              </select>
            </div>

            <button onClick={calculate} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition mt-6 shadow-lg">
              Hitung Sekarang
            </button>

            {result && (
              <div className="bg-red-50 p-6 rounded-xl mt-6 animate-fade-in border border-red-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500 uppercase font-bold">BMR</p>
                    <p className="font-black text-2xl text-slate-800">{result.bmr}</p>
                    <p className="text-xs text-slate-400">kkal/hari</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-red-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl">Target</div>
                    <p className="text-xs text-red-600 font-bold uppercase">Defisit (-500)</p>
                    <p className="font-black text-2xl text-red-600">{result.deficit}</p>
                    <p className="text-xs text-red-400">kkal/hari</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-700 bg-white p-4 rounded-lg border border-red-100">
                  <strong className="text-red-700 block mb-1"><i className="fa-solid fa-triangle-exclamation"></i> Peringatan Medis ZMC:</strong>
                  Jangan pernah makan di bawah angka <strong>BMR ({result.bmr} kkal)</strong> dalam jangka panjang. Hal ini dapat menyebabkan kerontokan rambut, gangguan hormon, dan kelelahan kronis.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plate Section (Isi Piringku) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-2xl font-bold mb-2 text-center text-slate-900">Strategi "Isi Piringku"</h3>
        <p className="text-center text-slate-500 mb-8">Kenyang Tanpa Melar dengan Piring T</p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button onClick={() => setActiveTab('serat')} className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-sm ${activeTab === 'serat' ? 'bg-green-600 text-white transform scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            50% Sayuran
          </button>
          <button onClick={() => setActiveTab('protein')} className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-sm ${activeTab === 'protein' ? 'bg-orange-500 text-white transform scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            25% Lauk
          </button>
          <button onClick={() => setActiveTab('karbo')} className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-sm ${activeTab === 'karbo' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            25% Makanan Pokok
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto min-h-[180px]">
          {activeTab === 'serat' && (
            <div className="animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🥦</div>
              <h4 className="font-bold text-xl text-green-700 mb-2">Sayuran (Serat)</h4>
              <p className="text-slate-600">Volume besar namun rendah kalori. Serat dalam sayur (bayam, brokoli, timun) membantu memperlambat pengosongan lambung sehingga kenyang lebih lama.</p>
            </div>
          )}
          {activeTab === 'protein' && (
            <div className="animate-fade-in">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🍗</div>
              <h4 className="font-bold text-xl text-orange-600 mb-2">Lauk (Protein)</h4>
              <p className="text-slate-600">Zat pembangun otot yang memiliki <strong>Thermic Effect tertinggi</strong> (tubuh membakar kalori lebih banyak untuk mencernanya). Sumber: dada ayam, ikan, telur, tahu, tempe.</p>
            </div>
          )}
          {activeTab === 'karbo' && (
            <div className="animate-fade-in">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🍚</div>
              <h4 className="font-bold text-xl text-yellow-600 mb-2">Makanan Pokok (Karbohidrat)</h4>
              <p className="text-slate-600">Disarankan memilih karbohidrat kompleks seperti nasi merah, ubi jalar, atau jagung. Batasi nasi putih dan tepung-tepungan.</p>
            </div>
          )}
        </div>
      </div>

      {/* 7 Practical Steps */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">7 Langkah Praktis Mulai Hari Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: 'fa-glass-water', title: 'Minum Air Sebelum Makan', desc: 'Satu gelas besar (300-500ml) 20 menit sebelum makan mengurangi porsi otomatis.', color: 'text-blue-500' },
            { icon: 'fa-ban', title: 'Kurangi Minuman Manis', desc: 'Gula cair adalah penyumbang lemak perut tercepat.', color: 'text-red-500' },
            { icon: 'fa-arrow-down-1-9', title: 'Ubah Urutan Makan', desc: 'Makan sayur dan lauk dulu, baru nasi, untuk mencegah lonjakan gula darah.', color: 'text-green-500' },
            { icon: 'fa-stopwatch', title: 'Kunyah Pelan-Pelan', desc: 'Beri waktu 20 menit bagi otak untuk menyadari rasa kenyang.', color: 'text-purple-500' },
            { icon: 'fa-moon', title: 'Stop Makan Sebelum Tidur', desc: 'Makan terakhir sebaiknya 3 jam sebelum tidur.', color: 'text-indigo-500' },
            { icon: 'fa-bed', title: 'Tidur Cukup (7-8 Jam)', desc: 'Kurang tidur memicu hormon lapar dan keinginan ngemil.', color: 'text-slate-700' },
            { icon: 'fa-face-smile', title: 'Kelola Stres', desc: 'Stres memicu hormon Kortisol yang menyebabkan penimbunan lemak di perut.', color: 'text-yellow-500' },
          ].map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className={`text-2xl mb-3 ${item.color}`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Doctor */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <i className="fa-solid fa-user-doctor text-[200px] absolute -left-10 -top-10"></i>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Kapan Harus ke Dokter?</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Jika Anda sudah menjaga pola makan namun berat badan tidak kunjung turun, Zihan Medical Center menyarankan untuk tidak menduga-duga. Masalah medis seperti <strong>Gangguan Tiroid, PCOS, atau Resistensi Insulin</strong> bisa menjadi penyebabnya.
          </p>
          <a href="https://api.whatsapp.com/send/?phone=%2B6282217180432&type=phone_number&app_absent=0&wame_ctl=1" target="_blank" rel="noreferrer" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition shadow-lg">
            Konsultasi & Cek Lab di ZMC
          </a>
        </div>
      </div>
    </div>
  );
};

export default Metabolism;