import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';
import { Heart, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, products, addToCart, t } = useAppContext();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const addAllToCart = () => {
    wishlistedProducts.forEach(p => addToCart(p));
  };

  return (
    <div className="wishlist-page container">
      <div className="page-header">
        <h1>{t('wishlist_title')}</h1>
        <p>{t('wishlist_subtitle')}</p>

        {wishlistedProducts.length > 0 && (
          <button className="add-all-btn" onClick={addAllToCart}>
            <ShoppingBag size={18} /> {t('wishlist_add_all')}
          </button>
        )}
      </div>

      <div className="wishlist-grid">
        {wishlistedProducts.length === 0 ? (
          <div className="empty-state">
            <Heart size={64} strokeWidth={1} />
            <h2>{t('wishlist_empty_title')}</h2>
            <p>{t('wishlist_empty_text')}</p>
            <Link to="/shop" className="shop-link">{t('wishlist_go_shop')}</Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
