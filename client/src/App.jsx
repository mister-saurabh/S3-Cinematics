import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import About from './components/About';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
      <Services />
      <Pricing onSelectPlan={handlePlanSelect} />
      <About />
      <OrderForm selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
