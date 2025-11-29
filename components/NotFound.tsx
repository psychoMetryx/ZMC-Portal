import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-white mx-4 my-10 rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
      <div className="w-16 h-16 rounded-full bg-red-50 text-zmc-red flex items-center justify-center text-2xl mb-4">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">Halaman tidak ditemukan</h2>
      <p className="text-slate-600 max-w-xl mb-8">
        {message || 'Maaf, konten yang Anda cari tidak tersedia atau telah dipindahkan.'}
      </p>
      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-bold hover:border-zmc-red hover:text-zmc-red transition"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Kembali
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-full bg-zmc-red text-white font-bold shadow-md hover:bg-red-700 transition"
        >
          <i className="fa-solid fa-house mr-2"></i>
          Ke Beranda
        </button>
      </div>
    </div>
  );
};

export default NotFound;
