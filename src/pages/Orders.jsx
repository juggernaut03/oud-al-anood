import { useAppContext } from '../context/AppContext';
import { Package, ChevronRight } from 'lucide-react';

const Orders = () => {
  const { t, orders } = useAppContext();

  return (
    <div className="orders-page">
      <div className="section-header">
        <h2>My Orders</h2>
        <p>Manage and track your recent orders.</p>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <Package size={48} />
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-main">
                <div className="order-info">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="order-meta">
                <div className="meta-details">
                  <span>{order.itemsCount} items</span>
                  <span className="divider">•</span>
                  <span className="total">RM {order.total.toFixed(2)}</span>
                </div>
                <button className="view-btn">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Orders;
