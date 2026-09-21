import React from 'react';
import { HamperBuilder } from '../components/hampers/HamperBuilder';
import { Gift, Sparkles, Building2, PhoneCall, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CustomHampersPage = ({ setActiveTab }) => {
  const { setIsCartOpen } = useCart();

  const handleFinishBuilder = () => {
    // Open cart drawer when finished adding custom hamper
    setIsCartOpen(true);
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Hero Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-gold">
              <Sparkles size={12} color="#D4AF37" /> Bespoke Gifting Atelier
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            color: '#1C1917',
            marginBottom: '14px'
          }}>
            Rancang Custom Hampers Anda
          </h1>
          <p style={{ color: '#78716C', fontSize: '1rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            Ekspresikan perhatian mendalam melalui kurasi hampers personal. Pilih kemasan box eksklusif, isi dengan varian pastry artisanal favorit, tentukan nuansa pita, dan sertakan kartu ucapan berstempel lilin resmi.
          </p>
        </div>

        {/* The 5-Step Hamper Builder */}
        <HamperBuilder onFinish={handleFinishBuilder} />

        {/* Corporate Gifting VIP Banner */}
        <div style={{
          marginTop: '80px',
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8C680A', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              <Building2 size={16} />
              <span>Corporate & Event Concierge</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#1C1917', marginBottom: '12px' }}>
              Pemesanan Hampers Perusahaan & Jumlah Besar
            </h3>
            <p style={{ color: '#78716C', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Butuh kustomisasi logo perusahaan pada pita bordir, kartu ucapan berlogo, atau pengiriman terjadwal ke ratusan alamat di Jabodetabek? Tim Corporate Concierge kami siap membantu kebutuhan hantaran bisnis Anda.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#44403C' }}>
              <ShieldCheck size={18} color="#D4AF37" />
              <span>Dedicated Account Manager & Faktur Pajak Resmi</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#44403C' }}>
              <HeartHandshake size={18} color="#D4AF37" />
              <span>Special Tier Volume Discount untuk Pemesanan &gt; 20 Box</span>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Le%20Saffrone,%20saya%20tertarik%20untuk%20konsultasi%20Corporate%20Hampers."
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
              style={{ marginTop: '8px', alignSelf: 'flex-start', padding: '12px 24px', fontSize: '0.9rem' }}
            >
              <PhoneCall size={16} color="#D4AF37" />
              <span>Hubungi Corporate Concierge (WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
