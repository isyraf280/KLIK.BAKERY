import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  Package,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  LogOut,
  Calendar,
  Store,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const AdminDashboardPage = ({ setActiveTab }) => {
  const { user, logout, orders, updateOrderStatus, refreshOrders } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerInfo?.phone?.includes(searchTerm);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending_payment' || o.status === 'proses').length;
  const completedOrders = orders.filter((o) => o.status === 'paid' || o.status === 'selesai' || o.status === 'dikirim').length;

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return { label: 'Lunas (Menunggu Panggang)', bg: 'var(--color-success-bg)', color: 'var(--color-success-text)', border: 'var(--color-success-border)' };
      case 'proses':
        return { label: 'Sedang Dipanggang', bg: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', border: 'var(--color-warning-border)' };
      case 'dikirim':
        return { label: 'Dalam Pengiriman Kurir', bg: 'var(--color-info-bg)', color: 'var(--color-info-text)', border: 'var(--color-info-border)' };
      case 'selesai':
        return { label: 'Pesanan Selesai', bg: 'var(--neutral-150)', color: 'var(--neutral-700)', border: 'var(--neutral-300)' };
      case 'pending_payment':
      default:
        return { label: 'Menunggu Pembayaran', bg: 'var(--color-danger-bg)', color: 'var(--color-danger-text)', border: 'var(--color-danger-border)' };
    }
  };

  return (
    <div style={{ background: '#F8F9FA', minHeight: '90vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Admin Top Header Banner */}
        <div
          style={{
            background: '#1e2538', // Matches admin login theme
            borderRadius: '16px',
            padding: '24px 28px',
            color: '#FAF7F2',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#205067',
                border: '1.5px solid #F3E5AB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F3E5AB',
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', background: '#205067', color: '#F3E5AB', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                  Admin Portal
                </span>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Atelier Makassar</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FAF7F2', margin: '4px 0 0', lineHeight: 1.2 }}>
                Panel Pengelola Lesaffrone
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo(setActiveTab, 'home')}
              className="btn btn-secondary"
              style={{ background: '#FFFFFF', color: '#1F2937', padding: '8px 16px', fontSize: '0.84rem' }}
            >
              <Store size={15} />
              <span>Lihat Tampilan Toko</span>
            </button>

            <button
              onClick={() => {
                logout();
                setActiveTab('login');
              }}
              style={{
                background: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <LogOut size={15} />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>

        {/* 4 Statistics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '20px',
            marginBottom: '36px',
          }}
        >
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.82rem', marginBottom: '8px' }}>
              <span>Total Omzet Penjualan</span>
              <DollarSign size={18} color="#D4AF37" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#15803D', marginTop: '4px', fontWeight: 600 }}>
              ✓ Tercatat dari transaksi toko
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.82rem', marginBottom: '8px' }}>
              <span>Total Pesanan Masuk</span>
              <ShoppingBag size={18} color="#205067" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>
              {orders.length} Pesanan
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '4px' }}>
              Diperbarui secara real-time
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.82rem', marginBottom: '8px' }}>
              <span>Perlu Diproses / Panggang</span>
              <Clock size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D97706' }}>
              {pendingOrders} Pesanan
            </div>
            <div style={{ fontSize: '0.72rem', color: '#B45309', marginTop: '4px', fontWeight: 600 }}>
              Prioritas persiapan chef
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.82rem', marginBottom: '8px' }}>
              <span>Selesai &amp; Dikirim</span>
              <CheckCircle size={18} color="#15803D" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803D' }}>
              {completedOrders} Pesanan
            </div>
            <div style={{ fontSize: '0.72rem', color: '#15803D', marginTop: '4px', fontWeight: 600 }}>
              Terkirim ke pelanggan
            </div>
          </div>
        </div>

        {/* Orders Table Container */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Table Header & Controls */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#111827', margin: 0 }}>
                Daftar Pesanan Masuk (Order Fulfillment)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
                Perbarui status pesanan dan hubungi pemesan via WhatsApp Concierge.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* Search input */}
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                <input
                  type="text"
                  placeholder="Cari ID / Nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    paddingLeft: '34px',
                    height: '38px',
                    fontSize: '0.82rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                  }}
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  height: '38px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  border: '1px solid #D1D5DB',
                  paddingInline: '12px',
                  cursor: 'pointer',
                }}
              >
                <option value="all">Semua Status</option>
                <option value="paid">Lunas (Paid)</option>
                <option value="proses">Sedang Dipanggang</option>
                <option value="dikirim">Dalam Pengiriman</option>
                <option value="selesai">Selesai</option>
                <option value="pending_payment">Menunggu Pembayaran</option>
              </select>

              <button
                onClick={refreshOrders}
                className="btn btn-secondary btn-sm"
                title="Muat Ulang Pesanan"
                style={{ height: '38px' }}
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Table Responsive Wrapper */}
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>KODE PESANAN</th>
                  <th>PEMESAN &amp; TUJUAN</th>
                  <th>ITEM PESANAN</th>
                  <th>JADWAL KIRIM</th>
                  <th>TOTAL HARGA</th>
                  <th>STATUS SAAT INI</th>
                  <th>AKSI STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '48px 20px', color: '#9CA3AF' }}>
                      Tidak ada data pesanan yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const badge = getStatusBadge(order.status);
                    const waChatUrl = `https://wa.me/${order.customerInfo?.phone?.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(order.customerInfo?.name || 'Pelanggan')},%20kami%20dari%20Lesaffrone%20terkait%20pesanan%20${order.orderId}.`;

                    return (
                      <tr key={order.orderId}>
                        {/* Order ID */}
                        <td style={{ fontWeight: 700, color: '#1E3D59' }}>
                          #{order.orderId}
                          <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 400 }}>
                            Metode: {order.paymentMethod || 'QRIS'}
                          </div>
                        </td>

                        {/* Customer */}
                        <td>
                          <div style={{ fontWeight: 600, color: '#111827' }}>
                            {order.customerInfo?.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#4B5563', margin: '2px 0' }}>
                            {order.customerInfo?.phone}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#6B7280', maxWidth: '200px', lineHeight: 1.3 }}>
                            {order.deliveryMethod === 'pickup' ? (
                              <span style={{ color: '#8C680A', fontWeight: 600 }}>Ambil Sendiri di Boutique</span>
                            ) : (
                              order.customerInfo?.address
                            )}
                          </div>
                        </td>

                        {/* Items */}
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {order.cartItems?.map((item, idx) => (
                              <div key={idx} style={{ fontSize: '0.8rem' }}>
                                <strong style={{ color: '#111827' }}>{item.quantity}x</strong> {item.name}
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Schedule */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#111827' }}>
                            <Calendar size={13} color="#D4AF37" />
                            <span>{order.deliveryDate}</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '2px' }}>
                            {order.deliveryTimeSlot}
                          </div>
                        </td>

                        {/* Total */}
                        <td style={{ fontWeight: 700, color: '#A68019', fontSize: '0.95rem' }}>
                          Rp {(order.grandTotal || 0).toLocaleString('id-ID')}
                        </td>

                        {/* Status Badge */}
                        <td>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: badge.bg,
                              color: badge.color,
                              border: `1px solid ${badge.border}`,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {badge.label}
                          </span>
                        </td>

                        {/* Action dropdown & WhatsApp */}
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                              style={{
                                fontSize: '0.75rem',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                cursor: 'pointer',
                                background: '#FFFFFF',
                              }}
                            >
                              <option value="pending_payment">Ubah: Belum Bayar</option>
                              <option value="paid">Ubah: Lunas</option>
                              <option value="proses">Ubah: Dipanggang</option>
                              <option value="dikirim">Ubah: Dikirim</option>
                              <option value="selesai">Ubah: Selesai</option>
                            </select>

                            <a
                              href={waChatUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.72rem',
                                color: '#15803D',
                                fontWeight: 600,
                                textDecoration: 'none',
                              }}
                            >
                              <MessageSquare size={12} />
                              <span>Chat WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
