import React from 'react';
import { motion } from 'framer-motion';
import qrImage from '../assets/images/qr-code.png';

const WholesaleConcierge = () => {
  return (
    <section className="wholesale-concierge container">
      <motion.div 
        className="concierge-card glass-luxury"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="concierge-icon">
          <span className="premium-tag">Wholesale & Export</span>
        </div>
        <h2 className="serif-title small">Bespoke Concierge</h2>
        <p className="concierge-desc">
          For bulk orders, international distribution, and corporate gifting, 
          please connect directly with our specialized fragrance consultants.
        </p>
        
        <div className="concierge-qr-section">
          <p className="qr-label">Scan for Quick Inquiry</p>
          <div className="concierge-qr-wrapper glass-luxury">
            <img src={qrImage} alt="Oud Alnood WhatsApp QR" className="concierge-qr" />
          </div>
        </div>

        <div className="concierge-actions">
          <a 
            href="https://wa.me/601111111111?text=Hello%2C%20I%20am%20interested%20in%20a%20wholesale%20partnership%20with%20Oud%20Alnood." 
            target="_blank" 
            rel="noopener noreferrer"
            className="concierge-btn whatsapp"
          >
            Connect via WhatsApp
          </a>
          <a 
            href="mailto:wholesale@oudalnood.com?subject=Bulk%20Inquiry" 
            className="concierge-btn email"
          >
            Email Specialist
          </a>
        </div>

        <div className="wholesale-benefits">
          <div className="benefit">
            <span className="dot"></span>
            <span>Tiered Bulk Pricing (30%+ Off)</span>
          </div>
          <div className="benefit">
            <span className="dot"></span>
            <span>Global Express Logistics</span>
          </div>
          <div className="benefit">
            <span className="dot"></span>
            <span>Custom Brand Solutions</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WholesaleConcierge;
