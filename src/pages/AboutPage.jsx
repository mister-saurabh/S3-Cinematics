import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaBrain,
  FaRocket,
  FaAward,
  FaBolt,
  FaEye,
  FaHeart,
  FaGem,
  FaLightbulb,
} from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import CTASection from '../components/CTASection';

import ownerImg1 from '../assets/owner1.jpg';

const highlights = [
  { icon: <FaBrain />, text: 'AI-First Creative Direction' },
  { icon: <FaRocket />, text: 'Rapid Turnaround — Concept to Delivery' },
  { icon: <FaAward />, text: 'Cinema-Grade Production Standards' },
  { icon: <FaBolt />, text: 'Always Ahead of the Curve' },
];

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function AboutPage() {
  const storyRef = useRef(null);
  const mvRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });
  const mvInView = useInView(mvRef, { once: true, margin: '-80px' });

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
            About Us
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The Visionary Behind{' '}
            <span className="highlight">S3 Cinematics</span>
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Where artificial intelligence meets cinematic artistry — crafting
            the future of brand storytelling.
          </motion.p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section about-founder-section" ref={storyRef}>
        <div className="about-founder-grid">
          <motion.div
            className="about-founder-portrait"
            initial={{ opacity: 0, x: -50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="founder-image-frame">
              <img
                src={ownerImg1}
                alt="Saurabh Kr Prajapati — Founder"
              />
              <div className="founder-image-glow" />
            </div>
            <div className="founder-floating-tag tag-top">
              AI Creative Director
            </div>
            <div className="founder-floating-tag tag-bottom">
              Founder & Visionary
            </div>
          </motion.div>

          <motion.div
            className="about-founder-story"
            initial={{ opacity: 0, x: 50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="founder-name">Saurabh Kr Prajapati</h2>
            <p className="founder-title-text">
              Founder & AI Creative Director
            </p>
            <p className="founder-quote">
              "Turning Imagination into Reality with AI — One Frame at a Time"
            </p>

            <div className="founder-story-content">
              <h3>
                <FaHeart
                  style={{ color: 'var(--accent-blue)', marginRight: '8px' }}
                />
                The Story
              </h3>
              <p>
                I'm Saurabh Kr Prajapati, the founder of{' '}
                <strong style={{ color: 'var(--accent-blue)' }}>
                  S3 Cinematics
                </strong>{' '}
                — where artificial intelligence meets cinematic artistry. I
                specialize in creating hyper-realistic AI-generated
                advertisements that don't just capture attention — they command
                it.
              </p>
              <p>
                In an era where brands fight for every second of consumer
                attention, I leverage the most advanced AI tools and cinematic
                techniques to produce advertisements that are visually stunning,
                emotionally compelling, and conversion-driven. From CGI product
                showcases to Pixar-quality 3D animations, every frame is
                crafted to perfection.
              </p>
            </div>

            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div className="highlight-item" key={i}>
                  <span className="icon">{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Philosophy */}
      <section
        className="section about-mvp-section"
        ref={mvRef}
        style={{ background: 'var(--bg-secondary)' }}
      >
        <motion.div
          className="about-mvp-grid"
          variants={staggerChildren}
          initial="hidden"
          animate={mvInView ? 'visible' : 'hidden'}
        >
          <motion.div className="about-mvp-card" variants={fadeUp}>
            <div className="mvp-icon">
              <FaEye />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become the world's leading AI creative agency — setting the
              global standard for cinematic AI advertising that transforms how
              brands communicate, connect, and convert.
            </p>
          </motion.div>

          <motion.div className="about-mvp-card" variants={fadeUp}>
            <div className="mvp-icon">
              <FaRocket />
            </div>
            <h3>Our Mission</h3>
            <p>
              To democratize premium advertising by harnessing AI technology,
              enabling brands of every size to create Hollywood-quality
              commercials that were previously accessible only to Fortune 500
              companies.
            </p>
          </motion.div>

          <motion.div className="about-mvp-card" variants={fadeUp}>
            <div className="mvp-icon">
              <FaLightbulb />
            </div>
            <h3>Creative Philosophy</h3>
            <p>
              We believe great advertising is not about selling — it's about
              storytelling. Every ad we create tells a story that resonates,
              inspires, and moves audiences to action through the magic of
              cinematic AI.
            </p>
          </motion.div>

          <motion.div className="about-mvp-card" variants={fadeUp}>
            <div className="mvp-icon">
              <FaGem />
            </div>
            <h3>Quality Standard</h3>
            <p>
              Every frame, every pixel, every second of content we produce meets
              the highest standards of cinematic excellence. We never compromise
              on quality — because your brand deserves nothing less.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
