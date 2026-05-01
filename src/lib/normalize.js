const DEFAULT_PURCHASE_LINKS = { shopee: '', grab: '', lalamove: '', jnt: '' };

export const normalizeProduct = (p) => {
  if (!p) return p;
  return {
    ...p,
    id: p._id || p.id,
    name: p.name || { en: '', ar: '' },
    description: p.description || { en: '', ar: '' },
    features: Array.isArray(p.features) ? p.features : [],
    purchaseLinks: { ...DEFAULT_PURCHASE_LINKS, ...(p.purchaseLinks || {}) },
    image: p.image || '',
    images: Array.isArray(p.images) ? p.images : [],
    sizeVariants: Array.isArray(p.sizeVariants) ? p.sizeVariants : [],
    weight: p.weight || { value: null, unit: 'g' },
    dimensions: p.dimensions || { length: null, width: null, height: null, unit: 'cm' },
  };
};

export const normalizeStore = (s) => {
  if (!s) return s;
  return {
    ...s,
    id: s._id || s.slug || s.id,
    name: s.name || { en: '', ar: '' },
    address: s.address || { en: '', ar: '' },
    mapEmbed: s.mapEmbed || '',
    navLink: s.navLink || ''
  };
};

export const normalizeTestimonial = (t) => {
  if (!t) return t;
  return {
    ...t,
    id: t._id || t.id,
    name: t.name || '',
    text: t.text || { en: '', ar: '' },
    rating: t.rating ?? 5
  };
};

export const normalizeBanner = (b) => {
  if (!b) return b;
  return {
    ...b,
    id: b._id || b.id,
    section: b.section || '',
    title: b.title || { en: '', ar: '' },
    subtitle: b.subtitle || { en: '', ar: '' },
    description: b.description || { en: '', ar: '' },
    image: b.image || '',
    mobileImage: b.mobileImage || '',
    ctaText: b.ctaText || { en: '', ar: '' },
    ctaLink: b.ctaLink || '',
    sortOrder: b.sortOrder ?? 0,
  };
};

export const normalizeOffer = (o) => {
  if (!o) return o;
  return {
    ...o,
    id: o._id || o.id,
    title: o.title || { en: '', ar: '' },
    description: o.description || { en: '', ar: '' },
    image: o.image || '',
    badge: o.badge || '',
    discountType: o.discountType || 'percentage',
    discountValue: o.discountValue ?? 0,
    link: o.link || '/shop',
    products: Array.isArray(o.products) ? o.products : [],
    sortOrder: o.sortOrder ?? 0,
  };
};

export const normalizeBlogPost = (post) => {
  if (!post) return post;
  const created = post.publishedAt || post.createdAt;
  const date = created ? new Date(created).toISOString().slice(0, 10) : '';
  return {
    ...post,
    id: post._id || post.slug || post.id,
    title: post.title || { en: '', ar: '' },
    excerpt: post.excerpt || { en: '', ar: '' },
    body: post.body || { en: '', ar: '' },
    image: post.image || '',
    date
  };
};

export const toList = (res, mapper) => {
  const data = res?.data?.data;
  if (!Array.isArray(data)) return [];
  return mapper ? data.map(mapper) : data;
};

export const toItem = (res, mapper) => {
  const data = res?.data?.data;
  if (!data) return null;
  return mapper ? mapper(data) : data;
};
