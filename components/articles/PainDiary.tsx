import React, { useState, useEffect } from 'react';

interface Log {
  id: number;
  date: string;
  pain: number;
  note: string;
}

const PainDiary: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [painLevel, setPainLevel] = useState(5);
  const [note, setNote] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('zmc_pain_diary');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  const saveLog = () => {
    const newLog: Log = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' }),
      pain: painLevel,
      note: note || 'Tidak ada catatan'
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('zmc_pain_diary', JSON.stringify(updated));
    setNote('');
  };

  const clearLogs = () => {
    if(confirm('Hapus semua riwayat?')) {
      setLogs([]);
      localStorage.removeItem('zmc_pain_diary');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
        <h2 className="text-2xl font-bold text-orange-800 mb-2">Jurnal Nyeri Lansia</h2>
        <p className="text-slate-700">Catat kondisi nyeri harian Bapak/Ibu untuk dilaporkan saat kontrol ke dokter ZMC.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <div className="mb-6">
          <label className="block font-bold text-slate-700 mb-2">Skala Nyeri Hari Ini (0 - 10)</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" max="10" 
              value={painLevel} 
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className={`text-2xl font-bold ${painLevel > 7 ? 'text-red-600' : painLevel > 4 ? 'text-orange-500' : 'text-green-600'}`}>
              {painLevel}
            </span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Tidak Sakit</span>
            <span>Sangat Sakit</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold text-slate-700 mb-2">Catatan (Lokasi / Obat)</label>
          <input 
            type="text" 
            placeholder="Cth: Nyeri lutut kiri setelah jalan pagi"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button onClick={saveLog} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition">
          Simpan Catatan
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Riwayat Catatan</h3>
          {logs.length > 0 && <button onClick={clearLogs} className="text-xs text-red-500 hover:underline">Hapus Semua</button>}
        </div>
        {logs.length === 0 ? (
          <p className="text-center text-slate-400 py-4 italic">Belum ada catatan.</p>
        ) : (
          logs.map(log => (
            <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">{log.date}</p>
                <p className="text-slate-700">{log.note}</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${log.pain > 7 ? 'bg-red-500' : log.pain > 4 ? 'bg-orange-500' : 'bg-green-500'}`}>
                {log.pain}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PainDiary;