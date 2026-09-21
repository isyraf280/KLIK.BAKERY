import React from 'react';
import { Sparkles, Award, Clock, Heart, ShieldCheck, Leaf } from 'lucide-react';

export const AboutPage = ({ setActiveTab }) => {
  return (
    <div style={{ padding: '60px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* About Hero */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
            Kisah & Warisan Keahlian
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            color: '#1C1917',
            marginBottom: '16px'
          }}>
            Kisah di Balik <span className="gold-text">Le Saffrone</span>
          </h1>
          <p style={{ color: '#78716C', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
            Sebuah perjumpaan antara presisi tradisi pastry klasik Prancis dengan kehangatan rempah termahal di dunia, menghasilkan mahakarya kuliner yang memanjakan indera rasa dan estetika.
          </p>
        </div>

        {/* Story Section: Two Columns with Image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '80px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8C680A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
              Filosofi Kami
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1C1917', lineHeight: 1.25, marginBottom: '20px' }}>
              "Baking adalah simfoni kesabaran, aroma, dan dedikasi murni."
            </h2>
            <p style={{ color: '#57534E', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Didirikan oleh Chef Patissier lulusan École Ducasse Paris, Le Saffrone lahir dari impian untuk menghadirkan kembali romantisme aroma boulangerie Prancis di tengah hiruk pikuk kota, namun dengan sentuhan unik yang belum pernah ada sebelumnya: <strong>Saffron Super Negin murni</strong>.
            </p>
            <p style={{ color: '#57534E', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '24px' }}>
              Kami percaya bahwa pastry terbaik tidak pernah mentolerir jalan pintas. Setiap croissant digulung dengan tangan, difermentasi perlahan selama 24 hingga 36 jam di suhu dingin, dan dipanggang segar di pagi buta agar tiba di meja Anda dalam kondisi paling renyah dan harum.
            </p>

            <div style={{
              display: 'flex',
              gap: '24px',
              paddingTop: '20px',
              borderTop: '1px solid #E7DFD5'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#A68019', fontWeight: 700 }}>
                  2018
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78716C' }}>Didirikan di Jakarta</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#A68019', fontWeight: 700 }}>
                  100%
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78716C' }}>Mentega Normandy AOP</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#A68019', fontWeight: 700 }}>
                  &gt;25.000
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78716C' }}>Hampers Terkirim</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
              border: '1px solid var(--border-light)'
            }}>
              <img
                src="/images/almond_croissant.jpg"
                alt="Chef Handcrafted Croissant"
                style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '48px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '80px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
              Standar Kualitas Tertinggi
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1C1917' }}>
              Empat Pilar Keunggulan Le Saffrone
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: Award,
                title: "100% Normandy AOP Butter",
                desc: "Kami menolak margarin dan mentega campuran. Seluruh adonan lamination dibuat eksklusif dengan mentega AOP asal Normandy dengan aroma kacang hazelnut alami yang khas."
              },
              {
                icon: Sparkles,
                title: "Super Negin Saffron Murni",
                desc: "Hanya benang saffron terpanjang dan tergelap dari Iran yang kami gunakan. Diinfus ke dalam krim pastry, madu artisanal, dan sirup lamination untuk keharuman floral yang menenangkan."
              },
              {
                icon: Clock,
                title: "36 Jam Fermentasi Dingin",
                desc: "Fermentasi panjang memecah gluten secara alami, menghasilkan tekstur sourdough dan viennoiserie yang luar biasa renyah namun tetap ramah dan ringan di lambung."
              },
              {
                icon: Leaf,
                title: "Eco-Luxury Packaging",
                desc: "Kotak hampers rigid kami diproduksi menggunakan bahan daur ulang ramah lingkungan, dilapisi tinta kedelai non-toksik, dan dirancang untuk dapat digunakan kembali sebagai wadah perhiasan atau kenang-kenangan."
              }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: '#FAF7F2',
                  border: '1px solid #E7DFD5'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#141210',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    border: '1px solid #D4AF37'
                  }}>
                    <Icon size={20} color="#D4AF37" />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#1C1917', marginBottom: '8px' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#78716C', lineHeight: 1.7, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'linear-gradient(180deg, #1A1614 0%, #12100E 100%)',
          borderRadius: '24px',
          color: '#FAF7F2',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#FAF7F2', marginBottom: '12px' }}>
            Rasakan Sendiri Kemewahan Cita Rasa Le Saffrone
          </h2>
          <p style={{ color: '#D6D3D1', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 28px auto' }}>
            Pesan pastry favorit untuk sarapan istimewa atau kirimkan hampers elegan hari ini.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-primary"
              style={{ padding: '14px 32px' }}
            >
              Lihat Menu Katalog
            </button>
            <button
              onClick={() => { setActiveTab('custom-hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-secondary"
              style={{ padding: '14px 28px', background: 'transparent', color: '#FAF7F2', borderColor: '#D4AF37' }}
            >
              Rancang Custom Hampers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
