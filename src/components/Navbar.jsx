import { useState } from 'react';

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

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
      <ul className={`nav-links ${open ? 'open' : ''}`}>
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
  );
}
