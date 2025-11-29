import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      to={`/artikel/${article.id}`}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-red-50 text-zmc-red flex items-center justify-center text-xl group-hover:bg-zmc-red group-hover:text-white transition-colors duration-300">
          <i className={article.icon}></i>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {article.category}
          </span>
          <h3 className="font-bold text-slate-800 leading-tight group-hover:text-zmc-red transition-colors">
            {article.title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-grow">
        {article.description}
      </p>
      <div className="flex items-center text-zmc-red text-xs font-bold mt-auto">
        BACA SELENGKAPNYA <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
      </div>
    </Link>
  );
};

export default ArticleCard;
