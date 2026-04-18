import { useState, useEffect } from 'react';
import './ProductDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { normalizeProduct } from '../lib/normalize';
import { ShoppingBag, Heart, Minus, Plus, ChevronRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const matchesId = (p, id) => {
  if (!p || id == null) return false;
  return String(p.id) === String(id) || String(p._id) === String(id);
};

const ProductDetail = () => {
  const { id } = useParams();
  const { products, wishlist, toggleWishlist, language, t, openPurchaseModal } = useAppContext();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({ average: 0, count: 0 });
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
    email: ''
  });
  const [reviewStatus, setReviewStatus] = useState(null);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);
    const existing = products.find((p) => matchesId(p, id));
    if (existing) {
      setProduct(existing);
    } else {
      (async () => {
        try {
          const { data } = await api.get(`/api/products/${id}`);
          if (!cancelled && data?.data) {
            setProduct(normalizeProduct(data.data));
          }
        } catch {
          if (!cancelled) setProduct(null);
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [id, products]);

  useEffect(() => {
    if (!product?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get(`/api/reviews/product/${product.id}`);
        if (cancelled) return;
        setReviews(Array.isArray(data?.data) ? data.data : []);
        setReviewSummary({
          average: Number(data?.average) || 0,
          count: Number(data?.count) || 0
        });
      } catch {
        if (!cancelled) {
          setReviews([]);
          setReviewSummary({ average: 0, count: 0 });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [product?.id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!product?.id) return;
    setSubmittingReview(true);
    setReviewStatus(null);
    try {
      await api.post('/api/reviews', {
        product: product.id,
        rating: Number(reviewForm.rating) || 5,
        title: reviewForm.title,
        comment: reviewForm.comment,
        name: reviewForm.name || user?.name,
        email: reviewForm.email || user?.email
      });
      setReviewStatus('Thanks — your review is pending approval.');
      setReviewForm({ rating: 5, title: '', comment: '', name: '', email: '' });
      setShowReviewForm(false);
    } catch (err) {
      setReviewStatus(err?.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && !matchesId(p, product.id))
    .slice(0, 4);

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

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
            <button className="add-cart-btn-large" onClick={() => openPurchaseModal(product)}>
              <ShoppingBag size={20} />
              Order Now
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
            <span className="rating-num">{reviewSummary.average ? reviewSummary.average.toFixed(1) : '—'}</span>
            <div className="stars large">★★★★★</div>
            <p>
              {reviewSummary.count > 0
                ? `Based on ${reviewSummary.count} verified ${reviewSummary.count === 1 ? 'review' : 'reviews'}`
                : 'No reviews yet'}
            </p>
          </div>
          <div className="write-review-btn-container">
            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
              Share Your Experience
            </button>
            {reviewStatus && <p style={{ marginTop: 8 }}>{reviewStatus}</p>}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="modal-overlay" onClick={() => setShowReviewForm(false)}>
            <motion.div
              className="review-form-modal glass-luxury"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="serif-title small">Boutique Review</h3>
              <p className="form-subtitle">Tell your story about {product.name[language]}</p>

              <form className="review-inputs" onSubmit={handleReviewSubmit}>
                <div className="star-rating-select">
                  <span className="label">Rating</span>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>{n} ★</option>
                    ))}
                  </select>
                </div>
                {!user && (
                  <>
                    <div className="input-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}
                <div className="input-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Your Story</label>
                  <textarea
                    placeholder="Describe your experience with this fragrance..."
                    rows="8"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-review-btn" disabled={submittingReview}>
                    {submittingReview ? 'Posting…' : 'Post Review'}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        <div className="reviews-list">
          {reviews.length === 0 && (
            <p style={{ opacity: 0.7 }}>
              {language === 'ar' ? 'لا توجد مراجعات بعد.' : 'No reviews yet.'}
            </p>
          )}
          {reviews.map((r) => {
            const author = r.name || r.user?.name || 'Anonymous';
            const createdAt = r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '';
            return (
              <div key={r._id} className="review-item">
                <div className="review-meta">
                  <span className="review-author">{author}</span>
                  <span className="review-date">{createdAt}</span>
                </div>
                <div className="stars">
                  {'★'.repeat(Math.max(0, Math.min(5, Number(r.rating) || 0)))}
                </div>
                {r.title && <p className="review-title"><strong>{r.title}</strong></p>}
                <p className="review-text">{r.comment}</p>
              </div>
            );
          })}
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
