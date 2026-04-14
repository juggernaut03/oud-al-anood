import DEFAULT_PURCHASE_LINKS from './purchaseLinks';

const products = [
  // ── OUD OILS ──
  {
    id: 1,
    name: { en: 'Kalakassi Oud Oil - New', ar: 'دهـن عود كالكاسي جديد' },
    price: 375,
    category: 'oud',
    subcategory: 'oil',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A rare and exquisite Kalakassi Oud, aged to perfection. This oil offers a deep, multi-layered aroma that evolves on the skin, revealing notes of honeyed wood and ancient resins.',
      ar: 'دهن عود كالكاسي نادر وفاخر، معتق بعناية. يتميز هذا الدهن برائحة عميقة ومتعددة الطبقات تتطور على البشرة، لتكشف عن نوتات من الخشب العسلي والراتنجات القديمة.',
    },
    features: ['Aged 25+ Years', '100% Pure Organic', 'Long-lasting projection'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 2,
    name: { en: 'Cambodian 10 Yrs', ar: 'دهـن عود كمبودي ١٠ سنوات' },
    price: 60,
    category: 'oud',
    subcategory: 'oil',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTMdOKtNbbrJ-K5Pv3Dk9_AxniCIKqN_dPvAZNZ2zdBKRLn_tgU36tcOb4_3LeFjCTr2PyzJd7XutXPDVUdlF55iExG3V2hY1YC8vBv1rXFGOnVfI9aF9WpaFLxA0i5DI1XiVU3_w&usqp=CAc',
    description: {
      en: 'A classic Cambodian profile with 10 years of natural aging. Known for its sweet, fruity nuances and a smooth, animalic undertone that creates a sophisticated personal aura.',
      ar: 'بروفايل كمبودي كلاسيكي مع ١٠ سنوات من التعتيق الطبيعي. يشتهر بنوتاته الحلوة والفاكهية وقاعدة ناعمة تضفي هالة شخصية راقية.',
    },
    features: ['Wild Harvested', 'Sweet Fruity Profile', 'Daily wear elegance'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 3,
    name: { en: 'Cambodian Old', ar: 'دهـن عود كمبودي قديم' },
    price: 60,
    category: 'oud',
    subcategory: 'oil',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSVWKolYp1KVWIB88Pj-7EMNa4xePBDiQAkrO-3foMT0dVYIXkuzUPwm4k-pzWiTIR9VhNNgrV9etp2_J7nPE-A9jJZeQ7s6PQEA4U_JNdMNRqK9P6HfhyYDXf5DpVT1h68KO8Jyg&usqp=CAc',
    description: {
      en: 'Masterfully distilled from old-growth trees, this Cambodian traditional oil is dense and grounding. It carries the heritage of Southeast Asian perfumery in every drop.',
      ar: 'مقطر ببراعة من أشجار قديمة النمو، هذا الدهن الكمبودي التقليدي يتميز بكثافته وتأثيره المهول. يحمل تراث صناعة العطور في جنوب شرق آسيا في كل قطرة.',
    },
    features: ['Traditional Distillation', 'Smoky Earthy Tones', 'Heritage collection'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 4,
    name: { en: 'Hindi Turabi', ar: 'دهـن عود هندي ترابي' },
    price: 150,
    category: 'oud',
    subcategory: 'oil',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A legendary Indian Oud profile, Hindi Turabi is known for its intense, barnyard-earthy opening that settles into a majestic, spicy woodiness. Truly for the connoisseur.',
      ar: 'بروفايل عود هندي أسطوري، يشتهر هندي ترابي بافتتاحية ترابية حادة تستقر لتتحول إلى رائحة خشبية توابلية ملكية. عطر حقيقي للخبراء.',
    },
    features: ['High Silage', 'Authentic Indian Assam', 'Spicy Heart Notes'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  // ── OUD WOOD / BAKHOOR ──
  {
    id: 5,
    name: { en: 'Royal Bakhoor Blend', ar: 'بخور ملكي مميز' },
    price: 85,
    category: 'oud',
    subcategory: 'bakhoor',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A rich bakhoor blend of oud chips, sandalwood, and amber. Perfect for scenting your home with an opulent Arabian ambience.',
      ar: 'مزيج بخور غني من رقائق العود وخشب الصندل والعنبر. مثالي لتعطير منزلك بأجواء عربية فاخرة.',
    },
    features: ['Hand-blended', 'Natural Ingredients', 'Long burn time'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 6,
    name: { en: 'Cambodian Oud Chips', ar: 'رقائق عود كمبودي' },
    price: 220,
    category: 'oud',
    subcategory: 'chips',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'Premium Cambodian oud wood chips, perfect for traditional burning. Each piece is hand-selected for maximum resin content and fragrance.',
      ar: 'رقائق عود كمبودي فاخرة، مثالية للحرق التقليدي. كل قطعة مختارة يدوياً لأقصى محتوى من الراتنج والعطر.',
    },
    features: ['Hand-selected', 'High Resin Content', 'Grade A+'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },

  // ── PERFUMES — MEN ──
  {
    id: 7,
    name: { en: 'Sultan Noir EDP', ar: 'سلطان نوار - ماء عطر' },
    price: 195,
    category: 'perfumes',
    subcategory: 'men',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A commanding masculine fragrance with oud, leather, and black pepper. Projects confidence from boardroom to evening.',
      ar: 'عطر رجالي قوي مع العود والجلد والفلفل الأسود. يعكس الثقة من قاعة الاجتماعات إلى المساء.',
    },
    features: ['Eau de Parfum', '100ml', '12+ hour longevity'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 8,
    name: { en: 'Amir Oud Intense', ar: 'أمير عود إنتنس' },
    price: 245,
    category: 'perfumes',
    subcategory: 'men',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'An intense oud-based fragrance layered with saffron, amber, and vetiver. Built for the man who leaves a lasting impression.',
      ar: 'عطر مكثف يعتمد على العود مع الزعفران والعنبر والفتيفر. صُنع للرجل الذي يترك انطباعاً لا يُنسى.',
    },
    features: ['Eau de Parfum', '75ml', 'Saffron & Amber'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 9,
    name: { en: 'Midnight Musk', ar: 'مسك منتصف الليل' },
    price: 120,
    category: 'perfumes',
    subcategory: 'men',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A smooth blend of white musk, cedarwood, and bergamot. An everyday signature scent with understated elegance.',
      ar: 'مزيج ناعم من المسك الأبيض وخشب الأرز والبرغموت. عطر يومي مميز بأناقة هادئة.',
    },
    features: ['Eau de Toilette', '100ml', 'Fresh & Woody'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },

  // ── PERFUMES — WOMEN ──
  {
    id: 10,
    name: { en: 'Rose Taifi Silk', ar: 'روز طائفي حرير' },
    price: 185,
    category: 'perfumes',
    subcategory: 'women',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A delicate feminine fragrance woven with Taifi rose, silk musk, and a whisper of vanilla. Timeless grace in a bottle.',
      ar: 'عطر نسائي رقيق منسوج بوردة الطائف والمسك الحريري ولمسة من الفانيلا. أناقة خالدة في زجاجة.',
    },
    features: ['Eau de Parfum', '50ml', 'Taifi Rose'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 11,
    name: { en: 'Amira Gold', ar: 'أميرة ذهبية' },
    price: 210,
    category: 'perfumes',
    subcategory: 'women',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'An opulent floral-oriental with jasmine, golden amber, and a heart of precious oud. For the woman who commands a room.',
      ar: 'عطر زهري شرقي فاخر مع الياسمين والعنبر الذهبي وقلب من العود الثمين. للمرأة التي تسيطر على الغرفة.',
    },
    features: ['Eau de Parfum', '75ml', 'Jasmine & Amber'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 12,
    name: { en: 'Layla Musk', ar: 'ليلى مسك' },
    price: 95,
    category: 'perfumes',
    subcategory: 'women',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A soft, intimate musk with peony petals and a warm sandalwood dry-down. The perfect everyday companion.',
      ar: 'مسك ناعم وحميمي مع بتلات الفاوانيا وجفاف دافئ من خشب الصندل. الرفيق المثالي لكل يوم.',
    },
    features: ['Eau de Toilette', '100ml', 'Peony & Sandalwood'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },

  // ── PERFUMES — UNISEX ──
  {
    id: 13,
    name: { en: 'Oud Royale Unisex', ar: 'عود رويال يونيسكس' },
    price: 280,
    category: 'perfumes',
    subcategory: 'unisex',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A genderless masterpiece anchored in rare oud, spiced with cardamom and warmed by Indonesian patchouli.',
      ar: 'تحفة بلا جنس ترتكز على عود نادر، متبلة بالهيل ومدفأة بالباتشولي الإندونيسي.',
    },
    features: ['Eau de Parfum', '100ml', 'Cardamom & Patchouli'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },

  // ── ACCESSORIES ──
  {
    id: 14,
    name: { en: 'Brass Oud Burner', ar: 'مبخرة نحاسية' },
    price: 135,
    category: 'accessories',
    subcategory: 'burners',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'Handcrafted brass mabkhara with intricate Arabian geometric patterns. A functional art piece for your home.',
      ar: 'مبخرة نحاسية مصنوعة يدوياً بنقوش هندسية عربية معقدة. قطعة فنية وظيفية لمنزلك.',
    },
    features: ['Handcrafted', 'Solid Brass', 'Geometric Design'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 15,
    name: { en: 'Crystal Attar Bottle Set', ar: 'طقم زجاجات عطر كريستال' },
    price: 75,
    category: 'accessories',
    subcategory: 'bottles',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A set of 3 hand-blown crystal attar bottles with golden caps. Perfect for decanting and gifting your finest oils.',
      ar: 'طقم من ٣ زجاجات عطر كريستالية منفوخة يدوياً بأغطية ذهبية. مثالية لتعبئة وإهداء أجود الدهون.',
    },
    features: ['Set of 3', 'Hand-blown Crystal', 'Gold Caps'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
  {
    id: 16,
    name: { en: 'Luxury Gift Box', ar: 'صندوق هدايا فاخر' },
    price: 45,
    category: 'accessories',
    subcategory: 'gifting',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f7e7?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'Premium wooden gift box with velvet lining, holds up to 3 oil bottles. Engraving available upon request.',
      ar: 'صندوق هدايا خشبي فاخر مبطن بالمخمل، يتسع لـ ٣ زجاجات دهن. النقش متاح عند الطلب.',
    },
    features: ['Wooden Construction', 'Velvet Lined', 'Engravable'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
];

export default products;
