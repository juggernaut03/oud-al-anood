import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const BoutiqueToggle = () => {
  const { isWholesale, setIsWholesale, t } = useAppContext();

  return (
    <div className="channel-toggle-wrapper">
      <div className={`channel-toggle ${isWholesale ? 'wholesale' : 'retail'}`}>
        <button
          className={!isWholesale ? 'active' : ''}
          onClick={() => setIsWholesale(false)}
        >
          {t('toggle_retail')}
        </button>
        <button
          className={isWholesale ? 'active' : ''}
          onClick={() => setIsWholesale(true)}
        >
          {t('toggle_wholesale')}
        </button>
        <div className="toggle-slider"></div>
      </div>
      {isWholesale && (
        <motion.p
          className="wholesale-note"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('toggle_wholesale_note')}
        </motion.p>
      )}
    </div>
  );
};

export default BoutiqueToggle;
