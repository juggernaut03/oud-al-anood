import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api';
import './Contact.css';
import { Phone, Mail, MapPin, Camera, Send, PlayCircle, Globe, Clock, Navigation } from 'lucide-react';
import WholesaleConcierge from '../components/WholesaleConcierge';

const Contact = () => {
  const { t, stores, language } = useAppContext();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      await api.post('/api/contact', {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
        subject: 'Website contact form'
      });
      setStatus({ type: 'success', message: t('contact_success') });
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.message || t('contact_error') });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="contact-page">
      <div className="contact-header container">
        <span className="subtitle">{t('contact_get_in_touch')}</span>
        <h1>{t('contact_title')}</h1>
        <div className="header-line"></div>
      </div>

      <div className="contact-container container">
        <div className="contact-info">
          <section>
            <h2>{t('contact_details')}</h2>
            <div className="info-item">
              <Phone size={18} />
              <span>
                <a href="tel:+60132688779">+60 13-268 8779</a><br />
                <a href="tel:+60133333219">+60 13-333 3219</a>
              </span>
            </div>
            <div className="info-item"><Mail size={18} /><a href="mailto:Sales@oudalanood.com">E: Sales@oudalanood.com</a></div>
            <div className="info-item">
              <MapPin size={18} />
              <span>A: {t('footer_location')}</span>
            </div>
          </section>

          <section className="follow-us">
            <h2>{t('contact_follow')}</h2>
            <div className="social-grid">
              <a href="#" className="social-box"><Globe size={18} /></a>
              <a href="#" className="social-box"><Camera size={18} /></a>
              <a href="#" className="social-box"><PlayCircle size={18} /></a>
              <a href="#" className="social-box"><Send size={18} /></a>
            </div>
          </section>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>{t('contact_first_name')}</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>{t('contact_last_name')}</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>{t('contact_email')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('contact_message')}</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required />
            </div>
            {status && (
              <p style={{ marginTop: 12, color: status.type === 'success' ? '#2f7a45' : '#b42525' }}>
                {status.message}
              </p>
            )}
            <button type="submit" className="send-btn" disabled={submitting}>
              {submitting ? t('contact_sending') : t('contact_send')}
            </button>
          </form>
        </div>
      </div>

      <div className="contact-locations container">
        <div className="contact-locations-header">
          <span className="contact-locations-label">{t('store_visit')}</span>
          <h2 className="contact-locations-title">{t('store_drive_title')}</h2>
          <p className="contact-locations-subtitle">{t('store_drive_subtitle')}</p>
        </div>
        <div className="contact-locations-grid">
          {stores.map((store) => (
            <div className="contact-location-card" key={store.id}>
              <div className="contact-location-pin">
                <MapPin size={22} />
              </div>
              <div className="contact-location-body">
                <h3>{store.name[language]}</h3>
                <p className="contact-location-address">{store.address[language]}</p>
                <div className="contact-location-meta">
                  <span><Clock size={13} />{store.hours?.[language] || t('store_hours')}</span>
                  {store.phone && <span><Phone size={13} />{store.phone}</span>}
                </div>
                <a
                  href={store.navLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-location-directions"
                >
                  <Navigation size={15} />
                  <span>{t('store_directions')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-wholesale-section container">
        <WholesaleConcierge />
      </div>
    </div>
  );
};

export default Contact;
