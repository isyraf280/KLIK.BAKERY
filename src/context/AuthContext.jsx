import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'lesaffrone_auth_user';
const ORDERS_STORAGE_KEY = 'lesaffrone_orders_db';

// Initial mock orders if none exist
const INITIAL_MOCK_ORDERS = [
  {
    orderId: 'LSF-2026884102',
    customerInfo: {
      name: 'Nadia Safitri',
      phone: '081298765432',
      email: 'nadia.safitri@gmail.com',
      address: 'Jl. Somba Opu No. 45, Ujung Pandang, Makassar',
      notes: 'Harap dikemas rapi dengan pita gold.'
    },
    cartItems: [
      {
        name: 'Grand Saffron Chest (6 Pastries)',
        quantity: 1,
        price: 285000,
        isCustomHamper: true
      },
      {
        name: 'Classic Butter Croissant',
        quantity: 2,
        price: 38000
      }
    ],
    deliveryDate: '2026-10-28',
    deliveryTimeSlot: '10:00 - 13:00 (Pagi)',
    deliveryMethod: 'sameday',
    grandTotal: 381000,
    status: 'paid',
    paymentMethod: 'QRIS Instant',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    orderId: 'LSF-2026884099',
    customerInfo: {
      name: 'Budi Darmawan',
      phone: '081122334455',
      email: 'budi.darmawan@corporate.co.id',
      address: 'Menara Bosowa Lt. 12, Jl. Jend. Sudirman, Makassar',
      notes: 'Pesanan hampers untuk rekan direksi.'
    },
    cartItems: [
      {
        name: 'Royal Heritage Hamper Box',
        quantity: 3,
        price: 495000
      }
    ],
    deliveryDate: '2026-10-29',
    deliveryTimeSlot: '13:00 - 16:00 (Siang)',
    deliveryMethod: 'instant',
    grandTotal: 1520000,
    status: 'proses',
    paymentMethod: 'BCA Virtual Account',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const existing = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (existing) {
        return JSON.parse(existing);
      }
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ORDERS));
      return INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  // Save auth state
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  // Keep orders synced across app
  const refreshOrders = () => {
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      setOrders(existing);
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  };

  const login = async (username, password, role = 'customer') => {
    // Artificial slight delay for realistic auth feedback
    await new Promise(r => setTimeout(r, 450));

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      return { success: false, message: 'Silakan isi username dan password Anda.' };
    }

    if (role === 'admin') {
      // Admin verification
      if (
        (cleanUsername.toLowerCase() === 'admin' && password === 'admin123') ||
        (cleanUsername.toLowerCase() === 'lesaffrone' && password === 'lesaffrone2026')
      ) {
        const adminUser = {
          username: cleanUsername,
          name: 'Chef Administrator Lesaffrone',
          email: 'admin.atelier@lesaffrone.com',
          role: 'admin',
          avatar: 'LS Admin',
          loginAt: new Date().toISOString()
        };
        setUser(adminUser);
        return { success: true, user: adminUser };
      }
      return { success: false, message: 'Kredensial Admin tidak cocok. Gunakan username: admin / password: admin123' };
    }

    // Customer / Pembeli verification
    if (password.length < 4) {
      return { success: false, message: 'Password minimal 4 karakter.' };
    }

    const customerUser = {
      username: cleanUsername,
      name: cleanUsername.toLowerCase() === 'nadia' ? 'Nadia Safitri' : cleanUsername,
      email: cleanUsername.includes('@') ? cleanUsername : `${cleanUsername.toLowerCase()}@client.com`,
      role: 'customer',
      tier: 'VIP Privé Gourmand',
      discountCode: 'SAFFRONVIP',
      avatar: cleanUsername.slice(0, 2).toUpperCase(),
      loginAt: new Date().toISOString()
    };

    setUser(customerUser);
    return { success: true, user: customerUser };
  };

  const logout = () => {
    setUser(null);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      const updated = existing.map(o => o.orderId === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      setOrders(updated);
      return true;
    } catch (e) {
      console.error('Failed to update order status', e);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isCustomer: user?.role === 'customer',
        login,
        logout,
        orders,
        refreshOrders,
        updateOrderStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
