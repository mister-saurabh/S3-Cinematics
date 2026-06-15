import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaPhone, FaPen, FaRobot, FaFilm, FaRocket, FaArrowRight } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

const steps = [
  {
    icon: FaPhone,
    title: 'Strategy Call',
    desc: 'We understand your brand vision, goals, and target audience to craft the perfect creative direction.',
    detail:
      'Every great project starts with understanding. We schedule a detailed strategy call where we dive deep into your brand DNA, target audience, market positioning, and creative aspirations. This is where we align on the vision that will drive every creative decision.',
  },
  {
    icon: FaPen,
    title: 'Script & Creative Direction',
    desc: 'Our team develops compelling scripts and storyboards that align with your brand narrative.',
    detail:
      'Our creative team crafts a compelling script and detailed storyboard, mapping out every scene, transition, and visual element. We present multiple creative directions for your review and iterate until the vision is perfect.',
  },
  {
    icon: FaRobot,
    title: 'AI Production',
    desc: 'Using cutting-edge AI tools, we produce hyper-realistic visuals, avatars, and cinematic content.',
    detail:
      'This is where the magic happens. Using the most advanced AI generation tools available, we bring your storyboard to life. Every frame is generated with precision, from photorealistic products to cinematic environments and digital characters.',
  },
  {
    icon: FaFilm,
    title: 'Cinematic Editing',
    desc: 'Professional post-production with color grading, sound design, and cinematic effects.',
    detail:
      'Our editors apply Hollywood-grade post-production techniques — professional color grading, custom sound design, visual effects compositing, and seamless transitions. Every second of your content is polished to perfection.',
  },
  {
    icon: FaRocket,
    title: 'Delivery & Optimization',
    desc: 'Final delivery in all formats, optimized for every platform to maximize engagement.',
    detail:
      'We deliver your content in every format you need — Instagram Reels, YouTube ads, TikTok, website headers, and more. Each version is specifically optimized for its platform to maximize engagement and conversion rates.',
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

export default function ProcessPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <PageTransition>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-glow" />
        <div className="page-hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="dot" />
            How We Work
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our <span className="highlight">Creative Process</span>
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            From strategy to delivery, every step is engineered for cinematic
            excellence and measurable results.
          </motion.p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section process-page-section" ref={ref}>
        <div className="process-page-timeline">
          {steps.map((step, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            const Icon = step.icon;
            return (
              <motion.div
                className={`process-page-step ${side}`}
                key={i}
                custom={side}
                variants={stepVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: i * 0.18 }}
              >
                <div className="process-page-dot">
                  <span className="process-page-number">{i + 1}</span>
                </div>
                <div className="process-page-card">
                  <div className="process-page-card-header">
                    <div className="process-page-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="process-page-step-label">
                        Step {i + 1}
                      </span>
                      <h3>{step.title}</h3>
                    </div>
                  </div>
                  <p className="process-page-desc">{step.desc}</p>
                  <p className="process-page-detail">{step.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="process-page-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>Let's bring your vision to life with our proven creative process.</p>
          <Link to="/contact" className="btn-primary">
            Book Your Strategy Call <FaArrowRight style={{ marginLeft: '8px' }} />
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
