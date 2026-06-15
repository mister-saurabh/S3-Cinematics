import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import FeaturedAd from '../components/FeaturedAd';
import TrustStrip from '../components/TrustStrip';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CaseStudy from '../components/CaseStudy';
import CTASection from '../components/CTASection';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <PageTransition>
      {/* ===== VIDEO HERO ===== */}
      <section className="hero hero-video" id="home" ref={heroRef}>
        {/* Video Background */}
        <motion.div className="hero-video-bg" style={{ y: heroY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster=""
            className="hero-video-element"
          >
            <source
              src="https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-video-overlay" />
        </motion.div>

        {/* Glow Orbs */}
        <div className="hero-glow-orb hero-glow-orb-1" />
        <div className="hero-glow-orb hero-glow-orb-2" />

        <div className="floating-particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="hero-badge"
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <span className="dot" />
            Premium AI Creative Agency
          </motion.div>
          <motion.h1
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Building The Future of{' '}
            <span className="highlight">AI Storytelling</span>
          </motion.h1>
          <motion.p
            className="hero-subheading"
            custom={2}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            We Create Cinematic AI Advertisements That Stop The Scroll And
            Command Attention.
          </motion.p>
          <motion.p
            custom={2.5}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="hero-supporting"
          >
            S3 Cinematics helps brands transform products into unforgettable
            visual experiences through AI-powered commercials, cinematic
            storytelling, and high-converting ad creatives.
          </motion.p>
          <motion.div
            className="hero-buttons"
            custom={3}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Link to="/contact" className="btn-primary">
              Book A Call
            </Link>
            <Link to="/work" className="btn-outline">
              View Our Work
            </Link>
          </motion.div>
          <motion.div
            className="hero-stats"
            custom={4}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="stat">
              <h3>50+</h3>
              <p>Projects Delivered</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="stat">
              <h3>24hr</h3>
              <p>Quick Turnaround</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <FeaturedAd />
      <TrustStrip />
      <WhyChooseUs />
      <Testimonials />
      <CaseStudy />
      <CTASection />
    </PageTransition>
  );
}
