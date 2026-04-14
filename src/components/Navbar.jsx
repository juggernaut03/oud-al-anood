import { useState } from 'react';
import './Navbar.css';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext, LOGO_URL } from '../context/AppContext';

const Navbar = () => {
  const { language, setLanguage, t, setIsCartOpen, cart } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
          <Link to="/" onClick={closeMobileMenu}>
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
          <Link to="/account" className="nav-icon-btn">
            <User size={20} />
          </Link>
          <button className="nav-icon-btn cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className="nav-icon-btn hamburger-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>{t('nav_home')}</Link>
          <Link to="/shop" className="mobile-nav-link" onClick={closeMobileMenu}>{t('nav_shop')}</Link>
          <Link to="/oud-mohsen" className="mobile-nav-link" onClick={closeMobileMenu}>{t('nav_oud_mohsen')}</Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>{t('nav_about')}</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
          <Link to="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>Journal</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
