// Data Katalog Produk Le Saffrone Patisserie
// 12 Menu Utama sesuai spesifikasi

export const PRODUCTS = [
  // --- BAKERY & VIENNOISERIE ---
  {
    id: 1,
    name: "Classic Butter Croissant",
    category: "bakery",
    categoryLabel: "Viennoiserie & Bakery",
    price: 25000,
    priceFormatted: "Rp 25.000",
    badge: "Signature",
    image: "/images/classic_butter_croissant.jpg",
    rating: 4.9,
    reviewsCount: 142,
    shortDesc: "Croissant klasik Prancis dengan 100% Normandy butter lamination, renyah di luar dengan honeycomb crumb lembut di dalam.",
    description: "Dibuat dengan teknik lamination tradisional Prancis menggunakan mentega AOP Normandy dan fermentasi dingin selama 24 jam. Menghasilkan tekstur luar yang ekstra renyah berkaramel serta lapisan sarang lebah (honeycomb crumb) yang harum dan lembut.",
    ingredients: ["Tepung Gandum T55 Prancis", "100% Normandy AOP Butter", "Ragi Alami", "Gula Tebu Organik", "Garam Laut Guérande"],
    allergens: ["Gluten", "Dairy"],
    servingSuggestion: "Hangatkan di oven pada suhu 175°C selama 3 menit sebelum dinikmati bersama kopi espresso atau teh hangat.",
    isPastryForHamper: true
  },
  {
    id: 2,
    name: "Almond Croissant",
    category: "bakery",
    categoryLabel: "Viennoiserie & Bakery",
    price: 32000,
    priceFormatted: "Rp 32.000",
    badge: "Best Seller",
    image: "/images/almond_croissant.jpg",
    rating: 4.95,
    reviewsCount: 198,
    shortDesc: "Croissant panggang ganda dengan isian krim almond frangipane mewah dan taburan irisan almond panggang harum.",
    description: "Croissant klasik yang dicelupkan ke dalam sirup vanilla bourbon, diisi dengan krim almond frangipane kaya rasa, lalu dipanggang ulang hingga keemasan dan ditaburi potongan almond renyah serta gula salju halus.",
    ingredients: ["Croissant Butter Le Saffrone", "Krim Frangipane Almond", "Almond California Iris", "Vanilla Bourbon Madagaskar"],
    allergens: ["Gluten", "Dairy", "Nuts"],
    servingSuggestion: "Sangat nikmat disajikan bersama Café au Lait di pagi hari.",
    isPastryForHamper: true
  },
  {
    id: 3,
    name: "Pain au Chocolat",
    category: "bakery",
    categoryLabel: "Viennoiserie & Bakery",
    price: 28000,
    priceFormatted: "Rp 28.000",
    badge: "Artisan Favorite",
    image: "/images/pain_au_chocolat.jpg",
    rating: 4.9,
    reviewsCount: 165,
    shortDesc: "Puff pastry mentega murni Prancis membungkus dua batang cokelat hitam Valrhona 55% yang meleleh lembut.",
    description: "Kombinasi sempurna antara kelembutan pastry mentega Prancis dan intensitas dua baris cokelat hitam Valrhona premium. Ketika digigit hangat, cokelat akan meleleh sempurna di lidah.",
    ingredients: ["Tepung Gandum Prancis T55", "Normandy AOP Butter", "Cokelat Valrhona Dark 55%", "Susu Segar Murni"],
    allergens: ["Gluten", "Dairy", "Soy"],
    servingSuggestion: "Nikmati hangat untuk sensasi cokelat lumer yang maksimal.",
    isPastryForHamper: true
  },
  {
    id: 4,
    name: "Strawberry Saffron Tart",
    category: "pastry",
    categoryLabel: "Fine Patisserie",
    price: 35000,
    priceFormatted: "Rp 35.000",
    badge: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 220,
    shortDesc: "Kulit sablé renyah dengan krim diplomat beraroma saffron emas murni dan stroberi segar berglaze kilap emas 24k.",
    description: "Mahakarya khas Le Saffrone. Kulit tart sablé breton yang renyah dengan isian crème diplomate lembut yang diinfus benang saffron super negin premium. Dihiasi buah stroberi segar pilihan dan sentuhan serpihan emas 24k yang memukau.",
    ingredients: ["Sablé Breton Butter Crust", "Super Negin Saffron Infused Pastry Cream", "Fresh Gariguette Strawberries", "24K Edible Gold Leaf"],
    allergens: ["Gluten", "Dairy", "Egg"],
    servingSuggestion: "Sajikan dingin langsung dari kulkas untuk menjaga kesegaran buah dan kelembutan krim.",
    isPastryForHamper: true
  },
  {
    id: 5,
    name: "Éclair au Chocolat",
    category: "pastry",
    categoryLabel: "Fine Patisserie",
    price: 30000,
    priceFormatted: "Rp 30.000",
    badge: "Classic French",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    reviewsCount: 110,
    shortDesc: "Choux pastry lembut dipanggang sempurna, diisi krim cokelat sutra dan dilapisi mirror glaze cokelat berkilau.",
    description: "Éclair otentik Paris dengan rongga choux pastry yang airy, diisi krim custard cokelat hitam Valrhona yang kental dan halus, lalu dicelup ke dalam lapisan mirror glaze cokelat mengkilat.",
    ingredients: ["Pâte à Choux", "Valrhona Dark Chocolate Ganache", "French Custard Cream", "Cocoa Mirror Glaze"],
    allergens: ["Gluten", "Dairy", "Egg"],
    servingSuggestion: "Simpan pada suhu 4-8°C. Dinikmati terbaik dalam 24 jam.",
    isPastryForHamper: true
  },
  {
    id: 6,
    name: "Mille-Feuille Vanilla",
    category: "pastry",
    categoryLabel: "Fine Patisserie",
    price: 38000,
    priceFormatted: "Rp 38.000",
    badge: "Haute Pastry",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 135,
    shortDesc: "Tiga lapis puff pastry karamel renyah diselingi mousseline vanilla bean Madagaskar beraroma manis lembut.",
    description: "Dikenal sebagai 'seribu lapis', mille-feuille kami menyajikan caramelized puff pastry yang sangat renyah dengan krim mousseline lembut berbulir biji vanilla Tahiti & Madagaskar asli, dihias pola bulu tradisional fondant glaze.",
    ingredients: ["Caramelized Inverted Puff Pastry", "Tahitian & Madagascar Vanilla Mousseline", "Fondant Glaze"],
    allergens: ["Gluten", "Dairy", "Egg"],
    servingSuggestion: "Potong perlahan menggunakan pisau bergerigi agar lapisan pastry tetap cantik.",
    isPastryForHamper: true
  },
  {
    id: 7,
    name: "Cinnamon Roll",
    category: "bakery",
    categoryLabel: "Viennoiserie & Bakery",
    price: 25000,
    priceFormatted: "Rp 25.000",
    badge: "Comfort Favorite",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 175,
    shortDesc: "Roti brioche gulung lembut dengan aroma kayu manis Ceylon harum, mentega gula palem, dan lelehan cream cheese glaze.",
    description: "Brioche adonan lembut beraroma mentega yang digulung dengan racikan kayu manis murni Ceylon, brown sugar organik, lalu dipanggang sampai harum semerbak dan disiram cream cheese frosting lembut hangat.",
    ingredients: ["Brioche Dough", "Ceylon Cinnamon Powder", "Organic Brown Sugar", "Cream Cheese Glaze"],
    allergens: ["Gluten", "Dairy", "Egg"],
    servingSuggestion: "Hangatkan di microwave selama 20 detik untuk kelembutan tekstur maksimal.",
    isPastryForHamper: true
  },
  {
    id: 8,
    name: "Artisan Sourdough Bread",
    category: "bakery",
    categoryLabel: "Viennoiserie & Bakery",
    price: 45000,
    priceFormatted: "Rp 45.000",
    badge: "Natural Ferment",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80",
    rating: 4.96,
    reviewsCount: 205,
    shortDesc: "Roti sourdough bulat artisan dengan fermentasi ragi alami 36 jam, kerak garing berkaramel, dan remah terbuka kenyal.",
    description: "Dipanggang menggunakan starter alami berumur 5 tahun dengan proses fermentasi lambat 36 jam di ruang dingin. Mengandung prebiotik alami, rendah indeks glikemik, mudah dicerna, dengan aroma fermentasi khas yang kompleks dan rasa asam gurih seimbang.",
    ingredients: ["Tepung Rye & Gandum Utuh Organik", "Air Filter", "Starter Ragi Alami Aktif (Levain)", "Garam Laut Alami"],
    allergens: ["Gluten"],
    servingSuggestion: "Panggang sebentar dan olesi mentega tawar bergaram atau nikmati bersama sup krim dan alpukat.",
    isPastryForHamper: true
  },

  // --- HAMPERS & GIFT BOX ---
  {
    id: 9,
    name: "Petite Bakery Box (Isi 4 Pastry)",
    category: "hampers",
    categoryLabel: "Hampers & Gift Box",
    price: 110000,
    priceFormatted: "Rp 110.000",
    badge: "Perfect Gift",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 88,
    shortDesc: "Kotak hadiah eksklusif berisi 4 pilihan pastry & viennoiserie favorit, diikat pita satin emas mewah.",
    description: "Bingkisan manis elegan yang cocok untuk hantaran personal, apresiasi rekan kerja, atau momen kado ulang tahun kecil. Dilengkapi kotak bertekstur matte noir dengan logo foil emas Le Saffrone dan pita satin premium.",
    includedSummary: "Pilihan 4 Pastry (Croissant / Pain au Chocolat / Tart / Roll) + Hardbox Elegan + Pita Satin + Kartu Ucapan Custom",
    boxType: "Petite Box",
    isHamper: true
  },
  {
    id: 10,
    name: "Grand Saffron Collection (Isi 6 Pastry + Premium Packaging)",
    category: "hampers",
    categoryLabel: "Hampers & Gift Box",
    price: 225000,
    priceFormatted: "Rp 225.000",
    badge: "Best Value Hampers",
    capacity: 6,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    rating: 4.97,
    reviewsCount: 160,
    shortDesc: "Koleksi 6 pastry premier dalam kotak chest eksklusif berornamen foil emas saffron dengan partisi beludru mewah.",
    description: "Koleksi paling dicintai untuk hantaran keluarga dan perayaan spesial. Menampilkan 6 macam pastry pilihan terbaik dengan kemasan hardbox mewah, partisi higienis individual, dan pita grosgrain berstempel segel lilin (wax seal).",
    includedSummary: "Pilihan 6 Pastry Premier + Luxury Rigid Box Foil Emas + Wax Seal Emblem + Custom Greeting Card",
    boxType: "Grand Saffron Chest",
    isHamper: true
  },
  {
    id: 11,
    name: "Signature Celebration Hampers (Mix Pastry + Custom Ribbon & Greeting Card)",
    category: "hampers",
    categoryLabel: "Hampers & Gift Box",
    price: 350000,
    priceFormatted: "Rp 350.000",
    badge: "Prestige Hamper",
    capacity: 8,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 144,
    shortDesc: "Hampers perayaan megah dengan 8 pastry campur, pita bordir kustom, kartu ucapan mewah, dan buket bunga kering aromatik.",
    description: "Hampers premium untuk momen teristimewa seperti pernikahan, promosi jabatan, hari raya, dan anniversary. Kotak koper beludru mewah berisi 8 pastry terbaik kami, dipadukan dengan buket bunga kering lavender & saffron, serta kartu ucapan beramplop segel lilin.",
    includedSummary: "8 Pastry Pilihan + Koper Beludru Mewah + Pita Kustom Bordir + Bunga Kering Aromatik + Kartu Ucapan Segel Lilin",
    boxType: "Royal Celebration Trunk",
    isHamper: true
  },
  {
    id: 12,
    name: "Seasonal Holiday Gift Set",
    category: "hampers",
    categoryLabel: "Hampers & Gift Box",
    price: 450000,
    priceFormatted: "Rp 450.000",
    badge: "Ultimate Luxury",
    capacity: 8,
    image: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 92,
    shortDesc: "Masterpiece hampers edisi musim liburan dengan set pastry artisanal, toples madu saffron murni, dan dekorasi festive.",
    description: "Paket kado edisi khusus paling berkesan dari Le Saffrone. Berisi kombinasi pastry artisanal favorit, 1 toples madu akasia saffron murni (100g) dengan sendok kayu zaitun, ornamen liburan elegan, pita sutra mewah, dan kartu ucapan berlapis foil emas.",
    includedSummary: "Pastry Artisanal Pilihan + 1 Jar Madu Saffron Murni + Sendok Madu Zaitun + Keranjang Rattan/Luxe Box + Pita Sutra",
    boxType: "Festive Holiday Set",
    isHamper: true
  }
];

// Opsi Pilihan Box untuk Custom Hamper Builder
export const HAMPER_BOX_OPTIONS = [
  {
    id: "petite-4",
    name: "Petite Luxe Box",
    capacity: 4,
    basePrice: 40000,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    description: "Hardbox matte hitam berlogo emas untuk 4 pilihan pastry. Kompak dan manis untuk hadiah personal."
  },
  {
    id: "grand-6",
    name: "Grand Saffron Chest",
    capacity: 6,
    basePrice: 65000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    description: "Kotak rigid mewah dengan partisi beludru untuk 6 pastry. Pilihan paling populer untuk keluarga."
  },
  {
    id: "royal-8",
    name: "Royal Celebration Trunk",
    capacity: 8,
    basePrice: 95000,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80",
    description: "Koper beludru eksklusif berkapasitas 8 pastry, lengkap dengan aksen bunga kering dan segel lilin kerajaan."
  }
];

// Pilihan Warna Pita
export const RIBBON_OPTIONS = [
  { id: "gold", name: "Saffron Gold Satin", color: "#D4AF37", price: 0 },
  { id: "burgundy", name: "Royal Burgundy Velvet", color: "#722F37", price: 5000 },
  { id: "emerald", name: "Imperial Emerald Silk", color: "#1B4D3E", price: 5000 },
  { id: "champagne", name: "Champagne Pearl Sheen", color: "#F7E7CE", price: 0 }
];

// Pilihan Momen Ucapan
export const OCCASION_PRESETS = [
  { id: "birthday", label: "Ulang Tahun / Birthday", sample: "Joyeux Anniversaire! Semoga hari istimewamu dipenuhi kebahagiaan dan kehangatan semanis pastry ini." },
  { id: "celebration", label: "Selamat & Sukses / Congratulation", sample: "Félicitations atas pencapaian luar biasamu! Semoga kesuksesan terus menyertai langkahmu." },
  { id: "eid", label: "Hari Raya Idul Fitri", sample: "Selamat Hari Raya Idul Fitri. Mohon maaf lahir dan batin. Semoga berkah dan kedamaian selalu tercurah untuk keluarga." },
  { id: "holiday", label: "Holiday / Natal & Tahun Baru", sample: "Warmest wishes for a joyous holiday season filled with love, laughter, and sweet indulgence." },
  { id: "thankyou", label: "Ungkapan Terima Kasih", sample: "A small token of our deepest appreciation. Terima kasih banyak atas dedikasi dan kebaikanmu." },
  { id: "custom", label: "Tulis Sendiri (Custom)", sample: "" }
];
