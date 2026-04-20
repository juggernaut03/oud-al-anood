import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './OudMohsen.css';

const OudMohsen = () => {
  const { t, products } = useAppContext();

  const oudMohsenProducts = products;

  return (
    <div className="oud-mohsen-page container">
      <div className="category-hero">
        <h1 className="category-title">{t('nav_oud_mohsen')}</h1>
        <p className="category-desc">{t('oud_mohsen_desc')}</p>
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
