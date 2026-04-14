import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Shop = () => {
  const { t, isWholesale, setIsWholesale } = useAppContext();
  
  return (
    <div className="shop-page">
      <div className="page-header container">
        <h1 className="serif-title">{t('nav_shop')}</h1>
        <p className="subtitle">Curated collections of the finest oriental fragrances.</p>
        
        {/* Luxury Toggle Switch */}
        <div className="channel-toggle-wrapper">
          <div className={`channel-toggle ${isWholesale ? 'wholesale' : 'retail'}`}>
            <button 
              className={!isWholesale ? 'active' : ''} 
              onClick={() => setIsWholesale(false)}
            >
              Retail
            </button>
            <button 
              className={isWholesale ? 'active' : ''} 
              onClick={() => setIsWholesale(true)}
            >
              Wholesale
            </button>
            <div className="toggle-slider"></div>
          </div>
          {isWholesale && (
            <motion.p 
              className="wholesale-note"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              * Bulk pricing applied (30% discount). Minimum order: 12 units.
            </motion.p>
          )}
        </div>
      </div>
      </div>
      
      {!isWholesale ? (
        <ProductGrid />
      ) : (
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
      )}
    </div>
  );
};

export default Shop;
