import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="cta-section" id="cta">
      <style>{`
        @keyframes cta-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cta-section {
          position: relative;
          padding: clamp(4rem, 10vw, 8rem) 1.5rem;
          text-align: center;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(212,175,55,0.12) 0%,
            rgba(10,10,10,0.95) 30%,
            rgba(212,175,55,0.08) 60%,
            rgba(10,10,10,0.95) 100%
          );
          background-size: 300% 300%;
          animation: cta-gradient 8s ease infinite;
          z-index: 0;
        }
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2.5rem;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.2rem;
          border-radius: 3rem;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: transform 0.2s, box-shadow 0.3s;
        }
        .cta-btn:hover { transform: translateY(-2px); }
        .cta-btn-primary {
          background: linear-gradient(135deg, #d4af37, #b8941e);
          color: #0a0a0a;
          box-shadow: 0 4px 24px rgba(212,175,55,0.3);
        }
        .cta-btn-primary:hover {
          box-shadow: 0 8px 32px rgba(212,175,55,0.5);
        }
        .cta-btn-whatsapp {
          background: #25D366;
          color: #fff;
          box-shadow: 0 4px 20px rgba(37,211,102,0.3);
        }
        .cta-btn-whatsapp:hover {
          box-shadow: 0 8px 28px rgba(37,211,102,0.45);
        }
      `}</style>

      <div className="cta-inner">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#fff',
            marginBottom: '1rem',
          }}
        >
          Ready To Make Your Brand{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #d4af37, #f5e6a3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Look Premium?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 550,
            margin: '0 auto',
          }}
        >
          Let&apos;s build AI content your audience actually remembers.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#book" className="cta-btn cta-btn-primary">
            Book a Call <FaArrowRight size={14} />
          </a>
          <a
            href="https://wa.me/919793483930"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn-whatsapp"
          >
            <FaWhatsapp size={18} /> WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
