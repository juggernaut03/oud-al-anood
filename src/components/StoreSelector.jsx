import React from 'react';
import { useAppContext } from '../context/AppContext';
import { X, MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StoreSelector = () => {
  const { 
    isStoreSelectorOpen, 
    toggleStoreSelector, 
    stores, 
    selectedStore, 
    setSelectedStore, 
    language 
  } = useAppContext();

  if (!isStoreSelectorOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={toggleStoreSelector}>
        <motion.div 
          className="store-selector-modal glass-luxury"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal-btn" onClick={toggleStoreSelector}>
            <X size={24} />
          </button>

          <div className="store-selector-layout">
            {/* Left: Store List */}
            <div className="store-sidebar">
              <h2 className="serif-title small">Boutique Locations</h2>
              <p className="sidebar-desc">Select a boutique to view details and get directions.</p>
              
              <div className="store-list">
                {stores.map(store => (
                  <button 
                    key={store.id}
                    className={`store-item-card ${selectedStore.id === store.id ? 'active' : ''}`}
                    onClick={() => setSelectedStore(store)}
                  >
                    <div className="store-item-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="store-item-info">
                      <h3>{store.name[language]}</h3>
                      <p>{store.address[language]}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Map & Directions */}
            <div className="store-main-view">
              <div className="map-container-premium">
                <iframe 
                  title={selectedStore.name[language]}
                  src={selectedStore.mapEmbed}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>

              <div className="store-action-footer">
                <div className="store-meta-info">
                  <div className="meta-row">
                    <Clock size={16} />
                    <span>Daily: 10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="meta-row">
                    <Phone size={16} />
                    <span>+60 3-1234 5678</span>
                  </div>
                </div>
                
                <a 
                  href={selectedStore.navLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="drive-to-btn-large"
                >
                  <Navigation size={20} />
                  Drive to This Boutique
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StoreSelector;
