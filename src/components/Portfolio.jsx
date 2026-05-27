import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section portfolio-simplified-section" id="work" ref={ref}>
      <motion.div
        className="portfolio-simplified-content"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <span className="line" /> Our Portfolio
        </div>
        <h2 className="section-title">Experience Our Best Work</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 40px', maxWidth: '700px' }}>
          We consistently publish our latest cinematic AI ads, CGI visuals, storytelling content, and AI avatars on our Instagram. Join our community and see the magic in action.
        </p>

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
  );
};

export default Portfolio;
