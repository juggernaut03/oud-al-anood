import { motion } from 'framer-motion';
import './Hero.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { t, language, banners } = useAppContext();

  const heroBanner = banners.find((b) => b.section === 'hero');

  const title = heroBanner?.title?.[language] || t('hero_title');
  const subtitle = heroBanner?.subtitle?.[language] || t('hero_subtitle');
  const ctaText = heroBanner?.ctaText?.[language] || t('shop_now');
  const ctaLink = heroBanner?.ctaLink || '/shop';
  const image = heroBanner?.image || null;

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
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          <Link to={ctaLink} className="cta-button">
            {ctaText}
          </Link>
        </motion.div>

        <div className="hero-collage">
          {image ? (
            <div className="collage-item large">
              <img src={image} alt={title} />
            </div>
          ) : (
            <>
              <div className="collage-item large">
                <img src="/images/page1.png" alt="Perfume" />
              </div>
              <div className="collage-item small-1">
                <img src="/images/page3.png" alt="Oud Wood" />
              </div>
              <div className="collage-item small-2">
                <img src="/images/perfume.png" alt="Exquisite Oil" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
