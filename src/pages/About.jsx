import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api';
import './About.css';

const About = () => {
  const { t, language } = useAppContext();
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get('/api/about').then(({ data }) => setAbout(data?.data)).catch(() => {});
  }, []);

  const sections = about?.sections
    ?.filter((s) => s.isActive !== false)
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)) || [];

  const pageTitle = about?.pageTitle?.[language] || about?.pageTitle?.en || t('nav_about');

  return (
    <div className="about-page container">
      <div className="about-hero">
        <h1 className="about-title">{pageTitle}</h1>
        <div className="section-line"></div>
      </div>

      {sections.length === 0 && !about && (
        <div className="about-content">
          <div className="about-text-section">
            <h2>{t('about_legacy_title')}</h2>
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
          </div>
          <div className="about-image-section">
            <img
              src="https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=1200"
              alt={t('about_legacy_title')}
            />
          </div>
        </div>
      )}

      {sections.map((sec, idx) => (
        <div key={sec._id} className={`about-content ${idx % 2 === 1 ? 'about-content--reverse' : ''}`}>
          <div className="about-text-section">
            {sec.title?.[language] || sec.title?.en ? (
              <h2>{sec.title?.[language] || sec.title?.en}</h2>
            ) : null}
            {(sec.body?.[language] || sec.body?.en || '').split('\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {sec.image && (
            <div className="about-image-section">
              <img src={sec.image} alt={sec.title?.[language] || sec.title?.en || ''} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default About;
