import React from 'react';
import { motion } from 'framer-motion';

const items = [
  'Premium AI Content',
  'Cinematic Storytelling',
  'AI Avatar Creation',
  'Brand Domination',
  'Viral Content',
  'Digital Innovation',
  'CGI Excellence',
  'AI Filmmaking',
];

const separator = '✦';

const marqueeStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
};

const trackStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2rem',
  animation: 'marquee 30s linear infinite',
  willChange: 'transform',
};

const itemStyle = {
  fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: 'rgba(255,255,255,0.7)',
  flexShrink: 0,
};

const sepStyle = {
  color: 'var(--accent, #d4af37)',
  fontSize: '0.7rem',
  flexShrink: 0,
};

const TrustStrip = () => {
  const renderItems = () =>
    items.map((item, i) => (
      <React.Fragment key={i}>
        <span style={itemStyle}>{item}</span>
        <span style={sepStyle}>{separator}</span>
      </React.Fragment>
    ));

  return (
    <motion.section
      className="trust-strip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        padding: '1.2rem 0',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trust-strip:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div style={marqueeStyle}>
        <div className="marquee-track" style={trackStyle}>
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </motion.section>
  );
};

export default TrustStrip;
