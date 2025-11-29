import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => navigate('/');

  return (
    <Layout onGoHome={goHome} isHome={location.pathname === '/'}>
      <Routes>
        <Route path="/" element={<Home onNavigate={(id) => navigate(`/artikel/${id}`)} />} />
        <Route path="/artikel/:id" element={<ArticlePage onGoHome={goHome} />} />
        <Route
          path="*"
          element={(
            <div className="p-10 text-center">
              <h2 className="text-2xl font-bold">Halaman tidak ditemukan</h2>
              <button onClick={goHome} className="mt-4 text-blue-600 underline">Kembali</button>
            </div>
          )}
        />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;