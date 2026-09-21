import React from 'react';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="gold-border-card"
      onClick={() => onQuickView(product)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%'
      }}
    >
      {/* Product Image Container */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', background: '#F4EFEA' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="product-card-img"
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
            <span className="badge badge-dark" style={{ borderColor: '#D4AF37' }}>
              <Sparkles size={11} color="#D4AF37" /> {product.badge}
            </span>
          </div>
        )}

        {/* Category Pill */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 2 }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            color: '#1C1917',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.04em'
          }}>
            {product.categoryLabel}
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#8C680A' }}>
            <Star size={13} fill="#D4AF37" color="#D4AF37" />
            <span style={{ fontWeight: 700 }}>{product.rating}</span>
            <span style={{ color: '#A8A29E' }}>({product.reviewsCount})</span>
          </div>
          {product.capacity && (
            <span style={{ fontSize: '0.75rem', color: '#78716C', fontWeight: 500 }}>
              Kapasitas: {product.capacity} Pastry
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.28rem',
          color: '#1C1917',
          lineHeight: 1.3,
          marginBottom: '8px'
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: '0.84rem',
          color: '#78716C',
          lineHeight: 1.6,
          marginBottom: '16px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.shortDesc}
        </p>

        {/* Price & Action Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid rgba(180, 140, 60, 0.15)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#A8A29E', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Harga
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.18rem',
              fontWeight: 800,
              color: '#A68019'
            }}>
              {product.priceFormatted}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#F4EFEA',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1C1917',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              title="Lihat Detail"
              aria-label="Lihat Detail Produk"
            >
              <Eye size={16} />
            </button>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              aria-label="Pesan Produk"
            >
              <ShoppingBag size={14} />
              <span>Pesan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
