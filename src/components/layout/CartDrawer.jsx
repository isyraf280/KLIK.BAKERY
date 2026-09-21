import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, Gift, Calendar, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = ({ onOpenCheckout }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
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
    subtotal,
    discount,
    shippingCost,
    grandTotal,
    totalItemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    onOpenCheckout();
  };

  const formatDateIndo = (dateStr) => {
    if (!dateStr) return '';
    try {
      const options = { weekday: 'short', day: 'numeric', month: 'short' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`drawer-backdrop ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFDF9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#D4AF37" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1C1917' }}>
              Keranjang Pesanan ({totalItemsCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#78716C'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Delivery Date Notification */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.08)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8C680A' }}>
            <Calendar size={15} color="#D4AF37" />
            <span>Estimasi Pengiriman: <strong>{formatDateIndo(deliveryDate)}</strong></span>
          </div>
          <input
            type="date"
            value={deliveryDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDeliveryDate(e.target.value)}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              color: '#1C1917',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Drawer Body - Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px', color: '#A8A29E' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <ShoppingBag size={32} color="#D4AF37" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1C1917', marginBottom: '8px' }}>
                Keranjang Anda Masih Kosong
              </h4>
              <p style={{ fontSize: '0.88rem', marginBottom: '20px' }}>
                Jelajahi kelezatan bakery artisanal atau rancang hampers istimewa untuk orang tersayang.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                Mulai Memilih Menu
              </button>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div
                  key={item.cartId}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7DFD5',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid #E7DFD5',
                        flexShrink: 0
                      }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.05rem',
                          color: '#1C1917',
                          lineHeight: 1.25,
                          marginBottom: '4px'
                        }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#A8A29E',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                          aria-label="Hapus item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#A68019', marginBottom: '8px' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>

                      {/* Quantity Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #D6CEBE',
                          borderRadius: '999px',
                          overflow: 'hidden'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            style={{
                              background: '#FBF9F5',
                              border: 'none',
                              padding: '4px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Minus size={13} color="#1C1917" />
                          </button>
                          <span style={{ padding: '0 10px', fontSize: '0.85rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            style={{
                              background: '#FBF9F5',
                              border: 'none',
                              padding: '4px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Plus size={13} color="#1C1917" />
                          </button>
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1C1917' }}>
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Hamper Detailed Breakdown */}
                  {item.isCustomHamper && item.customConfig && (
                    <div style={{
                      marginTop: '4px',
                      padding: '10px',
                      background: 'rgba(212, 175, 55, 0.06)',
                      borderRadius: '8px',
                      border: '1px dashed rgba(212, 175, 55, 0.4)',
                      fontSize: '0.78rem'
                    }}>
                      <div style={{ fontWeight: 600, color: '#8C680A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Gift size={13} />
                        <span>Isi Custom Hampers:</span>
                      </div>
                      <ul style={{ paddingLeft: '16px', color: '#57534E', marginBottom: '6px' }}>
                        {item.customConfig.pastries.map((p, idx) => (
                          <li key={idx}>
                            {p.name} (x{p.qty})
                          </li>
                        ))}
                      </ul>
                      {item.customConfig.ribbon && (
                        <div style={{ color: '#57534E', marginBottom: '4px' }}>
                          <strong>Pita:</strong> {item.customConfig.ribbon.name}
                        </div>
                      )}
                      {item.customConfig.card && (item.customConfig.card.to || item.customConfig.card.message) && (
                        <div style={{ color: '#57534E', fontStyle: 'italic', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '4px' }}>
                          <strong>Kartu Ucapan:</strong> To {item.customConfig.card.to || 'Sahabat'} — "{item.customConfig.card.message?.slice(0, 45)}..."
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border-light)',
            background: '#FFFDF9',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.04)'
          }}>
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Kode Kupon (e.g. SAFFRONVIP)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid #D6CEBE',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    textTransform: 'uppercase'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  Gunakan
                </button>
              </div>

              {couponFeedback && (
                <div style={{
                  fontSize: '0.78rem',
                  marginTop: '6px',
                  color: couponFeedback.success ? '#15803D' : '#DC2626'
                }}>
                  {couponFeedback.message}
                </div>
              )}

              {appliedCoupon && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  background: 'rgba(21, 128, 61, 0.08)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  color: '#15803D'
                }}>
                  <span>✓ {appliedCoupon.description}</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
                  >
                    Hapus
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#78716C' }}>
                <span>Subtotal Item</span>
                <span style={{ fontWeight: 600, color: '#1C1917' }}>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803D' }}>
                  <span>Diskon Kupon</span>
                  <span style={{ fontWeight: 600 }}>- Rp {discount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#78716C' }}>
                <span>Estimasi Pengiriman</span>
                <span style={{ fontWeight: 600, color: '#1C1917' }}>
                  {shippingCost === 0 ? 'GRATIS (Pick-up)' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid #E7DFD5',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1C1917'
              }}>
                <span style={{ fontFamily: 'var(--font-serif)' }}>Total Pembayaran</span>
                <span style={{ color: '#A68019' }}>Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-gold)'
              }}
            >
              <span>Lanjut ke Checkout & Pengiriman</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
