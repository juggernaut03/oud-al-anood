import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import './SearchOverlay.css';

const normalize = (s) => (s || '').toString().toLowerCase().trim();

const SearchOverlay = ({ isOpen, onClose }) => {
  const { products, language, t } = useAppContext();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Clear the query and close — used by every close path (button, backdrop,
  // Escape, selecting a result) so the next open starts blank.
  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  // Focus the input when the overlay opens; lock background scroll.
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return products.filter((p) => {
      const haystack = [
        p.name?.en,
        p.name?.ar,
        p.category,
        p.subcategory,
        p.description?.en,
        p.description?.ar,
      ]
        .map(normalize)
        .join(' ');
      return haystack.includes(q);
    });
  }, [query, products]);

  const hasQuery = normalize(query).length > 0;
  const countLabel = `${results.length} ${results.length === 1 ? t('search_result') : t('search_results')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <motion.div
            className="search-panel"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-row">
              <Search size={22} className="search-input-icon" />
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder={t('search_placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-close-btn" onClick={handleClose} aria-label="Close search">
                <X size={22} />
              </button>
            </div>

            <div className="search-results">
              {!hasQuery ? (
                <p className="search-hint">{t('search_hint')}</p>
              ) : results.length === 0 ? (
                <p className="search-empty">{t('search_no_results')}</p>
              ) : (
                <>
                  <p className="search-count">{countLabel}</p>
                  <ul className="search-result-list">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.id}`}
                          className="search-result-item"
                          onClick={handleClose}
                        >
                          <div className="search-result-thumb">
                            <img src={product.image} alt={product.name?.[language]} loading="lazy" />
                          </div>
                          <div className="search-result-meta">
                            <span className="search-result-name">{product.name?.[language]}</span>
                            <span className="search-result-cat">{product.category}</span>
                          </div>
                          <span className="search-result-price">
                            {t('price_rm')} {Number(product.price).toFixed(2)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
