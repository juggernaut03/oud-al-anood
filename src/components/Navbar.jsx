import { ShoppingBag, User, Search, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext, LOGO_URL } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const {
    language,
    setLanguage,
    t,
    setIsCartOpen,
    cart,
    toggleStoreSelector
  } = useAppContext();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      {/* Row 1: Lang, Logo, Actions */}
      <div className="container nav-top">
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

      {/* Row 2: Nav Links */}
      <div className="container nav-bottom">
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>{t('nav_home')}</Link>
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>{t('nav_shop')}</Link>
          <Link to="/offers" className={`nav-link ${location.pathname === '/offers' ? 'active' : ''}`}>Specials</Link>
          <Link to="/oud-mohsen" className={`nav-link ${location.pathname === '/oud-mohsen' ? 'active' : ''}`}>{t('nav_oud_mohsen')}</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>{t('nav_about')}</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>Journal</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
