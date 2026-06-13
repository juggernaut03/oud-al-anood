import { useAppContext } from '../context/AppContext';
import { X, MapPin, Navigation, Clock, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoreSelector.css';

const StoreSelector = () => {
  const {
    isStoreSelectorOpen,
    toggleStoreSelector,
    stores,
    language,
    t
  } = useAppContext();

  const handleClose = () => {
    toggleStoreSelector();
  };

  if (!isStoreSelectorOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="drive-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="drive-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="drive-close" onClick={handleClose}>
            <X size={20} />
          </button>

          <motion.div
            className="drive-select-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="drive-header">
              <div className="drive-header-icon">
                <Navigation size={24} />
              </div>
              <span className="drive-label">{t('store_visit')}</span>
              <h2 className="drive-title">{t('store_drive_title')}</h2>
              <p className="drive-subtitle">{t('store_drive_subtitle')}</p>
            </div>

            <div className="drive-store-cards">
              {stores.map((store, index) => (
                <motion.div
                  key={store.id}
                  className="drive-store-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="drive-card-pin">
                    <MapPin size={22} />
                  </div>
                  <div className="drive-card-body">
                    <h3>{store.name[language]}</h3>
                    <p className="drive-card-address">{store.address[language]}</p>
                    <div className="drive-card-details">
                      <span className="drive-card-hours">
                        <Clock size={13} />
                        {store.hours?.[language] || t('store_hours')}
                      </span>
                      {store.phone && (
                        <span className="drive-card-hours">
                          <Phone size={13} />
                          {store.phone}
                        </span>
                      )}
                    </div>
                    <a
                      href={store.navLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="drive-card-directions"
                    >
                      <Navigation size={15} />
                      <span>{t('store_directions')}</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="drive-footer-note">
              <Sparkles size={14} />
              <span>{t('store_consult')}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoreSelector;
