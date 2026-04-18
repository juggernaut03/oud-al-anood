import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import translations from '../data/translations';
import fallbackProducts from '../data/products';
import fallbackBlog from '../data/blog';
import fallbackTestimonials from '../data/testimonials';
import fallbackStores from '../data/stores';
import { api } from '../lib/api';
import {
  normalizeBlogPost,
  normalizeProduct,
  normalizeStore,
  normalizeTestimonial,
  toList
} from '../lib/normalize';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const LOGO_URL = '/images/perfume.png';

const CART_KEY = 'cart';
const WISHLIST_KEY = 'wishlist';
const LANGUAGE_KEY = 'language';

export const AppProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [language, setLanguageState] = useState(() => localStorage.getItem(LANGUAGE_KEY) || 'en');
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWholesale, setIsWholesale] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isStoreSelectorOpen, setIsStoreSelectorOpen] = useState(false);

  // Remote collections (fallback to local data if API is unreachable so UI never breaks).
  const [products, setProducts] = useState(fallbackProducts);
  const [blogPosts, setBlogPosts] = useState(fallbackBlog);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [stores, setStores] = useState(fallbackStores);
  const [selectedStore, setSelectedStore] = useState(fallbackStores[0]);

  // User orders are loaded from API when authenticated.
  const [orders, setOrders] = useState([]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  }, []);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  // Persist cart + wishlist
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync wholesale flag from logged-in user profile.
  useEffect(() => {
    if (user?.isWholesale != null) setIsWholesale(Boolean(user.isWholesale));
  }, [user]);

  // Load public collections from backend.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get('/api/products', { params: { isActive: 'true', limit: 100 } });
        const list = toList(res, normalizeProduct);
        if (!cancelled && list.length) setProducts(list);
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get('/api/blog', { params: { published: 'true', limit: 20 } });
        const list = toList(res, normalizeBlogPost);
        if (!cancelled && list.length) setBlogPosts(list);
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get('/api/testimonials', { params: { isPublished: 'true' } });
        const list = toList(res, normalizeTestimonial);
        if (!cancelled && list.length) setTestimonials(list);
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get('/api/stores', { params: { isActive: 'true' } });
        const list = toList(res, normalizeStore);
        if (!cancelled && list.length) {
          setStores(list);
          setSelectedStore((prev) => {
            if (!prev) return list[0];
            const match = list.find((s) => s.id === prev.id || s.slug === prev.slug);
            return match || list[0];
          });
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load user orders + wishlist when signed in.
  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/api/users/me/orders');
        if (!cancelled && Array.isArray(data?.data)) {
          setOrders(
            data.data.map((o) => ({
              ...o,
              id: o.orderNumber || o._id,
              date: o.createdAt ? new Date(o.createdAt).toISOString().slice(0, 10) : '',
              status: o.status
                ? o.status.charAt(0).toUpperCase() + o.status.slice(1)
                : 'Pending',
              total: o.total ?? o.totalAmount ?? 0,
              itemsCount: Array.isArray(o.items)
                ? o.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
                : 0
            }))
          );
        }
      } catch {
        if (!cancelled) setOrders([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  // Sync wishlist with server when signed in.
  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/api/users/me/wishlist');
        if (!cancelled && Array.isArray(data?.data)) {
          const ids = data.data.map((p) => p._id || p.id).filter(Boolean);
          setWishlist(ids);
        }
      } catch {
        // keep local
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const t = useCallback(
    (key) => translations[language]?.[key] || translations.en?.[key] || key,
    [language]
  );

  const addToCart = useCallback(
    (product) => {
      if (!product) return;
      const finalPrice = isWholesale ? product.price * 0.7 : product.price;
      const finalProduct = { ...product, price: finalPrice };
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...finalProduct, quantity: 1 }];
      });
      setIsCartOpen(true);
    },
    [isWholesale]
  );

  const removeFromCart = useCallback(
    (id) => setCart((prev) => prev.filter((item) => item.id !== id)),
    []
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (id) => {
      if (!id) return;
      setWishlist((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
      if (isAuthenticated) {
        api.post('/api/users/me/wishlist', { productId: id }).catch(() => {
          // ignore network failures; local state still reflects toggle
        });
      }
    },
    [isAuthenticated]
  );

  const openPurchaseModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  }, []);

  const closePurchaseModal = useCallback(() => {
    setIsPurchaseModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const toggleStoreSelector = useCallback(
    () => setIsStoreSelectorOpen((prev) => !prev),
    []
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      direction,
      t,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      orders,
      isCartOpen,
      setIsCartOpen,
      isWholesale,
      setIsWholesale,
      isPurchaseModalOpen,
      openPurchaseModal,
      closePurchaseModal,
      selectedProduct,
      products,
      blogPosts,
      testimonials,
      stores,
      isStoreSelectorOpen,
      setIsStoreSelectorOpen,
      toggleStoreSelector,
      selectedStore,
      setSelectedStore
    }),
    [
      language,
      setLanguage,
      direction,
      t,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      orders,
      isCartOpen,
      isWholesale,
      isPurchaseModalOpen,
      openPurchaseModal,
      closePurchaseModal,
      selectedProduct,
      products,
      blogPosts,
      testimonials,
      stores,
      isStoreSelectorOpen,
      toggleStoreSelector,
      selectedStore
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
