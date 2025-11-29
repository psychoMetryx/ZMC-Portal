import React from 'react';

const Vertigo: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Definition */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-red-500 pl-3">Dunia Berputar?</h3>
        <p className="text-slate-600 mb-4">
          Vertigo bukan sekadar sakit kepala. Ini adalah sensasi <strong>objek sekeliling berputar</strong> (seperti naik komedi putar), sering disertai mual muntah hebat. Biasanya akibat gangguan keseimbangan di telinga dalam (BPPV).
        </p>
        <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-200">
          <strong>Beda dengan Kliyengan:</strong> Kliyengan adalah sensasi mau pingsan/gelap (biasanya karena tensi rendah atau kurang darah), bukan berputar.
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6">
        <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i> TANDA BAHAYA (Stroke?)
        </h3>
        <p className="text-sm text-red-700 mb-4">Segera ke IGD ZMC jika vertigo muncul mendadak disertai:</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-red-800 font-bold">
          <div className="bg-white/60 p-3 rounded">🗣️ Bicara Pelo</div>
          <div className="bg-white/60 p-3 rounded">🥴 Wajah Miring</div>
          <div className="bg-white/60 p-3 rounded">💪 Lemah Separuh Badan</div>
          <div className="bg-white/60 p-3 rounded">👀 Pandangan Ganda</div>
        </div>
      </div>

      {/* Therapy */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-xl mb-4 text-center">Terapi Mandiri (Brandt-Daroff)</h3>
        <p className="text-sm text-slate-400 text-center mb-6">Lakukan 3x sehari selama 2 minggu untuk melatih otak beradaptasi.</p>
        
        <div className="space-y-6 relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-700"></div>

          <div className="relative pl-14">
            <div className="absolute left-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold border-4 border-slate-900">1</div>
            <strong className="block text-lg">Duduk Tegak</strong>
            <p className="text-sm text-slate-300">Duduk di tepi kasur, kaki menggantung. Diam sejenak.</p>
          </div>

          <div className="relative pl-14">
            <div className="absolute left-0 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold border-4 border-slate-900">2</div>
            <strong className="block text-lg">Jatuh ke Kiri</strong>
            <p className="text-sm text-slate-300">Jatuhkan badan cepat ke kiri, kepala menengadah 45°. Tahan 30 detik.</p>
          </div>

          <div className="relative pl-14">
            <div className="absolute left-0 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold border-4 border-slate-900">3</div>
            <strong className="block text-lg">Duduk Kembali</strong>
            <p className="text-sm text-slate-300">Duduk tegak lagi. Tunggu pusing hilang (30 detik).</p>
          </div>

          <div className="relative pl-14">
            <div className="absolute left-0 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold border-4 border-slate-900">4</div>
            <strong className="block text-lg">Jatuh ke Kanan</strong>
            <p className="text-sm text-slate-300">Ulangi gerakan ke sisi kanan. Tahan 30 detik.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-600">
        <strong>Pencegahan:</strong> Tidur dengan bantal tinggi, hindari gerakan kepala mendadak, kurangi garam (untuk Meniere).
      </div>
    </div>
  );
};

export default Vertigo;