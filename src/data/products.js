import DEFAULT_PURCHASE_LINKS from './purchaseLinks';

const products = [
  {
    id: 1,
    name: { en: 'Kalakassi Oud Oil - New', ar: 'دهـن عود كالكاسي جديد' },
    price: 375,
    category: 'oil',
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
    category: 'oil',
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
    category: 'oil',
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
    category: 'oil',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A legendary Indian Oud profile, Hinid Turabi is known for its intense, barnyard-earthy opening that settles into a majestic, spicy woodiness. Truly for the connoisseur.',
      ar: 'بروفايل عود هندي أسطوري، يشتهر هندي ترابي بافتتاحية ترابية حادة تستقر لتتحول إلى رائحة خشبية توابلية ملكية. عطر حقيقي للخبراء.',
    },
    features: ['High Silage', 'Authentic Indian Assam', 'Spicy Heart Notes'],
    purchaseLinks: DEFAULT_PURCHASE_LINKS,
  },
];

export default products;
