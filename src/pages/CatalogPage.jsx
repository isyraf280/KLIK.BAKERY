import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Gift, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/catalog/ProductCard';

export const CatalogPage = ({ onQuickView, setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', label: 'Semua Menu (12)' },
    { id: 'bakery', label: 'Viennoiserie & Bakery (5)' },
    { id: 'pastry', label: 'Fine Patisserie (3)' },
    { id: 'hampers', label: 'Hampers & Gift Box (4)' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id; // Default recommended
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
            Menu & Koleksi Eksklusif
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            color: '#1C1917',
            marginBottom: '12px'
          }}>
            Katalog Patisserie & Luxury Hampers
          </h1>
          <p style={{ color: '#78716C', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto' }}>
            Setiap kreasi dipanggang segar setiap pagi dengan standar haute boulangerie Prancis, 100% mentega murni Normandy, dan kehangatan saffron.
          </p>
        </div>

        {/* Custom Hampers Mini Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1614 0%, #2A231F 100%)',
          borderRadius: '16px',
          padding: '20px 28px',
          color: '#FAF7F2',
          marginBottom: '36px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Gift size={20} color="#D4AF37" />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#F3E5AB', margin: 0 }}>
                Ingin Menyusun Hampers Sendiri?
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#D6D3D1', margin: '2px 0 0 0' }}>
                Kustomisasi pilihan box, isi kombinasi pastry, warna pita satin, dan tulis kartu ucapan live preview.
              </p>
            </div>
          </div>
          <button
            onClick={() => { setActiveTab('custom-hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn btn-primary"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            <span>Buka Hamper Builder</span>
            <Sparkles size={14} />
          </button>
        </div>

        {/* Search, Filter Tabs & Sort Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            background: '#FFFFFF',
            padding: '6px',
            borderRadius: '999px',
            border: '1px solid #E7DFD5',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: isActive ? 'var(--gold-gradient)' : 'transparent',
                    color: isActive ? '#141210' : '#57534E',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Actions */}
          <div style={{ display: 'flex', gap: '12px', flex: 1, justifyContent: 'flex-end', minWidth: '280px' }}>
            {/* Search Box */}
            <div style={{ position: 'relative', flex: 1, maxWidth: '280px' }}>
              <Search size={16} color="#A8A29E" style={{ position: 'absolute', top: '12px', left: '14px' }} />
              <input
                type="text"
                placeholder="Cari croissant, tart, hampers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 38px',
                  borderRadius: '999px',
                  border: '1px solid #D6CEBE',
                  fontSize: '0.85rem',
                  background: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '999px',
                  border: '1px solid #D6CEBE',
                  fontSize: '0.85rem',
                  background: '#FFFFFF',
                  color: '#1C1917',
                  cursor: 'pointer',
                  fontWeight: 500,
                  outline: 'none'
                }}
              >
                <option value="recommended">Rekomendasi</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '24px', fontSize: '0.85rem', color: '#78716C' }}>
          Menampilkan <strong>{filteredProducts.length}</strong> produk pilihan
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E7DFD5'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1C1917', marginBottom: '8px' }}>
              Tidak Menemukan Produk yang Dicari
            </h3>
            <p style={{ color: '#78716C', fontSize: '0.9rem', marginBottom: '20px' }}>
              Coba kata kunci pencarian lain atau pilih kategori Semua Menu.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="btn btn-secondary"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px'
          }}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
