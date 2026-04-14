import { ShoppingBag, User, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext, LOGO_URL } from '../context/AppContext';

const Navbar = () => {
  const { language, setLanguage, t, setIsCartOpen, cart } = useAppContext();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="nav-left">
          <button className="nav-icon-btn">
            <Search size={20} />
          </button>
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className="divider">|</span>
            <button 
              className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
            >
              عربي
            </button>
          </div>
        </div>

        <div className="nav-logo">
          <Link to="/">
            <img src={LOGO_URL} alt="OUD AL-ANOOD" className="logo-img" />
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">{t('nav_home')}</Link>
          <Link to="/shop" className="nav-link">{t('nav_shop')}</Link>
          <Link to="/oud-mohsen" className="nav-link">{t('nav_oud_mohsen')}</Link>
          <Link to="/about" className="nav-link">{t('nav_about')}</Link>
        </div>

        <div className="nav-right">
          <button 
            className="nav-drive-btn" 
            onClick={toggleStoreSelector}
            title="Drive to Us"
          >
            <MapPin size={18} />
            <span className="btn-label">Drive to Us</span>
          </button>
          <Link to="/account" className="nav-icon-btn">
            <User size={20} />
          </Link>
          <button className="nav-icon-btn cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
