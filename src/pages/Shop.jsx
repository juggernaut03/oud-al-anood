import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import BoutiqueToggle from '../components/BoutiqueToggle';
import WholesaleConcierge from '../components/WholesaleConcierge';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, SprayCan, Gem, LayoutGrid } from 'lucide-react';
import { api } from '../lib/api';
import './Shop.css';

const STATIC_CATEGORIES = [
  { key: 'all',         label: { en: 'All',          ar: 'الكل' },           icon: LayoutGrid },
  { key: 'oud',         label: { en: 'Oud',           ar: 'العود' },          icon: Droplets },
  { key: 'perfumes',    label: { en: 'Perfumes',      ar: 'العطور' },         icon: SprayCan },
  { key: 'accessories', label: { en: 'Accessories',   ar: 'الإكسسوارات' },   icon: Gem },
];

const STATIC_SUBCATEGORIES = {
  oud: [
    { key: 'all',     label: { en: 'All Oud',         ar: 'كل العود' } },
    { key: 'oil',     label: { en: 'Oils',             ar: 'الدهون' } },
    { key: 'bakhoor', label: { en: 'Bakhoor',          ar: 'بخور' } },
    { key: 'chips',   label: { en: 'Wood Chips',       ar: 'رقائق العود' } },
  ],
  perfumes: [
    { key: 'all',    label: { en: 'All Perfumes',     ar: 'كل العطور' } },
    { key: 'men',    label: { en: 'Men',               ar: 'رجالي' } },
    { key: 'women',  label: { en: 'Women',             ar: 'نسائي' } },
    { key: 'unisex', label: { en: 'Unisex',            ar: 'للجنسين' } },
  ],
  accessories: [
    { key: 'all',     label: { en: 'All Accessories',  ar: 'كل الإكسسوارات' } },
    { key: 'burners', label: { en: 'Burners',           ar: 'مباخر' } },
    { key: 'bottles', label: { en: 'Bottles',           ar: 'زجاجات' } },
    { key: 'gifting', label: { en: 'Gifting',           ar: 'هدايا' } },
  ],
};

const GENDER_OPTIONS = [
  { key: 'all',    label: { en: 'All',     ar: 'الكل' } },
  { key: 'male',   label: { en: 'Male',    ar: 'رجالي' } },
  { key: 'female', label: { en: 'Female',  ar: 'نسائي' } },
  { key: 'unisex', label: { en: 'Unisex',  ar: 'للجنسين' } },
];

const Shop = () => {
  const { t, isWholesale, products, language } = useAppContext();
  const { search: qs } = useLocation();

  // DB-driven category hierarchy (slug → children array)
  const [dbSubcategories, setDbSubcategories] = useState({});

  useEffect(() => {
    api.get('/api/categories', { params: { nested: 'true', isActive: 'true' } })
      .then(({ data }) => {
        const list = Array.isArray(data?.data) ? data.data : [];
        const map = {};
        list.forEach((cat) => {
          if (Array.isArray(cat.children) && cat.children.length > 0) {
            map[cat.slug] = [
              { key: 'all', label: { en: `All ${cat.name?.en || cat.slug}`, ar: `كل ${cat.name?.ar || cat.slug}` } },
              ...cat.children.map((s) => ({
                key: s.slug,
                label: s.name || { en: s.slug, ar: s.slug },
              })),
            ];
          }
        });
        if (Object.keys(map).length > 0) setDbSubcategories(map);
      })
      .catch(() => {});
  }, []);

  const initialCategory = useMemo(() => {
    const param = new URLSearchParams(qs).get('category') || 'all';
    return STATIC_CATEGORIES.some((c) => c.key === param) ? param : 'all';
  }, [qs]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [activeGender, setActiveGender] = useState('all');

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setActiveSubcategory('all');
    setActiveGender('all');
  };

  // Prefer DB subcategories, fall back to static
  const subcategories = useMemo(() => {
    if (activeCategory === 'all') return null;
    return dbSubcategories[activeCategory] || STATIC_SUBCATEGORIES[activeCategory] || null;
  }, [activeCategory, dbSubcategories]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    if (activeSubcategory !== 'all') result = result.filter((p) => p.subcategory === activeSubcategory);
    if (activeGender !== 'all') result = result.filter((p) => p.gender === activeGender);
    return result;
  }, [products, activeCategory, activeSubcategory, activeGender]);

  const countLabel = filteredProducts.length === 1
    ? `1 ${t('shop_product')}`
    : `${filteredProducts.length} ${t('shop_products')}`;

  return (
    <main className="shop-page">
      <header className="shop-header container">
        <h1 className="shop-title">{t('nav_shop')}</h1>
        <p className="shop-subtitle">{t('shop_subtitle')}</p>
        <BoutiqueToggle />
      </header>

      <div className="shop-body container">
        {!isWholesale ? (
          <>
            {/* ── Category tabs ── */}
            <nav className="shop-categories">
              {STATIC_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    className={`shop-cat-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.key)}
                  >
                    <Icon size={18} />
                    <span>{cat.label[language]}</span>
                  </button>
                );
              })}
            </nav>

            {/* ── Subcategory pills ── */}
            <AnimatePresence mode="wait">
              {subcategories && (
                <motion.div
                  className="shop-subcategories"
                  key={activeCategory}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {subcategories.map((sub) => (
                    <button
                      key={sub.key}
                      className={`shop-sub-btn ${activeSubcategory === sub.key ? 'active' : ''}`}
                      onClick={() => setActiveSubcategory(sub.key)}
                    >
                      {sub.label[language]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Gender filter ── */}
            <div className="shop-gender-row">
              {GENDER_OPTIONS.map((g) => (
                <button
                  key={g.key}
                  className={`shop-gender-btn ${activeGender === g.key ? 'active' : ''}`}
                  onClick={() => setActiveGender(g.key)}
                >
                  {g.label[language]}
                </button>
              ))}
            </div>

            <div className="shop-results-bar">
              <span className="shop-count">{countLabel}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="shop-grid"
                key={`${activeCategory}-${activeSubcategory}-${activeGender}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <div className="shop-empty">
                    <p>{t('shop_empty')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <WholesaleConcierge />
        )}
      </div>
    </main>
  );
};

export default Shop;
