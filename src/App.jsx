import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedAd from './components/FeaturedAd';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import ProcessSection from './components/ProcessSection';
import Testimonials from './components/Testimonials';
import CaseStudy from './components/CaseStudy';
import Pricing from './components/Pricing';
import CTASection from './components/CTASection';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Scroll to order form
    setTimeout(() => {
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="app">
      <Navbar scrolled={scrolled} />
      <Hero />
      <FeaturedAd />
      <TrustStrip />
      <Services />
      <Portfolio />
      <About />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <CaseStudy />
      <Pricing onSelectPlan={handlePlanSelect} />
      <CTASection />
      <OrderForm selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
