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
          <h2>Our Legacy</h2>
          <p>
            Established since 1995, OUD AL-ANOOD has been a beacon of prestige and quality in the world of 
            Oriental fragrances. Founded with a passion for the deep, soulful essences of nature, 
            we have dedicated nearly three decades to perfecting the art of oud distillation and perfume blending.
          </p>
          <p>
            Our journey began in the vibrant heart of Kuala Lumpur, where we established our flagship store 
            at Bukit Bintang. Today, we continue to serve a global clientele who seeks the authenticity 
            and depth that only true artisanal oud can provide.
          </p>
        </div>
        <div className="about-image-section">
          <img src="https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=1200" alt="Oud Wood Artisanal" />
        </div>
      </div>

    </div>
  );
};

export default About;
