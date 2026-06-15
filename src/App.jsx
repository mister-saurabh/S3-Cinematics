import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import S3Loader from './components/S3Loader';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ProcessPage from './pages/ProcessPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import SandboxPage from './pages/SandboxPage';
import './index.css';

function App() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Scroll state for navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Route transition loader
  useEffect(() => {
    if (location.pathname !== prevPath) {
      setPrevPath(location.pathname);
      setRouteLoading(true);
      const timer = setTimeout(() => {
        setRouteLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Loaders */}
      <AnimatePresence mode="wait">
        {initialLoading && <S3Loader key="initial-loader" isInitial />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {routeLoading && !initialLoading && (
          <S3Loader key="route-loader" />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!initialLoading && !routeLoading && (
        <>
          <Navbar scrolled={scrolled} />
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:projectId" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/sandbox" element={<SandboxPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
}

export default App;
