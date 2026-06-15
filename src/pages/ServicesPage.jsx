import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FaFilm,
  FaCube,
  FaUsers,
  FaBookOpen,
  FaMagic,
  FaRobot,
  FaUserAstronaut,
  FaMicrophone,
  FaGem,
  FaArrowRight,
} from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import CTASection from '../components/CTASection';

const services = [
  {
    icon: <FaFilm />,
    title: 'Cinematic AI Ads',
    desc: 'Luxury AI commercials with Hollywood-grade production quality that makes your brand impossible to ignore.',
    details:
      'We combine state-of-the-art AI generation with professional cinematography techniques to create advertisements that rival major studio productions. Every frame is meticulously crafted with cinematic lighting, color grading, and visual effects.',
  },
  {
    icon: <FaCube />,
    title: 'CGI Production',
    desc: 'Stunning computer-generated imagery that creates impossible scenarios and breathtaking visuals for your brand.',
    details:
      'Our CGI pipeline delivers photorealistic 3D renders, product visualizations, and environmental scenes that push creative boundaries beyond traditional photography.',
  },
  {
    icon: <FaUsers />,
    title: 'UGC Content',
    desc: 'Creator-style AI marketing videos that feel authentic and drive massive engagement on social platforms.',
    details:
      'Authentic-feeling AI-generated content optimized for TikTok, Instagram Reels, and YouTube Shorts that drives organic engagement and viral reach.',
  },
  {
    icon: <FaBookOpen />,
    title: 'Brand Storytelling',
    desc: 'Narrative-driven cinematic ads that create deep emotional connections and leave lasting impressions.',
    details:
      'We craft compelling brand narratives using AI-powered cinematic storytelling techniques that resonate with audiences and build lasting brand equity.',
  },
  {
    icon: <FaMagic />,
    title: '3D Pixar Quality',
    desc: 'Pixar-quality 3D animated advertisements with charming characters and vibrant worlds.',
    details:
      'Full 3D animation production pipeline creating Pixar-inspired characters, environments, and animations that bring your brand to life in ways that captivate audiences of all ages.',
  },
  {
    icon: <FaUserAstronaut />,
    title: 'AI Avatar Services',
    desc: 'Hyper-realistic AI avatars and digital clones that can speak, present, sell, and create content 24/7.',
    details:
      'Create digital spokespersons that represent your brand consistently across all platforms. Our AI avatars are indistinguishable from real humans and available around the clock.',
  },
  {
    icon: <FaRobot />,
    title: 'AI Film Making',
    desc: 'Full AI-powered short films and brand movies with cinematic storytelling and professional post-production.',
    details:
      'End-to-end AI film production from script to screen, including AI-generated scenes, professional editing, sound design, and color grading.',
  },
  {
    icon: <FaMicrophone />,
    title: 'AI Voice & Dubbing',
    desc: 'Multi-language AI voiceovers and dubbing that make your content accessible to global audiences.',
    details:
      'Natural-sounding AI voices in 50+ languages with lip-sync dubbing capabilities. Scale your content globally without expensive studio sessions.',
  },
  {
    icon: <FaGem />,
    title: 'Product Visualization',
    desc: 'Premium AI-generated product ads with luxury lighting, textures, and photorealistic quality.',
    details:
      'Transform your products into stunning visual masterpieces with AI-powered photography, 360° renders, and premium lifestyle compositions.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function ServicesPage() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

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
            What We Create
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Services That{' '}
            <span className="highlight">Redefine Advertising</span>
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Every service is crafted with AI precision and cinematic excellence
            to elevate your brand beyond imagination.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" id="services">
        <div className="services-grid services-grid-full" ref={gridRef}>
          {services.map((s, i) => (
            <motion.div
              className="service-card service-card-expanded"
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <p className="service-details">{s.details}</p>
              <Link to="/contact" className="service-cta">
                Get Started <FaArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
