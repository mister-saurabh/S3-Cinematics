import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
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
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/work">Work</Link>
          <Link to="/sandbox">AI Sandbox</Link>
          <Link to="/about">About</Link>
          <Link to="/process">Process</Link>
          <Link to="/blog">Insights</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <Link to="/services">Cinematic AI Ads</Link>
          <Link to="/services">CGI Production</Link>
          <Link to="/services">AI Avatars</Link>
          <Link to="/services">AI Filmmaking</Link>
          <Link to="/services">Product Visualization</Link>
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
