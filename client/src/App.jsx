import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import SiteHeader from './components/layout/SiteHeader.jsx';
import SiteFooter from './components/layout/SiteFooter.jsx';

import EstimatorPage from './pages/EstimatorPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';

function AppContent() {
  const location = useLocation();

  // Check if current route is Admin or Estimator to hide Header & Footer
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isEstimatorRoute = location.pathname.startsWith('/estimate');
  const hideHeaderFooter = isAdminRoute || isEstimatorRoute;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!hideHeaderFooter && <SiteHeader />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/estimate" element={<EstimatorPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {!hideHeaderFooter && <SiteFooter />}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}