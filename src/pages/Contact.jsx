import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Phone, Mail, MapPin, Camera, Send, PlayCircle, Globe } from 'lucide-react';

const Contact = () => {
  const { t } = useAppContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting OUD AL-ANOOD! We will get back to you soon.');
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      <div className="contact-header container">
        <span className="subtitle">GET IN TOUCH</span>
        <h1>CONTACT</h1>
        <div className="header-line"></div>
      </div>

      <div className="contact-container container">
        <div className="contact-info">
          <section>
            <h2>CONTACT DETAILS</h2>
            <div className="info-item">
              <Phone size={18} />
              <span>P: +60 12-345 6789</span>
            </div>
            <div className="info-item">
              <Mail size={18} />
              <span>E: info@oudalanood.com</span>
            </div>
            <div className="info-item">
              <MapPin size={18} />
              <span>A: Bukit Bintang Kiosk K15, Monorail Station, Kuala Lumpur, Malaysia</span>
            </div>
          </section>

          <section className="follow-us">
            <h2>FOLLOW US</h2>
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
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="6"
              />
            </div>
            <button type="submit" className="send-btn">SEND</button>
          </form>
        </div>
      </div>

      <div className="map-section">
        <iframe 
          title="Bukit Bintang Kiosk K15 Location"
          src="https://maps.google.com/maps?q=Bukit%20Bintang%20Kiosk%20K15,%20Monorail%20Station,%20Kuala%20Lumpur&t=&z=17&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
