import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, MapPin, Navigation, Clock, Phone, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoreSelector.css';

const StoreSelector = () => {
  const {
    isStoreSelectorOpen,
    toggleStoreSelector,
    stores,
    selectedStore,
    setSelectedStore,
    language,
    t
  } = useAppContext();

  const [viewMode, setViewMode] = useState('select');

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setViewMode('map');
  };

  const handleBack = () => setViewMode('select');

  const handleClose = () => {
    setViewMode('select');
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

          <AnimatePresence mode="wait">
            {viewMode === 'select' ? (
              <motion.div
                className="drive-select-view"
                key="select"
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
                    <motion.button
                      key={store.id}
                      className={`drive-store-card ${selectedStore.id === store.id ? 'selected' : ''}`}
                      onClick={() => handleStoreSelect(store)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
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
                            {t('store_hours')}
                          </span>
                        </div>
                      </div>
                      <div className="drive-card-arrow">
                        <ChevronRight size={20} />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="drive-footer-note">
                  <Sparkles size={14} />
                  <span>{t('store_consult')}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="drive-map-view"
                key="map"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="drive-map-header">
                  <button className="drive-back-btn" onClick={handleBack}>
                    <ChevronRight size={18} className="back-icon" />
                    <span>{t('store_all_locations')}</span>
                  </button>
                  <div className="drive-map-store-name">
                    <MapPin size={16} />
                    <h3>{selectedStore.name[language]}</h3>
                  </div>
                </div>

                <div className="drive-map-container">
                  <iframe
                    title={selectedStore.name[language]}
                    src={selectedStore.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                <div className="drive-map-footer">
                  <div className="drive-map-info">
                    <div className="drive-info-item">
                      <div className="drive-info-icon"><MapPin size={16} /></div>
                      <span>{selectedStore.address[language]}</span>
                    </div>
                    <div className="drive-info-item">
                      <div className="drive-info-icon"><Clock size={16} /></div>
                      <span>{t('store_daily_hours')}</span>
                    </div>
                    <div className="drive-info-item">
                      <div className="drive-info-icon"><Phone size={16} /></div>
                      <span>+60 3-1234 5678</span>
                    </div>
                  </div>

                  <a
                    href={selectedStore.navLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="drive-navigate-btn"
                  >
                    <Navigation size={18} />
                    <span>{t('store_directions')}</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoreSelector;
