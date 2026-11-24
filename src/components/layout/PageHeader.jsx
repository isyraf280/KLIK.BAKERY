import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

export const PageHeader = ({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlightTitle,
  description,
  breadcrumbs = [],
  actions
}) => {
  return (
    <header className="page-header-wrapper" style={{ marginBottom: '36px' }}>
      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="breadcrumb-nav" style={{ marginBottom: '16px' }}>
          <ol style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '6px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: 'var(--text-xs)',
            color: 'var(--neutral-500)',
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Home size={13} color="var(--gold-400)" />
            </li>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ChevronRight size={12} color="var(--neutral-400)" />
                  {item.onClick && !isLast ? (
                    <button
                      onClick={item.onClick}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '2px 4px',
                        color: 'var(--neutral-600)',
                        cursor: 'pointer',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        borderRadius: '4px',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-500)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--neutral-600)')}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span
                      style={{
                        color: isLast ? 'var(--neutral-900)' : 'var(--neutral-600)',
                        fontWeight: isLast ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* Main Header Content */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <div style={{ maxWidth: '720px' }}>
          {badge && (
            <div style={{ marginBottom: '10px' }}>
              <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <BadgeIcon size={12} />
                <span>{badge}</span>
              </span>
            </div>
          )}

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            lineHeight: 1.18,
            color: 'var(--neutral-900)',
            marginBottom: description ? '10px' : '0',
          }}>
            {title}{' '}
            {highlightTitle && <span className="gold-text">{highlightTitle}</span>}
          </h1>

          {description && (
            <p style={{
              color: 'var(--neutral-500)',
              fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              {description}
            </p>
          )}
        </div>

        {/* Optional Page Action Buttons */}
        {actions && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
          }}>
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};
