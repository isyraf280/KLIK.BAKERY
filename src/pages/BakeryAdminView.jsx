import React, { useState } from 'react';
import { useBakeryStore } from '../context/BakeryStoreContext';
import { formatRupiah } from '../data/lesaffroneBakeryData';

export const BakeryAdminView = () => {
  const {
    adminSection,
    setAdminSection,
    setView,
    orders,
    updateOrderStatus,
    products,
    deleteProduct,
    addProduct,
    showToast,
  } = useBakeryStore();

  const [newProductForm, setNewProductForm] = useState({
    name: '',
    price: '',
    category: 'Viennoiserie',
    badge: 'NEW BAKE',
    desc: '',
    image: '/images/classic_butter_croissant.jpg',
  });

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      showToast('Nama dan harga wajib diisi');
      return;
    }
    const id = 'bake-' + Date.now();
    addProduct({
      id,
      name: newProductForm.name,
      price: Number(newProductForm.price),
      category: newProductForm.category,
      badge: newProductForm.badge,
      desc: newProductForm.desc || 'Roti panggang segar Le Saffrone.',
      image: newProductForm.image || '/images/classic_butter_croissant.jpg',
      rating: 5.0,
      reviews: 1,
    });
    setIsAddProductOpen(false);
    setNewProductForm({
      name: '',
      price: '',
      category: 'Viennoiserie',
      badge: 'NEW BAKE',
      desc: '',
      image: '/images/classic_butter_croissant.jpg',
    });
  };

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <div className="brand" onClick={() => setView('site')} role="button" tabIndex={0}>
            <span className="brand-mark">LS</span>
            <div className="brand-title">
              <span>Le Saffrone</span>
              <small>ADMIN BOULANGERIE</small>
            </div>
          </div>
        </div>

        <div className="dash-label">NAVIGASI DAPUR</div>
        <nav className="dash-nav">
          <button
            className={adminSection === 'overview' ? 'active' : ''}
            onClick={() => setAdminSection('overview')}
          >
            <span>📊</span> Ringkasan Penjualan
          </button>
          <button
            className={adminSection === 'orders' ? 'active' : ''}
            onClick={() => setAdminSection('orders')}
          >
            <span>🧾</span> Pesanan Masuk ({orders.length})
          </button>
          <button
            className={adminSection === 'products' ? 'active' : ''}
            onClick={() => setAdminSection('products')}
          >
            <span>🥐</span> Katalog Roti ({products.length})
          </button>
        </nav>

        <div className="dash-sidebar-bottom">
          <div className="profile-mini">
            <div className="profile-avatar">CP</div>
            <div>
              <b>Chef Patissier Pierre</b>
              <small>Head Baker & Manager</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="dash-main">
        {/* Topbar */}
        <header className="dash-topbar">
          <div className="dash-breadcrumb">
            Dashboard Toko Roti Le Saffrone &nbsp;/&nbsp;{' '}
            <b>
              {adminSection === 'overview' && 'Overview Harian'}
              {adminSection === 'orders' && 'Daftar Pesanan Roti'}
              {adminSection === 'products' && 'Manajemen Menu Roti'}
            </b>
          </div>

          <div className="dash-top-actions">
            {/* Demo Switch */}
            <div className="demo-switch">
              <span>PREVIEW</span>
              <button onClick={() => setView('site')}>Website</button>
              <button className="active">Admin</button>
              <button onClick={() => setView('user')}>User</button>
            </div>

            <button className="btn outline small" onClick={() => setView('site')}>
              Ke Toko ↗
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="dash-main-content">
          {/* SECTION: OVERVIEW */}
          {adminSection === 'overview' && (
            <div>
              <div className="dash-heading">
                <div>
                  <h1>Ringkasan Dapur & Penjualan Hari Ini</h1>
                  <p>Laporan pemanggangan dan pesanan harian Le Saffrone.</p>
                </div>
                <button
                  className="btn lime small"
                  onClick={() => setIsAddProductOpen(true)}
                >
                  + Tambah Menu Roti Baru
                </button>
              </div>

              {/* KPI Cards */}
              <div className="kpi-grid">
                <div className="kpi">
                  <div className="kpi-top">
                    <span>PENJUALAN HARI INI</span>
                    <span className="kpi-icon">💰</span>
                  </div>
                  <strong>Rp4.250.000</strong>
                  <small className="positive">+16% dibanding kemarin</small>
                </div>
                <div className="kpi">
                  <div className="kpi-top">
                    <span>PESANAN ROTI MASUK</span>
                    <span className="kpi-icon">📦</span>
                  </div>
                  <strong>18 Pesanan</strong>
                  <small>Semua terjadwal pagi & siang</small>
                </div>
                <div className="kpi">
                  <div className="kpi-top">
                    <span>ROTI TERJUAL HARI INI</span>
                    <span className="kpi-icon">🥐</span>
                  </div>
                  <strong>142 Pcs</strong>
                  <small>Butter Croissant best seller</small>
                </div>
                <div className="kpi">
                  <div className="kpi-top">
                    <span>KEPUASAN PELANGGAN</span>
                    <span className="kpi-icon">⭐</span>
                  </div>
                  <strong>4.95 / 5.0</strong>
                  <small className="positive">98% ulasan bintang 5</small>
                </div>
              </div>

              {/* Panels: Sales Chart & Popular Categories */}
              <div className="dash-panels">
                <div className="panel">
                  <div className="panel-head">
                    <h3>Tren Penjualan Mingguan (Juta Rupiah)</h3>
                    <small>7 Hari Terakhir</small>
                  </div>
                  <div className="chart">
                    <div className="bar-col">
                      <div className="bar" style={{ height: '55%' }}></div>
                      <small>Sen</small>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '70%' }}></div>
                      <small>Sel</small>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '65%' }}></div>
                      <small>Rab</small>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '80%' }}></div>
                      <small>Kam</small>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '92%' }}></div>
                      <small>Jum</small>
                    </div>
                    <div className="bar-col">
                      <div
                        className="bar"
                        style={{ height: '100%', background: '#d7fa72' }}
                      ></div>
                      <small>Sab</small>
                    </div>
                    <div className="bar-col">
                      <div
                        className="bar"
                        style={{ height: '95%', background: '#d7fa72' }}
                      ></div>
                      <small>Min</small>
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-head">
                    <h3>Kategori Roti Terpopuler</h3>
                    <small>Berdasarkan Kuantitas Pcs</small>
                  </div>
                  <div className="traffic-list">
                    <div className="traffic-row">
                      <span>Viennoiserie & Croissant</span>
                      <b>54%</b>
                      <div className="progress">
                        <span style={{ width: '54%' }}></span>
                      </div>
                    </div>
                    <div className="traffic-row">
                      <span>Fine Pastry & Tart</span>
                      <b>24%</b>
                      <div className="progress">
                        <span style={{ width: '24%' }}></span>
                      </div>
                    </div>
                    <div className="traffic-row">
                      <span>Hampers & Gift Box</span>
                      <b>14%</b>
                      <div className="progress">
                        <span style={{ width: '14%' }}></span>
                      </div>
                    </div>
                    <div className="traffic-row">
                      <span>Artisan Sourdough</span>
                      <b>8%</b>
                      <div className="progress">
                        <span style={{ width: '8%' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="panel">
                <div className="panel-head">
                  <h3>Pesanan Roti Terbaru</h3>
                  <button
                    className="mini-btn"
                    onClick={() => setAdminSection('orders')}
                  >
                    Lihat Semua Pesanan ({orders.length}) ↗
                  </button>
                </div>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID PESANAN</th>
                        <th>PELANGGAN & TUJUAN</th>
                        <th>ITEM PESANAN</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                        <th>AKSI STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td><b>{order.id}</b></td>
                          <td>{order.customer}</td>
                          <td>{order.service}</td>
                          <td><b>{formatRupiah(order.total)}</b></td>
                          <td>
                            <span
                              className={`status ${
                                order.status === 'Completed' || order.status === 'Lunas'
                                  ? ''
                                  : 'pending'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              style={{
                                border: '1px solid #d9dbd1',
                                borderRadius: '6px',
                                padding: '4px 8px',
                                fontSize: '10px',
                                background: '#fff',
                              }}
                            >
                              <option value="Menunggu">Menunggu</option>
                              <option value="Sedang Dipanggang">Sedang Dipanggang</option>
                              <option value="Siap Kirim">Siap Kirim</option>
                              <option value="Completed">Selesai / Terkirim</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ORDERS */}
          {adminSection === 'orders' && (
            <div>
              <div className="dash-heading">
                <div>
                  <h1>Manajemen Pesanan Roti</h1>
                  <p>Pantau dan perbarui status pesanan pelanggan Le Saffrone.</p>
                </div>
              </div>

              <div className="panel">
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID PESANAN</th>
                        <th>TANGGAL & JADWAL</th>
                        <th>PELANGGAN</th>
                        <th>MENU PESANAN</th>
                        <th>TOTAL HARGA</th>
                        <th>STATUS</th>
                        <th>UBAH STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td><b>{order.id}</b></td>
                          <td>{order.date} · <small>{order.deliveryTime || 'Pagi'}</small></td>
                          <td>{order.customer}</td>
                          <td>{order.service}</td>
                          <td><b>{formatRupiah(order.total)}</b></td>
                          <td>
                            <span
                              className={`status ${
                                order.status === 'Completed' || order.status === 'Lunas'
                                  ? ''
                                  : 'pending'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              style={{
                                border: '1px solid #d9dbd1',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                fontSize: '11px',
                                background: '#fff',
                              }}
                            >
                              <option value="Menunggu">Menunggu</option>
                              <option value="Sedang Dipanggang">Sedang Dipanggang</option>
                              <option value="Siap Kirim">Siap Kirim</option>
                              <option value="Completed">Selesai / Terkirim</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRODUCTS */}
          {adminSection === 'products' && (
            <div>
              <div className="dash-heading">
                <div>
                  <h1>Katalog Menu Toko Roti ({products.length})</h1>
                  <p>Kelola menu roti harian, harga, dan ketersediaan stok.</p>
                </div>
                <button
                  className="btn lime small"
                  onClick={() => setIsAddProductOpen(true)}
                >
                  + Tambah Roti Baru
                </button>
              </div>

              <div className="dash-card-grid">
                {products.map((p) => (
                  <div className="dash-product" key={p.id}>
                    <div className="dp-art">
                      <img
                        src={p.image}
                        alt={p.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/classic_butter_croissant.jpg';
                        }}
                      />
                    </div>
                    <h4>{p.name}</h4>
                    <p>{p.category} · {formatRupiah(p.price)}</p>
                    <div className="dp-actions">
                      <span className="eyebrow">{p.badge || 'MENU'}</span>
                      <button
                        className="mini-btn danger"
                        onClick={() => deleteProduct(p.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add Product */}
      {isAddProductOpen && (
        <div
          className="overlay modal-overlay open"
          onClick={() => setIsAddProductOpen(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Tambah Menu Roti Baru</h3>
              <button
                className="close-btn"
                onClick={() => setIsAddProductOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateProduct}>
              <div className="field">
                <label>NAMA ROTI / PASTRY</label>
                <input
                  required
                  placeholder="Contoh: Pistachio Danish Escargot"
                  value={newProductForm.name}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, name: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="field">
                  <label>HARGA (IDR)</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 32000"
                    value={newProductForm.price}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, price: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <label>KATEGORI</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="Viennoiserie">Viennoiserie</option>
                    <option value="Fine Pastry">Fine Pastry</option>
                    <option value="Artisan Bread">Artisan Bread</option>
                    <option value="Hampers & Gift">Hampers & Gift</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>BADGE / STIKER</label>
                <input
                  placeholder="Contoh: CHEF SIGNATURE, BEST SELLER"
                  value={newProductForm.badge}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, badge: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>DESKRIPSI PRODUK</label>
                <textarea
                  placeholder="Deskripsi singkat kelezatan dan bahan roti..."
                  value={newProductForm.desc}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, desc: e.target.value })
                  }
                ></textarea>
              </div>
              <button type="submit" className="btn lime" style={{ width: '100%' }}>
                Simpan ke Menu ↗
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default BakeryAdminView;

