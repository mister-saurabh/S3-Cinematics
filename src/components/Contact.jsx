import { useState } from 'react';
import { FaPhone, FaWhatsapp, FaInstagram, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

import ownerImg2 from '../assets/owner2.png';

const contactInfo = [
  { icon: <FaPhone />, title: 'Call Us', content: '+91 9793483930', link: 'tel:+919793483930' },
  { icon: <FaWhatsapp />, title: 'WhatsApp', content: '+91 9793483930', link: 'https://wa.me/919793483930' },
  { icon: <FaInstagram />, title: 'Instagram', content: '@s3.Cinematics', link: 'https://instagram.com/s3.Cinematics' },
  { icon: <FaEnvelope />, title: 'Email', content: 'saurabhkumarprajapati2005@gmail.com', link: 'mailto:saurabhkumarprajapati2005@gmail.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send via EmailJS REST API
      const emailJsData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service',
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key',
        template_params: {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          service: 'Contact Form Inquiry',
          phone: 'N/A',
          budget: 'N/A'
        }
      };

      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailJsData),
      });

      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 8000);
    } catch (err) {
      // Fallback: open WhatsApp with the message
      const waText = `Hi, I'm ${form.name}.\nEmail: ${form.email}\n\n${form.message}`;
      window.open(`https://wa.me/919793483930?text=${encodeURIComponent(waText)}`, '_blank');
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 8000);
    }
    setLoading(false);
  };

  return (
    <section className="section" id="contact">
      <div className="section-label"><span className="line" /> Get In Touch</div>
      <h2 className="section-title">Contact Us</h2>
      <p className="section-subtitle">Ready to create something amazing? Reach out through any channel below.</p>
      <div className="contact-grid">
        <div className="contact-info">
          
          {/* Owner image for personal touch */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px',
            background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius)',
            border: '1px solid var(--glass-border)'
          }}>
            <div style={{
              width: '84px', height: '84px', borderRadius: '50%', padding: '2px',
              background: 'linear-gradient(135deg, #ffd700, #ff2d8a, #ff6bb5)',
              boxShadow: '0 0 15px rgba(255, 45, 138, 0.4)', flexShrink: 0
            }}>
              <img src={ownerImg2} alt="Saurabh Kr Prajapati" style={{
                width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                border: '2px solid var(--bg-deep)'
              }} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '18px', fontFamily: "'Playfair Display', serif" }}>Saurabh Kr</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px' }}>Founder, ready to help you.</p>
            </div>
          </div>

          {contactInfo.map((c, i) => (
            <div className="contact-card" key={i}>
              <div className="icon-box">{c.icon}</div>
              <div>
                <h4>{c.title}</h4>
                <a href={c.link} target="_blank" rel="noopener noreferrer">{c.content}</a>
              </div>
            </div>
          ))}
        </div>
        <div className="form-container">
          {sent ? (
            <div className="form-success">
              <div className="check">✅</div>
              <h3>Message Sent!</h3>
              <p>We've received your message and will get back to you shortly!</p>
            </div>
          ) : (
            <>
              <h3>💬 Send a Message</h3>
              <p className="form-sub">Have a question? Drop us a line — we'll get back to you via email.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you need..." required />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? '⏳ Sending...' : <><FaPaperPlane style={{ marginRight: '8px' }} /> Send Message</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
