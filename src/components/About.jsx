import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBrain, FaRocket, FaAward, FaBolt } from 'react-icons/fa';

import ownerImg1 from '../assets/owner1.jpg';

const highlights = [
  { icon: <FaBrain />, text: 'AI-First Creative Direction' },
  { icon: <FaRocket />, text: 'Rapid Turnaround — Concept to Delivery' },
  { icon: <FaAward />, text: 'Cinema-Grade Production Standards' },
  { icon: <FaBolt />, text: 'Always Ahead of the Curve' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="about" style={{ background: 'var(--gradient-bg)' }} ref={ref}>
      <div className="section-label"><span className="line" /> About Us</div>
      <h2 className="section-title">Building The Future Of AI Storytelling</h2>
      <div className="about-container">
        <motion.div
          className="about-image-wrapper"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="about-image-frame">
            <img src={ownerImg1} alt="Saurabh Kr Prajapati" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="about-image-badge">AI Visionary ✨</div>
          </div>
          <div className="about-floating-tag" style={{ top: '10%', left: '-20px' }}>AI Creative Director</div>
          <div className="about-floating-tag" style={{ bottom: '15%', right: '-20px' }}>Founder</div>
        </motion.div>
        <motion.div
          className="about-content"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          <h2>Saurabh Kr Prajapati</h2>
          <p className="tagline">"Turning Imagination into Reality with AI — One Frame at a Time"</p>
          <p>
            I'm Saurabh Kr Prajapati, the founder of <strong style={{ color: 'var(--accent-blue)' }}>S3 Cinematics</strong> — where artificial intelligence meets cinematic artistry. I specialize in creating hyper-realistic AI-generated advertisements that don't just capture attention — they command it.
          </p>
          <p>
            In an era where brands fight for every second of consumer attention, I leverage the most advanced AI tools and cinematic techniques to produce advertisements that are visually stunning, emotionally compelling, and conversion-driven. From CGI product showcases to Pixar-quality 3D animations, every frame is crafted to perfection.
          </p>
          <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '16px' }}>
            "The future of advertising is AI. The future is S3 Cinematics."
          </p>
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
  );
}
