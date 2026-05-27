import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPhone, FaPen, FaRobot, FaFilm, FaRocket } from 'react-icons/fa';

const steps = [
  {
    icon: FaPhone,
    title: 'Strategy Call',
    desc: 'We understand your brand vision, goals, and target audience to craft the perfect creative direction.',
  },
  {
    icon: FaPen,
    title: 'Script & Creative Direction',
    desc: 'Our team develops compelling scripts and storyboards that align with your brand narrative.',
  },
  {
    icon: FaRobot,
    title: 'AI Production',
    desc: 'Using cutting-edge AI tools, we produce hyper-realistic visuals, avatars, and cinematic content.',
  },
  {
    icon: FaFilm,
    title: 'Cinematic Editing',
    desc: 'Professional post-production with color grading, sound design, and cinematic effects.',
  },
  {
    icon: FaRocket,
    title: 'Delivery & Optimization',
    desc: 'Final delivery in all formats, optimized for every platform to maximize engagement.',
  },
];

const stepVariants = {
  hidden: (side) => ({
    opacity: 0,
    x: side === 'left' ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section process-section" id="process" ref={ref}>
      <style>{`
        .process-timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .process-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, rgba(212,175,55,0.5), transparent);
          transform: translateX(-50%);
        }
        .process-step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 3rem;
          position: relative;
        }
        .process-step:last-child { margin-bottom: 0; }
        .process-step .step-content {
          width: 45%;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 1rem;
          padding: 1.8rem;
        }
        .process-step .step-dot {
          position: absolute;
          left: 50%;
          top: 1.8rem;
          transform: translateX(-50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent, #d4af37);
          border: 3px solid #0a0a0a;
          z-index: 2;
          box-shadow: 0 0 12px rgba(212,175,55,0.4);
        }
        .process-step.left .step-content { margin-right: auto; }
        .process-step.right .step-content { margin-left: auto; }

        @media (max-width: 768px) {
          .process-timeline::before {
            left: 24px;
          }
          .process-step .step-dot {
            left: 24px;
            top: 1.5rem;
          }
          .process-step .step-content {
            width: calc(100% - 60px);
            margin-left: 56px !important;
            margin-right: 0 !important;
          }
        }
      `}</style>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">Our Process</h2>
        <p
          className="section-subtitle"
          style={{
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 600,
            margin: '0.8rem auto 0',
            fontSize: '1.05rem',
          }}
        >
          From strategy to delivery, every step is crafted for cinematic excellence.
        </p>
      </motion.div>

      <div className="process-timeline">
        {steps.map((step, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';
          const Icon = step.icon;
          return (
            <motion.div
              className={`process-step ${side}`}
              key={i}
              custom={side}
              variants={stepVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.18 }}
            >
              <div className="step-dot" />
              <div className="step-content">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    marginBottom: '0.8rem',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.05))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="var(--accent, #d4af37)" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: 'var(--accent, #d4af37)',
                        fontWeight: 600,
                      }}
                    >
                      Step {i + 1}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcessSection;
