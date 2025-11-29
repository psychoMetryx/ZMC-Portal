import React, { useState } from 'react';
import { FoodItem } from '../../types';

const FOOD_DB: FoodItem[] = [
  { name: "Jeroan (Hati, Usus)", status: "hindari", desc: "Sangat tinggi purin." },
  { name: "Daging Merah", status: "hindari", desc: "Picu asam urat tinggi." },
  { name: "Seafood (Udang, Cumi)", status: "hindari", desc: "Tinggi kolesterol & purin." },
  { name: "Emping Melinjo", status: "hindari", desc: "Musuh utama penderita asam urat." },
  { name: "Bayam & Kangkung", status: "batasi", desc: "Aman 1-2x seminggu saat tidak kumat." },
  { name: "Tahu & Tempe", status: "batasi", desc: "Aman dalam porsi wajar." },
  { name: "Labu Siam", status: "aman", desc: "Rendah purin, sangat disarankan." },
  { name: "Wortel", status: "aman", desc: "Kaya vitamin, aman dikonsumsi." },
  { name: "Pisang & Jeruk", status: "aman", desc: "Vitamin C bantu buang purin." },
  { name: "Nasi Merah", status: "aman", desc: "Karbohidrat kompleks yang baik." }
];

const Gout: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredFoods = FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const getBadgeColor = (status: string) => {
    switch(status) {
      case 'aman': return 'bg-green-100 text-green-800 border-green-200';
      case 'batasi': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hindari': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Diet Rendah Purin</h2>
        <p className="text-slate-700">Kunci mengontrol asam urat adalah disiplin makanan. Gunakan alat di bawah ini untuk mengecek keamanan makanan.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="Cari makanan (misal: Bayam)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <i className="fa-solid fa-search absolute left-4 top-4 text-slate-400"></i>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFoods.length > 0 ? filteredFoods.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center ${getBadgeColor(item.status)} bg-opacity-30`}>
              <div>
                <strong className="block text-lg">{item.name}</strong>
                <p className="text-xs opacity-90">{item.desc}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-white bg-opacity-50`}>
                {item.status}
              </span>
            </div>
          )) : (
            <p className="text-center text-slate-500 col-span-2">Makanan tidak ditemukan di database sederhana kami.</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
          <div className="text-3xl mb-2">💧</div>
          <h4 className="font-bold text-slate-800">Minum Air</h4>
          <p className="text-xs text-slate-500">Minimal 2-3 Liter sehari untuk membilas kristal purin lewat urin.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
          <div className="text-3xl mb-2">⚖️</div>
          <h4 className="font-bold text-slate-800">Berat Badan</h4>
          <p className="text-xs text-slate-500">Jaga BB ideal. Obesitas meningkatkan produksi asam urat.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
          <div className="text-3xl mb-2">💊</div>
          <h4 className="font-bold text-slate-800">Obat Dokter</h4>
          <p className="text-xs text-slate-500">Jangan stop Allopurinol sembarangan. Konsultasi ke ZMC.</p>
        </div>
      </div>
    </div>
  );
};

export default Gout;