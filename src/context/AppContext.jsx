import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const LOGO_URL = '/images/perfume.png';

const translations = {
  en: {
    nav_home: 'Home',
    nav_shop: 'Shop',
    nav_oud_mohsen: 'Oud Mohsen',
    nav_about: 'About',
    nav_account: 'My Account',
    hero_title: 'Exquisite Oud Collections',
    hero_subtitle: 'Crafting excellence since 1995',
    shop_now: 'Shop Now',
    add_to_cart: 'Add to Cart',
    cart_title: 'Shopping Bag',
    cart_empty: 'Your bag is empty',
    checkout: 'Checkout',
    price_rm: 'RM',
    footer_since: 'Since 1995',
    footer_copyright: '2026 OUD ALNOOD',
    footer_location: 'Bukit Bintang Kiosk K15, Monorail Station, Kuala Lumpur',
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_shop: 'المتجر',
    nav_oud_mohsen: 'عود محسن',
    nav_about: 'نبذة عن عود العنود',
    nav_account: 'حسابي',
    hero_title: 'مجموعات العود الفاخرة',
    hero_subtitle: 'إتقان الصناعة منذ عام ١٩٩٥',
    shop_now: 'تسوق الآن',
    add_to_cart: 'أضف إلى السلة',
    cart_title: 'حقيبة التسوق',
    cart_empty: 'حقيبتك فارغة',
    checkout: 'الدفع',
    price_rm: 'رينغيت',
    footer_since: 'منذ ١٩٩٥',
    footer_copyright: '٢٠٢٦ عود العنود',
    footer_location: 'بوكيت بينتانج كشك K15، محطة المونوريل، كوالالمبور',
  }
};

const products = [
  {
    id: 1,
    name: { en: 'Kalakassi Oud Oil - New', ar: 'دهـن عود كالكاسي جديد' },
    price: 375,
    category: 'oil',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A rare and exquisite Kalakassi Oud, aged to perfection. This oil offers a deep, multi-layered aroma that evolves on the skin, revealing notes of honeyed wood and ancient resins.',
      ar: 'دهن عود كالكاسي نادر وفاخر، معتق بعناية. يتميز هذا الدهن برائحة عميقة ومتعددة الطبقات تتطور على البشرة، لتكشف عن نوتات من الخشب العسلي والراتنجات القديمة.'
    },
    features: ['Aged 25+ Years', '100% Pure Organic', 'Long-lasting projection'],
    purchaseLinks: {
      shopee: 'https://shopee.com.my/oud_alnood_kuala_lumpur',
      grab: 'https://grab.com.my/oud_alnood_kuala_lumpur',
      lalamove: 'https://lalamove.com/oud_alnood',
      jnt: 'https://jnt.com.my/tracking'
    }
  },
  {
    id: 2,
    name: { en: 'Cambodian 10 Yrs', ar: 'دهـن عود كمبودي ١٠ سنوات' },
    price: 60,
    category: 'oil',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTMdOKtNbbrJ-K5Pv3Dk9_AxniCIKqN_dPvAZNZ2zdBKRLn_tgU36tcOb4_3LeFjCTr2PyzJd7XutXPDVUdlF55iExG3V2hY1YC8vBv1rXFGOnVfI9aF9WpaFLxA0i5DI1XiVU3_w&usqp=CAc',
    description: {
      en: 'A classic Cambodian profile with 10 years of natural aging. Known for its sweet, fruity nuances and a smooth, animalic undertone that creates a sophisticated personal aura.',
      ar: 'بروفايل كمبودي كلاسيكي مع ١٠ سنوات من التعتيق الطبيعي. يشتهر بنوتاته الحلوة والفاكهية وقاعدة ناعمة تضفي هالة شخصية راقية.'
    },
    features: ['Wild Harvested', 'Sweet Fruity Profile', 'Daily wear elegance'],
    purchaseLinks: {
      shopee: 'https://shopee.com.my/oud_alnood_kuala_lumpur',
      grab: 'https://grab.com.my/oud_alnood_kuala_lumpur',
      lalamove: 'https://lalamove.com/oud_alnood',
      jnt: 'https://jnt.com.my/tracking'
    }
  },
  {
    id: 3,
    name: { en: 'Cambodian Old', ar: 'دهـن عود كمبودي قديم' },
    price: 60,
    category: 'oil',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSVWKolYp1KVWIB88Pj-7EMNa4xePBDiQAkrO-3foMT0dVYIXkuzUPwm4k-pzWiTIR9VhNNgrV9etp2_J7nPE-A9jJZeQ7s6PQEA4U_JNdMNRqK9P6HfhyYDXf5DpVT1h68KO8Jyg&usqp=CAc',
    description: {
      en: 'Masterfully distilled from old-growth trees, this Cambodian traditional oil is dense and grounding. It carries the heritage of Southeast Asian perfumery in every drop.',
      ar: 'مقطر ببراعة من أشجار قديمة النمو، هذا الدهن الكمبودي التقليدي يتميز بكثافته وتأثيره المهول. يحمل تراث صناعة العطور في جنوب شرق آسيا في كل قطرة.'
    },
    features: ['Traditional Distillation', 'Smoky Earthy Tones', 'Heritage collection'],
    purchaseLinks: {
      shopee: 'https://shopee.com.my/oud_alnood_kuala_lumpur',
      grab: 'https://grab.com.my/oud_alnood_kuala_lumpur',
      lalamove: 'https://lalamove.com/oud_alnood',
      jnt: 'https://jnt.com.my/tracking'
    }
  },
  {
    id: 4,
    name: { en: 'Hindi Turabi', ar: 'دهـن عود هندي ترابي' },
    price: 150,
    category: 'oil',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A legendary Indian Oud profile, Hinid Turabi is known for its intense, barnyard-earthy opening that settles into a majestic, spicy woodiness. Truly for the connoisseur.',
      ar: 'بروفايل عود هندي أسطوري، يشتهر هندي ترابي بافتتاحية ترابية حادة تستقر لتتحول إلى رائحة خشبية توابلية ملكية. عطر حقيقي للخبراء.'
    },
    features: ['High Silage', 'Authentic Indian Assam', 'Spicy Heart Notes'],
    purchaseLinks: {
      shopee: 'https://shopee.com.my/oud_alnood_kuala_lumpur',
      grab: 'https://grab.com.my/oud_alnood_kuala_lumpur',
      lalamove: 'https://lalamove.com/oud_alnood',
      jnt: 'https://jnt.com.my/tracking'
    }
  }
];

const blogPosts = [
  {
    id: 1,
    title: { en: 'The Art of Layering Oud', ar: 'فن وضع طبقات العود' },
    date: '2024-04-10',
    excerpt: { en: 'Discover how to combine different oud oils for a truly unique signature scent...', ar: 'اكتشف كيفية الجمع بين زيوت العود المختلفة للحصول على رائحة مميزة فريدة حقًا...' },
    image: 'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: { en: 'Sourcing the Finest Agarwood', ar: 'الحصول على أجود أنواع خشب العود' },
    date: '2024-03-25',
    excerpt: { en: 'A journey into the deep jungles of Southeast Asia in search of liquid gold...', ar: 'رحلة إلى غابة جنوب شرق آسيا العميقة بحثًا عن الذهب السائل...' },
    image: 'https://images.unsplash.com/photo-1615484477201-9f4953340fab?auto=format&fit=crop&q=80&w=800'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    text: { en: 'The Cambodian Old oil is unlike anything I have ever smelled. Pure luxury.', ar: 'زيت كمبودي قديم لا يشبه أي شيء شممت رائحته من قبل. رفاهية خالصة.' },
    rating: 5
  },
  {
    id: 2,
    name: 'Ahmed K.',
    text: { en: 'Authentic quality and exceptional service at the Bukit Bintang boutique.', ar: 'جودة أصلية وخدمة استثنائية في بوتيك بوكيت بينتانج.' },
    rating: 5
  },
  {
    id: 3,
    name: 'Isabella R.',
    text: { en: 'A true sensory journey. The Kalakassi Oud is the crown jewel of my collection.', ar: 'رحلة حسية حقيقية. عود كالكاسي هو جوهرة التاج في مجموعتي.' },
    rating: 5
  },
  {
    id: 4,
    name: 'Mohammad Al-Farris',
    text: { en: 'The depth of these fragrances is stunning. Perfection in every drop.', ar: 'عمق هذه العطور مذهل. الكمال في كل قطرة.' },
    rating: 5
  },
  {
    id: 5,
    name: 'Chen Wee.',
    text: { en: 'Elegant, mysterious, and long-lasting. Exactly what I was looking for.', ar: 'أنيق، غامض، ويدوم طويلاً. بالضبط ما كنت أبحث عنه.' },
    rating: 5
  },
  {
    id: 6,
    name: 'James L.',
    text: { en: 'Masterpiece creations that define luxury in Southeast Asia.', ar: 'إبداعات فنية تحدد مفهوم الفخامة في جنوب شرق آسيا.' },
    rating: 5
  },
  {
    id: 7,
    name: 'Noora H.',
    text: { en: 'The heritage collection tells a story that stays with you all day.', ar: 'مجموعة التراث تحكي قصة تبقى معك طوال اليوم.' },
    rating: 5
  }
];

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWholesale, setIsWholesale] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openPurchaseModal = (product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedProduct(null);
  };

  // Mock Orders
  const [orders] = useState([
    { id: 'ORD-2024-001', date: '2024-03-15', status: 'Delivered', total: 475.00, itemsCount: 2 },
    { id: 'ORD-2024-002', date: '2024-04-02', status: 'Processing', total: 150.00, itemsCount: 1 }
  ]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Persistence
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
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...finalProduct, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
      testimonials
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
