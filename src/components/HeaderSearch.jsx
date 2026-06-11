import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api';
import { normalizeProduct } from '../lib/normalize';
import './HeaderSearch.css';

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_LIMIT = 8;

const HeaderSearch = () => {
  const { language, t } = useAppContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced, API-driven search. Stale responses are discarded so only the
  // latest query's results are shown.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setLoading(true);
      api
        .get('/api/products', {
          params: { isActive: 'true', search: q, limit: SEARCH_LIMIT },
        })
        .then(({ data }) => {
          if (cancelled) return;
          const list = Array.isArray(data?.data) ? data.data.map(normalizeProduct) : [];
          setResults(list);
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
            setSearched(true);
          }
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Close the dropdown when clicking outside the search.
  useEffect(() => {
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const reset = useCallback(() => {
    setQuery('');
    setResults([]);
    setSearched(false);
    setOpen(false);
  }, []);

  const goToResult = useCallback(
    (id) => {
      reset();
      navigate(`/product/${id}`);
    },
    [navigate, reset]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      setOpen(false);
    }
  };

  const hasQuery = query.trim().length > 0;
  const showDropdown = open && hasQuery;

  return (
    <div className="nav-search" ref={wrapperRef}>
      <div className="nav-search-field">
        {loading ? (
          <Loader2 size={18} className="nav-search-icon nav-search-spinner" />
        ) : (
          <Search size={18} className="nav-search-icon" />
        )}
        <input
          type="text"
          className="nav-search-input"
          placeholder={t('search_placeholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {hasQuery && (
          <button className="nav-search-clear" onClick={reset} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="nav-search-dropdown">
          {loading && !searched ? (
            <p className="nav-search-msg">…</p>
          ) : results.length === 0 && searched ? (
            <p className="nav-search-msg">{t('search_no_results')}</p>
          ) : results.length > 0 ? (
            <ul className="nav-search-list">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    className="nav-search-item"
                    onClick={() => goToResult(product.id)}
                  >
                    <span className="nav-search-thumb">
                      <img src={product.image} alt={product.name?.[language]} loading="lazy" />
                    </span>
                    <span className="nav-search-meta">
                      <span className="nav-search-name">{product.name?.[language]}</span>
                      <span className="nav-search-cat">{product.category}</span>
                    </span>
                    <span className="nav-search-price">
                      {t('price_rm')} {Number(product.price).toFixed(2)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
