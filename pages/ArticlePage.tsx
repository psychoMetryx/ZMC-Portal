import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ARTICLES } from '../services/articleRegistry';
import NotFound from '../components/NotFound';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = ARTICLES.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <NotFound message="Slug artikel tidak valid atau belum terdaftar." />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-zmc-red hover:underline">Beranda</Link>
        <i className="fa-solid fa-chevron-right text-xs"></i>
        <span className="text-slate-800 font-bold">{article.title}</span>
      </div>

      {/* Render the specific component */}
      <div className="animate-fade-in">
        {article.component}
      </div>

      {/* Bottom Nav */}
      <div className="mt-10 pt-10 border-t border-slate-200 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-zmc-red font-bold mr-6"
        >
          &larr; Kembali
        </button>
        <button
          onClick={() => navigate('/')}
          className="text-zmc-red font-bold hover:underline"
        >
          Menu Utama
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
