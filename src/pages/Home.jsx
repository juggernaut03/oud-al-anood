import Hero from '../components/Hero';
import './Home.css';
import BrandGallery from '../components/BrandGallery';
import ProductGrid from '../components/ProductGrid';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const { t, language, blogPosts, testimonials } = useAppContext();
  return (
    <main>
      <Hero />
      
      {/* Offers Section */}
      <section className="offers-section container">
        <div className="section-header">
          <h2 className="section-title">Exclusive Collections</h2>
          <div className="section-line"></div>
        </div>
        <div className="offers-grid">
          <motion.div 
            className="offer-card glass"
            whileHover={{ y: -10 }}
          >
            <img src="/images/page2.png" alt="Offer" />
            <div className="offer-info">
              <h3>Eid Al-Fitr Gold</h3>
              <p>20% Off on Heritage Collection</p>
              <Link to="/shop" className="offer-link">Discover</Link>
            </div>
          </motion.div>
          <motion.div 
            className="offer-card glass"
            whileHover={{ y: -10 }}
          >
            <img src="/images/page4.png" alt="Offer" />
            <div className="offer-info">
              <h3>Royal Oud Sets</h3>
              <p>Complimentary Sample with every purchase</p>
              <Link to="/shop" className="offer-link">Explore</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductGrid title={t('nav_shop')} />
      <section className="heritage-section container">
        <div className="heritage-content">
          <h2 className="heritage-title">Heritage since 1995</h2>
          <p className="heritage-text">
            For over two decades, Oud Al-Anood has been the pinnacle of artisanal fragrance in Kuala Lumpur. 
            Nestled in the heart of Bukit Bintang, we bring the finest oud and perfumes to those who appreciate 
            the soul of traditional scents fused with modern elegance.
          </p>
          <a href="/about" className="heritage-link">{t('nav_about')}</a>
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
