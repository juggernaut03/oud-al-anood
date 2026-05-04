import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Account.css';
import { User, Package, Heart, LogOut, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Orders from './Orders';

const emptyLogin = { email: '', password: '' };
const emptyRegister = { name: '', email: '', password: '', phone: '' };
const emptyProfile = { name: '', phone: '', language: 'en' };

const Account = () => {
  const { t } = useAppContext();
  const { user, isAuthenticated, status, login, register, logout, updateProfile } = useAuth();
  const location = useLocation();
  const isOrders = location.pathname.includes('/orders');

  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [profileForm, setProfileForm] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [profileMessage, setProfileMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    try {
      await login(loginForm);
      setLoginForm(emptyLogin);
    } catch (err) {
      setAuthError(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    try {
      await register(registerForm);
      setRegisterForm(emptyRegister);
    } catch (err) {
      setAuthError(err?.response?.data?.message || err?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = () => {
    setProfileForm({ name: user?.name || '', phone: user?.phone || '', language: user?.language || 'en' });
    setEditing(true);
    setProfileMessage(null);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateProfile(profileForm);
      setProfileMessage('Profile updated');
      setEditing(false);
    } catch (err) {
      setProfileMessage(err?.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="account-page container">
        <p>{t('account_loading')}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/images/perfume.png" alt="Oud Al-Anood" className="auth-logo" />
            <span className="auth-brand-name">OUD AL-ANOOD</span>
          </div>

          <h2 className="auth-heading">
            {mode === 'login' ? t('account_welcome_back') : t('account_create')}
          </h2>
          <p className="auth-subheading">
            {mode === 'login' ? t('account_signin_sub') : t('account_register_sub')}
          </p>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setAuthError(null); }}
            >
              {t('account_sign_in_tab')}
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setAuthError(null); }}
            >
              {t('account_register_tab')}
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">{t('account_email')}</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder={t('account_email_placeholder')}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">{t('account_password')}</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder={t('account_password_placeholder')}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              {authError && <p className="auth-error">{authError}</p>}
              <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? t('account_signing_in') : t('account_sign_in_btn')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">{t('account_full_name')}</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder={t('account_name_placeholder')}
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">{t('account_email')}</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder={t('account_email_placeholder')}
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">
                  {t('account_phone_optional')} <span className="auth-optional">{t('account_optional')}</span>
                </label>
                <input
                  className="auth-input"
                  type="tel"
                  placeholder={t('checkout_phone_placeholder')}
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">{t('account_password')}</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder={t('account_password_placeholder')}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
              </div>
              {authError && <p className="auth-error">{authError}</p>}
              <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? t('account_creating') : t('account_create_btn')}
              </button>
            </form>
          )}

          <p className="auth-switch">
            {mode === 'login' ? t('account_no_account') : t('account_have_account')}{' '}
            <button
              type="button"
              className="auth-switch-btn"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setAuthError(null); }}
            >
              {mode === 'login' ? t('account_register_link') : t('account_signin_link')}
            </button>
          </p>

          <div className="auth-admin-divider">
            <span>or</span>
          </div>
          <a
            href="https://perfume-admin-panel.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-admin-btn"
          >
            <ShieldCheck size={15} />
            Admin Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page container">
      <div className="account-header">
        <h1>{t('nav_account')}</h1>
        <p>{t('account_greeting')} {user?.name || 'Guest'}</p>
      </div>

      <div className="account-layout">
        <aside className="account-nav">
          <NavLink to="/account" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <User size={20} /> {t('account_profile')}
          </NavLink>
          <NavLink to="/account/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Package size={20} /> {t('account_my_orders')}
          </NavLink>
          <NavLink to="/wishlist" className="nav-item">
            <Heart size={20} /> {t('account_wishlist')}
          </NavLink>
          <button className="nav-item logout" onClick={logout}>
            <LogOut size={20} /> {t('account_logout')}
          </button>
        </aside>

        <section className="account-content">
          {isOrders ? (
            <Orders />
          ) : (
            <div className="card login-card">
              <h2>{t('account_my_profile')}</h2>
              {editing ? (
                <form onSubmit={handleProfileSave}>
                  <div className="profile-details">
                    <div className="detail-row">
                      <label>{t('account_full_name')}</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="detail-row">
                      <label>{t('account_phone_label')}</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="detail-row">
                      <label>{t('account_language')}</label>
                      <select
                        value={profileForm.language}
                        onChange={(e) => setProfileForm({ ...profileForm, language: e.target.value })}
                      >
                        <option value="en">{t('account_lang_en')}</option>
                        <option value="ar">{t('account_lang_ar')}</option>
                      </select>
                    </div>
                  </div>
                  {profileMessage && <p style={{ marginTop: 12 }}>{profileMessage}</p>}
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button type="submit" className="edit-btn" disabled={submitting}>
                      {submitting ? t('account_saving') : t('account_save')}
                    </button>
                    <button type="button" className="edit-btn" onClick={() => setEditing(false)} style={{ opacity: 0.7 }}>
                      {t('account_cancel')}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="profile-details">
                    <div className="detail-row">
                      <label>{t('account_full_name')}</label>
                      <span>{user?.name || '—'}</span>
                    </div>
                    <div className="detail-row">
                      <label>{t('account_email_label')}</label>
                      <span>{user?.email || '—'}</span>
                    </div>
                    <div className="detail-row">
                      <label>{t('account_phone_label')}</label>
                      <span>{user?.phone || '—'}</span>
                    </div>
                    <div className="detail-row">
                      <label>{t('account_language')}</label>
                      <span>{(user?.language || 'en').toUpperCase()}</span>
                    </div>
                  </div>
                  {profileMessage && <p style={{ marginTop: 12 }}>{profileMessage}</p>}
                  <button className="edit-btn" onClick={startEdit}>
                    {t('account_edit')}
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Account;
