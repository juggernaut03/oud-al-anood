import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, language, t, isWholesale, addToCart } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);
  
  const displayPrice = isWholesale ? (product.price * 0.7).toFixed(2) : product.price.toFixed(2);

  return (
    <div className={`product-card ${isWholesale ? 'wholesale-mode' : ''}`}>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name[language]} className="product-image" />
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart size={18} fill={isWishlisted ? "var(--accent-burgundy)" : "none"} />
          </button>
          <button 
            className="quick-add-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingBag size={18} />
            <span>Add to Bag</span>
          </button>
          {isWholesale && <div className="bulk-badge">Bulk Only</div>}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name[language]}</h3>
          <p className="product-price">
            {isWholesale && <span className="retail-strike">RM {product.price.toFixed(2)}</span>}
            {t('price_rm')} {displayPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
