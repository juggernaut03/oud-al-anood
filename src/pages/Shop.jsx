import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import BoutiqueToggle from '../components/BoutiqueToggle';
import WholesaleConcierge from '../components/WholesaleConcierge';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, SprayCan, Gem, LayoutGrid } from 'lucide-react';
import './Shop.css';

const CATEGORIES = [
  { key: 'all', label: { en: 'All', ar: 'الكل' }, icon: LayoutGrid },
  { key: 'oud', label: { en: 'Oud', ar: 'العود' }, icon: Droplets },
  { key: 'perfumes', label: { en: 'Perfumes', ar: 'العطور' }, icon: SprayCan },
  { key: 'accessories', label: { en: 'Accessories', ar: 'الإكسسوارات' }, icon: Gem },
];

const SUBCATEGORIES = {
  oud: [
    { key: 'all', label: { en: 'All Oud', ar: 'كل العود' } },
    { key: 'oil', label: { en: 'Oils', ar: 'الدهون' } },
    { key: 'bakhoor', label: { en: 'Bakhoor', ar: 'بخور' } },
    { key: 'chips', label: { en: 'Wood Chips', ar: 'رقائق العود' } },
  ],
  perfumes: [
    { key: 'all', label: { en: 'All Perfumes', ar: 'كل العطور' } },
    { key: 'men', label: { en: 'Men', ar: 'رجالي' } },
    { key: 'women', label: { en: 'Women', ar: 'نسائي' } },
    { key: 'unisex', label: { en: 'Unisex', ar: 'للجنسين' } },
  ],
  accessories: [
    { key: 'all', label: { en: 'All Accessories', ar: 'كل الإكسسوارات' } },
    { key: 'burners', label: { en: 'Burners', ar: 'مباخر' } },
    { key: 'bottles', label: { en: 'Bottles', ar: 'زجاجات' } },
    { key: 'gifting', label: { en: 'Gifting', ar: 'هدايا' } },
  ],
};

const Shop = () => {
  const { t, isWholesale, products, language } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setActiveSubcategory('all');
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }
    return result;
  }, [products, activeCategory, activeSubcategory]);

  const subcategories = SUBCATEGORIES[activeCategory] || null;

  return (
    <main className="shop-page">
      {/* Page Header */}
      <header className="shop-header container">
        <h1 className="shop-title">{t('nav_shop')}</h1>
        <p className="shop-subtitle">Curated collections of the finest oriental fragrances.</p>
        <BoutiqueToggle />
      </header>

      {/* Main Content */}
      <div className="shop-body container">
        {!isWholesale ? (
          <>
            {/* Category Nav */}
            <nav className="shop-categories">
              {CATEGORIES.map((cat) => {
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

            {/* Subcategory Tabs */}
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

            {/* Product Count */}
            <div className="shop-results-bar">
              <span className="shop-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            {/* Product Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                className="shop-grid"
                key={`${activeCategory}-${activeSubcategory}`}
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
                    <p>No products found in this category.</p>
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
