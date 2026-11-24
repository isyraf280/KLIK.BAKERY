// Format helpers & shared constants

/** Nomor WhatsApp admin (tanpa '+') */
export const ADMIN_PHONE = '628111191587';

/** Batas ongkos kirim */
export const SHIPPING_COST = {
  instant: 35000,
  sameday: 20000,
  pickup: 0,
  standard: 25000,
};

/**
 * Format tanggal ke locale Indonesia singkat.
 * Contoh: "Rab, 28 Okt"
 */
export const formatDateIndo = (dateStr, options = {}) => {
  if (!dateStr) return '-';
  try {
    const defaultOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateStr).toLocaleDateString('id-ID', { ...defaultOptions, ...options });
  } catch {
    return dateStr;
  }
};

/**
 * Format angka ke format Rupiah.
 * Contoh: formatRupiah(25000) → "Rp 25.000"
 */
export const formatRupiah = (amount) =>
  `Rp ${Number(amount).toLocaleString('id-ID')}`;
