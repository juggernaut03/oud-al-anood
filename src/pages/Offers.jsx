import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift, Star, Clock, Crown, Flame } from 'lucide-react';
import './Offers.css';

const FALLBACK_OFFERS = [
  {
    id: 1,
    title: { en: 'Eid Al-Fitr Gold Set', ar: 'طقم عيد الفطر الذهبي' },
    description: {
      en: 'A majestic combination of our finest Kalakassi Oud and traditional Cambodian Aged 25 years. Presented in a hand-crafted wooden chest.',
      ar: 'مزيج مهيب من أجود أنواع عود كالكاسي والكمبودي التقليدي المعتق لمدة ٢٥ عاماً. يُقدم في صندوق خشبي مصنوع يدوياً.',
    },
    originalPrice: null,
    price: 499,
    image: '/images/page2.png',
    badge: { en: 'Eid Exclusive', ar: 'حصري للعيد' },
    discountType: 'percentage',
    discountValue: 20,
    link: '/shop',
    products: ['Kalakassi Oud Oil 3ml', 'Cambodian Aged 3ml', 'Luxury Gift Box'],
  },
  {
    id: 2,
    title: { en: 'Ramadan Night Collection', ar: 'مجموعة ليالي رمضان' },
    description: {
      en: 'Deep, smoky notes designed for the spiritual serenity of Ramadan nights. A curated duo of Hindi Turabi and Cambodian Old.',
      ar: 'نوتات عميقة ومدخنة مصممة للهدوء الروحاني في ليالي رمضان. ثنائي منتقى من هندي ترابي وكمبودي قديم.',
    },
    originalPrice: null,
    price: 280,
    image: '/images/page4.png',
    badge: { en: 'Limited Edition', ar: 'إصدار محدود' },
    discountType: 'percentage',
    discountValue: 20,
    link: '/shop',
    products: ['Hindi Turabi 3ml', 'Cambodian Old 3ml', 'Velvet Pouch'],
  },
];

const PERKS = [
  { icon: Gift,  titleKey: 'offers_perk1_title', descKey: 'offers_perk1_desc' },
  { icon: Crown, titleKey: 'offers_perk2_title', descKey: 'offers_perk2_desc' },
  { icon: Flame, titleKey: 'offers_perk3_title', descKey: 'offers_perk3_desc' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Offers = () => {
  const { language, offers, t } = useAppContext();

  const displayOffers = offers.length > 0 ? offers : FALLBACK_OFFERS;

  const isPct = (type) => type === 'percentage' || type === 'percent';

  const maxDiscount = displayOffers.reduce((max, o) => {
    if (isPct(o.discountType)) return Math.max(max, o.discountValue || 0);
    return max;
  }, 0);

  const discountLabel = (offer) => {
    if (isPct(offer.discountType) && offer.discountValue)
      return `${offer.discountValue}% ${t('offers_pct_off')}`;
    if (offer.discountType === 'fixed' && offer.discountValue)
      return `${t('price_rm')} ${offer.discountValue} ${t('offers_fixed_off')}`;
    if (offer.discountType === 'bogo') return t('offers_bogo');
    if (offer.discountType === 'bundle') return t('offers_bundle');
    return null;
  };

  const getBadge = (offer) => {
    if (!offer.badge) return t('offers_special_fallback');
    if (typeof offer.badge === 'object') return offer.badge[language] || offer.badge.en || t('offers_special_fallback');
    return offer.badge;
  };

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
            {t('offers_seasonal_tag')}
          </span>
          <h1 className="offers-hero-title">{t('offers_hero_title')}</h1>
          <p className="offers-hero-subtitle">{t('offers_hero_subtitle')}</p>
          <div className="offers-hero-stats">
            {maxDiscount > 0 && (
              <>
                <div className="offers-stat">
                  <span className="offers-stat-num">{maxDiscount}%</span>
                  <span className="offers-stat-label">{t('offers_savings')}</span>
                </div>
                <div className="offers-stat-divider" />
              </>
            )}
            <div className="offers-stat">
              <span className="offers-stat-num">{displayOffers.length}</span>
              <span className="offers-stat-label">{t('offers_exclusive_sets')}</span>
            </div>
            <div className="offers-stat-divider" />
            <div className="offers-stat">
              <span className="offers-stat-num"><Gift size={18} /></span>
              <span className="offers-stat-label">{t('offers_free_wrap')}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Offer Cards */}
      <section className="offers-sets container">
        <div className="offers-section-label">
          <Clock size={15} />
          <span>{t('offers_limited')}</span>
        </div>

        <div className="offers-grid">
          {displayOffers.map((offer, index) => {
            const label = discountLabel(offer);
            const productNames = offer.products.map((p) =>
              typeof p === 'string' ? p : p.name?.[language] || p.name?.en || ''
            ).filter(Boolean);

            return (
              <motion.article
                key={offer.id}
                className="offer-card"
                {...fadeUp}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="offer-card-img">
                  <img src={offer.image || '/images/page2.png'} alt={offer.title[language] || offer.title.en} />
                  <div className="offer-card-badge">
                    <Sparkles size={12} />
                    {getBadge(offer)}
                  </div>
                </div>

                <div className="offer-card-content">
                  <h2 className="offer-card-title">{offer.title[language] || offer.title.en}</h2>
                  <p className="offer-card-desc">{offer.description[language] || offer.description.en}</p>

                  {productNames.length > 0 && (
                    <div className="offer-card-includes">
                      <span className="offer-includes-label">{t('offers_set_includes')}</span>
                      <ul>
                        {productNames.map((name) => (
                          <li key={name}>
                            <Star size={12} />
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="offer-card-bottom">
                    <div className="offer-card-pricing">
                      {label && <span className="offer-save-tag">{label}</span>}
                    </div>
                    <Link to={offer.link || '/shop'} className="offer-reserve-btn">
                      {t('offers_shop_now')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Perks Strip */}
      <section className="offers-perks">
        <div className="container">
          <div className="perks-grid">
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk.titleKey}
                className="perk-item"
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="perk-icon">
                  <perk.icon size={22} />
                </div>
                <h3>{t(perk.titleKey)}</h3>
                <p>{t(perk.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Gifting CTA */}
      <section className="offers-cta container">
        <motion.div className="offers-cta-card" {...fadeUp}>
          <div className="offers-cta-inner">
            <span className="offers-cta-tag">{t('offers_bespoke_tag')}</span>
            <h2 className="offers-cta-title">{t('offers_bespoke_title')}</h2>
            <p className="offers-cta-desc">{t('offers_bespoke_desc')}</p>
            <Link to="/contact" className="offers-cta-btn">
              {t('offers_consult')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Offers;
