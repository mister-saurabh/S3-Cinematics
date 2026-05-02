import { FaCheck, FaCrown, FaStar, FaRocket, FaWhatsapp, FaArrowRight } from 'react-icons/fa';

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
    notIncluded: [
      'Custom soundtrack',
      'Priority delivery',
      '4K quality',
    ]
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
    notIncluded: [
      '4K quality',
      'Custom soundtrack',
    ]
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
    notIncluded: []
  },
];

export default function Pricing({ onSelectPlan }) {
  const handleGetQuote = (plan) => {
    if (onSelectPlan) {
      onSelectPlan(plan);
    } else {
      // Fallback: just scroll to the book section
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-label"><span className="line" /> Pricing</div>
      <h2 className="section-title">Simple, Transparent Pricing</h2>
      <p className="section-subtitle">Choose the perfect plan for your brand. Every plan includes stunning AI-powered video production.</p>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={i}>
            {plan.popular && <div className="popular-badge">⚡ Most Popular</div>}
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
            <button
              className={`pricing-btn ${plan.popular ? 'primary' : 'outline'}`}
              onClick={() => handleGetQuote(plan)}
            >
              Get Quote <FaArrowRight style={{ marginLeft: '8px', fontSize: '12px' }} />
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-custom">
        <p>Need a custom package? We're here to help!</p>
        <a href="https://wa.me/919793483930?text=Hi!%20I%20need%20a%20custom%20pricing%20package%20for%20S3%20Cinematics." target="_blank" rel="noopener noreferrer" className="pricing-custom-btn">
          <FaWhatsapp style={{ marginRight: '8px' }} /> Contact Us for Custom Pricing
        </a>
      </div>
    </section>
  );
}
