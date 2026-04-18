import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PurchaseModal from './components/PurchaseModal';
import StoreSelector from './components/StoreSelector';
import Home from './pages/Home';
import Shop from './pages/Shop';
import OudMohsen from './pages/OudMohsen';
import About from './pages/About';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import Offers from './pages/Offers';

const AppContent = () => {
  const { language, isPurchaseModalOpen, closePurchaseModal, selectedProduct } = useAppContext();

  return (
    <Router>
      <div className={`app-wrapper ${language}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/oud-mohsen" element={<OudMohsen />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
        <Footer />
        <CartDrawer />
        <PurchaseModal 
          isOpen={isPurchaseModalOpen} 
          onClose={closePurchaseModal} 
          product={selectedProduct} 
        />
        <StoreSelector />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
