import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFilm, FaCube, FaUsers, FaBookOpen, FaMagic, FaRobot, FaUserAstronaut, FaMicrophone, FaGem } from 'react-icons/fa';

const services = [
  { icon: <FaFilm />, title: 'Cinematic AI Ads', desc: 'Luxury AI commercials with Hollywood-grade production quality that makes your brand impossible to ignore.' },
  { icon: <FaCube />, title: 'CGI', desc: 'Stunning computer-generated imagery that creates impossible scenarios and breathtaking visuals for your brand.' },
  { icon: <FaUsers />, title: 'UGC', desc: 'Creator-style AI marketing videos that feel authentic and drive massive engagement on social platforms.' },
  { icon: <FaBookOpen />, title: 'Storytelling', desc: 'Narrative-driven cinematic ads that create deep emotional connections and leave lasting impressions.' },
  { icon: <FaMagic />, title: '3D Pixar Type', desc: 'Pixar-quality 3D animated advertisements with charming characters and vibrant worlds.' },
  { icon: <FaUserAstronaut />, title: 'AI Avatar Services', desc: 'We create hyper-realistic AI avatars and digital clones that can speak, present, sell, and create content for your business 24/7.' },
  { icon: <FaRobot />, title: 'AI Film Making', desc: 'Full AI-powered short films and brand movies with cinematic storytelling and professional post-production.' },
  { icon: <FaMicrophone />, title: 'AI Voice & Dubbing', desc: 'Multi-language AI voiceovers and dubbing that make your content accessible to global audiences.' },
  { icon: <FaGem />, title: 'Product Visualization', desc: 'Premium AI-generated product ads with luxury lighting, textures, and photorealistic quality.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="services">
      <div className="section-label"><span className="line" /> What We Create</div>
      <h2 className="section-title">What We Create</h2>
      <p className="section-subtitle">Every service is crafted with AI precision and cinematic excellence to elevate your brand beyond imagination.</p>
      <div className="services-grid" ref={ref}>
        {services.map((s, i) => (
          <motion.div
            className="service-card"
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
