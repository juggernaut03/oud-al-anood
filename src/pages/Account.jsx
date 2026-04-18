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
      <div className="account-page container">
        <div className="account-header">
          <h1>{t('nav_account')}</h1>
          <p>Sign in or create an account</p>
        </div>

        <div className="account-layout">
          <section className="account-content">
            <div className="card login-card">
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <button
                  type="button"
                  className="edit-btn"
                  style={{ opacity: mode === 'login' ? 1 : 0.6 }}
                  onClick={() => {
                    setMode('login');
                    setAuthError(null);
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="edit-btn"
                  style={{ opacity: mode === 'register' ? 1 : 0.6 }}
                  onClick={() => {
                    setMode('register');
                    setAuthError(null);
                  }}
                >
                  Register
                </button>
              </div>

              {mode === 'login' ? (
                <form onSubmit={handleLogin}>
                  <div className="profile-details">
                    <div className="detail-row">
                      <label>Email</label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="detail-row">
                      <label>Password</label>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  {authError && (
                    <p style={{ color: '#b42525', marginTop: 12 }}>{authError}</p>
                  )}
                  <button type="submit" className="edit-btn" disabled={submitting}>
                    {submitting ? 'Signing in…' : 'Sign in'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <div className="profile-details">
                    <div className="detail-row">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={registerForm.name}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="detail-row">
                      <label>Email</label>
                      <input
                        type="email"
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="detail-row">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="detail-row">
                      <label>Password</label>
                      <input
                        type="password"
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, password: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  {authError && (
                    <p style={{ color: '#b42525', marginTop: 12 }}>{authError}</p>
                  )}
                  <button type="submit" className="edit-btn" disabled={submitting}>
                    {submitting ? 'Creating account…' : 'Create account'}
                  </button>
                </form>
              )}
            </div>
          </section>
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
