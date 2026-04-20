import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import './Checkout.css';
import { CreditCard, Truck, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, t, language, clearCart, isWholesale } = useAppContext();
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        customer: { name: formData.name, email: formData.email, phone: formData.phone },
        items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
        isWholesale,
        notes: [formData.address, formData.city, formData.zip].filter(Boolean).join(', '),
        channel: 'website'
      };
      const { data } = await api.post('/api/orders', payload);
      setOrderNumber(data?.data?.orderNumber || data?.data?._id || '');
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Order failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-success container">
        <motion.div
          className="success-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle size={80} className="success-icon" />
          <h1>{t('checkout_success_title')}</h1>
          <p>{t('checkout_success_msg')}</p>
          <p className="order-number">{t('checkout_order_id')}{orderNumber || '—'}</p>
          <Link to="/" className="home-btn">{t('checkout_return_home')}</Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page container empty">
        <div className="empty-state">
          <ShoppingBag size={64} />
          <h2>{t('checkout_bag_empty_title')}</h2>
          <p>{t('checkout_bag_empty_text')}</p>
          <Link to="/shop" className="shop-link">{t('checkout_back_shop')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> {t('checkout_back_shop')}
      </Link>

      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2>{t('checkout_shipping')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('checkout_full_name')}</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder={t('checkout_name_placeholder')} />
            </div>
            <div className="form-group">
              <label>{t('checkout_email_address')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder={t('checkout_email_placeholder')} />
            </div>
            <div className="form-group">
              <label>{t('checkout_phone')}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('checkout_phone_placeholder')} />
            </div>
            <div className="form-group">
              <label>{t('checkout_address')}</label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} required placeholder={t('checkout_address_placeholder')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('checkout_city')}</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>{t('checkout_postcode')}</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required />
              </div>
            </div>

            <h2 className="payment-title">{t('checkout_payment')}</h2>
            <div className="payment-options">
              <div className="payment-card selected">
                <CreditCard size={20} />
                <span>{t('checkout_card')}</span>
              </div>
            </div>

            <div className="form-group">
              <label>{t('checkout_card_number')}</label>
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required placeholder="0000 0000 0000 0000" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('checkout_expiry')}</label>
                <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} required placeholder={t('checkout_expiry_placeholder')} />
              </div>
              <div className="form-group">
                <label>{t('checkout_cvv')}</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required placeholder="123" />
              </div>
            </div>

            {error && <p style={{ color: '#b42525', marginTop: 12 }}>{error}</p>}
            <button type="submit" className="place-order-btn" disabled={submitting}>
              {submitting ? t('checkout_placing') : `${t('checkout_place_order')} • ${t('price_rm')} ${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h3>{t('checkout_order_summary')}</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name[language]} />
                </div>
                <div className="item-info">
                  <h4>{item.name[language]}</h4>
                  <p>{t('checkout_qty')}{item.quantity}</p>
                </div>
                <span className="item-price">{t('price_rm')} {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>{t('checkout_subtotal')}</span>
              <span>{t('price_rm')} {total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>{t('checkout_shipping_label')}</span>
              <span className="free">{t('checkout_free')}</span>
            </div>
            <div className="summary-row total">
              <span>{t('checkout_total')}</span>
              <span>{t('price_rm')} {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="trust-badges">
            <div className="badge"><Truck size={16} /> {t('checkout_fast_delivery')}</div>
            <div className="badge"><CheckCircle size={16} /> {t('checkout_secure_payment')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
