import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaCheckCircle,
  FaTimes,
  FaPaperPlane,
} from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

import ownerImg2 from '../assets/owner2.png';

const contactInfo = [
  {
    icon: <FaPhone />,
    title: 'Call Us',
    content: '+91 9793483930',
    link: 'tel:+919793483930',
  },
  {
    icon: <FaWhatsapp />,
    title: 'WhatsApp',
    content: '+91 9793483930',
    link: 'https://wa.me/919793483930',
  },
  {
    icon: <FaInstagram />,
    title: 'Instagram',
    content: '@s3.Cinematics',
    link: 'https://instagram.com/s3.Cinematics',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    content: 'saurabhkumarprajapati2005@gmail.com',
    link: 'mailto:saurabhkumarprajapati2005@gmail.com',
  },
];

const serviceOptions = [
  'Cinematic AI Ads',
  'CGI',
  'UGC',
  'Storytelling',
  '3D Pixar Type',
  'AI Avatar Services',
  'AI Film Making',
  'AI Voice & Dubbing',
  'Product Visualization',
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get('plan');
  const [activeTab, setActiveTab] = useState(planFromUrl ? 'book' : 'contact');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    serviceType: '',
    budget: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sandbox = searchParams.get('sandbox');
    if (planFromUrl) {
      setActiveTab('book');
      setOrderForm((prev) => ({
        ...prev,
        description: `📦 Interested in: ${planFromUrl} Plan\n\nPlease provide additional details about your project:`,
      }));
    } else if (sandbox) {
      setActiveTab('book');
      const sbProduct = searchParams.get('product') || '';
      const sbStyle = searchParams.get('style') || '';
      const sbMood = searchParams.get('mood') || '';
      const sbAudio = searchParams.get('audio') || '';
      
      setOrderForm((prev) => ({
        ...prev,
        serviceType: 'Cinematic AI Ads',
        description: `🎨 Conceptual AI Commercial (Sandbox Design):\n- Product/Industry: ${sbProduct}\n- Visual Style: ${sbStyle}\n- Mood & Lighting: ${sbMood}\n- Audio & Sound: ${sbAudio}\n\nLet's produce this commercial! Here are my additional ideas:`,
      }));
    }
  }, [planFromUrl, searchParams]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const waText =
      `💬 *New Inquiry — S3 Cinematics*\n\n` +
      `👤 *Name:* ${contactForm.name}\n` +
      `📧 *Email:* ${contactForm.email}\n` +
      `📝 *Message:* ${contactForm.message}\n\n` +
      `— Sent from S3 Cinematics Website`;

    window.open(
      `https://wa.me/919793483930?text=${encodeURIComponent(waText)}`,
      '_blank'
    );

    try {
      const emailJsData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          service: 'Contact Form Inquiry',
          phone: 'N/A',
          budget: 'N/A',
        },
      };
      if (
        emailJsData.service_id &&
        emailJsData.template_id &&
        emailJsData.user_id
      ) {
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailJsData),
        }).catch(() => {});
      }
    } catch (_) {}

    setSent(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 8000);
    setLoading(false);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const waText =
      `🎬 *New Order — S3 Cinematics*\n\n` +
      `👤 *Name:* ${orderForm.name}\n` +
      `📧 *Email:* ${orderForm.email || 'Not provided'}\n` +
      `📱 *WhatsApp:* ${orderForm.whatsapp}\n` +
      `🎯 *Service:* ${orderForm.serviceType}\n` +
      `💰 *Budget:* ${orderForm.budget}\n` +
      `📝 *Details:* ${orderForm.description || 'No details provided'}\n\n` +
      `— Sent from S3 Cinematics Website`;

    window.open(
      `https://wa.me/919793483930?text=${encodeURIComponent(waText)}`,
      '_blank'
    );

    try {
      const emailJsData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: orderForm.name,
          from_email: orderForm.email,
          phone: orderForm.whatsapp,
          service: orderForm.serviceType,
          budget: orderForm.budget,
          message: orderForm.description,
        },
      };
      if (
        emailJsData.service_id &&
        emailJsData.template_id &&
        emailJsData.user_id
      ) {
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailJsData),
        }).catch(() => {});
      }
    } catch (_) {}

    setSent(true);
    setOrderForm({
      name: '',
      email: '',
      whatsapp: '',
      serviceType: '',
      budget: '',
      description: '',
    });
    setTimeout(() => setSent(false), 8000);
    setLoading(false);
  };

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
            Get In Touch
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's Create Something{' '}
            <span className="highlight">Amazing Together</span>
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Ready to transform your brand with cinematic AI content? Reach out
            and let's start your project.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-page-section">
        <div className="contact-page-grid">
          {/* Left: Contact Info */}
          <motion.div
            className="contact-page-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Owner card */}
            <div className="contact-owner-card">
              <div className="contact-owner-avatar">
                <img src={ownerImg2} alt="Saurabh Kr Prajapati" />
              </div>
              <div>
                <h4>Saurabh Kr Prajapati</h4>
                <p>Founder, ready to help you.</p>
              </div>
            </div>

            {contactInfo.map((c, i) => (
              <div className="contact-card" key={i}>
                <div className="icon-box">{c.icon}</div>
                <div>
                  <h4>{c.title}</h4>
                  <a href={c.link} target="_blank" rel="noopener noreferrer">
                    {c.content}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Form with Tabs */}
          <motion.div
            className="contact-page-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Tab Switcher */}
            <div className="contact-tabs">
              <button
                className={`contact-tab ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                <FaPaperPlane style={{ marginRight: '8px' }} />
                Send Message
              </button>
              <button
                className={`contact-tab ${activeTab === 'book' ? 'active' : ''}`}
                onClick={() => setActiveTab('book')}
              >
                <FaWhatsapp style={{ marginRight: '8px' }} />
                Book a Call
              </button>
            </div>

            <div className="form-container">
              {sent ? (
                <div className="form-success">
                  <FaWhatsapp size={48} color="#25d366" />
                  <h3 style={{ marginTop: '12px' }}>Message Sent! ✅</h3>
                  <p style={{ color: '#b0b0c0', marginTop: '8px' }}>
                    WhatsApp should have opened. Just hit Send and Saurabh will
                    reply shortly!
                  </p>
                  <a
                    href="https://wa.me/919793483930"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#25d366',
                      color: '#fff',
                      padding: '12px 28px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      marginTop: '16px',
                      fontSize: '14px',
                    }}
                  >
                    <FaWhatsapp size={18} /> Open WhatsApp
                  </a>
                </div>
              ) : activeTab === 'contact' ? (
                <>
                  <h3>💬 Send a Message</h3>
                  <p className="form-sub">
                    Have a question? Your message will be sent directly to
                    Saurabh on WhatsApp.
                  </p>
                  <form onSubmit={handleContactSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        placeholder="Tell us what you need..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={loading}
                    >
                      {loading ? (
                        '⏳ Sending...'
                      ) : (
                        <>
                          <FaWhatsapp style={{ marginRight: '8px' }} /> Send via
                          WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h3>📋 Book a Call</h3>
                  <p className="form-sub">
                    Tell us about your project — your order will be sent to
                    Saurabh on WhatsApp!
                  </p>

                  {planFromUrl && (
                    <div className="selected-plan-banner">
                      <div className="plan-banner-content">
                        <div className="plan-banner-icon">🎬</div>
                        <div className="plan-banner-info">
                          <span className="plan-banner-name">
                            {planFromUrl} Plan Selected
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleOrderSubmit}>
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        value={orderForm.name}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={orderForm.email}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="you@example.com (optional)"
                      />
                    </div>
                    <div className="form-group">
                      <label>WhatsApp Number *</label>
                      <input
                        type="tel"
                        value={orderForm.whatsapp}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            whatsapp: e.target.value,
                          })
                        }
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>What Ad Do You Want? *</label>
                      <select
                        value={orderForm.serviceType}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            serviceType: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select a service...</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Budget Estimate *</label>
                      <select
                        value={orderForm.budget}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            budget: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select your budget...</option>
                        <option value="Under ₹5,000">Under ₹5,000</option>
                        <option value="₹5,000 - ₹10,000">
                          ₹5,000 - ₹10,000
                        </option>
                        <option value="₹10,000 - ₹20,000">
                          ₹10,000 - ₹20,000
                        </option>
                        <option value="₹20,000+">₹20,000+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Project Description</label>
                      <textarea
                        value={orderForm.description}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Tell us what you want — product name, style, duration, reference links, etc."
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={loading}
                    >
                      {loading ? (
                        '⏳ Processing...'
                      ) : (
                        <>
                          <FaWhatsapp style={{ marginRight: '8px' }} /> Submit &
                          Send on WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
