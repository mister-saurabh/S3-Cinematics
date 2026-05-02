import { FaBrain, FaRocket, FaAward, FaBolt } from 'react-icons/fa';

import ownerImg1 from '../assets/owner1.jpg';

const highlights = [
  { icon: <FaBrain />, text: 'AI-First Approach — Leveraging cutting-edge AI models' },
  { icon: <FaRocket />, text: 'Fast Delivery — From concept to final ad in record time' },
  { icon: <FaAward />, text: 'Premium Quality — Cinema-grade production standards' },
  { icon: <FaBolt />, text: 'Innovation Driven — Always ahead of the curve' },
];

export default function About() {
  return (
    <section className="section" id="about" style={{ background: 'var(--gradient-bg)' }}>
      <div className="section-label"><span className="line" /> About Us</div>
      <h2 className="section-title">The Mind Behind S3 Cinematics</h2>
      <div className="about-container">
        <div className="about-image-wrapper">
          <div className="about-image-frame">
            <img src={ownerImg1} alt="Saurabh Kr Prajapati" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="about-image-badge">AI Visionary ✨</div>
          </div>
        </div>
        <div className="about-content">
          <h2>Saurabh Kr Prajapati</h2>
          <p className="tagline">"Turning Imagination into Reality with AI — One Frame at a Time"</p>
          <p>
            I'm Saurabh Kr Prajapati, the founder of <strong style={{ color: 'var(--pink-light)' }}>S3 Cinematics</strong> — where artificial intelligence meets cinematic artistry. I specialize in creating hyper-realistic AI-generated advertisements that don't just capture attention — they command it.
          </p>
          <p>
            In an era where brands fight for every second of consumer attention, I leverage the most advanced AI tools and cinematic techniques to produce advertisements that are visually stunning, emotionally compelling, and conversion-driven. From CGI product showcases to Pixar-quality 3D animations, every frame is crafted to perfection.
          </p>
          <p style={{ color: 'var(--pink-light)', fontWeight: 600, fontSize: '16px' }}>
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
        </div>
      </div>
    </section>
  );
}
