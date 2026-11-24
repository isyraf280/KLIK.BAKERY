import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('kb_services');
      localStorage.removeItem('kb_orders');
      localStorage.removeItem('kb_cart');
      localStorage.removeItem('kb_articles');
      localStorage.removeItem('kb_user_profile');
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#f6f4ee',
            fontFamily: "'DM Sans', sans-serif",
            color: '#202321',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#d7fa72',
              display: 'grid',
              placeItems: 'center',
              fontSize: '24px',
              fontWeight: 800,
              transform: 'rotate(-7deg)',
              marginBottom: '20px',
              color: '#202321',
            }}
          >
            k.
          </div>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '24px',
              fontWeight: 800,
              margin: '0 0 10px',
            }}
          >
            Tampilan Sedang Dipulihkan
          </h2>
          <p
            style={{
              maxWidth: '480px',
              fontSize: '13px',
              color: '#737872',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}
          >
            Data lokal browser Anda sedang disesuaikan ke versi klik.bakery
            terbaru. Silakan klik tombol di bawah untuk menyegarkan tampilan.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              border: 0,
              borderRadius: '999px',
              padding: '13px 26px',
              background: '#202722',
              color: 'white',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Muat Ulang Tampilan Baru ↗
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

