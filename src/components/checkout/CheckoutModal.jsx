import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Truck, CreditCard, QrCode, Check, ShieldCheck, ArrowRight, Lock, Copy } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/api';
import { OrderSuccessModal } from './OrderSuccessModal';

export const CheckoutModal = ({ isOpen, onClose, onFinishOrder }) => {
  const {
    cartItems,
    subtotal,
    discount,
    shippingCost,
    grandTotal,
    deliveryDate,
    setDeliveryDate,
    deliveryTimeSlot,
    setDeliveryTimeSlot,
    deliveryMethod,
    setDeliveryMethod,
    clearCart
  } = useCart();

  // Form State
  const [customerName, setCustomerName] = useState('Nadia Safitri');
  const [customerPhone, setCustomerPhone] = useState('081298765432');
  const [customerEmail, setCustomerEmail] = useState('nadia.safitri@gmail.com');
  const [customerAddress, setCustomerAddress] = useState('Apartemen Senopati Suites Tower 2 Unit 15B, Jl. Senopati No. 41, Jakarta Selatan');
  const [deliveryNotes, setDeliveryNotes] = useState('Harap hubungi via WhatsApp saat kurir tiba.');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('qris'); // 'qris' | 'bca_va' | 'mandiri_va' | 'cc'
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [copiedVa, setCopiedVa] = useState(false);

  if (!isOpen) return null;

  const handleCopyVa = (vaNumber) => {
    navigator.clipboard?.writeText(vaNumber);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 3000);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (deliveryMethod !== 'pickup' && !customerAddress)) {
      alert('Silakan lengkapi data pemesan dan alamat pengiriman.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        customerInfo: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          address: customerAddress,
          notes: deliveryNotes
        },
        cartItems,
        deliveryDate,
        deliveryTimeSlot,
        deliveryMethod,
        subtotal,
        discount,
        shippingCost,
        grandTotal,
        paymentMethod: paymentMethod === 'qris' ? 'QRIS Instant' :
                       paymentMethod === 'bca_va' ? 'BCA Virtual Account' :
                       paymentMethod === 'mandiri_va' ? 'Mandiri Virtual Account' : 'Kartu Kredit / Debit'
      };

      // 1. Create order
      const createRes = await orderService.createOrder(orderPayload);
      // 2. Process simulated payment
      const paymentRes = await orderService.processPayment(createRes.order.orderId, orderPayload.paymentMethod);

      const finalOrder = {
        ...createRes.order,
        ...paymentRes.order,
        ...orderPayload
      };

      setCompletedOrder(finalOrder);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memproses pesanan. Silakan coba kembali.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {completedOrder ? (
        <OrderSuccessModal
          orderData={completedOrder}
          onClose={() => {
            setCompletedOrder(null);
            onClose();
          }}
          onBackHome={() => {
            setCompletedOrder(null);
            onClose();
            if (onFinishOrder) onFinishOrder();
          }}
        />
      ) : (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 115 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', padding: '0', overflow: 'hidden' }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFDF9'
            }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '4px' }}>
                  Checkout & Pembayaran Aman
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1917', margin: 0 }}>
                  Pemesanan Patisserie & Hampers
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: '#78716C'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <form onSubmit={handleSubmitOrder}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                maxHeight: '75vh',
                overflowY: 'auto'
              }}>
                {/* Left Column: Customer & Delivery Info */}
                <div style={{ padding: '28px', borderRight: '1px solid #E7DFD5' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    color: '#1C1917',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <MapPin size={18} color="#D4AF37" />
                    <span>Informasi Pemesan & Pengiriman</span>
                  </h4>

                  {/* Customer Name */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                      Nama Lengkap: *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nama pemesan / penerima"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #D6CEBE',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  {/* Phone & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                        No. WhatsApp: *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0812xxxxxxx"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #D6CEBE',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                        Email (Invoice):
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="email@domain.com"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #D6CEBE',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Delivery Method Selector */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '8px' }}>
                      Pilih Metode Pengiriman:
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { id: 'instant', name: 'Kurir Instan (GoSend / GrabExpress)', desc: '1 - 2 Jam sampai setelah dipanggang', price: 35000 },
                        { id: 'sameday', name: 'Same-Day Cold Delivery', desc: 'Pengiriman kurir berpendingin khusus pastry', price: 20000 },
                        { id: 'pickup', name: 'Ambil Sendiri di Atelier (Pick-Up)', desc: 'Boutique Senopati No. 88, Jakarta Selatan', price: 0 }
                      ].map(method => (
                        <label
                          key={method.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: deliveryMethod === method.id ? '1.5px solid #D4AF37' : '1px solid #E7DFD5',
                            background: deliveryMethod === method.id ? 'rgba(212, 175, 55, 0.06)' : '#FFFFFF',
                            cursor: 'pointer',
                            fontSize: '0.82rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                              type="radio"
                              name="deliveryMethod"
                              checked={deliveryMethod === method.id}
                              onChange={() => setDeliveryMethod(method.id)}
                            />
                            <div>
                              <div style={{ fontWeight: 600, color: '#1C1917' }}>{method.name}</div>
                              <div style={{ fontSize: '0.74rem', color: '#78716C' }}>{method.desc}</div>
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, color: '#A68019' }}>
                            {method.price === 0 ? 'GRATIS' : `Rp ${method.price.toLocaleString('id-ID')}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Date & Time Slot Picker */}
                  <div style={{
                    background: '#FAF7F2',
                    padding: '14px',
                    borderRadius: '10px',
                    border: '1px solid #E7DFD5',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#8C680A', marginBottom: '4px' }}>
                          <Calendar size={14} color="#D4AF37" />
                          <span>Tanggal Kirim:</span>
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #D6CEBE',
                            fontSize: '0.82rem',
                            background: '#FFFFFF'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600, color: '#8C680A', marginBottom: '4px' }}>
                          <Clock size={14} color="#D4AF37" />
                          <span>Slot Waktu:</span>
                        </label>
                        <select
                          value={deliveryTimeSlot}
                          onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #D6CEBE',
                            fontSize: '0.8rem',
                            background: '#FFFFFF'
                          }}
                        >
                          <option value="09:00 - 12:00 (Pagi / Morning Slot)">09:00 - 12:00 (Pagi)</option>
                          <option value="13:00 - 16:00 (Siang / Afternoon Slot)">13:00 - 16:00 (Siang)</option>
                          <option value="17:00 - 20:00 (Sore / Evening Slot)">17:00 - 20:00 (Sore)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address (if not pick up) */}
                  {deliveryMethod !== 'pickup' && (
                    <>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                          Alamat Lengkap Pengiriman: *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Jalan, No Rumah / Apartemen, Lantai / Unit, Patokan"
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #D6CEBE',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                          Catatan Tambahan untuk Kurir:
                        </label>
                        <input
                          type="text"
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          placeholder="Contoh: Titipkan di security atau lobby reception"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #D6CEBE',
                            fontSize: '0.82rem'
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Right Column: Payment Gateway Simulation & Order Breakdown */}
                <div style={{ padding: '28px', background: '#FFFDF9', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    color: '#1C1917',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CreditCard size={18} color="#D4AF37" />
                    <span>Metode Pembayaran (Payment Gateway)</span>
                  </h4>

                  {/* Payment Methods Tabs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '16px' }}>
                    {[
                      { id: 'qris', label: 'QRIS', icon: QrCode },
                      { id: 'bca_va', label: 'BCA VA', icon: CreditCard },
                      { id: 'mandiri_va', label: 'Mandiri', icon: CreditCard },
                      { id: 'cc', label: 'Kartu', icon: Lock }
                    ].map(p => {
                      const Icon = p.icon;
                      const isSelected = paymentMethod === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPaymentMethod(p.id)}
                          style={{
                            padding: '10px 4px',
                            borderRadius: '8px',
                            border: isSelected ? '1.5px solid #D4AF37' : '1px solid #D6CEBE',
                            background: isSelected ? '#141210' : '#FFFFFF',
                            color: isSelected ? '#F3E5AB' : '#57534E',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            transition: 'all 0.2s'
                          }}
                        >
                          <Icon size={16} />
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Simulator Box */}
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7DFD5',
                    padding: '18px',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    {paymentMethod === 'qris' && (
                      <div>
                        <div style={{ display: 'inline-block', padding: '12px', background: '#FFFFFF', border: '1.5px solid #1C1917', borderRadius: '10px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
                          {/* SVG QR Code Simulation */}
                          <svg width="140" height="140" viewBox="0 0 100 100" fill="#1C1917">
                            <rect width="30" height="30" x="5" y="5" fill="#1C1917" />
                            <rect width="20" height="20" x="10" y="10" fill="#FFFFFF" />
                            <rect width="10" height="10" x="15" y="15" fill="#1C1917" />
                            
                            <rect width="30" height="30" x="65" y="5" fill="#1C1917" />
                            <rect width="20" height="20" x="70" y="10" fill="#FFFFFF" />
                            <rect width="10" height="10" x="75" y="15" fill="#1C1917" />

                            <rect width="30" height="30" x="5" y="65" fill="#1C1917" />
                            <rect width="20" height="20" x="10" y="70" fill="#FFFFFF" />
                            <rect width="10" height="10" x="15" y="75" fill="#1C1917" />

                            <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                            <rect width="8" height="8" x="46" y="20" />
                            <rect width="8" height="8" x="46" y="72" />
                            <rect width="8" height="8" x="20" y="46" />
                            <rect width="8" height="8" x="72" y="46" />
                          </svg>
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginTop: '10px' }}>
                          Scan dengan BCA Mobile, GoPay, OVO, Dana, atau ShopeePay
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
                          ✓ Verifikasi Otomatis Terhubung
                        </span>
                      </div>
                    )}

                    {paymentMethod === 'bca_va' && (
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.78rem', color: '#78716C', marginBottom: '4px' }}>Nomor BCA Virtual Account:</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F4EFEA', padding: '10px 14px', borderRadius: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: '#005baa' }}>
                            8277 0812 3456 7890
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyVa('8277081234567890')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8C680A', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                          >
                            <Copy size={14} />
                            <span>{copiedVa ? 'Disalin!' : 'Salin'}</span>
                          </button>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#78716C', marginTop: '6px', display: 'block' }}>
                          Atas Nama: <strong>LE SAFFRONE PATISSERIE</strong>
                        </span>
                      </div>
                    )}

                    {paymentMethod === 'mandiri_va' && (
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.78rem', color: '#78716C', marginBottom: '4px' }}>Nomor Mandiri Virtual Account:</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F4EFEA', padding: '10px 14px', borderRadius: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: '#003d79' }}>
                            8890 0812 3456 7890
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyVa('8890081234567890')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8C680A', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                          >
                            <Copy size={14} />
                            <span>{copiedVa ? 'Disalin!' : 'Salin'}</span>
                          </button>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#78716C', marginTop: '6px', display: 'block' }}>
                          Kode Perusahaan: <strong>88901 (Le Saffrone Gifting)</strong>
                        </span>
                      </div>
                    )}

                    {paymentMethod === 'cc' && (
                      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          type="text"
                          defaultValue="4111 2222 3333 4444"
                          placeholder="Nomor Kartu Kredit"
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D6CEBE', fontSize: '0.82rem' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <input
                            type="text"
                            defaultValue="12/28"
                            placeholder="MM/YY"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D6CEBE', fontSize: '0.82rem' }}
                          />
                          <input
                            type="password"
                            defaultValue="123"
                            placeholder="CVV"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D6CEBE', fontSize: '0.82rem' }}
                          />
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#15803D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ShieldCheck size={14} /> 256-Bit SSL Enkripsi Bank
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Order Summary Breakdown */}
                  <div style={{ marginTop: 'auto', borderTop: '1px solid #E7DFD5', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#78716C', marginBottom: '6px' }}>
                      <span>Total Item ({cartItems.length})</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    {discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#15803D', marginBottom: '6px' }}>
                        <span>Diskon Privilege</span>
                        <span>-Rp {discount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#78716C', marginBottom: '10px' }}>
                      <span>Biaya Pengantaran</span>
                      <span>{shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#1C1917',
                      paddingTop: '10px',
                      borderTop: '1.5px solid #D4AF37',
                      marginBottom: '18px'
                    }}>
                      <span style={{ fontFamily: 'var(--font-serif)' }}>Total Bayar:</span>
                      <span style={{ color: '#A68019' }}>Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Submit Payment button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '1rem',
                        boxShadow: 'var(--shadow-gold)'
                      }}
                    >
                      {isProcessing ? (
                        <span>Memverifikasi Pembayaran...</span>
                      ) : (
                        <>
                          <Lock size={16} />
                          <span>Bayar Sekarang (Simulasi Lunas)</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                    <span style={{ fontSize: '0.72rem', color: '#A8A29E', textAlign: 'center', display: 'block', marginTop: '8px' }}>
                      Nota resmi & link WhatsApp akan langsung dibuat setelah pembayaran.
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
