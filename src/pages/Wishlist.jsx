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
        <h1>My Wishlist</h1>
        <p>Your collection of favorite fragrances.</p>
        
        {wishlistedProducts.length > 0 && (
          <button className="add-all-btn" onClick={addAllToCart}>
            <ShoppingBag size={18} /> Add All to Cart
          </button>
        )}
      </div>

      <div className="wishlist-grid">
        {wishlistedProducts.length === 0 ? (
          <div className="empty-state">
            <Heart size={64} strokeWidth={1} />
            <h2>Your wishlist is empty</h2>
            <p>Explore our shop and find something you love.</p>
            <Link to="/shop" className="shop-link">Go to Shop</Link>
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
