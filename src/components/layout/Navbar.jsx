import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Phone, Compass, Gift, Bookmark } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { totalItemsCount, setIsCartOpen, grandTotal } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'catalog', label: 'Katalog Menu' },
    { id: 'custom-hampers', label: 'Custom Hampers', badge: 'Bespoke' },
    { id: 'about', label: 'Tentang Kami' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Privilege Bar */}
      <div style={{
        background: '#141210',
        color: '#F3E5AB',
        fontSize: '0.78rem',
        padding: '6px 16px',
        textAlign: 'center',
        letterSpacing: '0.06em',
        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#D4AF37" />
          <span>Gunakan Kupon <strong>SAFFRONVIP</strong> untuk Diskon 15% Pemesanan Pertama</span>
        </span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ display: 'none', md: 'inline' }} className="hidden sm:inline">
          Buka Setiap Hari: 07.30 - 21.00 WIB • Pengiriman Jabodetabek
        </span>
      </div>

      {/* Main Luxury Header */}
      <header className={`luxury-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '8px'
            }}
            className="md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} color="#1C1917" /> : <Menu size={24} color="#1C1917" />}
          </button>

          {/* Brand Logo & Monogram */}
          <div
            onClick={() => handleNavClick('home')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none'
            }}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#141210',
              border: '2px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.3)'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#F3E5AB'
              }}>LS</span>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                lineHeight: 1,
                color: '#1C1917'
              }}>
                LE SAFFRONE
              </div>
              <div style={{
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                color: '#8C680A',
                fontWeight: 600,
                marginTop: '4px',
                textTransform: 'uppercase'
              }}>
                Patisserie & Hampers
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }} className="hidden md:flex">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 4px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#A68019' : '#332F2B',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {link.label}
                  {link.badge && (
                    <span style={{
                      fontSize: '0.62rem',
                      background: 'rgba(212, 175, 55, 0.18)',
                      color: '#8C680A',
                      padding: '2px 7px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      border: '1px solid rgba(212, 175, 55, 0.4)'
                    }}>
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--gold-gradient)',
                      borderRadius: '2px'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Cart Drawer Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: totalItemsCount > 0 ? '#141210' : '#FFFFFF',
                color: totalItemsCount > 0 ? '#F3E5AB' : '#1C1917',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                padding: '9px 18px',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: totalItemsCount > 0 ? '0 4px 16px rgba(212, 175, 55, 0.35)' : 'var(--shadow-sm)',
                transition: 'all 0.25s ease'
              }}
              aria-label="Buka Keranjang Belanja"
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingBag size={18} color={totalItemsCount > 0 ? '#D4AF37' : '#1C1917'} />
                {totalItemsCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-7px',
                    right: '-9px',
                    background: '#D4AF37',
                    color: '#141210',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {totalItemsCount > 0 ? `Rp ${grandTotal.toLocaleString('id-ID')}` : 'Keranjang'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div style={{
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            padding: '16px 24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    padding: '10px 0',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    color: activeTab === link.id ? '#A68019' : '#1C1917',
                    fontWeight: activeTab === link.id ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F4EFEA'
                  }}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span style={{
                      fontSize: '0.7rem',
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: '#8C680A',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600
                    }}>
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
