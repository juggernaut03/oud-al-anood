import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

const Offers = () => {
  const { language, products } = useAppContext();
  
  const festivalSets = [
    {
      id: 1,
      title: { en: 'Eid Al-Fitr Gold Set', ar: 'طقم عيد الفطر الذهبي' },
      description: { 
        en: 'A majestic combination of our finest Kalakassi Oud and traditional Cambodian Aged 25 years.', 
        ar: 'مزيج مهيب من أجود أنواع عود كالكاسي والكمبودي التقليدي المعتق لمدة ٢٥ عاماً.' 
      },
      price: 499,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800',
      tag: 'Eid Exclusive'
    },
    {
      id: 2,
      title: { en: 'Ramadan Night Collection', ar: 'مجموعة ليالي رمضان' },
      description: { 
        en: 'Deep, smoky notes designed for the spiritual serenity of Ramadan nights.', 
        ar: 'نوتات عميقة ومدخنة مصممة للهدوء الروحاني في ليالي رمضان.' 
      },
      price: 280,
      image: 'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=800',
      tag: 'Limited Edition'
    }
  ];

  return (
    <div className="offers-page container">
      <div className="page-header center">
        <span className="premium-tag">Editorial</span>
        <h1 className="serif-title">Festivals & Specials</h1>
        <p className="subtitle pinkish">Celebrating heritage through artisanal fragrance sets.</p>
      </div>

      <div className="festivals-grid">
        {festivalSets.map(set => (
          <motion.div 
            key={set.id}
            className="festival-card-large glass-luxury"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="festival-img">
              <img src={set.image} alt={set.title[language]} />
              <div className="festival-badge-shimmer">
                <Sparkles size={14} />
                <span>{set.tag}</span>
              </div>
            </div>
            <div className="festival-details">
              <div className="fest-meta">
                <Calendar size={16} />
                <span>Seasonal Exclusive</span>
              </div>
              <h2 className="serif-title small">{set.title[language]}</h2>
              <p className="fest-desc">{set.description[language]}</p>
              <div className="fest-footer">
                <span className="fest-price">RM {set.price.toFixed(2)}</span>
                <Link to="/shop" className="fest-cta">
                  Reserve This Set <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="seasonal-banner glass-luxury">
        <div className="banner-content">
          <h2 className="serif-title small">Bespoke Gifting</h2>
          <p>Elevate your celebrations with custom-engraved oud sets and luxury packaging solutions.</p>
          <Link to="/contact" className="contact-specialist">Consult a Gifting Specialist</Link>
        </div>
      </section>
    </div>
  );
};

export default Offers;
