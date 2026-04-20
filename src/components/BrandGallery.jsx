import { useState } from 'react';
import './BrandGallery.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BrandGallery = () => {
  const { t } = useAppContext();
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    '/images/page1.png',
    '/images/page2.png',
    '/images/page3.png',
    '/images/page4.png',
    '/images/page5.png',
    '/images/page6.png',
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = images.indexOf(selectedImg);
    setSelectedImg(images[(currentIndex + 1) % images.length]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = images.indexOf(selectedImg);
    setSelectedImg(images[(currentIndex - 1 + images.length) % images.length]);
  };

  return (
    <section className="brand-gallery container">
      <div className="section-header">
        <h2 className="section-title">{t('gallery_title')}</h2>
        <div className="section-line"></div>
      </div>

      <div className="gallery-grid">
        {images.slice(0, 3).map((img, index) => (
          <motion.div
            key={index}
            className={`gallery-item item-${index + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onClick={() => setSelectedImg(img)}
          >
            <img src={img} alt={`OUD AL-ANOOD ${index + 1}`} />
            <div className="overlay"><span>{t('gallery_view')}</span></div>
          </motion.div>
        ))}

        <motion.div
          className="gallery-logo-tile"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <div className="gallery-logo-inner">
            <img src="/images/perfume.png" alt="Oud Al-Anood" className="gallery-logo-img" />
            <span className="gallery-logo-tagline">{t('gallery_since')}</span>
          </div>
        </motion.div>

        {images.slice(3).map((img, index) => (
          <motion.div
            key={index + 3}
            className={`gallery-item item-${index + 4}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index + 3) * 0.1, duration: 0.6 }}
            onClick={() => setSelectedImg(img)}
          >
            <img src={img} alt={`OUD AL-ANOOD ${index + 4}`} />
            <div className="overlay"><span>{t('gallery_view')}</span></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button className="close-lightbox"><X size={32} /></button>
            <button className="nav-btn prev" onClick={handlePrev}><ChevronLeft size={40} /></button>
            <button className="nav-btn next" onClick={handleNext}><ChevronRight size={40} /></button>
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img src={selectedImg} alt="OUD AL-ANOOD" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrandGallery;
