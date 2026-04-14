import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, Truck, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, t, language, clearCart } = useAppContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1500);
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
          <p className="order-number">Order ID: #ORD-{Math.floor(Math.random() * 90000) + 10000}</p>
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

            <button type="submit" className="place-order-btn">
              Place Order • {t('price_rm')} {total.toFixed(2)}
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
