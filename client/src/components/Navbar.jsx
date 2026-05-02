import { useState } from 'react';

import logoImg from '../assets/logo.jpg';

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
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          padding: '2px',
          background: 'linear-gradient(135deg, #ffd700, #ff2d8a, #ff6bb5)',
          boxShadow: '0 0 15px rgba(255, 45, 138, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)'
        }}>
          <img src={logoImg} alt="S3 Cinematics Logo" style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '2px solid var(--bg-deep)'
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '22px', fontWeight: '900', background: 'var(--gradient-pink)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1' }}>S3</span>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: '400', lineHeight: '1' }}>CINEMATICS</span>
        </div>
      </a>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {['home', 'services', 'pricing', 'about', 'book', 'contact'].map((s) => (
          <li key={s}>
            <a href={`#${s}`} onClick={(e) => handleClick(e, s)}>
              {s === 'book' ? 'Book Now' : s}
            </a>
          </li>
        ))}
        <li><a href="#book" className="nav-cta" onClick={(e) => handleClick(e, 'book')}>Get Started</a></li>
      </ul>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span style={open ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
        <span style={open ? { opacity: 0 } : {}} />
        <span style={open ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
      </button>
    </nav>
  );
}
