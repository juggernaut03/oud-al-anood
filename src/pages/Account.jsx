import { NavLink, useLocation } from 'react-router-dom';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Orders from './Orders';

const Account = () => {
  const { t } = useAppContext();
  const location = useLocation();
  
  const isOrders = location.pathname.includes('/orders');

  return (
    <div className="account-page container">
      <div className="account-header">
        <h1>{t('nav_account')}</h1>
        <p>Welcome back, Guest</p>
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
          <button className="nav-item logout"><LogOut size={20} /> Logout</button>
        </aside>

        <section className="account-content">
          {isOrders ? (
            <Orders />
          ) : (
            <div className="card login-card">
              <h2>My Profile</h2>
              <div className="profile-details">
                <div className="detail-row">
                  <label>Full Name</label>
                  <span>Guest User</span>
                </div>
                <div className="detail-row">
                  <label>Email</label>
                  <span>guest@example.com</span>
                </div>
                <div className="detail-row">
                  <label>Location</label>
                  <span>Kuala Lumpur, Malaysia</span>
                </div>
              </div>
              <button className="edit-btn">Edit Profile</button>
            </div>
          )}
        </section>
      </div>

    </div>
  );
};

export default Account;
