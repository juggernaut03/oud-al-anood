import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift, Star, Clock, Crown, Flame } from 'lucide-react';
import './Offers.css';

const festivalSets = [
  {
    id: 1,
    title: { en: 'Eid Al-Fitr Gold Set', ar: 'طقم عيد الفطر الذهبي' },
    description: {
      en: 'A majestic combination of our finest Kalakassi Oud and traditional Cambodian Aged 25 years. Presented in a hand-crafted wooden chest.',
      ar: 'مزيج مهيب من أجود أنواع عود كالكاسي والكمبودي التقليدي المعتق لمدة ٢٥ عاماً. يُقدم في صندوق خشبي مصنوع يدوياً.',
    },
    originalPrice: 620,
    price: 499,
    image: '/images/page2.png',
    tag: 'Eid Exclusive',
    includes: ['Kalakassi Oud Oil 3ml', 'Cambodian Aged 3ml', 'Luxury Gift Box'],
  },
  {
    id: 2,
    title: { en: 'Ramadan Night Collection', ar: 'مجموعة ليالي رمضان' },
    description: {
      en: 'Deep, smoky notes designed for the spiritual serenity of Ramadan nights. A curated duo of Hindi Turabi and Cambodian Old.',
      ar: 'نوتات عميقة ومدخنة مصممة للهدوء الروحاني في ليالي رمضان. ثنائي منتقى من هندي ترابي وكمبودي قديم.',
    },
    originalPrice: 350,
    price: 280,
    image: '/images/page4.png',
    tag: 'Limited Edition',
    includes: ['Hindi Turabi 3ml', 'Cambodian Old 3ml', 'Velvet Pouch'],
  },
];

const perks = [
  { icon: Gift, title: 'Gift Wrapping', desc: 'Complimentary luxury packaging on all seasonal sets' },
  { icon: Crown, title: 'Loyalty Points', desc: '2x points on every festival collection purchase' },
  { icon: Flame, title: 'Free Sample', desc: 'Receive a bonus sample of our newest release' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Offers = () => {
  const { language } = useAppContext();

  return (
    <div className="offers-page">
      {/* Hero Banner */}
      <section className="offers-hero">
        <div className="offers-hero-bg" />
        <motion.div
          className="offers-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="offers-hero-tag">
            <Sparkles size={14} />
            Seasonal Collection
          </span>
          <h1 className="offers-hero-title">Festivals &amp; Specials</h1>
          <p className="offers-hero-subtitle">
            Curated sets celebrating heritage through the art of fragrance.
          </p>
          <div className="offers-hero-stats">
            <div className="offers-stat">
              <span className="offers-stat-num">20%</span>
              <span className="offers-stat-label">Savings</span>
            </div>
            <div className="offers-stat-divider" />
            <div className="offers-stat">
              <span className="offers-stat-num">2</span>
              <span className="offers-stat-label">Exclusive Sets</span>
            </div>
            <div className="offers-stat-divider" />
            <div className="offers-stat">
              <span className="offers-stat-num">
                <Gift size={18} />
              </span>
              <span className="offers-stat-label">Free Gift Wrap</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Festival Sets */}
      <section className="offers-sets container">
        <div className="offers-section-label">
          <Clock size={15} />
          <span>Limited Time Offers</span>
        </div>

        <div className="offers-grid">
          {festivalSets.map((set, index) => (
            <motion.article
              key={set.id}
              className="offer-card"
              {...fadeUp}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Image */}
              <div className="offer-card-img">
                <img src={set.image} alt={set.title[language]} />
                <div className="offer-card-badge">
                  <Sparkles size={12} />
                  {set.tag}
                </div>
              </div>

              {/* Content */}
              <div className="offer-card-content">
                <h2 className="offer-card-title">{set.title[language]}</h2>
                <p className="offer-card-desc">{set.description[language]}</p>

                {/* Includes */}
                <div className="offer-card-includes">
                  <span className="offer-includes-label">Set Includes</span>
                  <ul>
                    {set.includes.map((item) => (
                      <li key={item}>
                        <Star size={12} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + CTA */}
                <div className="offer-card-bottom">
                  <div className="offer-card-pricing">
                    <span className="offer-original-price">RM {set.originalPrice}</span>
                    <span className="offer-current-price">RM {set.price}</span>
                    <span className="offer-save-tag">
                      Save RM {set.originalPrice - set.price}
                    </span>
                  </div>
                  <Link to="/shop" className="offer-reserve-btn">
                    Reserve Set
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Perks Strip */}
      <section className="offers-perks">
        <div className="container">
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                className="perk-item"
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="perk-icon">
                  <perk.icon size={22} />
                </div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Gifting CTA */}
      <section className="offers-cta container">
        <motion.div className="offers-cta-card" {...fadeUp}>
          <div className="offers-cta-inner">
            <span className="offers-cta-tag">Bespoke Gifting</span>
            <h2 className="offers-cta-title">Craft Your Own Set</h2>
            <p className="offers-cta-desc">
              Work with our fragrance specialists to create a personalized gift set
              with custom engraving and luxury packaging.
            </p>
            <Link to="/contact" className="offers-cta-btn">
              Consult a Specialist
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Offers;
