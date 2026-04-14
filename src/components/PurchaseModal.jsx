import { motion, AnimatePresence } from 'framer-motion';
import './PurchaseModal.css';
import { X, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PurchaseModal = ({ isOpen, onClose, product }) => {
  const { language } = useAppContext();

  if (!isOpen || !product) return null;

  const platforms = [
    { id: 'shopee', name: 'Shopee', logo: '/images/shopee.png', color: '#EE4D2D' },
    { id: 'grab', name: 'Grab', logo: '/images/grab.png', color: '#00B14F' },
    { id: 'lalamove', name: 'Lalamove', logo: '/images/lalamove.png', color: '#F68B1E' },
    { id: 'jnt', name: 'J&T Express', logo: '/images/jnt.png', color: '#FF0000' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="purchase-modal glass-luxury"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="modal-header">
            <span className="premium-tag">Authorized Partners</span>
            <h3 className="serif-title small">Purchase Through</h3>
            <p className="product-name-highlight">{product.name[language]}</p>
          </div>

          <motion.div 
            className="platforms-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {platforms.map((platform) => (
              <motion.a
                key={platform.id}
                href={product.purchaseLinks?.[platform.id] || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-btn-luxury"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--platform-color': platform.color }}
              >
                <div className="platform-logo-container">
                  <img src={platform.logo} alt={platform.name} className="platform-logo" />
                </div>
                <div className="platform-content">
                  <span className="platform-label">SHOP ON</span>
                  <span className="platform-title">{platform.name}</span>
                </div>
                <ExternalLink size={16} className="link-icon-sleek" />
              </motion.a>
            ))}
          </motion.div>

          <div className="modal-footer-sleek">
            <p>Direct premium delivery via Grab & Lalamove</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PurchaseModal;
