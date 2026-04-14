import { X, Trash2, ArrowRight } from 'lucide-react';
import './CartDrawer.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, t, language } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ [language === 'ar' ? 'left' : 'right']: '-100%' }}
            animate={{ [language === 'ar' ? 'left' : 'right']: 0 }}
            exit={{ [language === 'ar' ? 'left' : 'right']: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="cart-header">
              <h2>{t('cart_title')}</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>{t('cart_empty')}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name[language]} />
                    <div className="item-details">
                      <h3>{item.name[language]}</h3>
                      <p>{t('price_rm')} {item.price} x {item.quantity}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="total-row">
                  <span>Total</span>
                  <span>{t('price_rm')} {total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  {t('checkout')}
                  <ArrowRight size={18} style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
};

export default CartDrawer;
