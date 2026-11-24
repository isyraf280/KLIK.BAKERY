import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  BAKERY_PRODUCTS,
  BAKERY_PACKAGES,
  INITIAL_BAKERY_ORDERS,
  BAKERY_JOURNAL,
  INITIAL_BAKERY_CUSTOMERS,
  formatRupiah,
} from '../data/lesaffroneBakeryData';

const BakeryStoreContext = createContext();

export const useBakeryStore = () => {
  const context = useContext(BakeryStoreContext);
  if (!context) {
    throw new Error('useBakeryStore must be used within BakeryStoreProvider');
  }
  return context;
};

const DEFAULT_USER = {
  name: 'Nadia Putri',
  email: 'nadia@email.com',
  phone: '+62 812 9876 5432',
  address: 'Jl. A.P. Pettarani No. 45, Panakkukang, Makassar',
  tier: 'VIP Privé Member',
  favorite: 'Almond Frangipane Croissant',
};

const STORE_VERSION = 'lesaffrone_bakery_v1';

export const BakeryStoreProvider = ({ children }) => {
  // Views: 'site' (Toko Roti) | 'admin' (Dashboard Toko) | 'user' (Akun Pelanggan)
  const [view, setViewInternal] = useState('site');
  const [adminSection, setAdminSection] = useState('overview');
  const [userSection, setUserSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const setView = (v) => {
    setViewInternal(v);
    setIsMobileMenuOpen(false);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);
  };

  // Modals
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
  });

  const openModal = (title, content) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', content: null });
  };

  // Products
  const [products, setProducts] = useState(() => {
    try {
      const v = localStorage.getItem('ls_version');
      if (v !== STORE_VERSION) {
        localStorage.setItem('ls_version', STORE_VERSION);
        localStorage.setItem('ls_products', JSON.stringify(BAKERY_PRODUCTS));
        localStorage.setItem('ls_orders', JSON.stringify(INITIAL_BAKERY_ORDERS));
        return BAKERY_PRODUCTS;
      }
      const saved = localStorage.getItem('ls_products');
      if (!saved) return BAKERY_PRODUCTS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : BAKERY_PRODUCTS;
    } catch {
      return BAKERY_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      if (Array.isArray(products)) {
        localStorage.setItem('ls_products', JSON.stringify(products));
      }
    } catch (e) {}
  }, [products]);

  const addProduct = (p) => {
    setProducts((prev) => [...(Array.isArray(prev) ? prev : BAKERY_PRODUCTS), p]);
    showToast('Menu roti baru berhasil ditambahkan');
  };

  const updateProduct = (p) => {
    setProducts((prev) =>
      (Array.isArray(prev) ? prev : BAKERY_PRODUCTS).map((item) =>
        item.id === p.id ? p : item
      )
    );
    showToast('Menu roti berhasil diperbarui');
  };

  const deleteProduct = (id) => {
    setProducts((prev) =>
      (Array.isArray(prev) ? prev : BAKERY_PRODUCTS).filter((item) => item.id !== id)
    );
    showToast('Menu roti berhasil dihapus dari katalog');
  };

  // Selected Bread Subscription Package
  const [activePackage, setActivePackage] = useState('Weekly Baker Club');

  const selectPackage = (pkgName) => {
    if (BAKERY_PACKAGES[pkgName]) {
      setActivePackage(pkgName);
      setView('user');
      setUserSection('mysubscription');
      showToast(`Paket ${pkgName} dipilih!`);
    }
  };

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const v = localStorage.getItem('ls_version');
      if (v !== STORE_VERSION) return INITIAL_BAKERY_ORDERS;
      const saved = localStorage.getItem('ls_orders');
      if (!saved) return INITIAL_BAKERY_ORDERS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BAKERY_ORDERS;
    } catch {
      return INITIAL_BAKERY_ORDERS;
    }
  });

  useEffect(() => {
    try {
      if (Array.isArray(orders)) {
        localStorage.setItem('ls_orders', JSON.stringify(orders));
      }
    } catch (e) {}
  }, [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      (Array.isArray(prev) ? prev : INITIAL_BAKERY_ORDERS).map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
    showToast('Status pesanan roti diperbarui');
  };

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ls_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      if (Array.isArray(cart)) {
        localStorage.setItem('ls_cart', JSON.stringify(cart));
      }
    } catch (e) {}
  }, [cart]);

  const safeProducts = Array.isArray(products) ? products : BAKERY_PRODUCTS;

  const addToCart = (productId) => {
    const item = safeProducts.find((p) => p.id === productId);
    if (!item) return;

    setCart((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const found = list.find((x) => x.id === productId);
      if (found) {
        return list.map((x) =>
          x.id === productId ? { ...x, qty: (x.qty || 1) + 1 } : x
        );
      }
      return [...list, { ...item, qty: 1 }];
    });

    showToast(`${item.name} dimasukkan ke keranjang`);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list
        .map((x) => {
          if (x.id === productId) {
            const nextQty = (x.qty || 1) + delta;
            return nextQty > 0 ? { ...x, qty: nextQty } : null;
          }
          return x;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list.filter((x) => x.id !== productId);
    });
  };

  const clearCart = () => setCart([]);

  const safeCart = Array.isArray(cart) ? cart : [];
  const cartCount = safeCart.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
  const cartSubtotal = safeCart.reduce(
    (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.qty) || 1),
    0
  );

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ls_user_profile');
      if (!saved) return DEFAULT_USER;
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === 'object' ? parsed : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const updateUserProfile = (data) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('ls_user_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('Profil pelanggan berhasil disimpan');
  };

  // Checkout
  const checkoutCart = () => {
    if (!safeCart.length) {
      showToast('Keranjang belanja roti masih kosong');
      return;
    }

    const currentOrders = Array.isArray(orders) ? orders : INITIAL_BAKERY_ORDERS;
    const newId = `LS-2026-${String(109 + currentOrders.length).padStart(3, '0')}`;
    const itemsSummary = safeCart
      .map((item) => `${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}`)
      .join(', ');

    const newOrder = {
      id: newId,
      customer: `${userProfile?.name || 'Nadia Putri'} · ${userProfile?.address ? userProfile.address.split(',')[0] : 'Makassar'}`,
      service: itemsSummary,
      date: '24 Nov 2026',
      total: cartSubtotal,
      status: 'Menunggu',
      deliveryTime: 'Pagi (08:00 - 10:00)',
    };

    setOrders((prev) => [newOrder, ...(Array.isArray(prev) ? prev : INITIAL_BAKERY_ORDERS)]);
    clearCart();
    setIsCartOpen(false);
    showToast(`Pesanan ${newId} berhasil dikirim ke dapur Le Saffrone!`);
  };

  // Journal / Articles
  const [journal, setJournal] = useState(BAKERY_JOURNAL);

  const addJournalArticle = (article) => {
    setJournal((prev) => [article, ...(Array.isArray(prev) ? prev : BAKERY_JOURNAL)]);
    showToast('Artikel roti berhasil disimpan sebagai draft');
  };

  return (
    <BakeryStoreContext.Provider
      value={{
        view,
        setView,
        adminSection,
        setAdminSection,
        userSection,
        setUserSection,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toastMessage,
        isToastVisible,
        showToast,
        modalState,
        openModal,
        closeModal,
        products: safeProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        activePackage,
        selectPackage,
        orders: Array.isArray(orders) ? orders : INITIAL_BAKERY_ORDERS,
        updateOrderStatus,
        cart: safeCart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        checkoutCart,
        userProfile,
        updateUserProfile,
        journal: Array.isArray(journal) ? journal : BAKERY_JOURNAL,
        addJournalArticle,
        customers: INITIAL_BAKERY_CUSTOMERS,
        formatRupiah,
      }}
    >
      {children}
    </BakeryStoreContext.Provider>
  );
};

