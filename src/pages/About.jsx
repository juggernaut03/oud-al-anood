import { useAppContext } from '../context/AppContext';
import './About.css';

const About = () => {
  const { t } = useAppContext();

  return (
    <div className="about-page container">
      <div className="about-hero">
        <h1 className="about-title">{t('nav_about')}</h1>
        <div className="section-line"></div>
      </div>

      <div className="about-content">
        <div className="about-text-section">
          <h2>{t('about_legacy_title')}</h2>
          <p>{t('about_p1')}</p>
          <p>{t('about_p2')}</p>
        </div>
        <div className="about-image-section">
          <img src="https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=1200" alt={t('about_legacy_title')} />
        </div>
      </div>
    </div>
  );
};

export default About;
