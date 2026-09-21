import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageSquare, Printer, Sparkles, X, ArrowRight, ShieldCheck, Gift, Calendar, Clock, MapPin } from 'lucide-react';
import { generateWhatsAppLink } from '../../services/whatsapp';

export const OrderSuccessModal = ({ orderData, onClose, onBackHome }) => {
  useEffect(() => {
    // Trigger luxury gold celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#722F37', '#FFFFFF']
      });
    } catch (e) {
      console.error('Confetti error', e);
    }
  }, []);

  if (!orderData) return null;

  const {
    orderId,
    customerInfo,
    cartItems,
    deliveryDate,
    deliveryTimeSlot,
    deliveryMethod,
    subtotal,
    discount,
    shippingCost,
    grandTotal,
    paymentMethod,
    status
  } = orderData;

  const waLink = generateWhatsAppLink({
    orderId,
    customerInfo,
    cartItems,
    deliveryDate,
    deliveryTimeSlot,
    deliveryMethod,
    subtotal,
    discount,
    shippingCost,
    grandTotal,
    paymentMethod,
    paymentStatus: 'Lunas (Simulasi)'
  });

  const formatDateIndo = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch {
      return dateStr;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 120 }}>
      <div className="modal-content" style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}>
        {/* Receipt Header Banner */}
        <div style={{
          background: '#141210',
          color: '#FAF7F2',
          padding: '32px 24px',
          textAlign: 'center',
          position: 'relative',
          borderBottom: '2px solid #D4AF37'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '2px solid #D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: 'var(--gold-glow)'
          }}>
            <CheckCircle2 size={36} color="#D4AF37" />
          </div>

          <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
            Pembayaran Berhasil Dikonfirmasi
          </span>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#FAF7F2', marginBottom: '6px' }}>
            Merci Beaucoup!
          </h2>
          <p style={{ color: '#D6D3D1', fontSize: '0.88rem', maxWidth: '440px', margin: '0 auto' }}>
            Pesanan Anda telah kami terima dan segera disiapkan oleh Chef Patissier Le Saffrone.
          </p>

          <div style={{
            marginTop: '16px',
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '6px 16px',
            borderRadius: '999px',
            fontSize: '0.82rem',
            letterSpacing: '0.08em'
          }}>
            KODE PESANAN: <strong style={{ color: '#F3E5AB' }}>#{orderId}</strong>
          </div>
        </div>

        {/* Invoice Summary Body */}
        <div style={{ padding: '28px', maxHeight: '55vh', overflowY: 'auto' }}>
          {/* Logistics Box */}
          <div style={{
            background: '#FAF7F2',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #E7DFD5',
            marginBottom: '20px'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8C680A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              Jadwal & Tujuan Pengiriman:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={15} color="#D4AF37" />
                <span>Tanggal: <strong>{formatDateIndo(deliveryDate)}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} color="#D4AF37" />
                <span>Slot Waktu: <strong>{deliveryTimeSlot}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="#D4AF37" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>
                  Penerima: <strong>{customerInfo.name}</strong> ({customerInfo.phone})<br />
                  {deliveryMethod === 'pickup' ? (
                    <em style={{ color: '#8C680A' }}>Ambil Sendiri di Boutique Le Saffrone (Jl. Senopati No. 88)</em>
                  ) : (
                    customerInfo.address
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Items breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1C1917', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              Rincian Item:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  paddingBottom: '8px',
                  borderBottom: '1px dashed #E7DFD5'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1C1917' }}>
                      {item.name} <span style={{ color: '#78716C', fontWeight: 400 }}>x{item.quantity}</span>
                    </div>
                    {item.isCustomHamper && item.customConfig && (
                      <div style={{ fontSize: '0.75rem', color: '#78716C', marginTop: '2px' }}>
                        Isi: {item.customConfig.pastries.map(p => `${p.name} (${p.qty})`).join(', ')}
                      </div>
                    )}
                  </div>
                  <span style={{ fontWeight: 600, color: '#A68019' }}>
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment calculation breakdown */}
          <div style={{
            borderTop: '1.5px solid #D4AF37',
            paddingTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '0.88rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#78716C' }}>
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803D' }}>
                <span>Diskon Kupon</span>
                <span>-Rp {discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#78716C' }}>
              <span>Ongkos Kirim ({deliveryMethod})</span>
              <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#1C1917',
              marginTop: '6px',
              paddingTop: '6px',
              borderTop: '1px solid #E7DFD5'
            }}>
              <span>Total Akhir</span>
              <span style={{ color: '#A68019' }}>Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600, marginTop: '2px' }}>
              ✓ Metode: {paymentMethod} (Simulasi Pembayaran Terverifikasi)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          padding: '20px 24px',
          background: '#FFFDF9',
          borderTop: '1px solid #E7DFD5',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {/* WhatsApp Direct Order Button */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#25D366',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
              padding: '14px',
              fontSize: '0.95rem'
            }}
          >
            <MessageSquare size={18} />
            <span>Kirim Pesanan Lengkap ke WhatsApp Concierge</span>
          </a>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
            >
              <Printer size={15} />
              <span>Cetak Nota</span>
            </button>
            <button
              onClick={onBackHome}
              className="btn btn-dark"
              style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
            >
              <span>Selesai & Ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
