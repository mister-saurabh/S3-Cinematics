import { FaFilm, FaCube, FaUsers, FaBookOpen, FaMagic, FaVideo, FaCode, FaRobot } from 'react-icons/fa';

const services = [
  { icon: <FaVideo />, title: 'Realistic Ad', desc: 'Ultra-realistic AI-generated advertisements that look indistinguishable from real footage. Perfect for product launches and brand campaigns.' },
  { icon: <FaCube />, title: 'CGI', desc: 'Computer-generated imagery powered by AI to create stunning visual effects and impossible scenarios for your brand.' },
  { icon: <FaUsers />, title: 'UGC', desc: 'AI-crafted user-generated content style videos that feel authentic and drive massive engagement on social platforms.' },
  { icon: <FaBookOpen />, title: 'Storytelling Type', desc: 'Narrative-driven AI ads that tell compelling brand stories, create emotional connections, and leave lasting impressions.' },
  { icon: <FaMagic />, title: '3D Pixar Type', desc: 'Pixar-quality 3D animated advertisements with charming characters and vibrant worlds that captivate all audiences.' },
  { icon: <FaFilm />, title: 'Cinematic Ad', desc: 'Hollywood-grade cinematic advertisements with dramatic lighting, epic compositions, and breathtaking visual storytelling.' },
  { icon: <FaRobot />, title: 'AI Film Making', desc: 'Full AI-powered short films and brand movies with cinematic storytelling, character animation, VFX, and professional post-production.' },
  { icon: <FaCode />, title: 'Website Building', desc: 'Premium, conversion-focused websites designed to complement your ad campaigns and maximize your digital presence.' },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-label"><span className="line" /> What We Offer</div>
      <h2 className="section-title">Our Premium Services</h2>
      <p className="section-subtitle">Every service is crafted with AI precision and cinematic excellence to elevate your brand beyond imagination.</p>
      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
