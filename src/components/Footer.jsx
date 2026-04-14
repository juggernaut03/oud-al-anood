import { useAppContext, LOGO_URL } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Camera, MessageCircle, Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useAppContext();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section brand">
          <img src={LOGO_URL} alt="OUD AL-ANOOD" className="footer-logo-img" />
          <p className="footer-tagline">{t('footer_since')}</p>
          <div className="social-links">
            <Camera size={20} />
            <MessageCircle size={20} />
            <Send size={20} />
          </div>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <MapPin size={18} />
            <span>{t('footer_location')}</span>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <span>+60 12-345 6789</span>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <span>info@oudalanood.com</span>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <Link to="/shop">{t('nav_shop')}</Link>
          <Link to="/about">{t('nav_about')}</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/account">{t('nav_account')}</Link>
          <Link to="/offers">Specials</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {t('footer_copyright')}. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
