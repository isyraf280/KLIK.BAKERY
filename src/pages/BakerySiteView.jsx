import React, { useState, useMemo } from 'react';
import { useBakeryStore } from '../context/BakeryStoreContext';
import {
  BAKERY_JOURNAL,
  formatRupiah,
} from '../data/lesaffroneBakeryData';

export const BakerySiteView = () => {
  const {
    products,
    addToCart,
    openModal,
    showToast,
  } = useBakeryStore();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Contact / Custom Order Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    type: 'Custom Tart & Cake',
    notes: '',
  });

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return list.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory =
        selectedCategory === 'all' ||
        (item.kind && item.kind.toLowerCase() === selectedCategory.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Open Product Quick View Modal
  const handleQuickView = (product) => {
    openModal(
      product.name,
      <div style={{ display: 'grid', gap: '16px' }}>
        <div
          style={{
            height: '240px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#eee',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/classic_butter_croissant.jpg';
            }}
          />
        </div>
        <div>
          <div className="eyebrow" style={{ color: '#d4af37', marginBottom: '6px' }}>
            {product.category} · {product.badge || 'SPECIAL SELECTION'}
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#555' }}>
            {product.desc}
          </p>
        </div>
        <div
          style={{
            background: '#f7f6f0',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '11px',
            color: '#666',
          }}
        >
          <b>Komposisi Utama:</b> Tepung Prancis T65, 100% Mentega AOP Beurre d'Isigny, Ragi Alami, Garam Laut Guérande.
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
          }}
        >
          <span style={{ font: '800 22px Manrope' }}>
            {formatRupiah(product.price)}
          </span>
          <button
            className="btn lime"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    );
  };

  // Open Journal Article Modal
  const handleReadArticle = (article) => {
    openModal(
      article.title,
      <div style={{ display: 'grid', gap: '14px', lineHeight: '1.8', fontSize: '13px', color: '#444' }}>
        <div className="eyebrow">{article.tag} · {article.date}</div>
        <p style={{ fontWeight: 600, color: '#222' }}>{article.snippet}</p>
        <p>{article.content}</p>
        <div
          style={{
            padding: '14px',
            background: '#eef5db',
            borderRadius: '12px',
            fontSize: '11px',
            color: '#526632',
          }}
        >
          💡 <b>Tips Baker Le Saffrone:</b> Untuk rasa terbaik, nikmati viennoiserie dalam kurun waktu 12 jam setelah dipanggang atau hangatkan 3 menit di oven 180°C.
        </div>
      </div>
    );
  };

  // Handle Submit Custom Order
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      showToast('Mohon lengkapi nama dan nomor WhatsApp Anda');
      return;
    }
    showToast(`Terima kasih ${contactForm.name}! Pesanan custom Anda telah kami terima.`);
    setContactForm({ name: '', phone: '', type: 'Custom Tart & Cake', notes: '' });
  };

  return (
    <div id="siteView" className="site-view">
      <main>
        {/* =================================================================
            HERO SECTION
            ================================================================= */}
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker">
                <i className="spark"></i> HAUTE BOULANGERIE & PASTRY <span className="mono">/ 01</span>
              </div>
              <h1>
                Seni Pastry Prancis & Kelezatan <em>Autentik</em>.
              </h1>
              <p>
                Le Saffrone menyajikan aneka croissant mentega Normandy 100%, viennoiserie renyah, artisan sourdough fermentasi 36 jam, dan tart istimewa dengan infus saffron emas. Dipanggang segar setiap pagi untuk menemani momen berharga Anda.
              </p>
              <div className="hero-cta">
                <a className="btn lime" href="#shop">
                  Lihat Menu Roti <span>↗</span>
                </a>
                <a className="text-link" href="#signature">
                  Lihat Signature Bakes ↗
                </a>
              </div>
              <div className="hero-proof">
                <div className="avatars">
                  <span className="avatar">🥐</span>
                  <span className="avatar">🥖</span>
                  <span className="avatar">🍓</span>
                  <span className="avatar">✨</span>
                </div>
                <div className="proof-text">
                  <b>100% Beurre d'Isigny AOP Normandy.</b>
                  <br />
                  Tanpa pengawet, tanpa pewarna tiruan, renyah alami.
                </div>
              </div>
            </div>

            {/* Visual 3D Card Stack from Reference */}
            <div className="hero-visual" aria-label="Preview Le Saffrone Bakery">
              <div className="visual-glow"></div>

              {/* Floating Top Left Badge Card */}
              <div className="float-card design">
                <div className="mini-label">BAKED FRESH DAILY</div>
                <div className="design-grid">
                  <span style={{ background: '#e8b28d' }}></span>
                  <span style={{ background: '#f4dfbd' }}></span>
                  <span style={{ background: '#c5d0a2' }}></span>
                </div>
              </div>

              {/* Main 3D Mock Frame */}
              <div className="main-mock">
                <div className="mock-top">
                  <div className="dots">
                    <i></i><i></i><i></i>
                  </div>
                  <div className="mock-brand">LE SAFFRONE · PARIS</div>
                  <div className="mock-nav">CROISSANT · SOURDOUGH · TART</div>
                </div>
                <div className="mock-hero">
                  <small>FRESH FROM OUR STONE OVEN</small>
                  <h3>
                    Baked with<br />
                    love. Served<br />
                    warm daily.
                  </h3>
                  <p>A warm artisanal bakery crafted with pure French butter & saffron.</p>
                  <a href="#shop" className="mini-pill">
                    PESAN SEKARANG ↗
                  </a>
                </div>
                <div className="mock-grid">
                  <div
                    className="mock-tile"
                    style={{
                      backgroundImage: 'url(/images/classic_butter_croissant.jpg)',
                      color: '#fff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    01 / CROISSANT
                  </div>
                  <div
                    className="mock-tile"
                    style={{
                      backgroundImage: 'url(/images/pain_au_chocolat.jpg)',
                      color: '#fff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    02 / VALRHONA
                  </div>
                  <div
                    className="mock-tile"
                    style={{
                      backgroundImage: 'url(/images/almond_croissant.jpg)',
                      color: '#fff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    03 / ALMOND
                  </div>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="float-card rating">
                <div className="mini-label">PARISIAN EXCELLENCE</div>
                <strong>5.0 / 5.0</strong>
                <div className="stars">★★★★★</div>
                <p>A little piece of Paris in every bite.</p>
              </div>

              <div className="floating-tag">✦ CRUNCHY LAYERS, MELTING HEART</div>
            </div>
          </div>
        </section>

        {/* =================================================================
            LOGO STRIP
            ================================================================= */}
        <div className="logo-strip">
          <div className="container logo-strip-inner">
            <span className="eyebrow">MADE FOR THE PEOPLE WHO LOVE BREAD</span>
            <span>artisan croissant</span>
            <span>viennoiserie</span>
            <span>sourdough boule</span>
            <span>french tart</span>
            <span>luxury hampers</span>
          </div>
        </div>

        {/* =================================================================
            SECTION 01: CRAFT & PHILOSOPHY
            ================================================================= */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">01 — OUR CRAFT & PHILOSOPHY</div>
                <h2>
                  From first bite.<br />
                  To lasting pastry love.
                </h2>
              </div>
              <p>
                Setiap lembar pastry Le Saffrone lahir dari dedikasi terhadap tradisi baking Prancis klasik. Menggunakan bahan baku pilihan tanpa kompromi untuk menghadirkan cita rasa yang memanjakan lidah Anda.
              </p>
            </div>
            <div className="services-grid">
              <article className="service-card">
                <span className="service-number">01 / BUTTER</span>
                <div className="service-icon">🧈</div>
                <h3>100% Normandy Butter</h3>
                <p>
                  Menggunakan mentega murni AOP Beurre d'Isigny dari Normandy Prancis dengan kadar lemak 84% untuk lamination yang harum dan gurih.
                </p>
              </article>
              <article className="service-card">
                <span className="service-number">02 / SPICE</span>
                <div className="service-icon">🌸</div>
                <h3>Pure Saffron Infusion</h3>
                <p>
                  Sentuhan rempah saffron emas super negin berkualitas tinggi memberikan aroma floral elegan dan sentuhan kemewahan pada cream pastry kami.
                </p>
              </article>
              <article className="service-card">
                <span className="service-number">03 / FERMENT</span>
                <div className="service-icon">🥖</div>
                <h3>36H Slow Fermentation</h3>
                <p>
                  Fermentasi alami lambat pada suhu terkontrol menghasilkan sourdough dengan aroma ragi liar alami yang mudah dicerna dan berkarakter kuat.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 02: SIGNATURE BAKES SHOWCASE
            ================================================================= */}
        <section className="work-section" id="signature">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">02 — SIGNATURE BAKES & STORIES</div>
                <h2>
                  Fresh from oven.<br />
                  Crafted with passion.
                </h2>
              </div>
              <p>
                Koleksi karya terbaik dari chef patissier kami. Tiap produk memiliki keunikan tekstur dan cerita di balik resep turun temurun.
              </p>
            </div>
            <div className="work-grid">
              {/* Large Card: Classic Butter Croissant */}
              <article
                className="work-card large"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const item = products.find((p) => p.id === 'croissant-butter');
                  if (item) handleQuickView(item);
                }}
              >
                <div className="work-meta">SIGNATURE VIENNOISERIE / 27 LAYERS</div>
                <h3>
                  Classic Butter<br />
                  Croissant Normandy.
                </h3>
                <div className="work-art">
                  <img
                    src="/images/classic_butter_croissant.jpg"
                    alt="Classic Butter Croissant"
                  />
                </div>
                <span className="work-arrow">↗</span>
              </article>

              {/* Stacked Cards */}
              <div className="work-stack">
                <article
                  className="work-card small-a"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const item = products.find((p) => p.id === 'pain-chocolat');
                    if (item) handleQuickView(item);
                  }}
                >
                  <div className="work-meta">PURE VALRHONA 55% CHOCOLATE</div>
                  <h3>
                    Pain au Chocolat<br />
                    Valrhona.
                  </h3>
                  <div className="work-art two">
                    <img
                      src="/images/pain_au_chocolat.jpg"
                      alt="Pain au Chocolat"
                    />
                  </div>
                  <span className="work-arrow">↗</span>
                </article>

                <article
                  className="work-card small-b"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const item = products.find((p) => p.id === 'almond-croissant');
                    if (item) handleQuickView(item);
                  }}
                >
                  <div className="work-meta">FRANGIPANE DOUBLE BAKED</div>
                  <h3>
                    Almond Frangipane<br />
                    Croissant.
                  </h3>
                  <div className="work-art">
                    <img
                      src="/images/almond_croissant.jpg"
                      alt="Almond Croissant"
                    />
                  </div>
                  <span className="work-arrow">↗</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 03: THE BAKERY SHOP (MENU TOKO)
            WITH REAL IMAGES & REAL BAKERY PRICES
            ================================================================= */}
        <section className="section" id="shop">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">03 — THE BAKERY SHOP</div>
                <h2>
                  Choose what your<br />
                  morning craves next.
                </h2>
              </div>
              <div className="shop-tools">
                <label className="search-box">
                  <span>⌕</span>
                  <input
                    placeholder="Cari roti, croissant, tart..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Semua Kategori</option>
                  <option value="viennoiserie">Viennoiserie</option>
                  <option value="pastry">Fine Pastry</option>
                  <option value="bread">Artisan Bread</option>
                  <option value="hampers">Hampers & Gift</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid with Real Bakery Photos */}
            {filteredProducts.length === 0 ? (
              <div className="empty-note">
                Tidak ada menu roti yang cocok dengan pencarian "{searchQuery}".
              </div>
            ) : (
              <div className="product-grid" id="productGrid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    {/* Real Product Image with Fallback */}
                    <div
                      className="product-art"
                      onClick={() => handleQuickView(product)}
                      title={`Klik untuk detail ${product.name}`}
                    >
                      <span
                        className={`product-sticker ${
                          product.badge?.includes('SIGNATURE')
                            ? 'signature'
                            : product.badge?.includes('BEST')
                            ? 'bestseller'
                            : ''
                        }`}
                      >
                        {product.badge || 'LE SAFFRONE'}
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/classic_butter_croissant.jpg';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                      <div className="category">{product.category}</div>
                      <h3 onClick={() => handleQuickView(product)}>
                        {product.name}
                      </h3>
                      <p>{product.desc}</p>
                      <div className="product-bottom">
                        <span className="product-price">
                          {formatRupiah(product.price)}
                        </span>
                        <button
                          className="add-btn"
                          onClick={() => addToCart(product.id)}
                          aria-label={`Tambah ${product.name} ke keranjang`}
                          title="Tambah ke keranjang"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =================================================================
            SECTION 04: THE BAKERY JOURNAL
            ================================================================= */}
        <section className="section" id="article" style={{ paddingTop: '20px' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">04 — THE BAKERY JOURNAL</div>
                <h2>
                  A little inspiration<br />
                  for your next bake.
                </h2>
              </div>
              <a className="text-link" href="#contact">
                Punya pertanyaan resep? Diskusi yuk ↗
              </a>
            </div>

            <div className="article-grid">
              {BAKERY_JOURNAL.map((article) => (
                <article
                  className="article-card"
                  key={article.id}
                  onClick={() => handleReadArticle(article)}
                >
                  <div className="article-cover">
                    <div className="cover-shape"></div>
                    <span>{article.tag}</span>
                  </div>
                  <div className="article-meta">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.snippet}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            ABOUT BAND
            ================================================================= */}
        <section className="about-band">
          <div className="container about-band-inner">
            <div>
              <div className="eyebrow" style={{ color: '#3d482c' }}>
                LE SAFFRONE PROMISE
              </div>
              <h2>Freshly baked every dawn. Delivered warm to your doorstep.</h2>
              <p>
                Setiap roti kami dibuat tanpa pemutih, tanpa pengawet sintetis, dan dipanggang segar di pagi hari. Rasakan kemewahan sarapan ala kafe Paris di kenyamanan rumah Anda.
              </p>
            </div>
            <a className="btn" href="#shop">
              Beli Roti Pagi Ini ↗
            </a>
          </div>
        </section>

        {/* =================================================================
            SECTION 05: CUSTOM ORDER & CONTACT
            ================================================================= */}
        <section className="section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow">05 — SPECIAL ORDERS & CATERING</div>
              <h2>
                Make your celebration<br />
                unforgettable.
              </h2>
              <p>
                Butuh custom hampers untuk perusahaan, tart ulang tahun istimewa, atau paket coffee break viennoiserie untuk meeting kantor? Tim baker kami siap menyiapkannya secara khusus.
              </p>
              <div className="contact-detail">
                <div>
                  <span>ALAMAT BOULANGERIE</span>
                  Jl. A.P. Pettarani No. 45, Panakkukang, Makassar
                </div>
                <div>
                  <span>JAM OPERASIONAL OVEN</span>
                  Selasa – Minggu: 07:00 – 21:00 WITA (Senin Tutup Oven)
                </div>
                <div>
                  <span>WHATSAPP ORDER & KONSULTASI</span>
                  +62 812 9876 5432 · halo@lesaffrone.com
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="clientName">NAMA LENGKAP</label>
                  <input
                    id="clientName"
                    required
                    placeholder="Contoh: Nadia Putri"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="clientPhone">NOMOR WHATSAPP</label>
                  <input
                    id="clientPhone"
                    required
                    placeholder="0812xxxxxxx"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="orderType">JENIS KEBUTUHAN ROTI</label>
                <select
                  id="orderType"
                  value={contactForm.type}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, type: e.target.value })
                  }
                >
                  <option value="Custom Tart & Cake">Custom Tart & Cake Perayaan</option>
                  <option value="Corporate Hampers">Hampers Mewah / Souvenir Kantor</option>
                  <option value="Meeting Pastry Box">Paket Sarapan / Meeting Pastry Box</option>
                  <option value="Pesanan Khusus">Pesanan Khusus Lainnya</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="orderNotes">CATATAN & TANGGAL PENGIRIMAN</label>
                <textarea
                  id="orderNotes"
                  placeholder="Sebutkan tanggal acara, jumlah porsi, atau request tulisan ucapan pada tart..."
                  value={contactForm.notes}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, notes: e.target.value })
                  }
                ></textarea>
              </div>

              <button type="submit" className="btn lime">
                Kirim Permintaan Pesanan ↗
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* =================================================================
          FOOTER
          ================================================================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="brand">
                <span className="brand-mark">LS</span>
                <div className="brand-title">
                  <span>Le Saffrone</span>
                  <small>HAUTE BOULANGERIE & PASTRY</small>
                </div>
              </div>
              <p className="footer-copy">
                Boulangerie dan patisserie Prancis autentik dengan 100% mentega Normandy dan saffron emas. Mengutamakan kesegaran dan kehangatan di setiap gigitan.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Menu Toko</h4>
                <a href="#shop">Classic Croissant</a>
                <a href="#shop">Pain au Chocolat</a>
                <a href="#shop">Artisan Sourdough</a>
                <a href="#shop">Strawberry Saffron Tart</a>
              </div>
              <div>
                <h4>Layanan</h4>
                <a href="#shop">Viennoiserie Harian</a>
                <a href="#shop">Hampers & Gift Box</a>
                <a href="#contact">Custom Event Catering</a>
                <a href="#contact">Pemesanan Khusus</a>
              </div>
              <div>
                <h4>Boulangerie</h4>
                <a href="#about">Filosofi Mentega Normandy</a>
                <a href="#signature">Signature Bakes</a>
                <a href="#article">Baking Journal</a>
                <a href="#contact">Lokasi & Kontak</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 LE SAFFRONE PATISSERIE & BOULANGERIE. ALL RIGHTS RESERVED.</span>
            <span>PARISIAN HERITAGE · FRESH BAKED DAILY</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default BakerySiteView;
