import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import NotFound from './components/NotFound';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artikel/:id" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
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