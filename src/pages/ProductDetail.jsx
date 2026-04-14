import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingBag, Heart, Minus, Plus, ChevronRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, wishlist, toggleWishlist, language, t, addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [id, products]);

  if (!product) return <div className="loading">Loading...</div>;

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const platforms = [
    { id: 'shopee', name: 'Shopee', logo: '/images/shopee.png' },
    { id: 'grab', name: 'Grab', logo: '/images/grab.png' },
    { id: 'lalamove', name: 'Lalamove', logo: '/images/lalamove.png' },
    { id: 'jnt', name: 'J&T Express', logo: '/images/jnt.png' }
  ];

  return (
    <div className="product-detail-page container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/">{t('nav_home')}</Link>
        <ChevronRight size={14} />
        <Link to="/shop">{t('nav_shop')}</Link>
        <ChevronRight size={14} />
        <span className="current">{product.name[language]}</span>
      </nav>

      <div className="product-main">
        {/* Left: Image Gallery */}
        <motion.div 
          className="product-gallery"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="main-image">
            <img src={product.image} alt={product.name[language]} />
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div 
          className="product-details"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="product-cat">{product.category.toUpperCase()}</span>
          <h1 className="product-title">{product.name[language]}</h1>
          <p className="product-price-large">{t('price_rm')} {product.price.toFixed(2)}</p>

          <div className="product-description">
            <p>{product.description?.[language] || "Experience the essence of luxury."}</p>
          </div>

          <ul className="product-features">
            {product.features?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <div className="purchase-controls">
            <div className="qty-selector">
              <button onClick={decrementQty}><Minus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={incrementQty}><Plus size={16} /></button>
            </div>
            <button className="add-cart-btn-large" onClick={handleAddToCart}>
              <ShoppingBag size={20} />
              Add to Bag
            </button>
            <button 
              className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={24} fill={isWishlisted ? "var(--accent-burgundy)" : "none"} />
            </button>
          </div>

          <div className="shop-through-section">
            <h4 className="shop-through-title">Shop Through Partner Platforms</h4>
            <div className="platform-pills">
              {platforms.map(platform => (
                <a 
                  key={platform.id}
                  href={product.purchaseLinks?.[platform.id] || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="platform-pill"
                >
                  <img src={platform.logo} alt={platform.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="trust-points">
            <div className="trust-item">
              <Truck size={20} />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders above RM 500</p>
              </div>
            </div>
            <div className="trust-item">
              <ShieldCheck size={20} />
              <div>
                <h4>Authentic Quality</h4>
                <p>100% Pure & Organic</p>
              </div>
            </div>
            <div className="trust-item">
              <RefreshCw size={20} />
              <div>
                <h4>Easy Returns</h4>
                <p>7-day hassle-free return</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <section className="product-reviews container">
        <div className="section-header">
          <h2 className="section-title">Verified Reviews</h2>
          <div className="section-line"></div>
        </div>
        <div className="reviews-summary">
          <div className="rating-box">
            <span className="rating-num">5.0</span>
            <div className="stars large">★★★★★</div>
            <p>Based on 12 verified purchases</p>
          </div>
        </div>
        <div className="reviews-list">
          <div className="review-item">
            <div className="review-meta">
              <span className="review-author">Khalid M.</span>
              <span className="review-date">April 2, 2024</span>
            </div>
            <div className="stars">★★★★★</div>
            <p className="review-text">
              {language === 'ar' 
                ? 'الجودة لا توصف، الرائحة تدوم لأيام على الملابس. تستحق كل رينغيت.' 
                : 'Unmatched quality, the scent lasts for days on clothing. Worth every RM.'}
            </p>
          </div>
          <div className="review-item">
            <div className="review-meta">
              <span className="review-author">Fatima H.</span>
              <span className="review-date">March 15, 2024</span>
            </div>
            <div className="stars">★★★★★</div>
            <p className="review-text">
              {language === 'ar'
                ? 'تغليف رائع وسرعة في التوصيل. دهن العود أصلي وفاخر جداً.'
                : 'Beautiful packaging and fast delivery. The oud oil is authentic and very premium.'}
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-header">
            <h2 className="section-title">Related Fragrances</h2>
            <div className="section-line"></div>
          </div>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
