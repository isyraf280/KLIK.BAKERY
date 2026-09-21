import React, { useState } from 'react';
import { X, Star, ShoppingBag, Plus, Minus, Sparkles, Check, AlertCircle, Utensils } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
          aria-label="Tutup modal"
        >
          <X size={18} color="#1C1917" />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Product Image Column */}
          <div style={{ position: 'relative', minHeight: '320px', background: '#12100E' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {product.badge && (
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <span className="badge badge-dark" style={{ borderColor: '#D4AF37' }}>
                  <Sparkles size={11} color="#D4AF37" /> {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: 'rgba(212, 175, 55, 0.15)',
                color: '#8C680A',
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {product.categoryLabel}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#8C680A' }}>
                <Star size={14} fill="#D4AF37" color="#D4AF37" />
                <span style={{ fontWeight: 700 }}>{product.rating}</span>
                <span style={{ color: '#A8A29E' }}>({product.reviewsCount} Ulasan)</span>
              </div>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              color: '#1C1917',
              lineHeight: 1.25,
              marginBottom: '10px'
            }}>
              {product.name}
            </h2>

            <div style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#A68019',
              marginBottom: '18px'
            }}>
              {product.priceFormatted}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#57534E', lineHeight: 1.7, marginBottom: '20px' }}>
              {product.description || product.shortDesc}
            </p>

            {/* Ingredients or Hamper items list */}
            {product.ingredients && (
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1C1917', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Komposisi Premium:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.ingredients.map((ing, idx) => (
                    <span key={idx} style={{
                      background: '#F4EFEA',
                      color: '#44403C',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem'
                    }}>
                      • {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Included Summary for Hampers */}
            {product.includedSummary && (
              <div style={{
                marginBottom: '18px',
                padding: '12px',
                background: 'rgba(212, 175, 55, 0.08)',
                borderRadius: '8px',
                border: '1px dashed rgba(212, 175, 55, 0.4)',
                fontSize: '0.84rem'
              }}>
                <strong style={{ color: '#8C680A', display: 'block', marginBottom: '4px' }}>Isi Paket Hampers:</strong>
                <p style={{ color: '#44403C', margin: 0 }}>{product.includedSummary}</p>
              </div>
            )}

            {/* Allergens Warning */}
            {product.allergens && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#78716C', marginBottom: '16px' }}>
                <AlertCircle size={14} color="#A8A29E" />
                <span>Mengandung: {product.allergens.join(', ')}</span>
              </div>
            )}

            {/* Serving Suggestion */}
            {product.servingSuggestion && (
              <div style={{
                background: '#FAF7F2',
                padding: '12px',
                borderRadius: '8px',
                borderLeft: '3px solid #D4AF37',
                fontSize: '0.8rem',
                color: '#57534E',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#8C680A', marginBottom: '4px' }}>
                  <Utensils size={13} />
                  <span>Saran Penyajian:</span>
                </div>
                <span>{product.servingSuggestion}</span>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E7DFD5', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid #D6CEBE',
                borderRadius: '999px',
                padding: '2px'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Minus size={15} color="#1C1917" />
                </button>
                <span style={{ padding: '0 12px', fontSize: '0.95rem', fontWeight: 700 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Plus size={15} color="#1C1917" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, padding: '14px', fontSize: '0.95rem' }}
              >
                {addedNotice ? (
                  <>
                    <Check size={18} />
                    <span>Ditambahkan ke Keranjang!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Tambah • Rp {(product.price * quantity).toLocaleString('id-ID')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
