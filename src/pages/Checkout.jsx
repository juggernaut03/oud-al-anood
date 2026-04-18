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
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        })),
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
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with OUD AL-ANOOD. Your exquisite fragrance will be with you shortly.</p>
          <p className="order-number">Order ID: {orderNumber || '—'}</p>
          <Link to="/" className="home-btn">Return Home</Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page container empty">
        <div className="empty-state">
          <ShoppingBag size={64} />
          <h2>Your bag is empty</h2>
          <p>Please add some items to your bag before checking out.</p>
          <Link to="/shop" className="shop-link">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Back to Shop
      </Link>
      
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+60 12 345 6789"
              />
            </div>
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                required 
                placeholder="Street address, apartment, etc."
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Postcode / ZIP</label>
                <input 
                  type="text" 
                  name="zip" 
                  value={formData.zip} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>

            <h2 className="payment-title">Payment Method</h2>
            <div className="payment-options">
              <div className="payment-card selected">
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
              </div>
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleInputChange} 
                required 
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input 
                  type="text" 
                  name="expiry" 
                  value={formData.expiry} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="MM/YY"
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input 
                  type="text" 
                  name="cvv" 
                  value={formData.cvv} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="123"
                />
              </div>
            </div>

            {error && (
              <p style={{ color: '#b42525', marginTop: 12 }}>{error}</p>
            )}
            <button type="submit" className="place-order-btn" disabled={submitting}>
              {submitting ? 'Placing order…' : `Place Order • ${t('price_rm')} ${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name[language]} />
                </div>
                <div className="item-info">
                  <h4>{item.name[language]}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span className="item-price">{t('price_rm')} {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{t('price_rm')} {total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{t('price_rm')} {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="trust-badges">
            <div className="badge">
              <Truck size={16} /> Fast Delivery
            </div>
            <div className="badge">
              <CheckCircle size={16} /> Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
