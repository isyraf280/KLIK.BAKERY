// API Service Layer (Frontend client + Backend ready)

const STORAGE_KEY = 'lesaffrone_orders_db';

export const orderService = {
  // Simulates creating an order in DB or calling backend
  createOrder: async (orderPayload) => {
    // Artificial latency for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    const orderId = `LSF-${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'pending_payment',
      ...orderPayload
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.unshift(newOrder);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('Storage error', e);
    }

    return {
      success: true,
      order: newOrder
    };
  },

  // Simulates payment verification (e.g. webhook or client payment completion)
  processPayment: async (orderId, paymentMethod) => {
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const index = existing.findIndex(o => o.orderId === orderId);
      if (index > -1) {
        existing[index].status = 'paid';
        existing[index].paidAt = new Date().toISOString();
        existing[index].paymentMethod = paymentMethod;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        return { success: true, order: existing[index] };
      }
    } catch (e) {
      console.error('Payment processing error', e);
    }

    return {
      success: true,
      order: {
        orderId,
        status: 'paid',
        paidAt: new Date().toISOString(),
        paymentMethod
      }
    };
  }
};
