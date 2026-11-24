import React from 'react';

/**
 * Reusable Brand Logo Component for klik.bakery
 */
export const BrandLogo = ({
  onClick,
  subtext = 'BAKERY BRAND AGENCY',
  className = '',
  markSize = 33,
}) => {
  return (
    <div
      onClick={onClick}
      className={`brand ${className}`}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
      }}
    >
      <span
        className="brand-mark"
        style={{ width: `${markSize}px`, height: `${markSize}px` }}
      >
        k.
      </span>
      <span>
        klik.<small>{subtext}</small>
      </span>
    </div>
  );
};
