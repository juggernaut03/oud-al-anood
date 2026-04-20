import { useAppContext } from '../context/AppContext';
import { Package, ChevronRight } from 'lucide-react';

const Orders = () => {
  const { t, orders } = useAppContext();

  return (
    <div className="orders-page">
      <div className="section-header">
        <h2>{t('orders_title')}</h2>
        <p>{t('orders_subtitle')}</p>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <Package size={48} />
            <p>{t('orders_empty')}</p>
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
                  <span>{order.itemsCount} {t('orders_items')}</span>
                  <span className="divider">•</span>
                  <span className="total">RM {order.total.toFixed(2)}</span>
                </div>
                <button className="view-btn">
                  {t('orders_view')} <ChevronRight size={16} />
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
