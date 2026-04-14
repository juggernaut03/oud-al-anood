import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './OudMohsen.css';

const OudMohsen = () => {
  const { t, products } = useAppContext();
  
  // Simulation: Filter for 'oud' category or similar
  const oudMohsenProducts = products; // Using all for now as mock

  return (
    <div className="oud-mohsen-page container">
      <div className="category-hero">
        <h1 className="category-title">{t('nav_oud_mohsen')}</h1>
        <p className="category-desc">
          Discover the rare and enchanting world of Oud Mohsen. 
          A collection curated for the true connoisseurs of traditional agarwood.
        </p>
      </div>

      <div className="product-grid">
        {oudMohsenProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default OudMohsen;
