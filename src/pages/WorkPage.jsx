import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaInstagram, FaPlay } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

import imgLuxury from '../assets/portfolio-luxury.png';
import imgJewellery from '../assets/portfolio-jewellery.png';
import imgAutomobile from '../assets/portfolio-automobile.png';
import imgRealEstate from '../assets/portfolio-realestate.png';
import imgProduct from '../assets/portfolio-product.png';
import imgAICommercial from '../assets/portfolio-aicommercial.png';

const categories = [
  'All',
  'AI Commercials',
  'Luxury Brand Ads',
  'Jewellery Ads',
  'Automobile Ads',
  'Real Estate Ads',
  'Product Visualizations',
];

const projects = [
  {
    id: 1,
    title: 'Cinematic Brand Film',
    category: 'AI Commercials',
    image: imgAICommercial,
    client: 'Tech Brand',
    type: 'AI Commercial',
  },
  {
    id: 2,
    title: 'Luxury Perfume Campaign',
    category: 'Luxury Brand Ads',
    image: imgLuxury,
    client: 'Premium Fragrance',
    type: 'Product Ad',
  },
  {
    id: 3,
    title: 'Diamond Collection Showcase',
    category: 'Jewellery Ads',
    image: imgJewellery,
    client: 'Heritage Jewellers',
    type: 'Jewellery Ad',
  },
  {
    id: 4,
    title: 'Supercar Launch Film',
    category: 'Automobile Ads',
    image: imgAutomobile,
    client: 'Auto Brand',
    type: 'Automobile Ad',
  },
  {
    id: 5,
    title: 'Penthouse Living Experience',
    category: 'Real Estate Ads',
    image: imgRealEstate,
    client: 'Luxury Realty',
    type: 'Real Estate Ad',
  },
  {
    id: 6,
    title: 'Premium Audio Visualization',
    category: 'Product Visualizations',
    image: imgProduct,
    client: 'Audio Brand',
    type: 'Product Visualization',
  },
  {
    id: 7,
    title: 'Gold Necklace Reveal',
    category: 'Jewellery Ads',
    image: imgJewellery,
    client: 'Fine Jewellery',
    type: 'Jewellery Ad',
  },
  {
    id: 8,
    title: 'Futuristic AI Storytelling',
    category: 'AI Commercials',
    image: imgAICommercial,
    client: 'Innovation Corp',
    type: 'AI Commercial',
  },
  {
    id: 9,
    title: 'Premium Watch Showcase',
    category: 'Luxury Brand Ads',
    image: imgLuxury,
    client: 'Swiss Timepieces',
    type: 'Product Ad',
  },
];

export default function WorkPage() {
  const [active, setActive] = useState('All');
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-50px' });

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => p.category === active);

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
            Our Portfolio
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Work That{' '}
            <span className="highlight">Commands Attention</span>
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explore our cinematic AI productions — every project is crafted to
            make brands look unforgettable.
          </motion.p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="section work-section">
        {/* Category Filters */}
        <div className="work-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="work-gallery" ref={gridRef}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Link to={`/work/${project.id}`} className="work-card-link-wrapper">
                  <div className="work-card">
                    <div className="work-card-image">
                      <img src={project.image} alt={project.title} />
                      <div className="work-card-overlay">
                        <div className="work-card-play">
                          <FaPlay />
                        </div>
                      </div>
                    </div>
                    <div className="work-card-info">
                      <span className="work-card-type">{project.type}</span>
                      <h3>{project.title}</h3>
                      <p>Client: {project.client}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="work-instagram"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="work-insta-label">See More on Instagram</p>
          <a
            href="https://www.instagram.com/s3.cinematics/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-instagram-massive"
          >
            <div className="insta-icon-wrapper">
              <FaInstagram />
            </div>
            <div className="insta-text">
              <span>View Full Portfolio on</span>
              <strong>Instagram</strong>
            </div>
          </a>
        </motion.div>
      </section>
    </PageTransition>
  );
}
