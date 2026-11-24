import React from 'react';
import { useBakeryStore } from '../context/BakeryStoreContext';
import { formatRupiah } from '../data/lesaffroneBakeryData';

export const BakeryUserView = () => {
  const {
    userSection,
    setUserSection,
    setView,
    userProfile,
    orders,
    showToast,
  } = useBakeryStore();

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <div className="brand" onClick={() => setView('site')} role="button" tabIndex={0}>
            <span className="brand-mark">LS</span>
            <div className="brand-title">
              <span>Le Saffrone</span>
              <small>PRIVÉ MEMBER</small>
            </div>
          </div>
        </div>

        <div className="dash-label">AKUN SAYA</div>
        <nav className="dash-nav">
          <button
            className={userSection === 'home' ? 'active' : ''}
            onClick={() => setUserSection('home')}
          >
            <span>🏠</span> Beranda Member
          </button>
          <button
            className={userSection === 'myorders' ? 'active' : ''}
            onClick={() => setUserSection('myorders')}
          >
            <span>🥐</span> Riwayat Pesanan
          </button>
          <button
            className={userSection === 'settings' ? 'active' : ''}
            onClick={() => setUserSection('settings')}
          >
            <span>📍</span> Alamat & Pengaturan
          </button>
        </nav>

        <div className="dash-sidebar-bottom">
          <div className="profile-mini">
            <div className="profile-avatar">NP</div>
            <div>
              <b>{userProfile.name}</b>
              <small>{userProfile.tier}</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dash-main">
        {/* Topbar */}
        <header className="dash-topbar">
          <div className="dash-breadcrumb">
            Portal Pelanggan Le Saffrone &nbsp;/&nbsp;{' '}
            <b>
              {userSection === 'home' && 'Beranda Member'}
              {userSection === 'myorders' && 'Riwayat & Pelacakan Roti'}
              {userSection === 'settings' && 'Alamat & Profil'}
            </b>
          </div>

          <div className="dash-top-actions">
            <div className="demo-switch">
              <span>PREVIEW</span>
              <button onClick={() => setView('site')}>Website</button>
              <button onClick={() => setView('admin')}>Admin</button>
              <button className="active">User</button>
            </div>

            <button className="btn outline small" onClick={() => setView('site')}>
              Belanja Roti ↗
            </button>
          </div>
        </header>

        {/* User Content */}
        <div className="dash-main-content">
          {/* SECTION: HOME & OVERVIEW */}
          {userSection === 'home' && (
            <div>
              {/* Welcome Banner */}
              <div className="user-welcome">
                <div>
                  <div className="eyebrow" style={{ color: '#d7fa72' }}>
                    BIENVENUE · LE SAFFRONE PRIVÉ
                  </div>
                  <h2>Bonjour, {userProfile.name}!</h2>
                  <p>
                    Nikmati sarapan istimewa dengan aroma mentega Normandy hangat langsung di rumah Anda.
                  </p>
                </div>
                <button
                  className="btn lime"
                  onClick={() => setView('site')}
                >
                  Pesan Roti Sekarang ↗
                </button>
              </div>

              {/* Live Order Delivery Tracking */}
              <div className="panel" style={{ marginBottom: '20px' }}>
                <div className="panel-head">
                  <div>
                    <h3>Pelacakan Pengiriman Roti Pagi Ini</h3>
                    <small>Pesanan Terkini #LS-2026-108 · Jadwal Pagi (08:00 - 10:00 WITA)</small>
                  </div>
                  <span className="status">Sedang Dipanggang Chef</span>
                </div>

                {/* Timeline Step Bar */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    margin: '18px 0',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      background: '#eef5db',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid #d7fa72',
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>✓</div>
                    <b style={{ fontSize: '11px', display: 'block', marginTop: '4px' }}>
                      1. Pesanan Diterima
                    </b>
                    <small style={{ color: '#666', fontSize: '9px' }}>06:00 WITA</small>
                  </div>
                  <div
                    style={{
                      background: '#eef5db',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid #d7fa72',
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>✓</div>
                    <b style={{ fontSize: '11px', display: 'block', marginTop: '4px' }}>
                      2. Fermentasi Dingin
                    </b>
                    <small style={{ color: '#666', fontSize: '9px' }}>Suhu 4°C</small>
                  </div>
                  <div
                    style={{
                      background: '#fff9e6',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid #e5b244',
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>🥐</div>
                    <b style={{ fontSize: '11px', display: 'block', marginTop: '4px', color: '#8d6313' }}>
                      3. Sedang Dipanggang
                    </b>
                    <small style={{ color: '#8d6313', fontSize: '9px' }}>Oven Batu Paris</small>
                  </div>
                  <div
                    style={{
                      background: '#f8f8f4',
                      padding: '12px',
                      borderRadius: '12px',
                      opacity: 0.6,
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>🛵</div>
                    <b style={{ fontSize: '11px', display: 'block', marginTop: '4px' }}>
                      4. Kurir Mengantar
                    </b>
                    <small style={{ color: '#888', fontSize: '9px' }}>Estimasi 08:30</small>
                  </div>
                </div>

                <div
                  style={{
                    background: '#fbfaf6',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#555',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>
                    Item: <b>Classic Butter Croissant ×2, Pain au Chocolat ×2</b>
                  </span>
                  <span>Tujuan: {userProfile.address}</span>
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="panel">
                <div className="panel-head">
                  <h3>Riwayat Pesanan Terakhir</h3>
                  <button
                    className="mini-btn"
                    onClick={() => setUserSection('myorders')}
                  >
                    Lihat Semua
                  </button>
                </div>
                {orders.map((o) => (
                  <div className="order-card" key={o.id}>
                    <div>
                      <h4>{o.service}</h4>
                      <p>
                        {o.id} · {o.date} · {o.deliveryTime || 'Pagi'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <b style={{ display: 'block', fontSize: '13px' }}>
                        {formatRupiah(o.total)}
                      </b>
                      <span className="status" style={{ marginTop: '4px' }}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: MY ORDERS */}
          {userSection === 'myorders' && (
            <div>
              <div className="dash-heading">
                <div>
                  <h1>Riwayat Pesanan Roti Anda</h1>
                  <p>Daftar seluruh transaksi dan status pengiriman Le Saffrone.</p>
                </div>
              </div>

              <div className="panel">
                {orders.map((o) => (
                  <div className="order-card" key={o.id}>
                    <div>
                      <h4>{o.service}</h4>
                      <p>{o.id} · {o.date}</p>
                      <p style={{ marginTop: '4px', color: '#555' }}>
                        Pengiriman: {userProfile.address}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <b style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>
                        {formatRupiah(o.total)}
                      </b>
                      <span className="status">{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SETTINGS */}
          {userSection === 'settings' && (
            <div>
              <div className="dash-heading">
                <div>
                  <h1>Alamat & Pengaturan Akun</h1>
                  <p>Informasi penerima pesanan roti harian Anda.</p>
                </div>
              </div>

              <div className="settings-grid">
                <div className="setting-card">
                  <h3>Profil Member</h3>
                  <div style={{ display: 'grid', gap: '10px', fontSize: '12px' }}>
                    <div>
                      <span className="muted" style={{ display: 'block', fontSize: '10px' }}>
                        NAMA LENGKAP
                      </span>
                      <b>{userProfile.name}</b>
                    </div>
                    <div>
                      <span className="muted" style={{ display: 'block', fontSize: '10px' }}>
                        EMAIL
                      </span>
                      <b>{userProfile.email}</b>
                    </div>
                    <div>
                      <span className="muted" style={{ display: 'block', fontSize: '10px' }}>
                        STATUS MEMBER
                      </span>
                      <span className="status">{userProfile.tier}</span>
                    </div>
                  </div>
                </div>

                <div className="setting-card">
                  <h3>Alamat Pengiriman Utama</h3>
                  <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                    {userProfile.address}
                  </p>
                  <p style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
                    Catatan kurir: Pagar hitam samping pos satpam, mohon letakkan di meja teras jika belum bangun.
                  </p>
                  <button
                    className="btn outline small"
                    style={{ marginTop: '14px' }}
                    onClick={() => showToast('Form ubah alamat siap disimpan')}
                  >
                    Ubah Alamat Pengiriman ↗
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BakeryUserView;
