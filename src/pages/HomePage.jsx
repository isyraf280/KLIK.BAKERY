import React from 'react';
import { Sparkles, ArrowRight, Award, ShieldCheck, Heart, Clock, Star, Gift, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/catalog/ProductCard';

export const HomePage = ({ setActiveTab, onQuickView }) => {
  // Curated 4 featured items
  const featuredItems = PRODUCTS.filter(p => [1, 2, 4, 10].includes(p.id));

  return (
    <div>
      {/* Editorial Luxury Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '86vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #141210 0%, #1D1815 100%)',
        color: '#FAF7F2',
        overflow: 'hidden',
        padding: '80px 0'
      }}>
        {/* Ambient Gold Glows */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center'
          }}>
            {/* Left Hero Text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span className="badge badge-dark" style={{ borderColor: '#D4AF37' }}>
                  <Sparkles size={12} color="#D4AF37" /> Haute Boulangerie & Gifting Atelier
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                lineHeight: 1.1,
                color: '#FAF7F2',
                marginBottom: '22px',
                letterSpacing: '-0.02em'
              }}>
                Kemewahan Pastry Prancis & Sentuhan Magis <span className="gold-text">Saffron Emas.</span>
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: '#D6D3D1',
                lineHeight: 1.8,
                marginBottom: '36px',
                maxWidth: '540px'
              }}>
                Setiap lamination croissant, tart buah segar, dan kurasi hampers diracik menggunakan 100% mentega AOP Normandy dan infusi saffron super negin pilihan untuk momen tak terlupakan.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <button
                  onClick={() => { setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn btn-primary"
                  style={{ padding: '14px 32px', fontSize: '0.98rem' }}
                >
                  <span>Jelajahi Menu Patisserie</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => { setActiveTab('custom-hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn btn-secondary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '0.98rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#FAF7F2',
                    borderColor: 'rgba(212, 175, 55, 0.4)'
                  }}
                >
                  <Gift size={18} color="#D4AF37" />
                  <span>Rancang Custom Hampers</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                marginTop: '44px',
                paddingTop: '28px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#F3E5AB', fontWeight: 700 }}>
                    100% Normandy
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#A8A29E' }}>Pure French AOP Butter</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#F3E5AB', fontWeight: 700 }}>
                    36-Hour Slow
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#A8A29E' }}>Natural Fermentation</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#F3E5AB', fontWeight: 700 }}>
                    Same-Day
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#A8A29E' }}>Fresh Artisanal Bake</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), var(--gold-glow)',
                border: '1px solid rgba(212, 175, 55, 0.35)'
              }}>
                <img
                  src="/images/classic_butter_croissant.jpg"
                  alt="Le Saffrone Classic Butter Croissant"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 16, 14, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '32px'
                }}>
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                      Chef's Signature Viennoiserie
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FAF7F2', marginBottom: '4px' }}>
                      Classic Butter Croissant
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#D6D3D1', margin: 0 }}>
                      Kerenyahan honeycomb lamination berpadu aroma mentega murni Prancis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Saffron Stamp Card */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                background: '#1F1A17',
                border: '1.5px solid #D4AF37',
                borderRadius: '16px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-gold)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#141210'
                }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                    Super Negin Infusion
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FAF7F2' }}>
                    Saffron Grade AAA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars Section */}
      <section style={{ padding: '72px 0', background: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: Award,
                title: "100% Normandy AOP",
                desc: "Mentega Prancis berkualitas tertinggi dengan persentase lemak susu 84% untuk kerapuhan lamination maksimal."
              },
              {
                icon: Sparkles,
                title: "Infusi Saffron Super Negin",
                desc: "Rempah saffron termahal di dunia memberikan aroma floral hangat dan sentuhan emas alami pada setiap gigitan."
              },
              {
                icon: Clock,
                title: "Proses Lambat 36 Jam",
                desc: "Fermentasi dingin bertahap membentuk kedalaman rasa, aroma asam halus, dan tekstur yang ramah di pencernaan."
              },
              {
                icon: Gift,
                title: "Bespoke Hampers & Cards",
                desc: "Layanan custom hantaran eksklusif dengan kotak beludru kaku, pita sutra, dan kartu ucapan berstempel lilin."
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: '#FAF7F2',
                  border: '1px solid #E7DFD5',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#141210',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    border: '1px solid #D4AF37'
                  }}>
                    <Icon size={22} color="#D4AF37" />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#1C1917', marginBottom: '8px' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#78716C', lineHeight: 1.6, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Selection Section */}
      <section style={{ padding: '80px 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
              Kurasi Pilihan Chef
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#1C1917', marginBottom: '12px' }}>
              Mahakarya Bakery & Hampers Favorit
            </h2>
            <p style={{ color: '#78716C', fontSize: '0.95rem', maxWidth: '580px' }}>
              Kombinasi klasik dan inovasi signature patisserie yang paling banyak dipesan dan diapresiasi oleh para penikmat pastry.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '28px',
            marginBottom: '40px'
          }}>
            {featuredItems.map(item => (
              <ProductCard key={item.id} product={item} onQuickView={onQuickView} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => { setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-outline-gold"
              style={{ padding: '12px 32px', fontSize: '0.92rem' }}
            >
              <span>Lihat Semua 12 Koleksi Produk</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Custom Hampers Callout Banner */}
      <section style={{
        padding: '90px 0',
        background: 'radial-gradient(ellipse at center, #1E1B18 0%, #12100E 100%)',
        color: '#FAF7F2',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-dark" style={{ borderColor: '#D4AF37', marginBottom: '14px' }}>
                <Gift size={12} color="#D4AF37" /> Bespoke Gifting Experience
              </span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FAF7F2',
                lineHeight: 1.15,
                marginBottom: '18px'
              }}>
                Rancang Hampers Mewah Sesuai Keinginan Anda
              </h2>
              <p style={{ color: '#D6D3D1', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '28px' }}>
                Hadirkan hantaran tak terlupakan untuk ulang tahun, hari raya, pernikahan, maupun corporate gifts. Pilih model box koper mewah, isi dengan pastry pilihan Anda, tambahkan warna pita favorit, dan sertakan kartu ucapan dengan wax seal kerajaan.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#F3E5AB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={16} color="#D4AF37" />
                  <span>Kapasitas 4, 6, hingga 8 pilihan varian pastry</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={16} color="#D4AF37" />
                  <span>Live Preview Kartu Ucapan Kaligrafi Prancis & Segel Lilin</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={16} color="#D4AF37" />
                  <span>Delivery Date Picker: Tentukan tanggal & jam kirim pasti</span>
                </div>
              </div>

              <button
                onClick={() => { setActiveTab('custom-hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn btn-primary"
                style={{ padding: '14px 32px', fontSize: '0.95rem' }}
              >
                <span>Buka Custom Hamper Builder</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Hamper Visual */}
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80"
                alt="Signature Celebration Hampers"
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
              Apresiasi Pelanggan
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#1C1917' }}>
              Cerita Hangat dari Penikmat Le Saffrone
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px'
          }}>
            {[
              {
                name: "Clarissa Soedarmono",
                role: "Art Curator & Pastry Enthusiast",
                comment: "Croissant terlembut dan paling berkaramel di Jakarta. Infusi aroma saffronnya benar-benar halus dan memberikan karakter mewah yang tidak saya temukan di patisserie lain.",
                rating: 5
              },
              {
                name: "Reza Mahendra",
                role: "Corporate Executive",
                comment: "Pesan Grand Saffron Hampers untuk klien VIP saat perayaan akhir tahun. Kemasannya sangat prestisius, kartu ucapannya elegan dengan wax seal, dan semua pastry tiba dalam kondisi hangat sempurna!",
                rating: 5
              },
              {
                name: "Dr. Amanda Patricia",
                role: "Loyal Customer",
                comment: "Strawberry Saffron Tart-nya luar biasa segar! Krim diplomatnya seimbang, tidak enek, dan sablé crust-nya tetap renyah hingga hari berikutnya.",
                rating: 5
              }
            ].map((testi, idx) => (
              <div key={idx} style={{
                background: '#FAF7F2',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid #E7DFD5',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {Array.from({ length: testi.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: '#292524',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '20px',
                  flex: 1
                }}>
                  "{testi.comment}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1C1917' }}>
                    {testi.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#8C680A' }}>
                    {testi.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
