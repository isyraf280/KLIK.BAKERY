import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, Phone, Mail, Instagram, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer style={{
      background: '#12100E',
      color: '#FAF7F2',
      borderTop: '1px solid rgba(212, 175, 55, 0.25)',
      marginTop: '80px',
      paddingTop: '64px',
      paddingBottom: '32px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '48px',
          marginBottom: '56px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#1F1A17',
                border: '1.5px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontFamily: 'var(--font-serif)', color: '#F3E5AB', fontWeight: 700, fontSize: '1.2rem' }}>LS</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#FAF7F2', letterSpacing: '0.06em' }}>
                  LE SAFFRONE
                </h3>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase' }}>
                  Patisserie & Hampers
                </span>
              </div>
            </div>
            <p style={{ color: '#A8A29E', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Perpaduan kemewahan seni pastry klasik Prancis dengan sentuhan aroma eksotis Saffron Super Negin murni dan 100% Normandy AOP Butter.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-dark" style={{ borderColor: '#D4AF37' }}>
                <Sparkles size={12} color="#D4AF37" /> 100% Halal Ingredients
              </span>
              <span className="badge badge-dark">
                Normandy AOP Butter
              </span>
            </div>
          </div>

          {/* Boutique Atelier */}
          <div>
            <h4 style={{ color: '#F3E5AB', fontSize: '1.1rem', marginBottom: '20px', letterSpacing: '0.05em' }}>
              Boutique & Atelier
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: '#D6D3D1' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Clock size={18} color="#D4AF37" style={{ flexShrink: 0 }} />
                <span>Buka Setiap Hari: 07:30 – 21:00 WIB</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} color="#D4AF37" style={{ flexShrink: 0 }} />
                <span>+62 812-3456-7890 (Customer Concierge)</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} color="#D4AF37" style={{ flexShrink: 0 }} />
                <span>bonjour@lesaffrone.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#F3E5AB', fontSize: '1.1rem', marginBottom: '20px', letterSpacing: '0.05em' }}>
              Eksplorasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <li>
                <button
                  onClick={() => { setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#A8A29E', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                  onMouseLeave={(e) => e.target.style.color = '#A8A29E'}
                >
                  Katalog Bakery & Pastry
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('custom-hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#A8A29E', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                  onMouseLeave={(e) => e.target.style.color = '#A8A29E'}
                >
                  Custom Hamper Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: '#A8A29E', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                  onMouseLeave={(e) => e.target.style.color = '#A8A29E'}
                >
                  Cerita & Filosofi Kami
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Le%20Saffrone,%20saya%20ingin%20berkonsultasi%20pesanan%20hampers%20corporate."
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#A8A29E', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                  onMouseLeave={(e) => e.target.style.color = '#A8A29E'}
                >
                  Konsultasi Corporate Hampers
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Club Privé */}
          <div>
            <h4 style={{ color: '#F3E5AB', fontSize: '1.1rem', marginBottom: '12px', letterSpacing: '0.05em' }}>
              Le Club Privé
            </h4>
            <p style={{ color: '#A8A29E', fontSize: '0.85rem', marginBottom: '16px' }}>
              Daftarkan email Anda untuk menerima undangan seasonal tasting menu dan penawaran hampers prioritas.
            </p>
            {subscribed ? (
              <div style={{
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #D4AF37',
                padding: '12px',
                borderRadius: '8px',
                color: '#F3E5AB',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span>Merci! Anda telah terdaftar di Le Club Privé.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Alamat email Anda..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#1F1A17',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '999px',
                    padding: '10px 16px',
                    color: '#FAF7F2',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '10px 18px', fontSize: '0.82rem', flexShrink: 0 }}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#78716C'
        }}>
          <div>
            © {new Date().getFullYear()} Le Saffrone Patisserie. All rights reserved. Artisan Baking Excellence.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Pembayaran Terverifikasi:</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ background: '#FFFFFF', color: '#1C1917', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.72rem' }}>QRIS</span>
              <span style={{ background: '#FFFFFF', color: '#005baa', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.72rem' }}>BCA</span>
              <span style={{ background: '#FFFFFF', color: '#003d79', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.72rem' }}>Mandiri</span>
              <span style={{ background: '#FFFFFF', color: '#1A1F71', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.72rem' }}>VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
