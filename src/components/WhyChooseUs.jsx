import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBolt, FaFilm, FaRobot, FaMobileAlt, FaFire, FaCrown } from 'react-icons/fa';

const cards = [
  { icon: FaBolt, counter: '10x', label: 'Faster Content Production' },
  { icon: FaFilm, counter: '4K+', label: 'Cinematic Quality Output' },
  { icon: FaRobot, counter: 'AI', label: 'AI-Powered Workflow' },
  { icon: FaMobileAlt, counter: '100%', label: 'Mobile First Content' },
  { icon: FaFire, counter: '50+', label: 'Projects Delivered' },
  { icon: FaCrown, counter: 'Premium', label: 'Luxury Brand Positioning' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section why-section" id="why-us" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">Why Brands Choose Us</h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              className="why-card"
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, scale: 1.03 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '1rem',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                cursor: 'default',
                transition: 'box-shadow 0.3s',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem',
                }}
              >
                <Icon size={24} color="var(--accent, #d4af37)" />
              </div>
              <h3
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #d4af37, #fff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem',
                }}
              >
                {card.counter}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                {card.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
