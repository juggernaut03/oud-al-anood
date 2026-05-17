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

// Icon mapped by slug (best-guess visual). Falls back to LayoutGrid if no match.
const ICON_BY_SLUG = {
  oud: Droplets,
  perfumes: SprayCan,
  perfume: SprayCan,
  accessories: Gem,
};
const ALL_TAB = { key: 'all', label: { en: 'All', ar: 'الكل' }, icon: LayoutGrid };

const GENDER_OPTIONS = [
  { key: 'all',    label: { en: 'All',     ar: 'الكل' } },
  { key: 'male',   label: { en: 'Male',    ar: 'رجالي' } },
  { key: 'female', label: { en: 'Female',  ar: 'نسائي' } },
  { key: 'unisex', label: { en: 'Unisex',  ar: 'للجنسين' } },
];

const Shop = () => {
  const { t, isWholesale, products, language } = useAppContext();
  const { search: qs } = useLocation();

  // DB-driven categories (top-level) and subcategory map (slug → children array)
  const [dbCategories, setDbCategories] = useState([]);
  const [dbSubcategories, setDbSubcategories] = useState({});

  useEffect(() => {
    api.get('/api/categories', { params: { nested: 'true', isActive: 'true' } })
      .then(({ data }) => {
        const list = Array.isArray(data?.data) ? data.data : [];

        const topLevel = list
          .slice()
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((cat) => ({
            key: cat.slug,
            label: cat.name || { en: cat.slug, ar: cat.slug },
            image: cat.image || '',
            icon: ICON_BY_SLUG[cat.slug] || LayoutGrid,
          }));
        setDbCategories(topLevel);

        const map = {};
        list.forEach((cat) => {
          if (Array.isArray(cat.children) && cat.children.length > 0) {
            map[cat.slug] = [
              { key: 'all', label: { en: `All ${cat.name?.en || cat.slug}`, ar: `كل ${cat.name?.ar || cat.slug}` } },
              ...cat.children
                .slice()
                .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                .map((s) => ({
                  key: s.slug,
                  label: s.name || { en: s.slug, ar: s.slug },
                })),
            ];
          }
        });
        setDbSubcategories(map);
      })
      .catch(() => {});
  }, []);

  // Final categories list: "All" + dynamic from DB
  const categories = useMemo(() => [ALL_TAB, ...dbCategories], [dbCategories]);

  const initialCategory = useMemo(() => {
    const param = new URLSearchParams(qs).get('category') || 'all';
    return categories.some((c) => c.key === param) ? param : 'all';
  }, [qs, categories]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [activeGender, setActiveGender] = useState('all');

  // Sync to URL param once categories arrive from DB
  useEffect(() => {
    if (dbCategories.length === 0) return;
    const param = new URLSearchParams(qs).get('category');
    if (param && categories.some((c) => c.key === param) && param !== activeCategory) {
      setActiveCategory(param);
    }
  }, [dbCategories, qs]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setActiveSubcategory('all');
    setActiveGender('all');
  };

  const subcategories = useMemo(() => {
    if (activeCategory === 'all') return null;
    return dbSubcategories[activeCategory] || null;
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
            {/* ── Category cards ── */}
            <nav className="shop-categories">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    className={`shop-cat-card ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.key)}
                  >
                    <div className="shop-cat-thumb">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.label?.en || cat.key} />
                      ) : (
                        <Icon size={22} />
                      )}
                    </div>
                    <div className="shop-cat-meta">
                      <span className="shop-cat-name-en">{cat.label?.en || cat.key}</span>
                      {cat.label?.ar && (
                        <span className="shop-cat-name-ar" dir="rtl">{cat.label.ar}</span>
                      )}
                    </div>
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
