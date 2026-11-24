import React from 'react';
import { useBakeryStore } from '../../context/BakeryStoreContext';

export const SiteHeader = () => {
  const {
    view,
    setView,
    cartCount,
    setIsCartOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useBakeryStore();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (view !== 'site') {
      setView('site');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement">
        <b>PANGGANG SEGAR SETIAP PAGI.</b> &nbsp; 100% Normandy Butter & Golden Saffron — Pengiriman Kilat Hangat ke Rumah Anda{' '}
        <span style={{ opacity: 0.7 }}>↗</span>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="container nav-wrap">
          {/* Brand Logo */}
          <div
            className="brand"
            onClick={(e) => handleNavClick(e, 'home')}
            role="button"
            tabIndex={0}
            aria-label="Le Saffrone Home"
          >
            <span className="brand-mark">LS</span>
            <div className="brand-title">
              <span>Le Saffrone</span>
              <small>HAUTE BOULANGERIE & PASTRY</small>
            </div>
          </div>

          {/* Nav Links */}
          <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} id="navLinks">
            <button onClick={(e) => handleNavClick(e, 'home')}>Home</button>
            <button onClick={(e) => handleNavClick(e, 'about')}>Filosofi</button>
            <button onClick={(e) => handleNavClick(e, 'signature')}>Signature</button>
            <button onClick={(e) => handleNavClick(e, 'shop')}>Menu Toko</button>
            <button onClick={(e) => handleNavClick(e, 'article')}>Journal</button>
            <button onClick={(e) => handleNavClick(e, 'contact')}>Kontak</button>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Demo Switcher */}
            <div className="demo-switch" aria-label="Pilih tampilan demo">
              <span>PREVIEW</span>
              <button
                className={view === 'site' ? 'active' : ''}
                onClick={() => setView('site')}
              >
                Website
              </button>
              <button
                className={view === 'admin' ? 'active' : ''}
                onClick={() => setView('admin')}
              >
                Admin
              </button>
              <button
                className={view === 'user' ? 'active' : ''}
                onClick={() => setView('user')}
              >
                User
              </button>
            </div>

            {/* Cart Button */}
            <button
              className="icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Buka keranjang belanja"
              title="Keranjang Belanja"
            >
              <span>🛒</span>
              {cartCount > 0 && <i className="cart-count">{cartCount}</i>}
            </button>

            {/* CTA Button */}
            <button
              className="btn small"
              onClick={(e) => handleNavClick(e, 'shop')}
            >
              Pesan Roti ↗
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="icon-btn menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Buka menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default SiteHeader;

