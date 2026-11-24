import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { supabase } from '../lib/supabase'

import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/api'

// Kata kunci produk, makanan, minuman, dan nama-nama motor (non-gadget)
const NON_GADGET_KEYWORDS = [
  // Kendaraan & Nama-Nama Motor
  'truk',
  'truck',
  'mobil',
  'motor',
  'sepeda',
  'bus',
  'alat berat',
  'excavator',
  'beat',
  'vario',
  'scoopy',
  'genio',
  'pcx',
  'adv 160',
  'stylo',
  'supra',
  'revo',
  'blade',
  'astrea',
  'karisma',
  'tiger',
  'megapro',
  'verza',
  'cb150r',
  'cbr',
  'crf',
  'sonic 150r',
  'nmax',
  'aerox',
  'lexi',
  'freego',
  'fazzio',
  'filano',
  'mio',
  'soul gt',
  'xeon',
  'jupiter',
  'vega',
  'byson',
  'vixion',
  'mt-15',
  'mt-25',
  'r15',
  'r25',
  'wr155',
  'xsr 155',
  'rx-king',
  'rx king',
  'f1zr',
  'satria fu',
  'gsx',
  'nex ii',
  'address',
  'burgman',
  'thunder',
  'shogun',
  'smash',
  'ninja',
  'klx',
  'd-tracker',
  'w175',
  'zx-25r',
  'zx25r',
  'vespa',
  'sprint',
  'primavera',
  'lx 125',
  'gts',
  'harley',
  'ducati',
  'ktm duke',
  // Makanan & Minuman
  'makanan',
  'minuman',
  'nasi',
  'nasi goreng',
  'nasi uduk',
  'nasi padang',
  'nasi kuning',
  'mie',
  'mie ayam',
  'mie goreng',
  'indomie',
  'bakso',
  'soto',
  'sate',
  'rendang',
  'gulai',
  'opor',
  'rawon',
  'pecel',
  'gado-gado',
  'ketoprak',
  'seblak',
  'cilok',
  'cireng',
  'cimol',
  'batagor',
  'siomay',
  'pempek',
  'martabak',
  'terang bulan',
  'ayam goreng',
  'ayam geprek',
  'ayam bakar',
  'bebek goreng',
  'ikan bakar',
  'bubur',
  'lontong',
  'kupat tahu',
  'gudeg',
  'tempe',
  'tahu',
  'kerupuk',
  'roti',
  'kue',
  'donat',
  'pizza',
  'burger',
  'kentang goreng',
  'sushi',
  'ramen',
  'dimsum',
  'kebab',
  'gorengan',
  'pisang goreng',
  'es teh',
  'es jeruk',
  'kopi',
  'boba',
  'susu',
  'jus',
  'cokelat',
  'permen',
  'keripik',
  // Peralatan Rumah Tangga Non-Gadget, Fashion & Furniture
  'kulkas',
  'mesin cuci',
  'kompor',
  'dispenser',
  'setrika',
  'baju',
  'celana',
  'sepatu',
  'tas',
  'furniture',
  'meja',
  'kursi',
  'lemari',
  'kasur'
]

// Daftar merek non-gadget (otomotif, fashion, F&B, furniture, dll.)
const NON_GADGET_BRANDS = [
  'hino',
  'fuso',
  'mitsubishi',
  'isuzu',
  'toyota',
  'honda',
  'daihatsu',
  'suzuki',
  'yamaha',
  'kawasaki',
  'nissan',
  'mazda',
  'hyundai',
  'kia',
  'wuling',
  'byd',
  'chery',
  'tesla',
  'ford',
  'chevrolet',
  'volvo',
  'scania',
  'mercedes-benz',
  'bmw',
  'audi',
  'ud trucks',
  'vespa',
  'piaggio',
  'ducati',
  'harley-davidson',
  'ktm',
  'polygon',
  'united',
  'nike',
  'adidas',
  'puma',
  'converse',
  'vans',
  'new balance',
  'reebok',
  'uniqlo',
  'zara',
  'h&m',
  'gucci',
  'louis vuitton',
  'eiger',
  'consina',
  'indofood',
  'unilever',
  'nestle',
  'danone',
  'mayora',
  'wings',
  'garudafood',
  'starbucks',
  'kopi kenangan',
  'janji jiwa',
  'kfc',
  'mcdonalds',
  'hokben',
  'richeese',
  'mixue',
  'chatime',
  'ikea',
  'informa',
  'olympic',
  'modena',
  'rinnai',
  'miyako',
  'cosmos',
  'sanken',
  'midea',
  'electrolux'
]

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesWholePhrase(normalizedText, phrase) {
  const pattern = new RegExp(`(?:^|[^a-z0-9])${escapeRegex(phrase)}(?:$|[^a-z0-9])`, 'i')
  return pattern.test(normalizedText)
}

function isNonGadgetText(text) {
  const normalized = text.trim().toLowerCase()
  if (!normalized) return false

  const hasNonGadgetKeyword = NON_GADGET_KEYWORDS.some(keyword =>
    matchesWholePhrase(normalized, keyword)
  )
  const hasNonGadgetBrand = NON_GADGET_BRANDS.some(brand =>
    matchesWholePhrase(normalized, brand)
  )

  return hasNonGadgetKeyword || hasNonGadgetBrand
}

// Kamus preset spesifikasi otomatis khusus produk gadget
const PRODUCT_PRESETS = [
  {
    keywords: ['macbook'],
    category: 'Laptop',
    brand: 'Apple',
    buildDescription: name =>
      `${name} adalah laptop Apple dengan desain tipis, layar Liquid Retina tajam, dan performa chip Apple Silicon yang efisien untuk produktivitas harian.`,
    specifications: {
      'Prosesor': 'Apple Silicon M-Series',
      'Layar': '13,6 inci Liquid Retina Display',
      'RAM': '16 GB Unified Memory',
      'Penyimpanan': '512 GB SSD',
      'Kamera': '1080p FaceTime HD',
      'Konektivitas': 'Wi-Fi 6E, Bluetooth 5.3',
      'Port': 'MagSafe 3, 2x Thunderbolt / USB 4, Audio Jack 3,5 mm',
      'Sistem Operasi': 'macOS'
    }
  },
  {
    keywords: ['asus', 'rog', 'vivobook', 'zenbook', 'tuf'],
    category: 'Laptop',
    brand: 'ASUS',
    buildDescription: name =>
      `${name} merupakan laptop ASUS yang dirancang dengan performa andal, layar jernih, dan konektivitas lengkap untuk bekerja maupun hiburan.`,
    specifications: {
      'Prosesor': 'Intel Core / AMD Ryzen',
      'GPU': 'NVIDIA GeForce RTX / Integrated Graphics',
      'Layar': '14 inci Full HD / OLED',
      'RAM': '16 GB DDR5',
      'Penyimpanan': '512 GB SSD NVMe',
      'Konektivitas': 'Wi-Fi 6E, Bluetooth 5.3',
      'Port': 'USB-C, USB-A, HDMI, Audio Jack 3,5 mm',
      'Sistem Operasi': 'Windows 11'
    }
  },
  {
    keywords: ['lenovo', 'ideapad', 'legion', 'thinkpad'],
    category: 'Laptop',
    brand: 'Lenovo',
    buildDescription: name =>
      `${name} adalah laptop Lenovo dengan konstruksi kokoh dan performa stabil untuk mendukung multitasking, pekerjaan, maupun gaming.`,
    specifications: {
      'Prosesor': 'Intel Core / AMD Ryzen',
      'Layar': '15,6 inci Full HD / WQXGA',
      'RAM': '16 GB DDR5',
      'Penyimpanan': '512 GB SSD NVMe',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.2',
      'Port': 'USB-C, USB-A, HDMI, Audio Jack 3,5 mm',
      'Sistem Operasi': 'Windows 11'
    }
  },
  {
    keywords: ['acer', 'predator', 'nitro', 'aspire', 'swift'],
    category: 'Laptop',
    brand: 'Acer',
    buildDescription: name =>
      `${name} adalah laptop Acer yang menawarkan kombinasi performa kencang dan desain modern untuk kebutuhan produktivitas maupun gaming.`,
    specifications: {
      'Prosesor': 'Intel Core / AMD Ryzen',
      'Layar': '14 inci / 15,6 inci Full HD IPS',
      'RAM': '16 GB DDR5',
      'Penyimpanan': '512 GB SSD NVMe',
      'Konektivitas': 'Wi-Fi 6E, Bluetooth 5.3',
      'Port': 'USB-C, USB-A, HDMI, Audio Jack 3,5 mm',
      'Sistem Operasi': 'Windows 11'
    }
  },
  {
    keywords: ['hp', 'pavilion', 'victus', 'omen', 'spectre', 'envy'],
    category: 'Laptop',
    brand: 'HP',
    buildDescription: name =>
      `${name} merupakan laptop HP dengan performa responsif dan desain ergonomis untuk mendukung pekerjaan harian maupun hiburan.`,
    specifications: {
      'Prosesor': 'Intel Core / AMD Ryzen',
      'Layar': '14 inci / 15,6 inci Full HD IPS',
      'RAM': '16 GB DDR4 / DDR5',
      'Penyimpanan': '512 GB SSD NVMe',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'Windows 11'
    }
  },
  {
    keywords: ['dell', 'xps', 'inspiron', 'alienware', 'latitude'],
    category: 'Laptop',
    brand: 'Dell',
    buildDescription: name =>
      `${name} adalah laptop Dell dengan kualitas rancang bangun premium dan performa stabil untuk kebutuhan profesional.`,
    specifications: {
      'Prosesor': 'Intel Core Ultra / Core i7',
      'Layar': '13,4 inci / 15,6 inci InfinityEdge',
      'RAM': '16 GB LPDDR5x',
      'Penyimpanan': '512 GB / 1 TB SSD NVMe',
      'Konektivitas': 'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4',
      'Sistem Operasi': 'Windows 11'
    }
  },
  {
    keywords: ['msi', 'katana', 'cyborg', 'stealth', 'raider'],
    category: 'Laptop',
    brand: 'MSI',
    buildDescription: name =>
      `${name} adalah laptop gaming MSI dengan sistem pendingin efisien dan grafis bertenaga untuk menjalankan game modern.`,
    specifications: {
      'Prosesor': 'Intel Core i7 / i9',
      'GPU': 'NVIDIA GeForce RTX Series',
      'Layar': '15,6 inci Full HD 144 Hz',
      'RAM': '16 GB DDR5',
      'Penyimpanan': '512 GB / 1 TB SSD NVMe',
      'Sistem Operasi': 'Windows 11'
    }
  },
  {
    keywords: ['iphone'],
    category: 'Smartphone',
    brand: 'Apple',
    buildDescription: name =>
      `${name} adalah smartphone Apple dengan layar Super Retina XDR OLED, sistem kamera beresolusi tinggi, dan performa kencang berbasis iOS.`,
    specifications: {
      'Prosesor': 'Apple A-Series Bionic / Pro',
      'Layar': '6,1 inci Super Retina XDR OLED',
      'Kamera Belakang': '48 MP Main + 12 MP Ultra Wide',
      'Kamera Depan': '12 MP TrueDepth',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, NFC',
      'Port': 'USB-C',
      'Ketahanan': 'IP68',
      'Sistem Operasi': 'iOS'
    }
  },
  {
    keywords: ['galaxy tab'],
    category: 'Tablet',
    brand: 'Samsung',
    buildDescription: name =>
      `${name} merupakan tablet Samsung berlayar luas yang mendukung aktivitas belajar, multitasking, dan hiburan dengan baterai tahan lama.`,
    specifications: {
      'Prosesor': 'Samsung Exynos / Qualcomm Snapdragon',
      'Layar': '10,9 inci 90 Hz Display',
      'RAM': '8 GB',
      'Penyimpanan': '128 GB / 256 GB (mendukung microSD)',
      'Kamera Belakang': '8 MP',
      'Kamera Depan': '12 MP Ultra Wide',
      'Baterai': '8000 mAh',
      'Sistem Operasi': 'Android dengan One UI'
    }
  },
  {
    keywords: ['galaxy watch'],
    category: 'Smartwatch',
    brand: 'Samsung',
    buildDescription: name =>
      `${name} adalah smartwatch Samsung dengan layar Super AMOLED dan sensor kesehatan lengkap untuk memantau kebugaran sepanjang hari.`,
    specifications: {
      'Prosesor': 'Samsung Exynos W-Series',
      'Layar': 'Super AMOLED dengan Sapphire Crystal',
      'Ukuran Case': '40 mm / 44 mm',
      'Sensor': 'BioActive Sensor (Detak Jantung, EKG, Komposisi Tubuh)',
      'Ketahanan': '5ATM + IP68',
      'Konektivitas': 'Wi-Fi, Bluetooth, NFC, GPS',
      'Sistem Operasi': 'Wear OS Powered by Samsung'
    }
  },
  {
    keywords: ['galaxy', 'samsung'],
    category: 'Smartphone',
    brand: 'Samsung',
    buildDescription: name =>
      `${name} adalah smartphone Samsung dengan layar Dynamic AMOLED 2X 120 Hz, kamera serbaguna, dan fitur Galaxy AI untuk aktivitas harian.`,
    specifications: {
      'Prosesor': 'Qualcomm Snapdragon / Samsung Exynos',
      'Layar': 'Dynamic AMOLED 2X 120 Hz',
      'RAM': '12 GB',
      'Penyimpanan': '256 GB',
      'Kamera Belakang': '50 MP + 10 MP Telephoto + 12 MP Ultra Wide',
      'Kamera Depan': '12 MP',
      'Baterai': '4500 mAh',
      'Ketahanan': 'IP68',
      'Sistem Operasi': 'Android dengan One UI'
    }
  },
  {
    keywords: ['xiaomi', 'redmi', 'poco'],
    category: 'Smartphone',
    brand: 'Xiaomi',
    buildDescription: name =>
      `${name} adalah smartphone Xiaomi yang menawarkan performa kencang, layar AMOLED responsif, dan teknologi pengisian daya cepat.`,
    specifications: {
      'Prosesor': 'Qualcomm Snapdragon / MediaTek Dimensity',
      'Layar': '6,67 inci AMOLED 120 Hz',
      'RAM': '12 GB',
      'Penyimpanan': '256 GB / 512 GB',
      'Kamera Belakang': '50 MP Main + Ultra Wide',
      'Kamera Depan': '16 MP',
      'Baterai': '5000 mAh',
      'Pengisian Daya': 'HyperCharge USB-C',
      'Sistem Operasi': 'Android dengan HyperOS'
    }
  },
  {
    keywords: ['oppo', 'reno', 'find x'],
    category: 'Smartphone',
    brand: 'OPPO',
    buildDescription: name =>
      `${name} merupakan smartphone OPPO dengan desain stylish, kamera portrait jernih, dan pengisian cepat SUPERVOOC.`,
    specifications: {
      'Prosesor': 'MediaTek Dimensity / Qualcomm Snapdragon',
      'Layar': '6,7 inci AMOLED 120 Hz',
      'RAM': '12 GB',
      'Penyimpanan': '256 GB',
      'Kamera Belakang': '50 MP OIS + Ultra Wide',
      'Baterai': '5000 mAh',
      'Pengisian Daya': 'SUPERVOOC USB-C',
      'Sistem Operasi': 'Android dengan ColorOS'
    }
  },
  {
    keywords: ['vivo', 'iqoo'],
    category: 'Smartphone',
    brand: 'vivo',
    buildDescription: name =>
      `${name} adalah smartphone vivo dengan keunggulan kamera malam jernih dan performa kencang untuk penggunaan sehari-hari.`,
    specifications: {
      'Prosesor': 'Qualcomm Snapdragon / MediaTek Dimensity',
      'Layar': '6,78 inci AMOLED 120 Hz',
      'RAM': '12 GB',
      'Penyimpanan': '256 GB',
      'Kamera Belakang': '50 MP ZEISS Optics',
      'Baterai': '5000 mAh',
      'Sistem Operasi': 'Android dengan Funtouch OS'
    }
  },
  {
    keywords: ['realme'],
    category: 'Smartphone',
    brand: 'realme',
    buildDescription: name =>
      `${name} adalah smartphone realme dengan performa bertenaga, layar mulus 120 Hz, dan pengisian daya cepat.`,
    specifications: {
      'Prosesor': 'Qualcomm Snapdragon / MediaTek Dimensity',
      'Layar': '6,7 inci AMOLED 120 Hz',
      'RAM': '8 GB / 12 GB',
      'Penyimpanan': '256 GB',
      'Kamera Belakang': '50 MP Sony Sensor',
      'Baterai': '5000 mAh',
      'Sistem Operasi': 'Android dengan realme UI'
    }
  },
  {
    keywords: ['pixel', 'google'],
    category: 'Smartphone',
    brand: 'Google',
    buildDescription: name =>
      `${name} merupakan smartphone Google Pixel dengan kemampuan fotografi komputasi cerdas, chip Google Tensor, dan pengalaman Android murni.`,
    specifications: {
      'Prosesor': 'Google Tensor',
      'Layar': 'LTPO OLED 120 Hz',
      'RAM': '12 GB / 16 GB',
      'Penyimpanan': '256 GB',
      'Kamera Belakang': '50 MP Main + Ultra Wide + Telephoto',
      'Ketahanan': 'IP68',
      'Sistem Operasi': 'Android'
    }
  },
  {
    keywords: ['ipad'],
    category: 'Tablet',
    brand: 'Apple',
    buildDescription: name =>
      `${name} adalah tablet Apple dengan layar Liquid Retina tajam dan chip bertenaga untuk kebutuhan kreasi konten, catatan, maupun hiburan.`,
    specifications: {
      'Chip': 'Apple M-Series / A-Series',
      'Layar': '11 inci Liquid Retina Display',
      'Penyimpanan': '128 GB / 256 GB',
      'Kamera Belakang': '12 MP Wide',
      'Kamera Depan': '12 MP Ultra Wide Landscape',
      'Konektivitas': 'Wi-Fi 6E, Bluetooth 5.3, USB-C',
      'Sistem Operasi': 'iPadOS'
    }
  },
  {
    keywords: ['apple watch'],
    category: 'Smartwatch',
    brand: 'Apple',
    buildDescription: name =>
      `${name} merupakan smartwatch Apple yang dilengkapi pelacakan kebugaran, sensor detak jantung, serta fitur keselamatan untuk penggunaan harian.`,
    specifications: {
      'Chip': 'Apple S-Series SiP',
      'Layar': 'Retina LTPO OLED',
      'Penyimpanan': '32 GB / 64 GB',
      'Ketahanan Air': 'Tahan air hingga 50 meter (swimproof)',
      'Daya Tahan Baterai': 'Hingga 18 jam',
      'Konektivitas': 'Wi-Fi, Bluetooth 5.3, GPS',
      'Sistem Operasi': 'watchOS'
    }
  },
  {
    keywords: ['garmin', 'forerunner', 'fenix', 'venu'],
    category: 'Smartwatch',
    brand: 'Garmin',
    buildDescription: name =>
      `${name} adalah smartwatch olahraga Garmin dengan GPS presisi tinggi, metrik latihan lengkap, dan daya tahan baterai hingga berminggu-minggu.`,
    specifications: {
      'Layar': 'AMOLED / Sunlight-Visible MIP',
      'Sensor': 'GPS Multi-Band, Detak Jantung, Pulse Ox',
      'Ketahanan Air': '5ATM / 10ATM',
      'Daya Tahan Baterai': 'Hingga 14 hari',
      'Konektivitas': 'Bluetooth, ANT+, Wi-Fi'
    }
  },
  {
    keywords: ['airpods'],
    category: 'Aksesori',
    brand: 'Apple',
    buildDescription: name =>
      `${name} adalah earbuds nirkabel Apple dengan fitur Active Noise Cancellation, kualitas audio jernih, dan koneksi instan ke ekosistem Apple.`,
    specifications: {
      'Tipe': 'True Wireless Earbuds (In-ear)',
      'Chip': 'Apple H2',
      'Peredam Kebisingan': 'Active Noise Cancellation & Adaptive Transparency',
      'Ketahanan': 'IP54',
      'Daya Tahan Baterai': 'Hingga 6 jam (30 jam dengan casing)',
      'Konektivitas': 'Bluetooth 5.3'
    }
  },
  {
    keywords: ['logitech', 'mx master', 'mx keys', 'g pro'],
    category: 'Aksesori',
    brand: 'Logitech',
    buildDescription: name =>
      `${name} adalah periferal komputer Logitech dengan desain ergonomis, presisi tinggi, dan konektivitas multi-perangkat.`,
    specifications: {
      'Tipe': 'Periferal Komputer Nirkabel',
      'Konektivitas': 'Bluetooth Low Energy & Logi Bolt USB Receiver',
      'Kompatibilitas': 'Windows, macOS, iPadOS, Linux',
      'Pengisian Daya': 'USB-C Fast Charging',
      'Daya Tahan Baterai': 'Hingga 70 hari'
    }
  },
  {
    keywords: ['anker', 'powerbank', 'gan charger'],
    category: 'Aksesori',
    brand: 'Anker',
    buildDescription: name =>
      `${name} adalah aksesori pengisian daya Anker dengan teknologi GaN dan proteksi suhu cerdas untuk pengisian cepat dan aman.`,
    specifications: {
      'Tipe': 'Fast Charger / Power Bank',
      'Output Daya': 'Hingga 65W / 100W Power Delivery',
      'Port': 'USB-C & USB-A',
      'Fitur Keamanan': 'ActiveShield Temperature Monitoring'
    }
  },
  {
    keywords: ['sony alpha', 'canon', 'nikon', 'fujifilm', 'lumix', 'dji'],
    category: 'Kamera',
    brand: 'Sony',
    buildDescription: name =>
      `${name} adalah kamera digital beresolusi tinggi dengan sistem autofokus cepat dan perekaman video 4K untuk kebutuhan fotografi maupun videografi.`,
    specifications: {
      'Sensor': 'Full-Frame / APS-C CMOS',
      'Resolusi': '33 MP',
      'Autofokus': 'Fast Hybrid AF',
      'ISO': '100–51.200',
      'Perekaman Video': '4K 60fps 10-bit',
      'Layar': '3 inci Vari-angle Touchscreen LCD',
      'Konektivitas': 'Wi-Fi, Bluetooth, USB-C, HDMI'
    }
  },
  {
    keywords: ['playstation', 'ps5', 'xbox', 'nintendo', 'switch', 'steam deck'],
    category: 'Gaming',
    brand: 'Sony',
    buildDescription: name =>
      `${name} adalah konsol gaming generasi modern dengan penyimpanan SSD berkecepatan tinggi dan dukungan grafis tajam untuk pengalaman bermain imersif.`,
    specifications: {
      'CPU': 'AMD Ryzen Zen 2 8-Core',
      'GPU': 'AMD Radeon RDNA 2 Ray Tracing',
      'Memori': '16 GB GDDR6',
      'Penyimpanan Internal': '825 GB / 1 TB Custom SSD',
      'Resolusi': 'Hingga 4K 120Hz',
      'Audio': 'Tempest 3D AudioTech',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.1, Ethernet, HDMI 2.1'
    }
  },
  {
    keywords: ['sony', 'wh-1000', 'wf-1000'],
    category: 'Audio',
    brand: 'Sony',
    buildDescription: name =>
      `${name} adalah perangkat audio nirkabel Sony dengan teknologi peredam bising aktif dan kualitas suara detail untuk mendengarkan musik sepanjang hari.`,
    specifications: {
      'Tipe': 'Wireless Over-ear Headphones',
      'Driver': '30 mm',
      'Peredam Kebisingan': 'Active Noise Cancelling',
      'Konektivitas': 'Bluetooth 5.2 (SBC, AAC, LDAC)',
      'Daya Tahan Baterai': 'Hingga 30 jam dengan ANC aktif',
      'Pengisian Daya': 'USB-C',
      'Berat': 'Sekitar 250 gram'
    }
  },
  {
    keywords: ['jbl', 'bose', 'sennheiser', 'marshall'],
    category: 'Audio',
    brand: 'JBL',
    buildDescription: name =>
      `${name} adalah perangkat audio portabel dengan suara bertenaga, bass mendalam, dan konektivitas Bluetooth stabil untuk penggunaan harian.`,
    specifications: {
      'Tipe': 'Wireless Audio / Speaker',
      'Output Daya': '30 W RMS',
      'Konektivitas': 'Bluetooth 5.3',
      'Ketahanan': 'IP67 (Tahan air dan debu)',
      'Daya Tahan Baterai': 'Hingga 12 jam',
      'Pengisian Daya': 'USB-C'
    }
  }
]

// Contoh isian default per kategori gadget
const CATEGORY_FALLBACK_SPECS = {
  Laptop: {
    'Prosesor': 'Intel Core i7 / AMD Ryzen 7',
    'GPU': 'Integrated Graphics / Dedicated GPU',
    'Layar': '14 inci Full HD IPS',
    'Resolusi': '1920 x 1080 piksel',
    'RAM': '16 GB DDR5',
    'Penyimpanan': '512 GB SSD NVMe',
    'Konektivitas': 'Wi-Fi 6E, Bluetooth 5.3',
    'Port': 'USB-C, USB-A, HDMI, Audio Jack 3,5 mm',
    'Sistem Operasi': 'Windows 11'
  },
  Smartphone: {
    'Prosesor': 'Octa-core 5G Chipset',
    'Layar': '6,5 inci AMOLED 120 Hz',
    'Resolusi': '2400 x 1080 piksel',
    'RAM': '8 GB / 12 GB',
    'Penyimpanan': '256 GB',
    'Kamera Belakang': '50 MP + 8 MP Ultra Wide',
    'Kamera Depan': '16 MP',
    'Baterai': '5000 mAh',
    'Pengisian Daya': 'Fast Charging USB-C',
    'Sistem Operasi': 'Android'
  },
  Tablet: {
    'Prosesor': 'Octa-core Processor',
    'Layar': '11 inci IPS / OLED Display',
    'Resolusi': '2560 x 1600 piksel',
    'RAM': '8 GB',
    'Penyimpanan': '128 GB / 256 GB',
    'Kamera Belakang': '12 MP',
    'Kamera Depan': '8 MP',
    'Baterai': '8000 mAh',
    'Sistem Operasi': 'Android / iPadOS'
  },
  Audio: {
    'Tipe': 'Wireless Audio Device',
    'Driver': '30 mm Dynamic Driver',
    'Peredam Kebisingan': 'Active Noise Cancellation (ANC)',
    'Konektivitas': 'Bluetooth 5.3',
    'Daya Tahan Baterai': 'Hingga 30 jam',
    'Pengisian Daya': 'USB-C',
    'Berat': '250 gram'
  },
  Gaming: {
    'CPU': '8-Core Custom Processor',
    'GPU': 'High-Performance Graphics',
    'Memori': '16 GB GDDR6',
    'Penyimpanan Internal': '1 TB NVMe SSD',
    'Resolusi': 'Hingga 4K 120Hz',
    'Konektivitas': 'Wi-Fi 6, Bluetooth, Ethernet',
    'Port': 'HDMI 2.1, USB-C, USB-A'
  },
  Kamera: {
    'Sensor': 'CMOS Sensor',
    'Resolusi': '24,2 MP',
    'Autofokus': 'Hybrid Phase-Detection AF',
    'ISO': '100–51.200',
    'Perekaman Video': '4K 60fps',
    'Layar': '3 inci Vari-angle Touchscreen',
    'Konektivitas': 'Wi-Fi, Bluetooth, USB-C'
  },
  Smartwatch: {
    'Layar': 'AMOLED Always-On Display',
    'Ukuran Case': '44 mm',
    'Sensor Kesehatan': 'Detak Jantung, SpO2, Pelacakan Tidur',
    'Ketahanan Air': '5ATM / IP68',
    'Daya Tahan Baterai': 'Hingga 7 hari',
    'Konektivitas': 'Bluetooth 5.3, GPS'
  },
  Aksesori: {
    'Tipe': 'Aksesori Gadget',
    'Kompatibilitas': 'Universal (iOS, Android, Windows, macOS)',
    'Konektivitas': 'USB-C / Bluetooth',
    'Material': 'Polikarbonat & Aluminium',
    'Fitur': 'Desain ringkas dan tahan lama'
  }
}

function buildCategoryDescription(productName, category) {
  const displayName = productName.trim() || `Perangkat ${category}`
  const descriptions = {
    Laptop: `${displayName} adalah laptop dengan performa andal, layar jernih, dan konektivitas lengkap untuk mendukung produktivitas kerja maupun belajar.`,
    Smartphone: `${displayName} merupakan smartphone modern dengan layar responsif, kamera tajam, dan daya tahan baterai optimal untuk penggunaan sepanjang hari.`,
    Tablet: `${displayName} adalah tablet berlayar lebar yang nyaman digunakan untuk multitasking, mencatat, maupun menikmati hiburan multimedia.`,
    Audio: `${displayName} merupakan perangkat audio dengan kualitas suara jernih, koneksi stabil, dan desain ergonomis untuk penggunaan harian.`,
    Gaming: `${displayName} adalah perangkat gaming berperforma tinggi yang dirancang untuk menghadirkan grafis mulus dan pengalaman bermain yang imersif.`,
    Kamera: `${displayName} merupakan kamera digital dengan kualitas tangkapan tajam dan fitur fokus cepat untuk kebutuhan fotografi maupun video.`,
    Smartwatch: `${displayName} adalah smartwatch dengan tampilan modern serta sensor kesehatan dan olahraga lengkap untuk menemani aktivitas sehari-hari.`,
    Aksesori: `${displayName} merupakan aksesori gadget fungsional dengan desain ringkas dan kompatibilitas luas untuk melengkapi perangkat harianmu.`
  }
  return descriptions[category] || `${displayName} adalah perangkat gadget pilihan dengan fitur lengkap dan performa andal.`
}

function buildEmptyRows(category) {
  const sample = CATEGORY_FALLBACK_SPECS[category] || CATEGORY_FALLBACK_SPECS.Aksesori
  return Object.keys(sample).map(key => ({ key, value: '' }))
}

const initialForm = {
  name: '',
  category: 'Laptop',
  brand: '',
  price: '',
  image: '',
  description: ''
}

function ProductManager() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(Object.keys(CATEGORY_FALLBACK_SPECS))
  const [form, setForm] = useState(initialForm)
  const [specRows, setSpecRows] = useState(() => buildEmptyRows('Laptop'))
  const [editingId, setEditingId] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      loadInitialData()
    }
  }, [session])

  async function loadInitialData() {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories().catch(() => [])
      ])

      setProducts(productsData)

      if (Array.isArray(categoriesData) && categoriesData.length > 0) {
        setCategories(categoriesData)
        const defaultCategory = categoriesData.includes('Laptop')
          ? 'Laptop'
          : categoriesData[0]

        setForm(prev => ({
          ...prev,
          category: defaultCategory
        }))
        setSpecRows(buildEmptyRows(defaultCategory))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      setMessage('Login berhasil.')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
    setProducts([])
    setMessage('Berhasil logout.')
  }

  function resolveValidCategory(targetCategory) {
    if (categories.includes(targetCategory)) return targetCategory
    const found = categories.find(
      cat => cat.toLowerCase() === targetCategory.toLowerCase()
    )
    return found || form.category
  }

  function handleChange(event) {
    const { name, value } = event.target

    const nextForm = {
      ...form,
      [name]: value
    }

    setForm(nextForm)

    if (name === 'name' || name === 'brand') {
      if (isNonGadgetText(nextForm.name) || isNonGadgetText(nextForm.brand)) {
        setError('Peringatan: isi yang bener bang')
      } else {
        setError('')
      }
    }

    if (name === 'category') {
      const hasAnyValue = specRows.some(row => row.value.trim() !== '')
      if (!editingId || !hasAnyValue) {
        setSpecRows(buildEmptyRows(value))
      }
    }
  }

  function handleAutoFillSpecs() {
    const rawName = form.name.trim()
    const rawBrand = form.brand.trim()
    const query = rawName.toLowerCase()

    setError('')
    setMessage('')

    if (!rawName) {
      setError('Peringatan: Nama Produk belum diisi. Silakan ketik nama gadget terlebih dahulu.')
      return
    }

    // 0. Tolak jika nama produk atau merek bukan termasuk gadget
    if (isNonGadgetText(rawName) || isNonGadgetText(rawBrand)) {
      setError('Gagal mengisi otomatis: yang bener aja mas')
      return
    }

    // 1. Cek kecocokan dengan produk gadget yang sudah ada di database
    const existingMatch = products.find(
      item =>
        item.specifications &&
        Object.keys(item.specifications).length > 0 &&
        (item.name.toLowerCase().includes(query) ||
          query.includes(item.name.toLowerCase()))
    )

    if (existingMatch) {
      const matchedCategory = resolveValidCategory(existingMatch.category)
      const entries = Object.entries(existingMatch.specifications)
      setSpecRows(
        entries.map(([key, value]) => ({
          key,
          value: String(value ?? '')
        }))
      )
      setForm(prev => ({
        ...prev,
        category: matchedCategory,
        brand: existingMatch.brand || prev.brand,
        description:
          existingMatch.description ||
          buildCategoryDescription(rawName, matchedCategory)
      }))
      setMessage(
        `Kategori (${matchedCategory}), merek (${existingMatch.brand}), deskripsi, dan spesifikasi otomatis disesuaikan dari referensi "${existingMatch.name}".`
      )
      return
    }

    // 2. Cek kecocokan dengan kamus preset gadget
    const presetMatch = PRODUCT_PRESETS.find(preset =>
      preset.keywords.some(keyword => query.includes(keyword))
    )

    if (presetMatch) {
      const matchedCategory = resolveValidCategory(presetMatch.category)
      const entries = Object.entries(presetMatch.specifications)
      setSpecRows(
        entries.map(([key, value]) => ({
          key,
          value: String(value ?? '')
        }))
      )
      setForm(prev => ({
        ...prev,
        category: matchedCategory,
        brand: presetMatch.brand || prev.brand,
        description: presetMatch.buildDescription(rawName)
      }))
      setMessage(
        `Kategori (${matchedCategory}), merek (${presetMatch.brand}), deskripsi, dan spesifikasi otomatis disesuaikan! Silakan edit jika perlu.`
      )
      return
    }

    // 3. Fallback: isi contoh spesifikasi & deskripsi lengkap sesuai kategori gadget yang dipilih
    const fallbackSpecs =
      CATEGORY_FALLBACK_SPECS[form.category] || CATEGORY_FALLBACK_SPECS.Aksesori

    setSpecRows(
      Object.entries(fallbackSpecs).map(([key, value]) => ({
        key,
        value
      }))
    )

    setForm(prev => ({
      ...prev,
      description: buildCategoryDescription(rawName, prev.category)
    }))

    setMessage(
      `Deskripsi dan contoh spesifikasi kategori ${form.category} berhasil diisi! Silakan sesuaikan merek gadget dan penjelasannya.`
    )
  }

  function handleSpecChange(index, field, value) {
    setSpecRows(previous =>
      previous.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    )
  }

  function handleAddSpecRow() {
    setSpecRows(previous => [...previous, { key: '', value: '' }])
  }

  function handleRemoveSpecRow(index) {
    setSpecRows(previous => {
      const updated = previous.filter((_, i) => i !== index)
      return updated.length > 0 ? updated : [{ key: '', value: '' }]
    })
  }

  function resetForm() {
    const defaultCategory = categories[0] || 'Laptop'
    setForm({
      ...initialForm,
      category: defaultCategory
    })
    setSpecRows(buildEmptyRows(defaultCategory))
    setEditingId(null)
  }

  function handleEdit(product) {
    const productCategory = product.category || categories[0] || 'Laptop'
    setEditingId(product.id)

    setForm({
      name: product.name || '',
      category: productCategory,
      brand: product.brand || '',
      price: String(product.price ?? ''),
      image: product.image || '',
      description: product.description || ''
    })

    const entries = Object.entries(product.specifications || {})
    setSpecRows(
      entries.length > 0
        ? entries.map(([key, value]) => ({
            key,
            value: String(value ?? '')
          }))
        : buildEmptyRows(productCategory)
    )

    setMessage('')
    setError('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setMessage('')

    // 1. Cek apakah ada field wajib yang belum diisi
    const missingFields = []
    if (!form.name.trim()) missingFields.push('Nama Produk')
    if (!form.category.trim()) missingFields.push('Kategori')
    if (!form.brand.trim()) missingFields.push('Merek')
    if (form.price === '' || form.price === null || form.price === undefined) {
      missingFields.push('Harga')
    }
    if (!form.image.trim()) missingFields.push('URL Gambar')
    if (!form.description.trim()) missingFields.push('Deskripsi')

    const specifications = {}
    let hasIncompleteSpecRow = false

    for (const row of specRows) {
      const cleanKey = row.key.trim()
      const cleanValue = row.value.trim()
      if ((cleanKey && !cleanValue) || (!cleanKey && cleanValue)) {
        hasIncompleteSpecRow = true
      }
      if (cleanKey && cleanValue) {
        specifications[cleanKey] = cleanValue
      }
    }

    if (Object.keys(specifications).length === 0) {
      missingFields.push('Spesifikasi Produk (minimal 1 baris terisi lengkap)')
    }

    if (missingFields.length > 0) {
      setError(
        `Peringatan: Data belum lengkap! Harap isi kolom berikut terlebih dahulu: ${missingFields.join(', ')}.`
      )
      return
    }

    if (hasIncompleteSpecRow) {
      setError(
        'Peringatan: Ada baris spesifikasi yang nama atau penjelasannya masih kosong. Lengkapi atau hapus baris yang kosong terlebih dahulu.'
      )
      return
    }

    // 2. Tolak jika bukan produk/merek gadget
    if (isNonGadgetText(form.name) || isNonGadgetText(form.brand)) {
      setError('Peringatan: isi yang bener bang')
      return
    }

    const numericPrice = Number(form.price)
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError('Peringatan: Harga produk harus berupa angka lebih dari 0.')
      return
    }

    const productData = {
      name: form.name.trim(),
      category: form.category,
      brand: form.brand.trim(),
      price: numericPrice,
      image: form.image.trim(),
      description: form.description.trim(),
      specifications
    }

    try {
      setSaving(true)

      if (editingId) {
        await updateProduct(editingId, productData)
        setMessage('Produk berhasil diperbarui.')
      } else {
        await createProduct(productData)
        setMessage('Produk berhasil ditambahkan.')
      }

      resetForm()
      await loadInitialData()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus produk ini?'
    )

    if (!confirmed) return

    try {
      setError('')
      setMessage('')

      await deleteProduct(id)

      setProducts(previous =>
        previous.filter(product => product.id !== id)
      )

      if (editingId === id) {
        resetForm()
      }

      setMessage('Produk berhasil dihapus.')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading && !session) {
    return (
      <main className="page-container">
        <p>Memeriksa sesi login...</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="page-container">
        <Link to="/profile" className="back-link">
          ← Kembali ke Profile
        </Link>

        <div className="page-heading">
          <span>ADMIN ACCESS</span>
          <h1>Login Admin</h1>
          <p>Masuk untuk mengelola katalog GadgetHub.</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="product-manager-form"
        >
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="admin@email.com"
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Masukkan password"
            required
          />

          <button type="submit">
            Login
          </button>

          {error && <p className="gallery-error">{error}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="page-container">
      <Link to="/profile" className="back-link">
        ← Kembali ke Profile
      </Link>

      <div className="page-heading">
        <span>ADMIN DASHBOARD</span>
        <h1>Kelola Produk</h1>
        <p>
          Tambahkan, edit, dan hapus produk gadget melalui aplikasi.
        </p>
      </div>

      <div className="product-manager-toolbar">
        <span>
          Login sebagai: {session.user.email}
        </span>

        <button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <section className="product-manager-section">
        <h2>
          {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="product-manager-form"
        >
          <label>Nama Produk *</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Contoh: MacBook Air M3 atau Samsung Galaxy S25"
          />

          {error && (
            <p className="gallery-error" style={{ margin: '2px 0 6px' }}>
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleAutoFillSpecs}
            style={{
              background: '#eef2ff',
              color: '#4338ca',
              padding: '11px 16px',
              borderRadius: '10px',
              border: '1px solid #c7d2fe',
              cursor: 'pointer',
              fontWeight: 600,
              marginTop: '-2px',
              marginBottom: '6px'
            }}
          >
            Isi Spesifikasi Otomatis
          </button>

          <label>Kategori *</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>Merek *</label>

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Contoh: Apple"
          />

          <label>Harga (Rupiah) *</label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            placeholder="Contoh: 18999000"
          />

          <label>URL Gambar *</label>

          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://contoh.com/gambar.jpg"
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview produk"
              className="product-manager-preview"
              onError={event => {
                event.currentTarget.style.display = 'none'
              }}
            />
          )}

          <label>Deskripsi *</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi produk..."
            rows="4"
          />

          <label>
            Spesifikasi Produk * (Lengkapi kolom penjelasan atau hapus baris yang tidak dipakai)
          </label>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '8px'
            }}
          >
            {specRows.map((row, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.6fr auto',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <input
                  type="text"
                  value={row.key}
                  onChange={event =>
                    handleSpecChange(index, 'key', event.target.value)
                  }
                  placeholder="Nama spesifikasi"
                  style={{ background: '#f8fafc', fontWeight: 500 }}
                />

                <input
                  type="text"
                  value={row.value}
                  onChange={event =>
                    handleSpecChange(index, 'value', event.target.value)
                  }
                  placeholder={`Isi penjelasan ${row.key || 'spesifikasi'}...`}
                />

                <button
                  type="button"
                  onClick={() => handleRemoveSpecRow(index)}
                  style={{
                    background: '#fee2e2',
                    color: '#b91c1c',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Hapus
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSpecRow}
              style={{
                alignSelf: 'flex-start',
                background: '#eff6ff',
                color: '#1d4ed8',
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid #bfdbfe',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              + Tambah Baris Kustom
            </button>
          </div>

          <div className="product-manager-actions">
            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? 'Menyimpan...'
                : editingId
                  ? 'Simpan Perubahan'
                  : 'Tambah Produk'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>

        {message && (
          <p className="gallery-success">{message}</p>
        )}

        {error && (
          <p className="gallery-error">{error}</p>
        )}
      </section>

      <section className="product-manager-section">
        <h2>Daftar Produk ({products.length})</h2>

        {loading ? (
          <p>Memuat produk...</p>
        ) : products.length === 0 ? (
          <p>Belum ada produk di database.</p>
        ) : (
          <div className="product-manager-list">
            {products.map(product => (
              <div
                className="product-manager-item"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-manager-info">
                  <h3>{product.name}</h3>

                  <p>
                    {product.brand} · {product.category}
                  </p>

                  <strong>
                    Rp {Number(product.price).toLocaleString('id-ID')}
                  </strong>
                </div>

                <div className="product-manager-item-actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductManager