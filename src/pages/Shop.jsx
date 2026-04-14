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
      <ProductGrid />
    </div>
  );
};

export default Shop;
