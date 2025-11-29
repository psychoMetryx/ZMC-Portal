
import React, { useMemo, useState } from 'react';
import { ARTICLES } from '../services/articleRegistry';
import ArticleCard from '../components/ArticleCard';
import { Category } from '../types';
import { ZMC_INFO } from '../constants';

const CATEGORY_STORAGE_KEY = 'zmc-home-active-category';

const Home: React.FC = () => {
  const categories = useMemo(() => ['Semua', ...Object.values(Category)], []);
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Semua';
    const saved = localStorage.getItem(CATEGORY_STORAGE_KEY);
    return saved && categories.includes(saved) ? saved : 'Semua';
  });

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CATEGORY_STORAGE_KEY, category);
    }
  };

  const filteredArticles = activeCategory === 'Semua'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zmc-red to-zmc-darkRed text-white pt-12 pb-32 px-4 rounded-b-[40px] shadow-xl overflow-hidden">
        
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <i className="fa-solid fa-heart-pulse absolute -right-16 -top-16 text-[15rem]"></i>
          <i className="fa-solid fa-user-doctor absolute -left-16 bottom-0 text-[15rem]"></i>
        </div>

        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Portal Edukasi Pasien
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-sm">
            Sehat Bersama <br/> Zihan Medical Center
          </h1>
          
          <p className="text-red-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Panduan kesehatan terpercaya, kalkulator medis, dan tips praktis untuk warga Garut.
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
             <button 
                onClick={() => window.open(ZMC_INFO.whatsappUrl, '_blank')} 
                className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 group shadow-lg"
             >
                <i className="fa-solid fa-user-doctor text-lg group-hover:scale-110 transition-transform"></i> Konsultasi Dokter
             </button>
             <button 
                onClick={() => window.open(`tel:${ZMC_INFO.emergencyPhone.replace(/[() -]/g, '')}`, '_self')} 
                className="bg-red-600 hover:bg-red-700 border border-red-500 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 group shadow-lg animate-pulse"
             >
                <i className="fa-solid fa-ambulance text-lg group-hover:scale-110 transition-transform"></i> Gawat Darurat
             </button>
             <button 
                onClick={() => window.open(ZMC_INFO.instagramUrl, '_blank')} 
                className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 group shadow-lg"
             >
                <i className="fa-brands fa-instagram text-lg group-hover:scale-110 transition-transform"></i> Instagram
             </button>
          </div>
        </div>
      </section>

      {/* Content Section with Negative Margin for Overlap */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
        
        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar justify-start md:justify-center px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold transition shadow-md border whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-zmc-red border-white ring-4 ring-red-500/20'
                  : 'bg-white/90 text-slate-600 border-transparent hover:bg-white hover:text-zmc-red'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-folder-open text-2xl text-slate-400"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-700">Belum ada artikel</h3>
            <p className="text-slate-500">Silakan pilih kategori lain.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
