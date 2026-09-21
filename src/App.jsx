import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CustomHampersPage } from './pages/CustomHampersPage';
import { AboutPage } from './pages/AboutPage';

export const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Luxury Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            setActiveTab={setActiveTab}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        )}

        {activeTab === 'custom-hampers' && (
          <CustomHampersPage
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Checkout & Simulated Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onFinishOrder={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Luxury Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
