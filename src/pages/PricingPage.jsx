import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FaCheck,
  FaCrown,
  FaStar,
  FaRocket,
  FaWhatsapp,
  FaArrowRight,
  FaQuestionCircle,
} from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

const plans = [
  {
    name: 'Starter',
    icon: <FaStar />,
    price: '₹2,999',
    period: 'per video',
    tagline: 'Perfect for small businesses & startups',
    popular: false,
    features: [
      '15-30 second AI ad',
      '1 revision included',
      'HD quality (1080p)',
      'Background music',
      '3-5 day delivery',
      'WhatsApp support',
    ],
    notIncluded: ['Custom soundtrack', 'Priority delivery', '4K quality'],
  },
  {
    name: 'Professional',
    icon: <FaCrown />,
    price: '₹6,999',
    period: 'per video',
    tagline: 'Most popular for growing brands',
    popular: true,
    features: [
      '30-60 second AI ad',
      '3 revisions included',
      'Full HD quality (1080p)',
      'Custom background music',
      'Script writing included',
      '5-7 day delivery',
      'Priority WhatsApp support',
      'Social media optimized formats',
    ],
    notIncluded: ['4K quality', 'Custom soundtrack'],
  },
  {
    name: 'Premium',
    icon: <FaRocket />,
    price: '₹14,999',
    period: 'per video',
    tagline: 'For brands that demand excellence',
    popular: false,
    features: [
      '60-120 second AI ad',
      'Unlimited revisions',
      '4K Ultra HD quality',
      'Custom soundtrack & SFX',
      'Script + storyboard',
      '7-10 day delivery',
      'Priority support',
      'All social media formats',
      'Raw project files included',
      'Brand kit integration',
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    q: 'How long does it take to deliver?',
    a: 'Depending on the plan, delivery ranges from 3-10 business days. Rush delivery options are available on request.',
  },
  {
    q: 'Can I request revisions?',
    a: 'Absolutely! Each plan includes revisions. The Premium plan includes unlimited revisions until you are 100% satisfied.',
  },
  {
    q: 'What formats do you deliver in?',
    a: 'We deliver in all major formats — MP4, MOV, and optimized versions for Instagram, TikTok, YouTube, and Facebook.',
  },
  {
    q: 'Do you offer custom packages?',
    a: 'Yes! For brands with unique needs, we create fully customized packages. Contact us via WhatsApp to discuss your requirements.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'Your satisfaction is our priority. We work closely with you throughout the process and offer revisions to ensure the final product exceeds expectations.',
  },
];

export default function PricingPage() {
  const gridRef = useRef(null);
  const faqRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-60px' });

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
            Pricing
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Simple, <span className="highlight">Transparent Pricing</span>
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Choose the perfect plan for your brand. Every plan includes
            stunning AI-powered cinematic production.
          </motion.p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="section pricing-section" ref={gridRef}>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {plan.popular && (
                <div className="popular-badge">⚡ Most Popular</div>
              )}
              <div className="pricing-icon">{plan.icon}</div>
              <h3 className="pricing-name">{plan.name}</h3>
              <p className="pricing-tagline">{plan.tagline}</p>
              <div className="pricing-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j} className="feature-included">
                    <FaCheck className="feature-icon included" /> {f}
                  </li>
                ))}
                {plan.notIncluded.map((f, j) => (
                  <li key={`no-${j}`} className="feature-excluded">
                    <span className="feature-icon excluded">✕</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?plan=${encodeURIComponent(plan.name)}`}
                className={`pricing-btn ${plan.popular ? 'primary' : 'outline'}`}
              >
                Get Started{' '}
                <FaArrowRight
                  style={{ marginLeft: '8px', fontSize: '12px' }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="pricing-custom">
          <p>Need a custom package? We're here to help!</p>
          <a
            href="https://wa.me/919793483930?text=Hi!%20I%20need%20a%20custom%20pricing%20package%20for%20S3%20Cinematics."
            target="_blank"
            rel="noopener noreferrer"
            className="pricing-custom-btn"
          >
            <FaWhatsapp style={{ marginRight: '8px' }} /> Contact Us for Custom
            Pricing
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="section pricing-faq-section"
        style={{ background: 'var(--bg-secondary)' }}
        ref={faqRef}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="line" /> Frequently Asked Questions
          </div>
          <h2
            className="section-title"
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            Got Questions?
          </h2>
        </motion.div>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <motion.div
              className="faq-card"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="faq-icon">
                <FaQuestionCircle />
              </div>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
