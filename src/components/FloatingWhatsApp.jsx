import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919793483930"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="Chat on WhatsApp"
    >
      <div className="wa-icon-wrapper">
        <FaWhatsapp size={32} />
      </div>
      <div className="wa-pulse"></div>
      <div className="wa-pulse wa-pulse-delayed"></div>
    </a>
  );
}
