import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEye, FaChartLine, FaArrowUp, FaClock } from 'react-icons/fa';

const stats = [
  { icon: FaEye, value: '50K+', label: 'Views' },
  { icon: FaChartLine, value: '+300%', label: 'Engagement' },
  { icon: FaArrowUp, value: '+180%', label: 'Conversion' },
  { icon: FaClock, value: '7 Days', label: 'Timeline' },
];

const CaseStudy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section case-study-section" id="case-study" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">Real Results, Real Impact</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderLeft: '4px solid var(--accent, #d4af37)',
            borderRadius: '1.2rem',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* decorative glow */}
          <div
            style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent)',
              pointerEvents: 'none',
            }}
          />

          <span
            style={{
              display: 'inline-block',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--accent, #d4af37)',
              fontWeight: 700,
              marginBottom: '0.8rem',
              background: 'rgba(212,175,55,0.1)',
              padding: '0.35rem 1rem',
              borderRadius: '2rem',
            }}
          >
            Featured Case Study
          </span>

          <h3
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.3,
              marginBottom: '1.8rem',
            }}
          >
            How a Jewellery Brand Increased Engagement 3x Using Cinematic AI Ads
          </h3>

          <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <h4
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--accent, #d4af37)',
                  marginBottom: '0.4rem',
                  fontWeight: 700,
                }}
              >
                The Challenge
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                A growing jewellery brand struggled with generic product photography that failed to
                capture the luxury feel of their collections.
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--accent, #d4af37)',
                  marginBottom: '0.4rem',
                  fontWeight: 700,
                }}
              >
                Our Solution
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                S3 Cinematics created hyper-realistic AI-generated product visuals with cinematic
                lighting, 3D renders, and AI avatar models showcasing the jewellery.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  style={{
                    textAlign: 'center',
                    padding: '1.2rem 0.8rem',
                    background: 'rgba(212,175,55,0.06)',
                    borderRadius: '0.8rem',
                    border: '1px solid rgba(212,175,55,0.1)',
                  }}
                >
                  <Icon
                    size={16}
                    color="var(--accent, #d4af37)"
                    style={{ marginBottom: '0.4rem' }}
                  />
                  <p
                    style={{
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #d4af37, #fff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      margin: 0,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.78rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudy;
