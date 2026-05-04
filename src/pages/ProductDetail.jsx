import { useState, useEffect } from 'react';
import './ProductDetail.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  const { products, wishlist, toggleWishlist, language, t, addToCart } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({ average: 0, count: 0 });
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '', name: '', email: '' });
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
          if (!cancelled && data?.data) setProduct(normalizeProduct(data.data));
        } catch {
          if (!cancelled) setProduct(null);
        }
      })();
    }
    return () => { cancelled = true; };
  }, [id, products]);

  // Reset gallery & variant selection when product changes
  useEffect(() => {
    setActiveImage(0);
    setSelectedVariant(null);
  }, [product?.id]);

  useEffect(() => {
    if (!product?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get(`/api/reviews/product/${product.id}`);
        if (cancelled) return;
        setReviews(Array.isArray(data?.data) ? data.data : []);
        setReviewSummary({ average: Number(data?.average) || 0, count: Number(data?.count) || 0 });
      } catch {
        if (!cancelled) { setReviews([]); setReviewSummary({ average: 0, count: 0 }); }
      }
    })();
    return () => { cancelled = true; };
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
      setReviewStatus(t('product_review_thanks'));
      setReviewForm({ rating: 5, title: '', comment: '', name: '', email: '' });
      setShowReviewForm(false);
    } catch (err) {
      setReviewStatus(err?.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!product) return <div className="loading">{t('product_loading')}</div>;

  // Build unified gallery from images array + fallback to single image
  const gallery = product.images && product.images.length > 0
    ? product.images.map(img => (typeof img === 'string' ? img : img.url))
    : product.image ? [product.image] : [];

  const currentImage = gallery[activeImage] || product.image || '';

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && !matchesId(p, product.id))
    .slice(0, 4);

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const hasVariants = Array.isArray(product.sizeVariants) && product.sizeVariants.length > 0;
  const displayPrice = hasVariants
    ? (selectedVariant !== null ? product.sizeVariants[selectedVariant].price : null)
    : product.price;

  const hasWeight = product.weight?.value != null && product.weight.value !== '';
  const hasDimensions =
    product.dimensions?.length != null || product.dimensions?.width != null || product.dimensions?.height != null;

  const platforms = [
    { id: 'shopee', name: 'Shopee',      logo: '/images/shopee.png' },
    { id: 'lozada', name: 'Lazada',      logo: '/images/lazada.jpeg' },
    { id: 'tiktok', name: 'TikTok Shop', logo: '/images/tiktokshop.png' },
  ];

  const reviewCountLabel = reviewSummary.count > 0
    ? `${t('product_reviews_based')} ${reviewSummary.count} ${t('product_reviews_verified')} ${reviewSummary.count === 1 ? t('product_review_singular') : t('product_review_plural')}`
    : t('product_no_reviews');

  return (
    <div className="product-detail-page container">
      <nav className="breadcrumbs">
        <Link to="/">{t('nav_home')}</Link>
        <ChevronRight size={14} />
        <Link to="/shop">{t('nav_shop')}</Link>
        <ChevronRight size={14} />
        <span className="current">{product.name[language]}</span>
      </nav>

      <div className="product-main">
        {/* ── Gallery ── */}
        <motion.div
          className="product-gallery"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="main-image">
            <img src={currentImage} alt={product.name[language]} />
          </div>

          {gallery.length > 1 && (
            <div className="gallery-thumbnails">
              {gallery.map((url, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn${activeImage === idx ? ' active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={url} alt={`${product.name[language]} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Details ── */}
        <motion.div
          className="product-details"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="product-cat">{product.category.toUpperCase()}</span>
          <h1 className="product-title">{product.name[language]}</h1>

          {/* Price display */}
          {hasVariants ? (
            <p className="product-price-large">
              {selectedVariant !== null
                ? `${t('price_rm')} ${product.sizeVariants[selectedVariant].price.toFixed(2)}`
                : t('product_select_size') || 'Select a size'}
            </p>
          ) : (
            <p className="product-price-large">{t('price_rm')} {product.price.toFixed(2)}</p>
          )}

          <div className="product-description">
            <p>{product.description?.[language] || t('product_desc_fallback')}</p>
          </div>

          <ul className="product-features">
            {product.features?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>

          {/* ── Size variants ── */}
          {hasVariants && (
            <div className="size-variants-section">
              <p className="size-variants-label">
                {t('product_select_size') || 'Select Size'}
              </p>
              <div className="size-variants-grid">
                {product.sizeVariants.map((v, idx) => (
                  <button
                    key={idx}
                    className={`size-variant-btn${selectedVariant === idx ? ' selected' : ''}`}
                    onClick={() => setSelectedVariant(selectedVariant === idx ? null : idx)}
                  >
                    <span className="variant-option-label">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="variant-size">{v.label}</span>
                    <span className="variant-price">{t('price_rm')} {Number(v.price).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Physical specs ── */}
          {(hasWeight || hasDimensions) && (
            <div className="product-specs">
              <h4 className="specs-title">{t('product_specs') || 'Specifications'}</h4>
              <dl className="specs-list">
                {hasWeight && (
                  <>
                    <dt>{t('product_weight') || 'Weight'}</dt>
                    <dd>{product.weight.value} {product.weight.unit}</dd>
                  </>
                )}
                {hasDimensions && (
                  <>
                    <dt>{t('product_dimensions') || 'Dimensions'}</dt>
                    <dd>
                      {[product.dimensions.length, product.dimensions.width, product.dimensions.height]
                        .filter(v => v != null)
                        .join(' × ')} {product.dimensions.unit}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          )}

          <div className="purchase-controls">
            <div className="qty-selector">
              <button onClick={decrementQty}><Minus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={incrementQty}><Plus size={16} /></button>
            </div>
            <button
              className="add-cart-btn-large"
              onClick={() => {
                const item = hasVariants && selectedVariant !== null
                  ? { ...product, price: product.sizeVariants[selectedVariant].price }
                  : product;
                addToCart(item, quantity, { silent: true });
                navigate('/checkout');
              }}
              disabled={hasVariants && selectedVariant === null}
            >
              <ShoppingBag size={20} />
              {t('product_order_now')}
            </button>
            <button
              className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={24} fill={isWishlisted ? "var(--accent-burgundy)" : "none"} />
            </button>
          </div>

          {platforms.some(p => product.purchaseLinks?.[p.id]) && (
            <div className="shop-through-section">
              <h4 className="shop-through-title">{t('product_shop_partners')}</h4>
              <div className="platform-pills">
                {platforms.filter(p => product.purchaseLinks?.[p.id]).map(platform => (
                  <a
                    key={platform.id}
                    href={product.purchaseLinks[platform.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform-pill"
                  >
                    <img src={platform.logo} alt={platform.name} />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="trust-points">
            <div className="trust-item">
              <Truck size={20} />
              <div>
                <h4>{t('product_free_shipping')}</h4>
                <p>{t('product_free_shipping_desc')}</p>
              </div>
            </div>
            <div className="trust-item">
              <ShieldCheck size={20} />
              <div>
                <h4>{t('product_authentic')}</h4>
                <p>{t('product_authentic_desc')}</p>
              </div>
            </div>
            <div className="trust-item">
              <RefreshCw size={20} />
              <div>
                <h4>{t('product_returns')}</h4>
                <p>{t('product_returns_desc')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Reviews ── */}
      <section className="product-reviews container">
        <div className="section-header">
          <h2 className="section-title">{t('product_reviews_title')}</h2>
          <div className="section-line"></div>
        </div>
        <div className="reviews-summary">
          <div className="rating-box">
            <span className="rating-num">{reviewSummary.average ? reviewSummary.average.toFixed(1) : '—'}</span>
            <div className="stars large">★★★★★</div>
            <p>{reviewCountLabel}</p>
          </div>
          <div className="write-review-btn-container">
            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
              {t('product_share_exp')}
            </button>
            {reviewStatus && <p style={{ marginTop: 8 }}>{reviewStatus}</p>}
          </div>
        </div>

        {showReviewForm && (
          <div className="modal-overlay" onClick={() => setShowReviewForm(false)}>
            <motion.div
              className="review-form-modal glass-luxury"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="serif-title small">{t('product_boutique_review')}</h3>
              <p className="form-subtitle">{t('product_tell_story')} {product.name[language]}</p>

              <form className="review-inputs" onSubmit={handleReviewSubmit}>
                <div className="star-rating-select">
                  <span className="label">{t('product_rating')}</span>
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
                      <label>{t('product_your_name')}</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>{t('product_email_label')}</label>
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
                  <label>{t('product_title_label')}</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>{t('product_your_story')}</label>
                  <textarea
                    placeholder={t('product_story_placeholder')}
                    rows="8"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-review-btn" disabled={submittingReview}>
                    {submittingReview ? t('product_posting') : t('product_post_review')}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setShowReviewForm(false)}>
                    {t('product_cancel')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        <div className="reviews-list">
          {reviews.length === 0 && (
            <p style={{ opacity: 0.7 }}>{t('product_no_reviews_yet')}</p>
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
                <div className="stars">{'★'.repeat(Math.max(0, Math.min(5, Number(r.rating) || 0)))}</div>
                {r.title && <p className="review-title"><strong>{r.title}</strong></p>}
                <p className="review-text">{r.comment}</p>
              </div>
            );
          })}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-header">
            <h2 className="section-title">{t('product_related')}</h2>
            <div className="section-line"></div>
          </div>
          <div className="product-grid">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
