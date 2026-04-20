import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Account.css';
import { User, Package, Heart, LogOut } from 'lucide-react';
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
    setProfileForm({
      name: user?.name || '',
      phone: user?.phone || '',
      language: user?.language || 'en'
    });
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
        <p>Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          {/* Brand mark */}
          <div className="auth-brand">
            <img src="/images/perfume.png" alt="Oud Al-Anood" className="auth-logo" />
            <span className="auth-brand-name">OUD AL-ANOOD</span>
          </div>

          <h2 className="auth-heading">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="auth-subheading">
            {mode === 'login'
              ? 'Sign in to access your orders and wishlist'
              : 'Join us for an exclusive fragrance experience'}
          </p>

          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setAuthError(null); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setAuthError(null); }}
            >
              Register
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">Email address</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              {authError && <p className="auth-error">{authError}</p>}
              <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">Full name</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Your name"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Email address</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Phone <span className="auth-optional">(optional)</span></label>
                <input
                  className="auth-input"
                  type="tel"
                  placeholder="+60 12 345 6789"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
              </div>
              {authError && <p className="auth-error">{authError}</p>}
              <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          )}

          <p className="auth-switch">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="auth-switch-btn"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setAuthError(null); }}
            >
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page container">
      <div className="account-header">
        <h1>{t('nav_account')}</h1>
        <p>Welcome back, {user?.name || 'Guest'}</p>
      </div>

      <div className="account-layout">
        <aside className="account-nav">
          <NavLink to="/account" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <User size={20} /> Profile
          </NavLink>
          <NavLink to="/account/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Package size={20} /> My Orders
          </NavLink>
          <NavLink to="/wishlist" className="nav-item">
            <Heart size={20} /> Wishlist
          </NavLink>
          <button className="nav-item logout" onClick={logout}>
            <LogOut size={20} /> Logout
          </button>
        </aside>

        <section className="account-content">
          {isOrders ? (
            <Orders />
          ) : (
            <div className="card login-card">
              <h2>My Profile</h2>
              {editing ? (
                <form onSubmit={handleProfileSave}>
                  <div className="profile-details">
                    <div className="detail-row">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="detail-row">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="detail-row">
                      <label>Language</label>
                      <select
                        value={profileForm.language}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, language: e.target.value })
                        }
                      >
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>
                  </div>
                  {profileMessage && <p style={{ marginTop: 12 }}>{profileMessage}</p>}
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button type="submit" className="edit-btn" disabled={submitting}>
                      {submitting ? 'Saving…' : 'Save changes'}
                    </button>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => setEditing(false)}
                      style={{ opacity: 0.7 }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="profile-details">
                    <div className="detail-row">
                      <label>Full Name</label>
                      <span>{user?.name || '—'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Email</label>
                      <span>{user?.email || '—'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Phone</label>
                      <span>{user?.phone || '—'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Language</label>
                      <span>{(user?.language || 'en').toUpperCase()}</span>
                    </div>
                  </div>
                  {profileMessage && <p style={{ marginTop: 12 }}>{profileMessage}</p>}
                  <button className="edit-btn" onClick={startEdit}>
                    Edit Profile
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
