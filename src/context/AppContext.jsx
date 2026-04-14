import { createContext, useContext, useState, useEffect } from 'react';
import products from '../data/products';
import blogPosts from '../data/blog';
import testimonials from '../data/testimonials';
import translations from '../data/translations';

const AppContext = createContext();

export const LOGO_URL = '/images/perfume.png';

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWholesale, setIsWholesale] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock Orders
  const [orders] = useState([
    { id: 'ORD-2024-001', date: '2024-03-15', status: 'Delivered', total: 475.00, itemsCount: 2 },
    { id: 'ORD-2024-002', date: '2024-04-02', status: 'Processing', total: 150.00, itemsCount: 1 },
  ]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const t = (key) => translations[language][key] || key;

  const addToCart = (product) => {
    const finalPrice = isWholesale ? product.price * 0.7 : product.price;
    const finalProduct = { ...product, price: finalPrice };
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...finalProduct, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openPurchaseModal = (product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <AppContext.Provider value={{
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
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
