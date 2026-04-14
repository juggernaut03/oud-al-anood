import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { t } = useAppContext();

  return (
    <section className="hero">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-badge">{t('footer_since')}</span>
          <h1 className="hero-title">{t('hero_title')}</h1>
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
          <Link to="/shop" className="cta-button">
            {t('shop_now')}
          </Link>
        </motion.div>

        <div className="hero-collage">
          <div className="collage-item large">
            <img src="/images/page1.png" alt="Perfume" />
          </div>
          <div className="collage-item small-1">
            <img src="/images/page3.png" alt="Oud Wood" />
          </div>
          <div className="collage-item small-2">
            <img src="/images/perfume.png" alt="Exquisite Oil" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
