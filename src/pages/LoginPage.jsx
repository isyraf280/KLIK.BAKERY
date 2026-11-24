import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sun, Shield, User, ArrowLeft, CheckCircle2, AlertCircle, Key, Lock, Sparkles } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const LoginPage = ({ setActiveTab }) => {
  const { login, isAuthenticated, isAdmin, user, logout } = useAuth();

  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [username, setUsername] = useState('nadia');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMessage('');
    if (newRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('nadia');
      setPassword('password123');
    }
  };

  const handleFillDemo = (type) => {
    if (type === 'admin') {
      setRole('admin');
      setUsername('admin');
      setPassword('admin123');
    } else {
      setRole('customer');
      setUsername('nadia');
      setPassword('password123');
    }
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');
    setIsLoading(true);

    const res = await login(username, password, role);
    setIsLoading(false);

    if (res.success) {
      setSuccessNotice(`Selamat datang, ${res.user.name}!`);
      setTimeout(() => {
        navigateTo(setActiveTab, role === 'admin' ? 'admin' : 'home');
      }, 700);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 48px) 16px',
        background: '#1e2538', // Dark background matching the Django administration reference style
        color: '#1C1917',
      }}
    >
      {/* Return to website link */}
      <button
        onClick={() => navigateTo(setActiveTab, 'home')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#FAF7F2',
          opacity: 0.8,
          fontSize: '0.85rem',
          cursor: 'pointer',
          marginBottom: '20px',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
      >
        <ArrowLeft size={16} />
        <span>Kembali ke Katalog &amp; Beranda Lesaffrone</span>
      </button>

      {/* Central Login Card modeled precisely after user's reference image */}
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          background: '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Teal Header matching the screenshot: "Django administration" style */}
        <div
          style={{
            background: role === 'admin' ? '#205067' : '#1e3d59',
            color: '#F3E5AB', // Golden yellow text like in reference image
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transition: 'background 0.3s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#f9f1b5',
                letterSpacing: '0.02em',
              }}
            >
              {role === 'admin' ? 'Lesaffrone administration' : 'Lesaffrone Customer Portal'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f9f1b5' }}>
            <Sun size={20} strokeWidth={2} />
          </div>
        </div>

        {/* Role Toggle Bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #E5E7EB',
            background: '#F9FAFB',
          }}
        >
          <button
            type="button"
            onClick={() => handleRoleChange('customer')}
            style={{
              flex: 1,
              padding: '12px 14px',
              border: 'none',
              background: role === 'customer' ? '#FFFFFF' : 'transparent',
              color: role === 'customer' ? '#1E3D59' : '#6B7280',
              fontWeight: role === 'customer' ? 700 : 500,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderBottom: role === 'customer' ? '2px solid #205067' : '2px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            <User size={15} />
            <span>Login Pembeli</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            style={{
              flex: 1,
              padding: '12px 14px',
              border: 'none',
              background: role === 'admin' ? '#FFFFFF' : 'transparent',
              color: role === 'admin' ? '#205067' : '#6B7280',
              fontWeight: role === 'admin' ? 700 : 500,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderBottom: role === 'admin' ? '2px solid #205067' : '2px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            <Shield size={15} />
            <span>Login Admin</span>
          </button>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px 28px' }}>
          {errorMessage && (
            <div
              style={{
                background: '#FEE2E2',
                border: '1px solid #F87171',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: '4px',
                fontSize: '0.82rem',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successNotice && (
            <div
              style={{
                background: '#DCFCE7',
                border: '1px solid #86EFAC',
                color: '#166534',
                padding: '10px 14px',
                borderRadius: '4px',
                fontSize: '0.82rem',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{successNotice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username Input matching reference layout */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#4B5563',
                  marginBottom: '6px',
                }}
              >
                Username:
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'admin' ? 'admin' : 'username / email'}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#205067')}
                onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
              />
            </div>

            {/* Password Input matching reference layout */}
            <div style={{ marginBottom: '22px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#4B5563',
                  marginBottom: '6px',
                }}
              >
                Password:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#205067')}
                onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
              />
            </div>

            {/* Centered/Slightly right Submit Button matching the screenshot */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: role === 'admin' ? '#205067' : '#1e3d59',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 24px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: isLoading ? 'wait' : 'pointer',
                  minWidth: '100px',
                  transition: 'background 0.2s, transform 0.1s',
                  opacity: isLoading ? 0.8 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.currentTarget.style.background = '#183e50';
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.currentTarget.style.background = role === 'admin' ? '#205067' : '#1e3d59';
                }}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          {/* Quick Demo Fill Buttons for convenience */}
          <div
            style={{
              borderTop: '1px solid #F3F4F6',
              paddingTop: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '8px' }}>
              AKSES CEPAT CONTOH (DEMO CREDENTIALS):
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                style={{
                  background: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  color: '#374151',
                  fontWeight: 600,
                }}
              >
                Demo Pembeli (nadia)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                style={{
                  background: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  color: '#1E3D59',
                  fontWeight: 700,
                }}
              >
                Demo Admin (admin)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful hint for user below the box */}
      <div
        style={{
          marginTop: '20px',
          fontSize: '0.76rem',
          color: '#9CA3AF',
          textAlign: 'center',
          maxWidth: '430px',
          lineHeight: 1.5,
        }}
      >
        {role === 'admin' ? (
          <span>
            Panel Admin mengelola pesanan masuk, status pengiriman, dan katalog pastry toko.
          </span>
        ) : (
          <span>
            Login Pembeli mengaktifkan diskon member <strong>SAFFRONVIP</strong>, riwayat order, dan profil concierge pribadi.
          </span>
        )}
      </div>
    </div>
  );
};
