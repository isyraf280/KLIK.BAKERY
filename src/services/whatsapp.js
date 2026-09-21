// WhatsApp Ordering Message Helper

export const generateWhatsAppLink = ({
  orderId,
  customerInfo,
  cartItems,
  deliveryDate,
  deliveryTimeSlot,
  deliveryMethod,
  subtotal,
  discount,
  shippingCost,
  grandTotal,
  paymentMethod,
  paymentStatus = 'Pending'
}) => {
  const adminPhone = '6281234567890'; // Phone number can be configured
  
  const formatDateIndo = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch {
      return dateStr;
    }
  };

  let message = `*✨ PESANAN BARU - LE SAFFRONE PATISSERIE ✨*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Nomor Pesanan:* #${orderId}\n`;
  message += `*Status:* ${paymentStatus.toUpperCase()}\n\n`;

  message += `*👤 INFORMASI PEMESAN & PENGIRIMAN:*\n`;
  message += `• Nama: ${customerInfo.name || '-'}\n`;
  message += `• No. WhatsApp: ${customerInfo.phone || '-'}\n`;
  message += `• Metode: ${
    deliveryMethod === 'instant' ? 'Kurir Instan (GoSend/GrabExpress)' :
    deliveryMethod === 'sameday' ? 'Same-Day Courier' : 'Self Pick-up (Ambil Sendiri)'
  }\n`;
  message += `• Tanggal Pengiriman: *${formatDateIndo(deliveryDate)}*\n`;
  message += `• Jam Pengiriman: *${deliveryTimeSlot}*\n`;
  if (deliveryMethod !== 'pickup') {
    message += `• Alamat Kirim: ${customerInfo.address || '-'}\n`;
    if (customerInfo.notes) {
      message += `• Catatan Alamat: ${customerInfo.notes}\n`;
    }
  }

  message += `\n*🥐 RINCIAN ITEM PESANAN:*\n`;
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* (x${item.quantity})\n`;
    message += `   Harga: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;

    // If it is a custom hamper, list the inside details and card
    if (item.isCustomHamper && item.customConfig) {
      const { box, pastries, ribbon, card } = item.customConfig;
      message += `   └─ Box: ${box?.name || 'Custom Box'}\n`;
      message += `   └─ Pita: ${ribbon?.name || 'Standard'}\n`;
      message += `   └─ Isian Pastry:\n`;
      pastries.forEach(p => {
        message += `      • ${p.name} (x${p.qty})\n`;
      });
      if (card && (card.to || card.message)) {
        message += `   └─ 💌 Kartu Ucapan:\n`;
        message += `      To: ${card.to || '-'}\n`;
        message += `      From: ${card.from || '-'}\n`;
        message += `      Pesan: "${card.message || '-'}"\n`;
      }
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}\n`;
  if (discount > 0) {
    message += `*Diskon Promo:* -Rp ${discount.toLocaleString('id-ID')}\n`;
  }
  message += `*Ongkos Kirim:* Rp ${shippingCost.toLocaleString('id-ID')}\n`;
  message += `*TOTAL PEMBAYARAN:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n`;
  message += `*Metode Pembayaran:* ${paymentMethod || 'Simulasi Transfer / QRIS'}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Mohon konfirmasi ketersediaan slot & pesanan ini. Terima kasih! 🥐✨`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${adminPhone}?text=${encodedMessage}`;
};
