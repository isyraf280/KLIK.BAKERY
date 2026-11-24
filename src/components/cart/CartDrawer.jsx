import React from 'react';
import { useBakeryStore } from '../../context/BakeryStoreContext';
import { formatRupiah } from '../../data/lesaffroneBakeryData';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    checkoutCart,
  } = useBakeryStore();

  if (!isCartOpen) return null;

  return (
    <div className="overlay open" onClick={() => setIsCartOpen(false)}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <div className="cart-head">
          <div>
            <h3>Keranjang Roti</h3>
            <p className="muted" style={{ fontSize: '11px', margin: '4px 0 0' }}>
              {cartCount} item siap diantar segar
            </p>
          </div>
          <button
            className="close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Tutup keranjang"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-items">
          {(!cart || cart.length === 0) ? (
            <div className="empty-cart">
              <span className="icon">🥐</span>
              <div>
                <b>Keranjang belanja Anda masih kosong</b>
                <p style={{ marginTop: '6px' }}>
                  Pilih aneka croissant, pastry, dan sourdough segar dari menu kami.
                </p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                {/* Thumbnail */}
                <div className="cart-thumb">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/classic_butter_croissant.jpg';
                      }}
                    />
                  ) : (
                    <span>{item.emoji || '🥐'}</span>
                  )}
                </div>

                {/* Details */}
                <div>
                  <h4>{item.name}</h4>
                  <small>{formatRupiah(item.price)}</small>
                  <div className="qty">
                    <button
                      onClick={() => updateCartQty(item.id, -1)}
                      aria-label="Kurangi jumlah"
                    >
                      -
                    </button>
                    <span>{item.qty || 1}</span>
                    <button
                      onClick={() => updateCartQty(item.id, 1)}
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  className="remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Hapus item"
                  aria-label={`Hapus ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart && cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>{formatRupiah(cartSubtotal)}</span>
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <button
                className="btn lime"
                onClick={() => checkoutCart()}
              >
                Checkout & Pesan Sekarang ↗
              </button>
              <button
                className="btn outline small"
                onClick={clearCart}
                style={{ border: 'none', color: '#9aa096' }}
              >
                Kosongkan Keranjang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;

