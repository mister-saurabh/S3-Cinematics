import { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheckCircle, FaPaperPlane, FaPhone, FaInstagram, FaTimes } from 'react-icons/fa';

const serviceOptions = [
  'Cinematic AI Ads', 'CGI', 'UGC', 'Storytelling', '3D Pixar Type', 'AI Avatar Services', 'AI Film Making', 'AI Voice & Dubbing', 'Product Visualization'
];

export default function OrderForm({ selectedPlan, onClearPlan }) {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', serviceType: '', budget: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // When a plan is selected from the Pricing section, pre-fill the form
  useEffect(() => {
    if (selectedPlan) {
      const planDetails = `📦 Selected Plan: ${selectedPlan.name} (${selectedPlan.price} ${selectedPlan.period})\n\n` +
        `Includes:\n${selectedPlan.features.map(f => `✅ ${f}`).join('\n')}\n\n` +
        `Please provide additional details about your project:`;

      setForm(prev => ({
        ...prev,
        description: planDetails,
      }));
    }
  }, [selectedPlan]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleClearPlan = () => {
    if (onClearPlan) onClearPlan();
    setForm(prev => ({ ...prev, description: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Build WhatsApp message with all order details
    const waText = `🎬 *New Order — S3 Cinematics*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email || 'Not provided'}\n` +
      `📱 *WhatsApp:* ${form.whatsapp}\n` +
      `🎯 *Service:* ${form.serviceType}\n` +
      `💰 *Budget:* ${form.budget}\n` +
      `📝 *Details:* ${form.description || 'No details provided'}\n\n` +
      `— Sent from S3 Cinematics Website`;
    const waUrl = `https://wa.me/919793483930?text=${encodeURIComponent(waText)}`;

    // Also try EmailJS in background (bonus — even if it fails, WhatsApp is the main channel)
    try {
      const emailJsData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: form.name,
          from_email: form.email,
          phone: form.whatsapp,
          service: form.serviceType,
          budget: form.budget,
          message: form.description
        }
      };
      if (emailJsData.service_id && emailJsData.template_id && emailJsData.user_id) {
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailJsData),
        }).catch(() => {});
      }
    } catch (_) {}

    // Auto-open WhatsApp immediately
    window.open(waUrl, '_blank');

    setSuccess({ clientWhatsappUrl: waUrl });
    setLoading(false);
  };

  if (success) {
    return (
      <section className="section order-section" id="book">
        <div className="order-wrapper">
          <div className="form-container">
            <div className="form-success">
              <FaCheckCircle size={56} color="#25d366" />
              <h3 style={{ marginTop: '16px', fontSize: '24px' }}>✅ Almost Done!</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#b0b0c0' }}>
                Thank you <strong style={{ color: '#4DA3FF' }}>{form.name}</strong>!
                Your order for <strong style={{ color: '#4DA3FF' }}>{form.serviceType}</strong> is ready.
              </p>

              {/* WhatsApp MANDATORY Box */}
              <div style={{
                background: 'rgba(37,211,102,0.12)', border: '2px solid rgba(37,211,102,0.5)',
                borderRadius: '16px', padding: '28px', margin: '24px 0', textAlign: 'center'
              }}>
                <FaWhatsapp size={40} color="#25d366" />
                <h4 style={{ color: '#25d366', fontWeight: 800, margin: '12px 0 8px', fontSize: '20px' }}>
                  👇 Send Your Order on WhatsApp
                </h4>
                <p style={{ color: '#fff', fontSize: '15px', margin: '0 0 6px', lineHeight: '1.7', fontWeight: 600 }}>
                  WhatsApp open ho gaya hoga — bas <span style={{ color: '#25d366', fontSize: '17px' }}>Send</span> button dabao!
                </p>
                <p style={{ color: '#b0b0c0', fontSize: '13px', margin: '0 0 20px', lineHeight: '1.6' }}>
                  Agar WhatsApp automatically nahi khula, to niche button se manually bhejo.
                  <br />Saurabh tumse WhatsApp par baat karega tumhari requirement ke baare mein.
                </p>
                <a href={success.clientWhatsappUrl} target="_blank" rel="noopener noreferrer" className="wa-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    background: 'linear-gradient(135deg, #25d366, #128C7E)', color: '#fff',
                    padding: '16px 36px', borderRadius: '50px', textDecoration: 'none',
                    fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px',
                    boxShadow: '0 8px 30px rgba(37,211,102,0.4)',
                    transition: 'all 0.3s ease'
                  }}>
                  <FaWhatsapp size={22} /> Send Order on WhatsApp Now
                </a>
                <p style={{ color: '#4DA3FF', fontSize: '12px', marginTop: '14px', fontWeight: 600 }}>
                  ⚠️ Order tabhi confirm hoga jab aap WhatsApp pe message bhejoge
                </p>
              </div>

              {/* Steps */}
              <div style={{
                background: 'rgba(77,163,255,0.08)', border: '1px solid rgba(77,163,255,0.2)',
                borderRadius: '14px', padding: '22px', margin: '16px 0', textAlign: 'left'
              }}>
                <p style={{ color: '#4DA3FF', fontWeight: 700, margin: '0 0 12px', fontSize: '15px' }}>📱 Kaise hoga aapka kaam?</p>
                <div style={{ color: '#b0b0c0', fontSize: '14px', lineHeight: '2' }}>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 1:</strong> WhatsApp pe message Send karo (upar button se)</p>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 2:</strong> Saurabh kuch ghanton mein reply karega</p>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 3:</strong> WhatsApp pe requirements discuss hogi</p>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 4:</strong> Aapka amazing AI ad deliver hoga! 🎬</p>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{
                background: 'var(--bg-elevated)', borderRadius: '12px', padding: '18px', margin: '16px 0',
                display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'
              }}>
                <a href="https://wa.me/919793483930" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#25d366', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaWhatsapp /> +91 9793483930
                </a>
                <a href="tel:+919793483930"
                  style={{ color: '#4DA3FF', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaPhone /> Call Us
                </a>
                <a href="https://instagram.com/s3.Cinematics" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#8B5CF6', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaInstagram /> @s3.Cinematics
                </a>
              </div>

              <button
                className="btn-primary"
                style={{ marginTop: '12px', fontSize: '13px', padding: '12px 28px' }}
                onClick={() => { setSuccess(null); setForm({ name: '', email: '', whatsapp: '', serviceType: '', budget: '', description: '' }); if (onClearPlan) onClearPlan(); }}
              >
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section order-section" id="book">
      <div className="section-label"><span className="line" /> Book Now</div>
      <h2 className="section-title">Let's Create Your Ad</h2>
      <p className="section-subtitle">Fill the form below — your order details will be sent directly to Saurabh on WhatsApp!</p>
      <div className="order-wrapper" style={{ marginTop: '40px' }}>
        <div className="form-container">
          <h3>📋 Order Form</h3>
          <p className="form-sub">Tell us about your project and we'll make it happen.</p>

          {/* Selected Plan Banner */}
          {selectedPlan && (
            <div className="selected-plan-banner">
              <div className="plan-banner-content">
                <div className="plan-banner-icon">🎬</div>
                <div className="plan-banner-info">
                  <span className="plan-banner-name">{selectedPlan.name} Plan</span>
                  <span className="plan-banner-price">{selectedPlan.price} <small>{selectedPlan.period}</small></span>
                </div>
              </div>
              <button className="plan-banner-close" onClick={handleClearPlan} aria-label="Remove plan">
                <FaTimes />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com (optional)" />
            </div>
            <div className="form-group">
              <label>WhatsApp Number *</label>
              <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+91 9876543210" required />
            </div>
            <div className="form-group">
              <label>What Ad Do You Want? *</label>
              <select name="serviceType" value={form.serviceType} onChange={handleChange} required>
                <option value="">Select a service...</option>
                {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Budget Estimate *</label>
              <select name="budget" value={form.budget} onChange={handleChange} required>
                <option value="">Select your budget...</option>
                <option value="Under ₹5,000">Under ₹5,000</option>
                <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                <option value="₹20,000+">₹20,000+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Project Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Tell us what you want — product name, style, duration, reference links, etc." />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                '⏳ Processing...'
              ) : (
                <><FaWhatsapp style={{ marginRight: '8px' }} /> Submit & Send on WhatsApp</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
