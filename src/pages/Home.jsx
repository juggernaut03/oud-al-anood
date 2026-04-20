import Hero from '../components/Hero';
import './Home.css';
import BrandGallery from '../components/BrandGallery';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const FALLBACK_COLLECTIONS = [
  {
    id: 'oud-oils',
    title: { en: 'Oud Oils Collection', ar: 'مجموعة دهن العود' },
    subtitle: { en: 'Hand-distilled essences aged to perfection', ar: 'خلاصات مقطرة يدوياً ومعتقة حتى الكمال' },
    image: '/images/page4.png',
    tag: { en: 'Heritage', ar: 'تراث' },
    filter: (p) => p.category === 'oud',
    link: '/shop',
  },
  {
    id: 'perfumes',
    title: { en: 'Signature Perfumes', ar: 'عطور مميزة' },
    subtitle: { en: 'Oriental fragrances for every occasion', ar: 'عطور شرقية لكل مناسبة' },
    image: '/images/page6.png',
    tag: { en: 'New Arrivals', ar: 'وصل حديثاً' },
    filter: (p) => p.category === 'perfumes',
    link: '/shop',
  },
];

const Home = () => {
  const { t, language, blogPosts, products, banners } = useAppContext();

  // Use admin-managed homepage/promo banners if available, otherwise fallback to hardcoded collections.
  const cmsBanners = banners.filter((b) => b.section === 'homepage' || b.section === 'promo');
  const collections = cmsBanners.length > 0
    ? cmsBanners.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        image: b.image || '/images/page4.png',
        tag: b.ctaText,
        filter: () => true,
        link: b.ctaLink || '/shop',
      }))
    : FALLBACK_COLLECTIONS;

  return (
    <main>
      <Hero />

      {/* Collection Banners + Products */}
      {collections.map((collection, idx) => {
        const collectionProducts = products.filter(collection.filter).slice(0, 6);
        return (
          <section className="home-collection" key={collection.id}>
            <div className="container">
              {/* Banner */}
              <motion.div
                className="hc-banner"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="hc-banner-img">
                  <img src={collection.image} alt={collection.title[language]} />
                  <div className="hc-banner-overlay" />
                </div>
                <div className="hc-banner-content">
                  <span className="hc-banner-tag">{collection.tag[language]}</span>
                  <h2 className="hc-banner-title">{collection.title[language]}</h2>
                  <p className="hc-banner-subtitle">{collection.subtitle[language]}</p>
                  <Link to={collection.link} className="hc-banner-btn">
                    Explore All
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>

              {/* Horizontal Product Row */}
              <div className="hc-products-row">
                <div className="hc-products-scroll">
                  {collectionProducts.map((product, i) => (
                    <motion.div
                      className="hc-product-item"
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
                <Link to={collection.link} className="hc-view-all">
                  View All
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* Heritage Section */}
      <section className="heritage-section container">
        <div className="heritage-content">
          <h2 className="heritage-title">Heritage since 1995</h2>
          <p className="heritage-text">
            For over two decades, Oud Al-Anood has been the pinnacle of artisanal fragrance in Kuala Lumpur.
            Nestled in the heart of Bukit Bintang, we bring the finest oud and perfumes to those who appreciate
            the soul of traditional scents fused with modern elegance.
          </p>
          <Link to="/about" className="heritage-link">{t('nav_about')}</Link>
        </div>
        <div className="heritage-image">
          <img src="/images/page5.png" alt="Heritage" />
        </div>
      </section>

      <BrandGallery />

      {/* Testimonials */}
      <section className="testimonials-section container">
        <div className="section-header">
          <h2 className="section-title">Customer Stories</h2>
          <div className="section-line"></div>
        </div>
        <TestimonialCarousel />
      </section>

      {/* Blog Preview */}
      <section className="blog-preview-section container">
        <div className="section-header">
          <h2 className="section-title">From the Journal</h2>
          <div className="section-line"></div>
        </div>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
              <div className="blog-img">
                <img src={post.image} alt={post.title[language]} />
              </div>
              <div className="blog-content">
                <span className="date">{post.date}</span>
                <h3>{post.title[language]}</h3>
                <p>{post.excerpt[language]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
