import ProductCard from './ProductCard';
import './ProductGrid.css';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const ProductGrid = ({ title }) => {
  const { products, t } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 25 }
    }
  };

  return (
    <section className="product-grid-section container">
      <div className="section-header">
        <h2 className="section-title serif-title small">{title}</h2>
        <div className="section-line"></div>
      </div>
      
      <motion.div 
        className="product-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {products.map(product => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
