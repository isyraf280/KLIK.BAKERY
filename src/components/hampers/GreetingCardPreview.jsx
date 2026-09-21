import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

export const GreetingCardPreview = ({ to, from, occasion, message }) => {
  return (
    <div className="greeting-card-preview" style={{ maxWidth: '440px', margin: '0 auto' }}>
      {/* Wax Seal at the top right */}
      <div style={{ position: 'absolute', top: '-18px', right: '24px', zIndex: 3 }}>
        <div className="wax-seal-icon">
          <span>LS</span>
        </div>
      </div>

      {/* Card Header Monogram */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#8C680A',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
          <Sparkles size={11} color="#D4AF37" />
          <span>Le Saffrone Patisserie</span>
          <Sparkles size={11} color="#D4AF37" />
        </div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '0.9rem',
          color: '#A8A29E',
          marginTop: '2px'
        }}>
          Haute Carte de Vœux
        </div>
      </div>

      {/* Recipient */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '0.75rem', color: '#8C680A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
          Chère / Pour :
        </span>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#1C1917',
          borderBottom: '1px dashed #D6CEBE',
          paddingBottom: '2px'
        }}>
          {to || 'Nama Penerima Terkasih'}
        </div>
      </div>

      {/* Handwritten Message Body */}
      <div style={{
        minHeight: '90px',
        margin: '18px 0',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '8px',
        border: '1px solid rgba(212, 175, 55, 0.2)'
      }}>
        <p style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '1.5rem',
          color: '#292524',
          lineHeight: 1.4,
          wordBreak: 'break-word',
          margin: 0
        }}>
          {message || 'Tuliskan pesan doa, ucapan hangat, atau apresiasi manis Anda di sini...'}
        </p>
      </div>

      {/* Sender */}
      <div style={{ textAlign: 'right', marginTop: '16px' }}>
        <span style={{ fontSize: '0.75rem', color: '#8C680A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
          Avec Amour / Dari :
        </span>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#1C1917'
        }}>
          {from || 'Nama Pengirim'}
        </div>
      </div>
    </div>
  );
};
