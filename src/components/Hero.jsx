import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section className="hero" id="home" onMouseMove={handleMouseMove}>
      {/* Glow Orbs */}
      <div className="hero-glow-orb hero-glow-orb-1" />
      <div className="hero-glow-orb hero-glow-orb-2" />
      <div className="hero-glow-orb hero-glow-orb-3" />

      <div className="floating-particles">
        {particles.map((p) => (
          <div key={p.id} className="particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, width: p.size, height: p.size }} />
        ))}
      </div>

      <div className="hero-content">
        <motion.div className="hero-badge" custom={0} variants={fadeInUp} initial="hidden" animate="visible">
          <span className="dot" />
          Premium AI Creative Agency
        </motion.div>
        <motion.h1 custom={1} variants={fadeInUp} initial="hidden" animate="visible">
          We Build AI Content That Makes Brands Look{' '}
          <span className="highlight">Million Dollar</span>
        </motion.h1>
        <motion.p custom={2} variants={fadeInUp} initial="hidden" animate="visible">
          From cinematic AI commercials to AI avatars and viral branded visuals — S3 Cinematics helps modern brands dominate social media attention.
        </motion.p>
        <motion.div className="hero-buttons" custom={3} variants={fadeInUp} initial="hidden" animate="visible">
          <a href="#work" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Our Work
          </a>
          <a href="#book" className="btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Book Strategy Call
          </a>
        </motion.div>
        <motion.div className="hero-stats" custom={4} variants={fadeInUp} initial="hidden" animate="visible">
          <div className="stat"><h3>50+</h3><p>Projects Delivered</p></div>
          <div className="stat"><h3>100%</h3><p>Client Satisfaction</p></div>
          <div className="stat"><h3>24hr</h3><p>Quick Turnaround</p></div>
        </motion.div>
      </div>
    </section>
  );
}
