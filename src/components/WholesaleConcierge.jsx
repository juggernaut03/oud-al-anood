import { motion } from 'framer-motion';
import { MessageCircle, Mail, Package, Globe, Palette, Shield, ArrowRight } from 'lucide-react';
import qrImage from '../assets/images/qr-code.png';
import './WholesaleConcierge.css';
import { useAppContext } from '../context/AppContext';

const WholesaleConcierge = () => {
  const { t } = useAppContext();

  const benefits = [
    { icon: Package, titleKey: 'ws_benefit1_title', descKey: 'ws_benefit1_desc' },
    { icon: Globe,   titleKey: 'ws_benefit2_title', descKey: 'ws_benefit2_desc' },
    { icon: Palette, titleKey: 'ws_benefit3_title', descKey: 'ws_benefit3_desc' },
    { icon: Shield,  titleKey: 'ws_benefit4_title', descKey: 'ws_benefit4_desc' },
  ];

  return (
    <motion.section
      className="ws-concierge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="ws-main">
        <div className="ws-info">
          <span className="ws-tag">{t('ws_tag')}</span>
          <h2 className="ws-title">{t('ws_title')}</h2>
          <p className="ws-desc">{t('ws_desc')}</p>

          <div className="ws-benefits">
            {benefits.map((b) => (
              <div className="ws-benefit" key={b.titleKey}>
                <div className="ws-benefit-icon">
                  <b.icon size={18} />
                </div>
                <div>
                  <h4>{t(b.titleKey)}</h4>
                  <p>{t(b.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ws-actions">
            <a
              href="https://wa.me/601111111111?text=Hello%2C%20I%20am%20interested%20in%20a%20wholesale%20partnership%20with%20Oud%20Alnood."
              target="_blank"
              rel="noopener noreferrer"
              className="ws-btn ws-btn-whatsapp"
            >
              <MessageCircle size={18} />
              {t('ws_whatsapp')}
              <ArrowRight size={15} />
            </a>
            <a
              href="mailto:wholesale@oudalnood.com?subject=Bulk%20Inquiry"
              className="ws-btn ws-btn-email"
            >
              <Mail size={18} />
              {t('ws_email')}
            </a>
          </div>
        </div>

        <div className="ws-qr-side">
          <div className="ws-qr-card">
            <div className="ws-qr-frame">
              <img src={qrImage} alt="WhatsApp QR Code" />
            </div>
            <p className="ws-qr-label">{t('ws_qr_label')}</p>
            <span className="ws-qr-hint">{t('ws_qr_hint')}</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WholesaleConcierge;
