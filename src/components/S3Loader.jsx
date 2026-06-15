import { motion } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

export default function S3Loader({ isInitial = false }) {
  return (
    <motion.div
      className="s3-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Ambient glow orbs */}
      <div className="loader-glow loader-glow-1" />
      <div className="loader-glow loader-glow-2" />

      {/* Camera focus ring */}
      <div className="loader-lens-ring">
        <div className="loader-lens-ring-inner" />
      </div>

      {/* Logo container with light sweep */}
      <motion.div
        className="loader-logo-wrapper"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="loader-logo-frame">
          <img src={logoImg} alt="S3 Cinematics" className="loader-logo-img" />
          <div className="loader-light-sweep" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        className="loader-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="loader-brand-name">S3 CINEMATICS</h2>
        <p className="loader-tagline">Crafting The Future of AI Storytelling</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="loader-progress-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="loader-progress-bar"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: isInitial ? 2.2 : 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </motion.div>
    </motion.div>
  );
}
