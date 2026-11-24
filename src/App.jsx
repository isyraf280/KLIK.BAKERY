import React from 'react';
import { useBakeryStore } from './context/BakeryStoreContext';
import { SiteHeader } from './components/layout/SiteHeader';
import { CartDrawer } from './components/cart/CartDrawer';
import { GlobalModal } from './components/modals/GlobalModal';
import { Toast } from './components/common/Toast';
import { BakerySiteView } from './pages/BakerySiteView';
import { BakeryAdminView } from './pages/BakeryAdminView';
import { BakeryUserView } from './pages/BakeryUserView';

export const App = () => {
  const { view } = useBakeryStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Site Header is only shown on the public website view (Admin & User have their own topbar) */}
      {view === 'site' && <SiteHeader />}

      {/* Main View Switching */}
      <main style={{ flex: 1 }}>
        {view === 'site' && <BakerySiteView />}
        {view === 'admin' && <BakeryAdminView />}
        {view === 'user' && <BakeryUserView />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Global Information / Article / Quick View Modal */}
      <GlobalModal />

      {/* Floating Toast Notification */}
      <Toast />
    </div>
  );
};

export default App;
