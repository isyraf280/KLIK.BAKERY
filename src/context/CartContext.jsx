import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lesaffrone_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    // Default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('10:00 - 13:00 (Pagi / Morning Slot)');
  const [deliveryMethod, setDeliveryMethod] = useState('instant'); // 'instant' | 'sameday' | 'pickup'

  useEffect(() => {
    try {
      localStorage.setItem('lesaffrone_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Add regular product or hamper to cart
  const addToCart = (product, quantity = 1, customConfig = null) => {
    setCartItems(prev => {
      // If it's a custom hamper, treat as unique item
      if (customConfig) {
        const uniqueId = `custom-hamper-${Date.now()}`;
        return [...prev, {
          cartId: uniqueId,
          ...product,
          quantity,
          customConfig,
          isCustomHamper: true
        }];
      }

      // Regular item: check if exists
      const existingIndex = prev.findIndex(item => item.id === product.id && !item.isCustomHamper);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [...prev, {
        cartId: `product-${product.id}-${Date.now()}`,
        ...product,
        quantity,
        isCustomHamper: false
      }];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAFFRONVIP') {
      setAppliedCoupon({
        code: cleanCode,
        discountPercent: 15,
        description: 'VIP Patisserie Privilege (Diskon 15%)'
      });
      return { success: true, message: 'Kupon SAFFRONVIP berhasil digunakan! Diskon 15% diterapkan.' };
    } else if (cleanCode === 'WELCOME10') {
      setAppliedCoupon({
        code: cleanCode,
        discountPercent: 10,
        description: 'Welcome Privilege (Diskon 10%)'
      });
      return { success: true, message: 'Kupon WELCOME10 berhasil digunakan! Diskon 10% diterapkan.' };
    }
    return { success: false, message: 'Kode kupon tidak valid atau telah berakhir.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discountPercent / 100)) : 0;
  
  let shippingCost = 25000;
  if (deliveryMethod === 'pickup' || subtotal === 0) {
    shippingCost = 0;
  } else if (deliveryMethod === 'sameday') {
    shippingCost = 20000;
  } else if (deliveryMethod === 'instant') {
    shippingCost = 35000;
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingCost);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      couponCode,
      setCouponCode,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      deliveryDate,
      setDeliveryDate,
      deliveryTimeSlot,
      setDeliveryTimeSlot,
      deliveryMethod,
      setDeliveryMethod,
      subtotal,
      discount,
      shippingCost,
      grandTotal,
      totalItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
