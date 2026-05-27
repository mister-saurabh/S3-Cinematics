import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-glow-line" />
      <div className="footer-content">
        <div className="footer-brand">
          <h3>S3 CINEMATICS</h3>
          <p>Premium AI Creative Agency crafting cinematic content that makes brands impossible to ignore.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a>
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>Work</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process'); }}>Process</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Cinematic AI Ads</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>CGI Production</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>AI Avatars</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>AI Filmmaking</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Product Visualization</a>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://instagram.com/s3.Cinematics" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/919793483930" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="mailto:saurabhkumarprajapati2005@gmail.com" className="social-icon" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} S3 Cinematics — All Rights Reserved. Crafted with 💙 & AI</p>
      </div>
    </footer>
  );
}
