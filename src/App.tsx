import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import ServiceSubcategoryPage from './pages/ServiceSubcategoryPage';

const AdminLogin = lazy(() => import('./pages/admin/index'));
const AdminDashboard = lazy(() => import('./pages/admin/dashboard'));
const AdminProjects = lazy(() => import('./pages/admin/projects'));
const AdminServices = lazy(() => import('./pages/admin/services'));
const AdminSettings = lazy(() => import('./pages/admin/settings'));
const AdminHelp = lazy(() => import('./pages/admin/help'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/category/:categoryName" element={<ServiceCategoryPage />} />
            <Route path="/services/category/:categoryName/:subCategoryName" element={<ServiceSubcategoryPage />} />
            {/* Admin routes */}
            <Route path="/admin" element={
              <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin/dashboard" element={
              <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
                <AdminDashboard />
              </Suspense>
            } />
            <Route path="/admin/projects" element={
              <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
                <AdminProjects />
              </Suspense>
            } />
            <Route path="/admin/services" element={
              <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
                <AdminServices />
              </Suspense>
            } />
            <Route path="/admin/settings" element={
              <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
                <AdminSettings />
              </Suspense>
            } />
            <Route path="/admin/help" element={
              <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
                <AdminHelp />
              </Suspense>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;