import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

import logoImg from '../assets/logo.jpg';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/work', label: 'Our Work' },
  { path: '/sandbox', label: 'AI Sandbox' },
  { path: '/about', label: 'About' },
  { path: '/process', label: 'Process' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/blog', label: 'Insights' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/' || path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (path === '/work') {
      return location.pathname.startsWith('/work');
    }
    if (path === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    return location.pathname === path;
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
            <li key={item.path} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
              <Link
                to={item.path}
                className={isActive(item.path) ? 'nav-active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-divider" />
        <div className="mobile-menu-cta-wrapper" style={{ transitionDelay: open ? '0.5s' : '0s' }}>
          <Link to="/contact" className="mobile-menu-cta">
            Book a Call
          </Link>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="navbar-logo-container">
            <img src={logoImg} alt="S3 Cinematics Logo" className="navbar-logo-img" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '22px', fontWeight: '900', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1' }}>S3</span>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: '400', lineHeight: '1' }}>CINEMATICS</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={isActive(item.path) ? 'nav-active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="nav-cta">
              Book a Call
            </Link>
          </li>
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
