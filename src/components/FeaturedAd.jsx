import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import pixarThumb from '../assets/ig-3d-pixar.jpg';

const FeaturedAd = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="featured-ad-section" id="featured-ad" ref={ref}>
      <motion.div
        className="featured-ad-container"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="ad-header">
          <span className="ad-badge">Latest Cinematic Production</span>
          <h2 className="ad-title">The Standard of AI Advertising</h2>
        </div>
        
        <a 
          href="https://www.instagram.com/p/DYffRhJTbqm/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ad-video-wrapper"
        >
          <img src={pixarThumb} alt="S3 Cinematics Featured Ad" className="ad-thumbnail" />
          <div className="ad-overlay">
            <div className="play-button pulse-effect">
              <FaPlay />
            </div>
            <div className="ad-overlay-text">
              <h3>Click to Watch Full Commercial</h3>
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default FeaturedAd;
