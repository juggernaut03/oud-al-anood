import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Package, ChevronRight, X } from 'lucide-react';

const OrderDetailModal = ({ order, onClose, t, language }) => {
  if (!order) return null;

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="order-modal-header">
          <div>
            <h3 className="order-modal-title">{t('orders_detail_title')}</h3>
            <p className="order-modal-id">#{order.id}</p>
          </div>
          <button className="order-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="order-modal-body">
          <div className="order-modal-meta">
            <div className="order-modal-row">
              <span className="order-modal-label">{t('orders_detail_date')}</span>
              <span>{order.date}</span>
            </div>
            <div className="order-modal-row">
              <span className="order-modal-label">{t('orders_detail_status')}</span>
              <span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span>
            </div>
            {order.customer?.name && (
              <div className="order-modal-row">
                <span className="order-modal-label">{t('orders_detail_customer')}</span>
                <span>{order.customer.name}</span>
              </div>
            )}
            {order.customer?.email && (
              <div className="order-modal-row">
                <span className="order-modal-label">{t('orders_detail_email')}</span>
                <span>{order.customer.email}</span>
              </div>
            )}
            {order.customer?.phone && (
              <div className="order-modal-row">
                <span className="order-modal-label">{t('orders_detail_phone')}</span>
                <span>{order.customer.phone}</span>
              </div>
            )}
            {order.notes && (
              <div className="order-modal-row">
                <span className="order-modal-label">{t('orders_detail_address')}</span>
                <span>{order.notes}</span>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="order-modal-items">
              <h4 className="order-modal-section-title">{t('orders_detail_items')}</h4>
              {items.map((item, i) => {
                const name = typeof item.name === 'object'
                  ? (item.name[language] || item.name.en || '')
                  : (item.productId?.name?.[language] || item.productId?.name?.en || item.productId?.toString() || `Item ${i + 1}`);
                const qty = item.quantity || 1;
                const price = item.price ?? item.productId?.price ?? 0;
                return (
                  <div key={i} className="order-modal-item">
                    {(item.image || item.productId?.image) && (
                      <img
                        src={item.image || item.productId?.image}
                        alt={name}
                        className="order-modal-item-img"
                      />
                    )}
                    <div className="order-modal-item-info">
                      <span className="order-modal-item-name">{name}</span>
                      <span className="order-modal-item-qty">{t('checkout_qty')}{qty}</span>
                    </div>
                    <span className="order-modal-item-price">
                      {t('price_rm')} {(price * qty).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="order-modal-total">
            <span>{t('checkout_total')}</span>
            <span>{t('price_rm')} {order.total?.toFixed(2) ?? '—'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const { t, orders, language } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState(null);

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
                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="order-meta">
                <div className="meta-details">
                  <span>{order.itemsCount} {t('orders_items')}</span>
                  <span className="divider">•</span>
                  <span className="total">RM {order.total?.toFixed(2)}</span>
                </div>
                <button className="view-btn" onClick={() => setSelectedOrder(order)}>
                  {t('orders_view')} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          t={t}
          language={language}
        />
      )}
    </div>
  );
};

export default Orders;
