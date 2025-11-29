import React, { useState } from 'react';
import { ARTICLES } from '../services/articleRegistry';
import ArticleCard from '../components/ArticleCard';
import { Category } from '../types';

interface HomeProps {
  onNavigate: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Object.values(Category)];
  
  const filteredArticles = activeCategory === 'Semua' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zmc-red to-red-800 text-white pt-12 pb-20 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <i className="fa-solid fa-heart-pulse text-9xl"></i>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Portal Edukasi Pasien
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Sehat Bersama <br/> Zihan Medical Center
          </h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto mb-8">
            Panduan kesehatan terpercaya, kalkulator medis, dan tips praktis untuk warga Garut.
          </p>
          
          {/* Quick Stats/Features */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-user-doctor"></i> Konsultasi Dokter
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-calculator"></i> Cek Kesehatan
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-book-medical"></i> Panduan Lengkap
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-6 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm border ${
                activeCategory === cat 
                  ? 'bg-zmc-red text-white border-zmc-red' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={onNavigate} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <i className="fa-solid fa-folder-open text-4xl text-slate-300 mb-4"></i>
            <p className="text-slate-500">Belum ada artikel di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;