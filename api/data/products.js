
const products = [
  // =====================================
  // LAPTOP
  // =====================================
  {
    id: 1,
    name: 'MacBook Air M3',
    category: 'Laptop',
    brand: 'Apple',
    price: 18999000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    description: 'Laptop Apple dengan desain tipis dan ringan untuk produktivitas sehari-hari.'
  },
  {
    id: 2,
    name: 'ASUS ROG Zephyrus G14',
    category: 'Laptop',
    brand: 'ASUS',
    price: 24999000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600',
    description: 'Laptop ASUS dengan performa tinggi untuk gaming dan produktivitas.'
  },
  {
    id: 21,
    name: 'ASUS Vivobook 14 A1404VAP',
    category: 'Laptop',
    brand: 'ASUS',
    price: 10199000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    description: 'Laptop ASUS dengan desain ringkas untuk belajar dan bekerja.'
  },
  {
    id: 22,
    name: 'Lenovo IdeaPad Slim 3 14IRU8',
    category: 'Laptop',
    brand: 'Lenovo',
    price: 9649000,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    description: 'Laptop Lenovo untuk kebutuhan komputasi dan produktivitas sehari-hari.'
  },
  {
    id: 23,
    name: 'HP 14 EP0261TU',
    category: 'Laptop',
    brand: 'HP',
    price: 8997000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    description: 'Laptop HP untuk mendukung aktivitas belajar dan pekerjaan.'
  },

  // =====================================
  // SMARTPHONE
  // =====================================
  {
    id: 3,
    name: 'iPhone 16',
    category: 'Smartphone',
    brand: 'Apple',
    price: 14999000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',
    description: 'Smartphone Apple dengan desain modern dan performa tinggi.'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S25',
    category: 'Smartphone',
    brand: 'Samsung',
    price: 15999000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    description: 'Smartphone Samsung untuk komunikasi, hiburan, dan produktivitas.'
  },
  {
    id: 17,
    name: 'Samsung Galaxy A57 5G',
    category: 'Smartphone',
    brand: 'Samsung',
    price: 7901900,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600',
    description: 'Smartphone Samsung dengan dukungan jaringan 5G.'
  },
  {
    id: 18,
    name: 'Redmi Note 17 5G',
    category: 'Smartphone',
    brand: 'Xiaomi',
    price: 4599000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
    description: 'Smartphone Xiaomi untuk kebutuhan komunikasi dan hiburan.'
  },
  {
    id: 19,
    name: 'OPPO Reno16 F 5G',
    category: 'Smartphone',
    brand: 'OPPO',
    price: 7799000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&sat=-100',
    description: 'Smartphone OPPO dengan desain modern dan dukungan jaringan 5G.'
  },
  {
    id: 20,
    name: 'vivo Y19s GT 5G',
    category: 'Smartphone',
    brand: 'vivo',
    price: 2199000,
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600',
    description: 'Smartphone vivo untuk kebutuhan komunikasi dan hiburan.'
  },

  // =====================================
  // AUDIO
  // =====================================
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    brand: 'Sony',
    price: 4999000,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600',
    description: 'Headphone Sony untuk menikmati musik dengan nyaman.'
  },
  {
    id: 6,
    name: 'JBL Flip 6',
    category: 'Audio',
    brand: 'JBL',
    price: 1899000,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
    description: 'Speaker portabel JBL untuk menemani aktivitas sehari-hari.'
  },

  // =====================================
  // TABLET
  // =====================================
  {
    id: 7,
    name: 'iPad Air',
    category: 'Tablet',
    brand: 'Apple',
    price: 9999000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600',
    description: 'Tablet Apple untuk belajar, bekerja, dan menikmati hiburan.'
  },
  {
    id: 8,
    name: 'Samsung Galaxy Tab S10',
    category: 'Tablet',
    brand: 'Samsung',
    price: 10999000,
    image: 'https://images.unsplash.com/photo-1561154464-0df4b3ffc6b0?w=600',
    description: 'Tablet Samsung dengan layar luas untuk berbagai kebutuhan.'
  },
  {
    id: 24,
    name: 'Xiaomi Pad 8 Pro',
    category: 'Tablet',
    brand: 'Xiaomi',
    price: 9674700,
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=600',
    description: 'Tablet Xiaomi untuk produktivitas dan hiburan.'
  },
  {
    id: 25,
    name: 'Samsung Galaxy Tab S9',
    category: 'Tablet',
    brand: 'Samsung',
    price: 11999000,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600',
    description: 'Tablet Samsung untuk menunjang kegiatan belajar dan bekerja.'
  },

  // =====================================
  // SMARTWATCH
  // =====================================
  {
    id: 9,
    name: 'Apple Watch Series 10',
    category: 'Smartwatch',
    brand: 'Apple',
    price: 6999000,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
    description: 'Jam pintar Apple untuk aktivitas dan notifikasi sehari-hari.'
  },
  {
    id: 10,
    name: 'Samsung Galaxy Watch',
    category: 'Smartwatch',
    brand: 'Samsung',
    price: 3999000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    description: 'Smartwatch Samsung untuk mendukung aktivitas sehari-hari.'
  },

  // =====================================
  // ACCESSORIES
  // =====================================
  {
    id: 11,
    name: 'Logitech MX Master 3S',
    category: 'Accessories',
    brand: 'Logitech',
    price: 1599000,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600',
    description: 'Mouse wireless Logitech untuk menunjang produktivitas.'
  },
  {
    id: 12,
    name: 'Keychron K2',
    category: 'Accessories',
    brand: 'Keychron',
    price: 1299000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    description: 'Keyboard mekanikal Keychron dengan desain ringkas.'
  },

  // =====================================
  // CAMERA
  // =====================================
  {
    id: 13,
    name: 'Sony Alpha A6400',
    category: 'Camera',
    brand: 'Sony',
    price: 11999000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
    description: 'Kamera Sony untuk fotografi dan pembuatan konten.'
  },
  {
    id: 14,
    name: 'Canon EOS R50',
    category: 'Camera',
    brand: 'Canon',
    price: 10999000,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600',
    description: 'Kamera mirrorless Canon untuk fotografi sehari-hari.'
  },

  // =====================================
  // GAMING
  // =====================================
  {
    id: 15,
    name: 'PlayStation 5',
    category: 'Gaming',
    brand: 'Sony',
    price: 8999000,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600',
    description: 'Konsol PlayStation untuk menikmati berbagai permainan.'
  },
  {
    id: 16,
    name: 'Xbox Wireless Controller',
    category: 'Gaming',
    brand: 'Microsoft',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600',
    description: 'Controller Xbox untuk pengalaman bermain game.'
  }
]

module.exports = products
