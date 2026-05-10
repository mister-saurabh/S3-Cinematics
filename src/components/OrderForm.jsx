import { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheckCircle, FaPaperPlane, FaPhone, FaInstagram, FaTimes } from 'react-icons/fa';

const serviceOptions = [
  'Realistic Ad', 'CGI', 'UGC', 'Storytelling Type', '3D Pixar Type', 'Cinematic Ad', 'AI Film Making', 'Website Building'
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
    
    // EmailJS REST API setup
    const emailJsData = {
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service',
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
      user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key',
      template_params: {
        from_name: form.name,
        from_email: form.email,
        phone: form.whatsapp,
        service: form.serviceType,
        budget: form.budget,
        message: form.description
      }
    };

    try {
      // 1. Try EmailJS first
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailJsData),
      });

      // Alternatively, using Formspree if they prefer
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      if (!res.ok && formspreeEndpoint) {
        await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }

      // Generate optional WhatsApp URL for the user
      const waText = `Hi Saurabh, I just placed an order!\n\n*Name:* ${form.name}\n*Service:* ${form.serviceType}\n*Budget:* ${form.budget}\n*Details:* ${form.description}`;
      const waUrl = `https://wa.me/919793483930?text=${encodeURIComponent(waText)}`;

      setSuccess({ clientWhatsappUrl: waUrl });
    } catch (err) {
      alert('Failed to place order. Please try again.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <section className="section order-section" id="book">
        <div className="order-wrapper">
          <div className="form-container">
            <div className="form-success">
              <FaCheckCircle size={56} color="#ff2d8a" />
              <h3 style={{ marginTop: '16px', fontSize: '24px' }}>🎉 Order Confirmed!</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#b0b0c0' }}>
                Thank you <strong style={{ color: '#ff6bb5' }}>{form.name}</strong>!
                Your order for <strong style={{ color: '#ff6bb5' }}>{form.serviceType}</strong> has been placed successfully.
              </p>

              {/* WhatsApp Confirmation Box (Optional) */}
              <div style={{
                background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
                borderRadius: '14px', padding: '22px', margin: '24px 0', textAlign: 'left'
              }}>
                <p style={{ color: '#25d366', fontWeight: 700, margin: '0 0 10px', fontSize: '16px' }}>
                  <FaWhatsapp style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Optional: Connect on WhatsApp
                </p>
                <p style={{ color: '#b0b0c0', fontSize: '14px', margin: '0 0 16px', lineHeight: '1.7' }}>
                  We have already received your order via email! If you want a faster response, you can also send this directly to Saurabh on WhatsApp.
                </p>
                <a href={success.clientWhatsappUrl} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ display: 'inline-flex' }}>
                  <FaWhatsapp size={20} /> Send on WhatsApp (Optional)
                </a>
              </div>

              {/* Next Steps */}
              <div style={{
                background: 'rgba(255,45,138,0.08)', border: '1px solid rgba(255,45,138,0.2)',
                borderRadius: '14px', padding: '22px', margin: '16px 0', textAlign: 'left'
              }}>
                <p style={{ color: '#ff6bb5', fontWeight: 700, margin: '0 0 12px', fontSize: '15px' }}>📱 What Happens Next?</p>
                <div style={{ color: '#b0b0c0', fontSize: '14px', lineHeight: '2' }}>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 1:</strong> We review your requirements</p>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 2:</strong> Saurabh will contact you shortly</p>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 3:</strong> Finalize the project details</p>
                  <p style={{ margin: '0' }}>✅ <strong style={{ color: '#fff' }}>Step 4:</strong> Get your amazing AI ad delivered! 🎬</p>
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
                  style={{ color: '#ff6bb5', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaPhone /> Call Us
                </a>
                <a href="https://instagram.com/s3.Cinematics" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#ff6bb5', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaInstagram /> @s3.Cinematics
                </a>
              </div>

              <button
                className="btn-primary"
                style={{ marginTop: '12px', fontSize: '13px', padding: '12px 28px' }}
                onClick={() => { setSuccess(null); setForm({ name: '', email: '', whatsapp: '', serviceType: '', description: '' }); if (onClearPlan) onClearPlan(); }}
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
      <p className="section-subtitle">Fill the form below. We will receive your details instantly via email!</p>
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
                <><FaPaperPlane style={{ marginRight: '8px' }} /> Submit Order</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
