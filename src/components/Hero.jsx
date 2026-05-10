export default function Hero() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <section className="hero" id="home">
      <div className="floating-particles">
        {particles.map((p) => (
          <div key={p.id} className="particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, width: p.size, height: p.size }} />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          AI-Powered Ad Production
        </div>
        <h1>
          We Create <span className="highlight">Cinematic</span><br />
          AI Advertisements
        </h1>
        <p>
          Transform your brand with hyper-realistic AI-generated video ads.
          From CGI to cinematic storytelling — we bring your vision to life with cutting-edge artificial intelligence.
        </p>
        <div className="hero-buttons">
          <a href="#book" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Book Your Ad →
          </a>
          <a href="#services" className="btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Explore Services
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat"><h3>50+</h3><p>Projects Delivered</p></div>
          <div className="stat"><h3>100%</h3><p>Client Satisfaction</p></div>
          <div className="stat"><h3>24hr</h3><p>Quick Turnaround</p></div>
        </div>
      </div>
    </section>
  );
}
