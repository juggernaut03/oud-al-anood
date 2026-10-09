import { useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
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
  const [paymentPending, setPaymentPending] = useState(false);
  const [paypalConfig, setPaypalConfig] = useState(null); // null = loading
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponError, setCouponError] = useState(null);
  const [couponApplying, setCouponApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: ''
  });

  useEffect(() => {
    api.get('/api/payments/paypal/config')
      .then(({ data }) => setPaypalConfig(data.data))
      .catch(() => setPaypalConfig({ enabled: false }));
  }, []);

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

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const couponDiscount = couponApplied?.discount || 0;
  const total = Math.max(0, subtotal - couponDiscount);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    setCouponError(null);
    setCouponApplying(true);
    try {
      const { data } = await api.post('/api/coupons/validate', { code, subtotal });
      setCouponApplied({ code: data.data.code, discount: data.data.discount });
    } catch (err) {
      setCouponError(err?.response?.data?.message || 'Invalid coupon');
      setCouponApplied(null);
    } finally {
      setCouponApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponCode('');
    setCouponError(null);
  };

  // Prices, discounts and the charged amount are all recomputed by the server
  const buildOrderPayload = () => ({
    customer: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: [formData.address, formData.city, formData.zip].filter(Boolean).join(', '),
    },
    items: cart.map((item) => ({ productId: item.id, quantity: item.quantity, ...(item.variant && { variant: item.variant }) })),
    isWholesale,
    notes: [formData.address, formData.city, formData.zip].filter(Boolean).join(', '),
    ...(couponApplied ? { couponCode: couponApplied.code } : {})
  });

  const handlePayPalClick = (_data, actions) => {
    setError(null);
    if (!formRef.current?.reportValidity()) {
      setError(t('checkout_fill_details'));
      return actions.reject();
    }
    return actions.resolve();
  };

  const handleCreatePayPalOrder = async () => {
    try {
      const { data } = await api.post('/api/payments/paypal/create-order', buildOrderPayload());
      return data.data.paypalOrderId;
    } catch (err) {
      setError(err?.response?.data?.message || t('checkout_payment_failed'));
      throw err;
    }
  };

  const handlePayPalApprove = async (data, actions) => {
    setSubmitting(true);
    try {
      const { data: res } = await api.post('/api/payments/paypal/capture', { paypalOrderId: data.orderID });
      setOrderNumber(res.data.orderId || '');
      setPaymentPending(res.data.payment?.status === 'pending');
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      // Declined card / funding source: let the buyer choose another one in the PayPal window
      if (err?.response?.data?.code === 'INSTRUMENT_DECLINED') return actions.restart();
      setError(err?.response?.data?.message || t('checkout_payment_failed'));
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
          <p>{paymentPending ? t('checkout_payment_pending') : t('checkout_success_msg')}</p>
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
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
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

          </form>

          <h2 className="payment-title">{t('checkout_payment')}</h2>
          <div className="payment-options">
            <div className="payment-card selected">
              <CreditCard size={20} />
              <span>{t('checkout_paypal_note')}</span>
            </div>
          </div>

          {paypalConfig?.enabled && paypalConfig.currency !== 'MYR' && (
            <p className="payment-currency-note">
              {t('checkout_charged_in')} {paypalConfig.currency}
              {paypalConfig.exchangeRate ? ` (≈ ${(total * paypalConfig.exchangeRate).toFixed(2)} ${paypalConfig.currency})` : ''}
            </p>
          )}

          {error && <p style={{ color: '#b42525', marginTop: 12 }}>{error}</p>}

          <div className="paypal-buttons">
            {paypalConfig === null && <p>{t('checkout_payment_loading')}</p>}
            {paypalConfig && !paypalConfig.enabled && <p style={{ color: '#b42525' }}>{t('checkout_payment_unavailable')}</p>}
            {paypalConfig?.enabled && (
              <PayPalScriptProvider
                options={{
                  clientId: paypalConfig.clientId,
                  currency: paypalConfig.currency,
                  intent: 'capture',
                  locale: language === 'ar' ? 'ar_EG' : 'en_US',
                }}
              >
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
                  disabled={submitting}
                  forceReRender={[total, isWholesale, couponApplied?.code, cart.length]}
                  onClick={handlePayPalClick}
                  createOrder={handleCreatePayPalOrder}
                  onApprove={handlePayPalApprove}
                  onCancel={() => setError(t('checkout_payment_cancelled'))}
                  onError={() => setError((prev) => prev || t('checkout_payment_failed'))}
                />
              </PayPalScriptProvider>
            )}
            {submitting && <p>{t('checkout_placing')}</p>}
          </div>
        </div>

        <div className="order-summary-section">
          <h3>{t('checkout_order_summary')}</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.cartKey ?? item.id} className="summary-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name[language]} />
                </div>
                <div className="item-info">
                  <h4>{item.name[language]}{item.variant ? ` · ${item.variant}` : ''}</h4>
                  <p>{t('checkout_qty')}{item.quantity}</p>
                </div>
                <span className="item-price">{t('price_rm')} {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="coupon-section">
            {couponApplied ? (
              <div className="coupon-applied">
                <span className="coupon-tag">
                  <CheckCircle size={14} /> {couponApplied.code}
                </span>
                <button type="button" className="coupon-remove" onClick={handleRemoveCoupon}>Remove</button>
              </div>
            ) : (
              <div className="coupon-input-row">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon())}
                />
                <button
                  type="button"
                  className="coupon-apply-btn"
                  onClick={handleApplyCoupon}
                  disabled={couponApplying || !couponCode.trim()}
                >
                  {couponApplying ? '…' : 'Apply'}
                </button>
              </div>
            )}
            {couponError && <p className="coupon-error">{couponError}</p>}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>{t('checkout_subtotal')}</span>
              <span>{t('price_rm')} {subtotal.toFixed(2)}</span>
            </div>
            {couponApplied && (
              <div className="summary-row discount-row">
                <span>Coupon ({couponApplied.code})</span>
                <span className="discount-amount">− {t('price_rm')} {couponDiscount.toFixed(2)}</span>
              </div>
            )}
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
