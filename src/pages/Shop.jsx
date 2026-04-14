import React from 'react';
import ProductGrid from '../components/ProductGrid';
import BoutiqueToggle from '../components/BoutiqueToggle';
import WholesaleConcierge from '../components/WholesaleConcierge';
import { useAppContext } from '../context/AppContext';
import './Shop.css';

const Shop = () => {
  const { t, isWholesale } = useAppContext();
  
  return (
    <main className="shop-page">
      {/* Page Header & Channel Navigation */}
      <header className="page-header container">
        <h1 className="serif-title">{t('nav_shop')}</h1>
        <p className="subtitle">Curated collections of the finest oriental fragrances.</p>
        
        <BoutiqueToggle />
      </header>
      
      {/* Main Content Area */}
      <div className="shop-content">
        {!isWholesale ? (
          <ProductGrid />
        ) : (
          <WholesaleConcierge />
        )}
      </div>
    </main>
  );
};

export default Shop;
