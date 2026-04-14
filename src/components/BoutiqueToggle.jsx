import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const BoutiqueToggle = () => {
  const { isWholesale, setIsWholesale } = useAppContext();

  return (
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
  );
};

export default BoutiqueToggle;
