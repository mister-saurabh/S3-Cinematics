import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import logoImg from '../assets/logo.jpg';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  // Mobile drawer rendered via Portal — outside the <nav> DOM entirely
  const mobileDrawer = createPortal(
    <>
      {/* Backdrop overlay */}
      <div
        className={`mobile-menu-backdrop ${open ? 'active' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* Right-side sliding panel */}
      <div className={`mobile-menu-panel ${open ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="mobile-menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <span />
            <span />
          </button>
        </div>
        <div className="mobile-menu-divider" />
        <ul className="mobile-menu-links">
          {navItems.map((item, i) => (
            <li key={item.id} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
              <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-divider" />
        <div className="mobile-menu-cta-wrapper" style={{ transitionDelay: open ? '0.5s' : '0s' }}>
          <a href="#book" className="mobile-menu-cta" onClick={(e) => handleClick(e, 'book')}>
            Book a Call
          </a>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={(e) => handleClick(e, 'home')} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="navbar-logo-container">
            <img src={logoImg} alt="S3 Cinematics Logo" className="navbar-logo-img" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '22px', fontWeight: '900', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1' }}>S3</span>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: '400', lineHeight: '1' }}>CINEMATICS</span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
                {item.label}
              </a>
            </li>
          ))}
          <li><a href="#book" className="nav-cta" onClick={(e) => handleClick(e, 'book')}>Book a Call</a></li>
        </ul>

        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span style={open ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
          <span style={open ? { opacity: 0 } : {}} />
          <span style={open ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
        </button>
      </nav>

      {/* Portal: renders mobile drawer outside <nav> into document.body */}
      {mobileDrawer}
    </>
  );
}
