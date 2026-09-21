import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory / Mock database for orders
let ordersDatabase = [];

// 1. Health check & Info
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    service: 'Le Saffrone Patisserie API',
    version: '1.0.0',
    endpoints: [
      'GET /api/products',
      'POST /api/orders',
      'GET /api/orders/:id',
      'POST /api/payment/create-transaction',
      'POST /api/payment/webhook'
    ]
  });
});

// 2. Create new Order
app.post('/api/orders', (req, res) => {
  const { customerInfo, cartItems, deliveryDate, deliveryTimeSlot, deliveryMethod, grandTotal } = req.body;

  if (!customerInfo || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Data pesanan tidak lengkap' });
  }

  const orderId = `LSF-${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;
  const order = {
    orderId,
    customerInfo,
    cartItems,
    deliveryDate,
    deliveryTimeSlot,
    deliveryMethod,
    grandTotal,
    status: 'pending_payment',
    createdAt: new Date().toISOString()
  };

  ordersDatabase.unshift(order);

  res.status(201).json({
    success: true,
    message: 'Pesanan berhasil dibuat',
    order
  });
});

// 3. Get Order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = ordersDatabase.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  }
  res.json({ success: true, order });
});

// 4. Payment Gateway Webhook simulation (e.g. Midtrans / Xendit notification)
app.post('/api/payment/webhook', (req, res) => {
  const { order_id, transaction_status } = req.body;
  const order = ordersDatabase.find(o => o.orderId === order_id);

  if (order) {
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      order.status = 'paid';
      order.settledAt = new Date().toISOString();
    } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
      order.status = 'cancelled';
    }
    return res.json({ success: true, message: 'Status pembayaran diperbarui', order });
  }

  res.status(404).json({ error: 'Pesanan tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(`Le Saffrone Patisserie Server running on http://localhost:${PORT}`);
});
