import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'E-commerce Brand Owner',
    quote:
      'S3 Cinematics transformed our product ads completely. The AI-generated visuals were so realistic that our engagement tripled within a month.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Fashion Brand Founder',
    quote:
      'The cinematic quality of their AI ads is unmatched. Every frame looks like it belongs in a Hollywood production. Our brand perception has completely changed.',
    rating: 5,
  },
  {
    name: 'Amit Verma',
    role: 'Real Estate Developer',
    quote:
      'We needed premium property visuals and S3 Cinematics delivered beyond expectations. The CGI walkthroughs look absolutely stunning.',
    rating: 5,
  },
  {
    name: 'Neha Singh',
    role: 'Jewellery Brand Owner',
    quote:
      'The AI avatar they created for our brand is incredible. It presents our collections with such elegance that customers think it is a real model.',
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const allCards = [...testimonials, ...testimonials];

  return (
    <section className="section testimonials-section" id="testimonials" ref={ref}>
      <style>{`
        @keyframes testimonial-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonial-track {
          display: flex;
          gap: 1.5rem;
          animation: testimonial-scroll 35s linear infinite;
          width: max-content;
        }
        .testimonials-section:hover .testimonial-track {
          animation-play-state: paused;
        }
        .testimonial-card {
          min-width: 340px;
          max-width: 380px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 1rem;
          padding: 2rem 1.8rem;
          flex-shrink: 0;
          position: relative;
        }
        @media (max-width: 480px) {
          .testimonial-card {
            min-width: 280px;
            max-width: 300px;
            padding: 1.5rem 1.2rem;
          }
        }
      `}</style>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">What Our Clients Say</h2>
      </motion.div>

      <div style={{ overflow: 'hidden', width: '100%', padding: '1rem 0' }}>
        <div className="testimonial-track">
          {allCards.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <FaQuoteLeft
                size={22}
                color="rgba(212,175,55,0.2)"
                style={{ position: 'absolute', top: 18, right: 20 }}
              />

              <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <FaStar key={s} size={14} color="#d4af37" />
                ))}
              </div>

              <p
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #d4af37, #8b6914)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#fff',
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', margin: 0 }}>
                    {t.name}
                  </p>
                  <p
                    style={{
                      color: 'var(--accent, #d4af37)',
                      fontSize: '0.8rem',
                      margin: 0,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
