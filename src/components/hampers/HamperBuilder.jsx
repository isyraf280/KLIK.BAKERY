import React, { useState } from 'react';
import { HAMPER_BOX_OPTIONS, RIBBON_OPTIONS, OCCASION_PRESETS, PRODUCTS } from '../../data/products';
import { GreetingCardPreview } from './GreetingCardPreview';
import { useCart } from '../../context/CartContext';
import { Check, Plus, Minus, Gift, Calendar, Clock, Sparkles, ArrowRight, ArrowLeft, Heart, ShoppingBag } from 'lucide-react';

export const HamperBuilder = ({ onFinish }) => {
  const { addToCart, setDeliveryDate: setGlobalDeliveryDate, setDeliveryTimeSlot: setGlobalDeliveryTimeSlot } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Box Choice
  const [selectedBox, setSelectedBox] = useState(HAMPER_BOX_OPTIONS[1]); // Grand Saffron 6 by default

  // Step 2: Pastries Fillings
  // Only pastries marked as eligible
  const eligiblePastries = PRODUCTS.filter(p => p.isPastryForHamper);
  const [pastryCounts, setPastryCounts] = useState({
    1: 2, // 2x Classic Croissant
    2: 2, // 2x Almond Croissant
    4: 2  // 2x Strawberry Saffron Tart
  });

  // Step 3: Ribbon Choice
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);

  // Step 4: Greeting Card
  const [cardTo, setCardTo] = useState('Bunda Tercinta');
  const [cardFrom, setCardFrom] = useState('Keluarga Wijaya');
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASION_PRESETS[0].id);
  const [cardMessage, setCardMessage] = useState(OCCASION_PRESETS[0].sample);

  // Step 5: Delivery Date & Slot
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [deliveryDate, setDeliveryDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('10:00 - 13:00 (Pagi / Morning Slot)');
  const [recipientNotes, setRecipientNotes] = useState('');

  // Pastry slots calculation
  const totalSelectedPastries = Object.values(pastryCounts).reduce((a, b) => a + b, 0);
  const remainingSlots = selectedBox.capacity - totalSelectedPastries;

  const handlePastryChange = (productId, delta) => {
    const current = pastryCounts[productId] || 0;
    const nextVal = current + delta;
    if (nextVal < 0) return;

    if (delta > 0 && totalSelectedPastries >= selectedBox.capacity) {
      alert(`Kapasitas ${selectedBox.name} maksimal ${selectedBox.capacity} pastry. Tambah box yang lebih besar jika ingin lebih banyak!`);
      return;
    }

    setPastryCounts(prev => ({
      ...prev,
      [productId]: nextVal
    }));
  };

  const handleOccasionChange = (occId) => {
    setSelectedOccasion(occId);
    const preset = OCCASION_PRESETS.find(o => o.id === occId);
    if (preset && preset.sample) {
      setCardMessage(preset.sample);
    }
  };

  // Hamper Total Calculation
  const pastriesPrice = Object.entries(pastryCounts).reduce((sum, [pId, qty]) => {
    const p = eligiblePastries.find(item => item.id === Number(pId));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const ribbonPrice = selectedRibbon.price || 0;
  const hamperTotalPrice = selectedBox.basePrice + pastriesPrice + ribbonPrice;

  // Add custom hamper to cart
  const handleAddToCart = () => {
    if (totalSelectedPastries === 0) {
      alert('Silakan pilih minimal 1 pastry untuk isi hampers Anda.');
      return;
    }

    // Build pastries list
    const chosenPastries = Object.entries(pastryCounts)
      .filter(([_, qty]) => qty > 0)
      .map(([pId, qty]) => {
        const p = eligiblePastries.find(item => item.id === Number(pId));
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          qty,
          image: p.image
        };
      });

    const customHamperItem = {
      id: `custom-hamper-${Date.now()}`,
      name: `Custom ${selectedBox.name} (${totalSelectedPastries} Pastries)`,
      category: 'hampers',
      categoryLabel: 'Custom Bespoke Hampers',
      price: hamperTotalPrice,
      priceFormatted: `Rp ${hamperTotalPrice.toLocaleString('id-ID')}`,
      image: selectedBox.image,
      capacity: selectedBox.capacity
    };

    const customConfig = {
      box: selectedBox,
      pastries: chosenPastries,
      ribbon: selectedRibbon,
      card: {
        to: cardTo,
        from: cardFrom,
        occasion: selectedOccasion,
        message: cardMessage
      },
      deliveryDate,
      deliveryTimeSlot,
      recipientNotes
    };

    // Update global delivery date as well
    setGlobalDeliveryDate(deliveryDate);
    setGlobalDeliveryTimeSlot(deliveryTimeSlot);

    addToCart(customHamperItem, 1, customConfig);

    if (onFinish) {
      onFinish();
    }
  };

  const steps = [
    { num: 1, title: '1. Model Box' },
    { num: 2, title: '2. Pilihan Pastry' },
    { num: 3, title: '3. Pita & Aksen' },
    { num: 4, title: '4. Kartu Ucapan' },
    { num: 5, title: '5. Tanggal Kirim' },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Steps Header Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px 24px',
        marginBottom: '32px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        overflowX: 'auto'
      }}>
        {steps.map(s => {
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              style={{
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                opacity: isActive ? 1 : isDone ? 0.9 : 0.45,
                padding: '8px 12px',
                borderRadius: '8px',
                background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isActive ? 'var(--gold-gradient)' : isDone ? '#D4AF37' : '#E7DFD5',
                color: isActive || isDone ? '#141210' : '#78716C',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isDone ? <Check size={14} /> : s.num}
              </div>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#A68019' : '#1C1917'
              }}>
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Builder Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Step Form Column */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* STEP 1: CHOOSE BOX */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Langkah 1</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1917', marginBottom: '6px' }}>
                  Pilih Kemasan Eksklusif
                </h3>
                <p style={{ color: '#78716C', fontSize: '0.88rem' }}>
                  Pilih ukuran dan desain kotak hadiah yang sesuai dengan momen spesial Anda.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {HAMPER_BOX_OPTIONS.map(box => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '16px',
                        borderRadius: '14px',
                        border: isSelected ? '2px solid #D4AF37' : '1px solid #E7DFD5',
                        background: isSelected ? 'rgba(212, 175, 55, 0.05)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 4px 16px rgba(212, 175, 55, 0.18)' : 'none'
                      }}
                    >
                      <img
                        src={box.image}
                        alt={box.name}
                        style={{ width: '90px', height: '90px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#1C1917' }}>
                            {box.name}
                          </h4>
                          <span style={{ fontWeight: 700, color: '#A68019', fontSize: '0.95rem' }}>
                            +Rp {box.basePrice.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          background: '#F4EFEA',
                          color: '#8C680A',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontWeight: 700,
                          marginBottom: '8px'
                        }}>
                          Kapasitas: {box.capacity} Pastry
                        </span>
                        <p style={{ fontSize: '0.8rem', color: '#78716C', margin: 0 }}>
                          {box.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Lanjut: Pilih Pastry</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE PASTRIES */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Langkah 2</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1917' }}>
                    Pilih Isi Pastry
                  </h3>
                  <div style={{
                    background: remainingSlots === 0 ? 'rgba(21, 128, 61, 0.12)' : 'rgba(212, 175, 55, 0.15)',
                    color: remainingSlots === 0 ? '#15803D' : '#8C680A',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}>
                    Slot: {totalSelectedPastries} / {selectedBox.capacity} {remainingSlots === 0 ? '(Lengkap!)' : `(Sisa ${remainingSlots})`}
                  </div>
                </div>
                <p style={{ color: '#78716C', fontSize: '0.85rem', marginTop: '6px' }}>
                  Pilih kombinasi pastry favorit penerima. Anda dapat mencampur aneka rasa sesuai kapasitas box.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
                {eligiblePastries.map(pastry => {
                  const qty = pastryCounts[pastry.id] || 0;
                  return (
                    <div
                      key={pastry.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '10px',
                        border: qty > 0 ? '1.5px solid #D4AF37' : '1px solid #E7DFD5',
                        background: qty > 0 ? '#FFFDF9' : '#FFFFFF',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={pastry.image}
                          alt={pastry.name}
                          style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80';
                          }}
                        />
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#1C1917', lineHeight: 1.2 }}>
                            {pastry.name}
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#A68019', fontWeight: 700 }}>
                            {pastry.priceFormatted}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #D6CEBE',
                        borderRadius: '999px',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => handlePastryChange(pastry.id, -1)}
                          style={{
                            background: '#FBF9F5',
                            border: 'none',
                            padding: '6px 10px',
                            cursor: 'pointer'
                          }}
                          disabled={qty === 0}
                        >
                          <Minus size={13} color={qty === 0 ? '#C4B5A5' : '#1C1917'} />
                        </button>
                        <span style={{ padding: '0 12px', fontSize: '0.88rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => handlePastryChange(pastry.id, 1)}
                          style={{
                            background: '#FBF9F5',
                            border: 'none',
                            padding: '6px 10px',
                            cursor: 'pointer'
                          }}
                          disabled={totalSelectedPastries >= selectedBox.capacity}
                        >
                          <Plus size={13} color={totalSelectedPastries >= selectedBox.capacity ? '#C4B5A5' : '#1C1917'} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px' }}
                >
                  <ArrowLeft size={16} />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Lanjut: Pilih Pita</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: RIBBON & ACCENTS */}
          {currentStep === 3 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Langkah 3</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1917', marginBottom: '6px' }}>
                  Pita & Sentuhan Akhir
                </h3>
                <p style={{ color: '#78716C', fontSize: '0.88rem' }}>
                  Pilih nuansa warna pita satin sutra atau beludru mewah untuk melengkapi kemasan hampers Anda.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {RIBBON_OPTIONS.map(ribbon => {
                  const isSelected = selectedRibbon.id === ribbon.id;
                  return (
                    <div
                      key={ribbon.id}
                      onClick={() => setSelectedRibbon(ribbon)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #D4AF37' : '1px solid #E7DFD5',
                        background: isSelected ? 'rgba(212, 175, 55, 0.05)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: ribbon.color,
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1C1917' }}>
                          {ribbon.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#A68019' }}>
                          {ribbon.price === 0 ? 'Termasuk Gratis' : `+Rp ${ribbon.price.toLocaleString('id-ID')}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: '#FAF7F2',
                borderRadius: '12px',
                border: '1px solid #E7DFD5',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Sparkles size={20} color="#D4AF37" />
                <div style={{ fontSize: '0.82rem', color: '#57534E' }}>
                  Setiap hampers sudah dilengkapi <strong>Buket Mini Bunga Kering Lavender & Saffron</strong> serta <strong>Wax Seal Monogram Le Saffrone</strong> gratis!
                </div>
              </div>

              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px' }}
                >
                  <ArrowLeft size={16} />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Lanjut: Kartu Ucapan</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GREETING CARD */}
          {currentStep === 4 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Langkah 4</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1917', marginBottom: '6px' }}>
                  Kartu Ucapan Personalisasi
                </h3>
                <p style={{ color: '#78716C', fontSize: '0.88rem' }}>
                  Tulis pesan doa dan apresiasi hangat. Kartu akan dicetak eksklusif dengan wax seal berlogo Le Saffrone.
                </p>
              </div>

              {/* Occasion Presets */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '8px' }}>
                  Pilih Momen Acara:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {OCCASION_PRESETS.map(occ => (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => handleOccasionChange(occ.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        border: selectedOccasion === occ.id ? '1.5px solid #D4AF37' : '1px solid #D6CEBE',
                        background: selectedOccasion === occ.id ? '#141210' : '#FFFFFF',
                        color: selectedOccasion === occ.id ? '#F3E5AB' : '#44403C',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* To and From fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                    Kepada / To:
                  </label>
                  <input
                    type="text"
                    value={cardTo}
                    onChange={(e) => setCardTo(e.target.value)}
                    placeholder="Contoh: Ibu Rahayu"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D6CEBE',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                    Dari / From:
                  </label>
                  <input
                    type="text"
                    value={cardFrom}
                    onChange={(e) => setCardFrom(e.target.value)}
                    placeholder="Contoh: Dimas & Keluarga"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D6CEBE',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              {/* Card Message */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                  Isi Pesan Ucapan:
                </label>
                <textarea
                  rows={4}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Tuliskan ucapan istimewa Anda di sini..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D6CEBE',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px' }}
                >
                  <ArrowLeft size={16} />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Lanjut: Tanggal Kirim</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: DELIVERY DATE & TIME SLOT PICKER */}
          {currentStep === 5 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Langkah 5</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1917', marginBottom: '6px' }}>
                  Jadwal Pengiriman Hampers
                </h3>
                <p style={{ color: '#78716C', fontSize: '0.88rem' }}>
                  Pastry dipanggang segar di pagi hari keberangkatan. Tentukan tanggal dan slot waktu pengantaran terbaik.
                </p>
              </div>

              {/* Delivery Date Picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#1C1917', marginBottom: '8px' }}>
                  <Calendar size={16} color="#D4AF37" />
                  <span>Pilih Tanggal Pengiriman (Delivery Date Picker):</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #D4AF37',
                    fontSize: '0.95rem',
                    background: '#FFFDF9',
                    color: '#1C1917',
                    fontWeight: 600
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#8C680A', marginTop: '4px', display: 'block' }}>
                  *Dianjurkan pemesanan minimal H-1 untuk penyiapan kemasan hampers dan lamination pastry terbaik.
                </span>
              </div>

              {/* Time Slot Picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#1C1917', marginBottom: '8px' }}>
                  <Clock size={16} color="#D4AF37" />
                  <span>Slot Waktu Pengantaran:</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    '09:00 - 12:00 (Pagi / Morning Slot)',
                    '13:00 - 16:00 (Siang / Afternoon Slot)',
                    '17:00 - 20:00 (Sore / Evening Slot)'
                  ].map(slot => (
                    <label
                      key={slot}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: deliveryTimeSlot === slot ? '1.5px solid #D4AF37' : '1px solid #E7DFD5',
                        background: deliveryTimeSlot === slot ? 'rgba(212, 175, 55, 0.08)' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: deliveryTimeSlot === slot ? 600 : 400
                      }}
                    >
                      <input
                        type="radio"
                        name="timeSlot"
                        checked={deliveryTimeSlot === slot}
                        onChange={() => setDeliveryTimeSlot(slot)}
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recipient Notes */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>
                  Catatan Khusus untuk Kurir (Opsional):
                </label>
                <input
                  type="text"
                  value={recipientNotes}
                  onChange={(e) => setRecipientNotes(e.target.value)}
                  placeholder="Contoh: Titipkan di lobby concierge / hubungi security"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D6CEBE',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px' }}
                >
                  <ArrowLeft size={16} />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px', boxShadow: 'var(--shadow-gold)' }}
                >
                  <ShoppingBag size={18} />
                  <span>Tambahkan ke Keranjang</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview & Summary Sticky Column */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              color: '#1C1917',
              marginBottom: '16px',
              borderBottom: '1px solid #F4EFEA',
              paddingBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Ringkasan Hamper Anda</span>
              <Gift size={18} color="#D4AF37" />
            </h4>

            {/* Selected Box & Ribbon Info */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
              <img
                src={selectedBox.image}
                alt={selectedBox.name}
                style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1C1917' }}>
                  {selectedBox.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#78716C', marginTop: '2px' }}>
                  Pita: <strong>{selectedRibbon.name}</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#8C680A', marginTop: '2px' }}>
                  Kapasitas: {totalSelectedPastries} / {selectedBox.capacity} Pastry
                </div>
              </div>
            </div>

            {/* Pastry Slots Visualizer */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Visual Isian Kotak:
              </span>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${selectedBox.capacity > 6 ? 4 : 3}, 1fr)`,
                gap: '8px'
              }}>
                {Array.from({ length: selectedBox.capacity }).map((_, idx) => {
                  // Find which pastry fills this slot
                  let curIndex = 0;
                  let matchedPastry = null;
                  for (const [pId, qty] of Object.entries(pastryCounts)) {
                    if (idx >= curIndex && idx < curIndex + qty) {
                      matchedPastry = eligiblePastries.find(p => p.id === Number(pId));
                      break;
                    }
                    curIndex += qty;
                  }

                  return (
                    <div
                      key={idx}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '8px',
                        border: matchedPastry ? '1.5px solid #D4AF37' : '1px dashed #D6CEBE',
                        background: matchedPastry ? '#FFFDF9' : '#FAF7F2',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                      }}
                      title={matchedPastry ? matchedPastry.name : 'Slot Kosong'}
                    >
                      {matchedPastry ? (
                        <img
                          src={matchedPastry.image}
                          alt={matchedPastry.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '0.68rem', color: '#A8A29E' }}>
                          Slot {idx + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Greeting Card Mini Preview */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Preview Kartu Ucapan:
              </span>
              <GreetingCardPreview
                to={cardTo}
                from={cardFrom}
                occasion={selectedOccasion}
                message={cardMessage}
              />
            </div>

            {/* Total Price & Add to Cart button */}
            <div style={{
              borderTop: '1px solid #E7DFD5',
              paddingTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#78716C' }}>
                <span>Box Kemasan & Aksesoris</span>
                <span>Rp {(selectedBox.basePrice + ribbonPrice).toLocaleString('id-ID')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#78716C' }}>
                <span>Pastry ({totalSelectedPastries} pcs)</span>
                <span>Rp {pastriesPrice.toLocaleString('id-ID')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#78716C' }}>
                <span>Kartu Ucapan + Wax Seal</span>
                <span style={{ color: '#15803D', fontWeight: 600 }}>GRATIS</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid #E7DFD5',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#1C1917'
              }}>
                <span style={{ fontFamily: 'var(--font-serif)' }}>Total Hampers:</span>
                <span style={{ color: '#A68019' }}>Rp {hamperTotalPrice.toLocaleString('id-ID')}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '12px', padding: '14px', fontSize: '0.95rem' }}
              >
                <ShoppingBag size={18} />
                <span>Tambahkan Custom Hampers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
