import { motion } from 'framer-motion';
import { MessageCircle, Mail, Package, Globe, Palette, Shield, ArrowRight } from 'lucide-react';
import qrImage from '../assets/images/qr-code.png';
import './WholesaleConcierge.css';

const benefits = [
  { icon: Package, title: 'Tiered Bulk Pricing', desc: '30%+ off on orders of 12+ units' },
  { icon: Globe, title: 'Global Logistics', desc: 'Express shipping to 40+ countries' },
  { icon: Palette, title: 'Custom Branding', desc: 'Private label & custom packaging' },
  { icon: Shield, title: 'Quality Assured', desc: 'Certificate of authenticity included' },
];

const WholesaleConcierge = () => {
  return (
    <motion.section
      className="ws-concierge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top: Two-column layout */}
      <div className="ws-main">
        {/* Left: Info */}
        <div className="ws-info">
          <span className="ws-tag">Wholesale &amp; Export</span>
          <h2 className="ws-title">Bespoke Concierge</h2>
          <p className="ws-desc">
            For bulk orders, international distribution, and corporate gifting —
            connect directly with our specialized fragrance consultants.
          </p>

          {/* Benefits grid */}
          <div className="ws-benefits">
            {benefits.map((b) => (
              <div className="ws-benefit" key={b.title}>
                <div className="ws-benefit-icon">
                  <b.icon size={18} />
                </div>
                <div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="ws-actions">
            <a
              href="https://wa.me/601111111111?text=Hello%2C%20I%20am%20interested%20in%20a%20wholesale%20partnership%20with%20Oud%20Alnood."
              target="_blank"
              rel="noopener noreferrer"
              className="ws-btn ws-btn-whatsapp"
            >
              <MessageCircle size={18} />
              WhatsApp Us
              <ArrowRight size={15} />
            </a>
            <a
              href="mailto:wholesale@oudalnood.com?subject=Bulk%20Inquiry"
              className="ws-btn ws-btn-email"
            >
              <Mail size={18} />
              Email Specialist
            </a>
          </div>
        </div>

        {/* Right: QR Card */}
        <div className="ws-qr-side">
          <div className="ws-qr-card">
            <div className="ws-qr-frame">
              <img src={qrImage} alt="WhatsApp QR Code" />
            </div>
            <p className="ws-qr-label">Scan to start a conversation</p>
            <span className="ws-qr-hint">Opens WhatsApp directly</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WholesaleConcierge;
