import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAppContext } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';
import './Account.css';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-password-wrap">
      <input
        className="auth-input"
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

const ResetPassword = () => {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const email = params.get('email') || '';

  const [form, setForm] = useState({ newPassword: '', confirm: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.newPassword.length < 6) { setError(t('account_pw_min')); return; }
    if (form.newPassword !== form.confirm) { setError(t('account_pw_mismatch')); return; }
    setSubmitting(true);
    try {
      await api.post('/api/users/reset-password', { token, email, newPassword: form.newPassword });
      setDone(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Reset failed. The link may have expired.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p className="auth-error">Invalid or missing reset link. Please request a new one.</p>
          <button className="auth-submit" style={{ marginTop: '1rem' }} onClick={() => navigate('/account')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src="/images/perfume.png" alt="Oud Al-Anood" className="auth-logo" />
          <span className="auth-brand-name">OUD AL-ANOOD</span>
        </div>

        <h2 className="auth-heading">{t('account_forgot_title')}</h2>

        {done ? (
          <>
            <p className="auth-success" style={{ marginTop: '1rem' }}>
              {t('account_pw_changed')}
            </p>
            <button className="auth-submit" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/account')}>
              {t('account_sign_in_btn')}
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: '1.5rem' }} noValidate>
            <div className="auth-field">
              <label className="auth-label">{t('account_new_password')}</label>
              <PasswordInput
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('account_confirm_password')}</label>
              <PasswordInput
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? t('account_saving') : t('account_forgot_title')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
