import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Context Providers
import { CurrencyProvider } from './context/CurrencyContext';
import { DataProvider } from './context/DataContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicesOverview from './pages/ServicesOverview';
import ServiceDetailPage from './pages/ServiceDetailPage';
import OffersPage from './pages/OffersPage';
import DestinationsPage from './pages/DestinationsPage';
import ProgramsPage from './pages/ProgramsPage';
import HajjUmrahPage from './pages/HajjUmrahPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PartnersPage from './pages/PartnersPage';
import CareersPage from './pages/CareersPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Helper component to scroll to top smoothly upon route transition
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

// Layout wrapper to conditionally hide navbar/footer in admin if desired
function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100 selection:bg-gold-500 selection:text-navy-950 overflow-x-hidden w-full max-w-full relative">
      <ScrollToTop />
      
      {/* Navbar: 5 strictly defined items, sticky, transparent to dark navy on scroll */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1 overflow-x-hidden w-full max-w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Services routes */}
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          
          {/* Hajj, Umrah, Offers & Destinations */}
          <Route path="/hajj-umrah" element={<HajjUmrahPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          
          {/* Booking & Contact */}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Information & Social Proof */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/careers" element={<CareersPage />} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Admin Protected Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Floating WhatsApp Button on all pages */}
      <FloatingWhatsApp />

      {/* Footer with all pages, contact info, and hidden admin entry */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <CurrencyProvider>
        <Router>
          <AppContent />
        </Router>
      </CurrencyProvider>
    </DataProvider>
  );
}
