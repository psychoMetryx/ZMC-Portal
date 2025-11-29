import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import { ARTICLES } from './services/articleRegistry';

const App: React.FC = () => {
  // Simple router state: 'home' or article ID
  const [currentView, setCurrentView] = useState<string>('home');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const activeArticle = ARTICLES.find(a => a.id === currentView);

  return (
    <Layout 
      onGoHome={() => setCurrentView('home')} 
      isHome={currentView === 'home'}
    >
      {currentView === 'home' ? (
        <Home onNavigate={setCurrentView} />
      ) : activeArticle ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <span onClick={() => setCurrentView('home')} className="cursor-pointer hover:text-zmc-red hover:underline">Beranda</span>
            <i className="fa-solid fa-chevron-right text-xs"></i>
            <span className="text-slate-800 font-bold">{activeArticle.title}</span>
          </div>
          
          {/* Render the specific component */}
          <div className="animate-fade-in">
            {activeArticle.component}
          </div>

          {/* Bottom Nav */}
          <div className="mt-10 pt-10 border-t border-slate-200 text-center">
            <button 
              onClick={() => setCurrentView('home')}
              className="text-zmc-red font-bold hover:underline"
            >
              &larr; Kembali ke Daftar Artikel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold">Halaman tidak ditemukan</h2>
          <button onClick={() => setCurrentView('home')} className="mt-4 text-blue-600 underline">Kembali</button>
        </div>
      )}
    </Layout>
  );
};

export default App;