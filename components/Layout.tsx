
import React, { useState } from 'react';
import { ZMC_INFO } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onGoHome: () => void;
  isHome: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onGoHome, isHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-red-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            onClick={onGoHome} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img src={ZMC_INFO.logoUrl} alt="Logo ZMC" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
            <div className="leading-tight">
              <h1 className="font-bold text-lg md:text-xl text-slate-900 tracking-tight group-hover:text-zmc-red transition-colors">
                Zihan Medical Center
              </h1>
              <span className="text-[10px] md:text-xs text-red-600 font-bold uppercase tracking-wide">
                Portal Edukasi Pasien
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 font-medium text-slate-600 text-sm">
            {!isHome && (
              <button onClick={onGoHome} className="hover:text-zmc-red transition flex items-center gap-2">
                <i className="fa-solid fa-arrow-left"></i> Kembali ke Menu
              </button>
            )}
            <a href={ZMC_INFO.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-zmc-red transition">Lokasi</a>
            <a href={ZMC_INFO.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-zmc-red transition">Instagram</a>
            <a 
              href={ZMC_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="bg-zmc-red hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold transition shadow-lg hover:shadow-red-200 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> Chat Dokter
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-2xl text-slate-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl fade-in-down">
            <div className="flex flex-col p-4 space-y-4 font-medium text-slate-700">
              {!isHome && (
                <button onClick={() => { onGoHome(); setMobileMenuOpen(false); }} className="text-left flex items-center gap-2 text-zmc-red font-bold">
                  <i className="fa-solid fa-home"></i> Beranda
                </button>
              )}
              <a href={ZMC_INFO.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <i className="fa-solid fa-map-location-dot"></i> Peta Lokasi
              </a>
              <a href={ZMC_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-600 font-bold">
                <i className="fa-brands fa-whatsapp"></i> Chat Dokter
              </a>
              <a href={`tel:${ZMC_INFO.emergencyPhone.replace(/[() -]/g, '')}`} className="flex items-center gap-2 text-red-600 font-bold">
                <i className="fa-solid fa-phone"></i> Gawat Darurat
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Branding */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={ZMC_INFO.logoUrl} alt="ZMC Logo" className="h-10 w-10 rounded-full" />
                <span className="font-bold text-white text-lg">Zihan Medical Center</span>
              </div>
              <p className="text-zmc-red font-bold italic mb-4">{ZMC_INFO.tagline}</p>
              <p className="leading-relaxed">
                Fasilitas Lengkap: Poli Umum, Rawat Inap, Laboratorium, dan Farmasi.
                Melayani dengan hati untuk keluarga Garut.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 border-l-4 border-zmc-red pl-3">Kontak & Lokasi</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-map-location-dot text-zmc-red mt-1"></i>
                  <span>{ZMC_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-green-500"></i>
                  <span>{ZMC_INFO.phone} / {ZMC_INFO.phone2}</span>
                </li>
                <li className="flex items-center gap-3 font-bold text-red-400">
                  <i className="fa-solid fa-ambulance"></i>
                  <span>Darurat: {ZMC_INFO.emergencyPhone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-clock text-zmc-red"></i>
                  <span>{ZMC_INFO.hours}</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 border-l-4 border-zmc-red pl-3">Akses Cepat</h4>
              <div className="flex flex-col gap-3">
                <a href={ZMC_INFO.mapsUrl} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                  <i className="fa-solid fa-diamond-turn-right"></i> Petunjuk Arah Google Maps
                </a>
                <a href={ZMC_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition font-bold">
                  <i className="fa-brands fa-whatsapp text-xl"></i> Chat WhatsApp
                </a>
                <a href={ZMC_INFO.instagramUrl} target="_blank" rel="noreferrer" className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition font-bold">
                  <i className="fa-brands fa-instagram text-xl"></i> Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs">
            &copy; {new Date().getFullYear()} Klinik Pratama Zihan Medical Center. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating WA */}
      <a 
        href={ZMC_INFO.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition hover:scale-110 animate-bounce group"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
        <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Chat Admin
        </span>
      </a>
    </div>
  );
};

export default Layout;
