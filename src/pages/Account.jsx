import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Account.css';
import { User, Package, Heart, LogOut, ShieldCheck, Eye, EyeOff, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import Orders from './Orders';

const emptyLogin = { email: '', password: '' };
const emptyRegister = { name: '', email: '', password: '', phone: '' };
const emptyProfile = { name: '', phone: '', language: 'en' };

const emptyAddress = {
  label: 'Home', fullName: '', phone: '', line1: '', line2: '',
  city: '', state: '', postalCode: '', country: 'Malaysia', isDefault: false,
};

// ── Forgot-password inline view ───────────────────────────────
const ForgotPasswordView = ({ onBack, t }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);
    try {
      const { data } = await api.post('/api/users/forgot-password', { email });
      setMessage(data?.message || 'Reset link sent. Check your email.');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-forgot-view">
      <button type="button" className="auth-back-btn" onClick={onBack}>
        ← {t('account_back_to_login')}
      </button>
      <h2 className="auth-heading" style={{ marginTop: '1.25rem' }}>{t('account_forgot_title')}</h2>
      <p className="auth-subheading">{t('account_forgot_sub')}</p>
      {message ? (
        <p className="auth-success">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">{t('account_email')}</label>
            <input
              className="auth-input"
              type="email"
              placeholder={t('account_email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? t('account_sending') : t('account_send_reset')}
          </button>
        </form>
      )}
    </div>
  );
};

// ── Password show/hide input ──────────────────────────────────
const PasswordInput = ({ value, onChange, placeholder, className = 'auth-input' }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-password-wrap">
      <input
        className={className}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button type="button" className="auth-eye-btn" onClick={() => setShow((s) => !s)} tabIndex={-1}>
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

// ── Address Manager ───────────────────────────────────────────
const AddressManager = ({ t }) => {
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null); // null = list, {} = new, {_id,...} = edit
  const [form, setForm] = useState(emptyAddress);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/users/me/addresses');
      setAddresses(data?.data || []);
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  if (addresses === null && !loading) load();

  const startNew = () => { setForm(emptyAddress); setEditItem({}); setError(null); };
  const startEdit = (addr) => { setForm({ ...addr }); setEditItem(addr); setError(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editItem?._id) {
        const { data } = await api.put(`/api/users/me/addresses/${editItem._id}`, form);
        setAddresses(data?.data || []);
      } else {
        const { data } = await api.post('/api/users/me/addresses', form);
        setAddresses(data?.data || []);
      }
      setEditItem(null);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save address.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      const { data } = await api.delete(`/api/users/me/addresses/${id}`);
      setAddresses(data?.data || []);
    } catch {
      // ignore
    }
  };

  if (loading) return <p className="addr-loading">{t('account_loading')}</p>;

  if (editItem !== null) {
    return (
      <div className="addr-form-wrap">
        <button type="button" className="addr-back-btn" onClick={() => setEditItem(null)}>
          ← {t('account_back')}
        </button>
        <h3 className="addr-form-title">{editItem?._id ? t('addr_edit') : t('addr_new')}</h3>
        <form onSubmit={handleSave} className="addr-form">
          <div className="addr-row-2">
            <div className="auth-field">
              <label className="auth-label">{t('addr_label')}</label>
              <input className="auth-input" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="Home / Office" />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('addr_full_name')}</label>
              <input className="auth-input" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
            </div>
          </div>
          <div className="auth-field">
            <label className="auth-label">{t('addr_phone')}</label>
            <input className="auth-input" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div className="auth-field">
            <label className="auth-label">{t('addr_line1')}</label>
            <input className="auth-input" value={form.line1} onChange={e => setForm({ ...form, line1: e.target.value })} required />
          </div>
          <div className="auth-field">
            <label className="auth-label">{t('addr_line2')} <span className="auth-optional">{t('account_optional')}</span></label>
            <input className="auth-input" value={form.line2} onChange={e => setForm({ ...form, line2: e.target.value })} />
          </div>
          <div className="addr-row-2">
            <div className="auth-field">
              <label className="auth-label">{t('addr_city')}</label>
              <input className="auth-input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('addr_state')} <span className="auth-optional">{t('account_optional')}</span></label>
              <input className="auth-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
            </div>
          </div>
          <div className="addr-row-2">
            <div className="auth-field">
              <label className="auth-label">{t('addr_postal')} <span className="auth-optional">{t('account_optional')}</span></label>
              <input className="auth-input" value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('addr_country')}</label>
              <input className="auth-input" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
            </div>
          </div>
          <label className="addr-default-row">
            <input type="checkbox" checked={form.isDefault} onChange={e => setForm({ ...form, isDefault: e.target.checked })} />
            {t('addr_set_default')}
          </label>
          {error && <p className="auth-error">{error}</p>}
          <div className="addr-actions">
            <button type="submit" className="edit-btn" disabled={saving}>{saving ? t('account_saving') : t('account_save')}</button>
            <button type="button" className="edit-btn" style={{ opacity: 0.65 }} onClick={() => setEditItem(null)}>{t('account_cancel')}</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="addr-list-wrap">
      <div className="addr-list-header">
        <h2>{t('account_addresses')}</h2>
        <button className="edit-btn" onClick={startNew}>+ {t('addr_add_new')}</button>
      </div>
      {addresses.length === 0 ? (
        <div className="addr-empty">
          <MapPin size={40} />
          <p>{t('addr_empty')}</p>
        </div>
      ) : (
        <div className="addr-list">
          {addresses.map((a) => (
            <div key={a._id} className={`addr-card ${a.isDefault ? 'default' : ''}`}>
              {a.isDefault && <span className="addr-default-badge">{t('addr_default')}</span>}
              <p className="addr-card-label">{a.label}</p>
              <p className="addr-card-name">{a.fullName}</p>
              <p className="addr-card-text">{a.line1}{a.line2 ? `, ${a.line2}` : ''}</p>
              <p className="addr-card-text">{a.city}{a.state ? `, ${a.state}` : ''} {a.postalCode}</p>
              <p className="addr-card-text">{a.country}</p>
              <p className="addr-card-phone">{a.phone}</p>
              <div className="addr-card-actions">
                <button className="addr-action-btn" onClick={() => startEdit(a)}>{t('account_edit')}</button>
                <button className="addr-action-btn danger" onClick={() => handleDelete(a._id)}>{t('addr_delete')}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Change Password ───────────────────────────────────────────
const ChangePassword = ({ t, changePassword }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (form.newPassword.length < 6) {
      setError(t('account_pw_min'));
      return;
    }
    if (form.newPassword !== form.confirm) {
      setError(t('account_pw_mismatch'));
      return;
    }
    setSaving(true);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setMessage(t('account_pw_changed'));
      setForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to change password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card login-card" style={{ marginTop: '1.5rem' }}>
      <h2>{t('account_change_password')}</h2>
      <form onSubmit={handleSubmit} className="addr-form" style={{ marginTop: '1.25rem' }}>
        <div className="auth-field">
          <label className="auth-label">{t('account_current_password')}</label>
          <PasswordInput
            className="auth-input"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            placeholder="••••••••"
          />
        </div>
        <div className="auth-field">
          <label className="auth-label">{t('account_new_password')}</label>
          <PasswordInput
            className="auth-input"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            placeholder="••••••••"
          />
        </div>
        <div className="auth-field">
          <label className="auth-label">{t('account_confirm_password')}</label>
          <PasswordInput
            className="auth-input"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            placeholder="••••••••"
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}
        <button type="submit" className="edit-btn" disabled={saving} style={{ marginTop: '0.5rem' }}>
          {saving ? t('account_saving') : t('account_change_password')}
        </button>
      </form>
    </div>
  );
};

// ── Main Account component ────────────────────────────────────
const Account = () => {
  const { t } = useAppContext();
  const { user, isAuthenticated, status, login, register, logout, updateProfile, changePassword } = useAuth();
  const location = useLocation();
  const isOrders = location.pathname.includes('/orders');

  const [mode, setMode] = useState('login'); // login | register | forgot
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [profileForm, setProfileForm] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [profileMessage, setProfileMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile | addresses

  // Client-side validation helpers
  const validateLogin = () => {
    if (!loginForm.email || !/\S+@\S+\.\S+/.test(loginForm.email)) return t('account_invalid_email');
    if (!loginForm.password) return t('account_password_required');
    return null;
  };

  const validateRegister = () => {
    if (!registerForm.name.trim()) return t('account_name_required');
    if (!registerForm.email || !/\S+@\S+\.\S+/.test(registerForm.email)) return t('account_invalid_email');
    if (!registerForm.password || registerForm.password.length < 6) return t('account_pw_min');
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const err = validateLogin();
    if (err) { setAuthError(err); return; }
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
    const err = validateRegister();
    if (err) { setAuthError(err); return; }
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
      setProfileMessage(t('account_profile_saved'));
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

  // ── Unauthenticated ────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/images/perfume.png" alt="Oud Al-Anood" className="auth-logo" />
            <span className="auth-brand-name">OUD AL-ANOOD</span>
          </div>

          {mode === 'forgot' ? (
            <ForgotPasswordView onBack={() => setMode('login')} t={t} />
          ) : (
            <>
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
                <form onSubmit={handleLogin} className="auth-form" noValidate>
                  <div className="auth-field">
                    <label className="auth-label">{t('account_email')}</label>
                    <input
                      className="auth-input"
                      type="email"
                      placeholder={t('account_email_placeholder')}
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">{t('account_password')}</label>
                    <PasswordInput
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder={t('account_password_placeholder')}
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                    <button
                      type="button"
                      className="auth-forgot-link"
                      onClick={() => { setMode('forgot'); setAuthError(null); }}
                    >
                      {t('account_forgot_link')}
                    </button>
                  </div>
                  {authError && <p className="auth-error">{authError}</p>}
                  <button type="submit" className="auth-submit" disabled={submitting}>
                    {submitting ? t('account_signing_in') : t('account_sign_in_btn')}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="auth-form" noValidate>
                  <div className="auth-field">
                    <label className="auth-label">{t('account_full_name')}</label>
                    <input
                      className="auth-input"
                      type="text"
                      placeholder={t('account_name_placeholder')}
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
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
                    <PasswordInput
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder={t('account_password_placeholder')}
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
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Authenticated ──────────────────────────────────────────
  return (
    <div className="account-page container">
      <div className="account-header">
        <h1>{t('nav_account')}</h1>
        <p>{t('account_greeting')} {user?.name || 'Guest'}</p>
      </div>

      <div className="account-layout">
        <aside className="account-nav">
          <NavLink to="/account" end className={({ isActive }) => `nav-item ${isActive && !isOrders ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}>
            <User size={20} /> {t('account_profile')}
          </NavLink>
          <button
            className={`nav-item ${activeTab === 'addresses' && !isOrders ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin size={20} /> {t('account_addresses')}
          </button>
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
          ) : activeTab === 'addresses' ? (
            <AddressManager t={t} />
          ) : (
            <>
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

              <ChangePassword t={t} changePassword={changePassword} />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Account;
