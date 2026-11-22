const products = [
  // =========================
  // LAPTOP
  // =========================
  {
    id: 1,
    name: "MacBook Air M3",
    category: "Laptop",
    brand: "Apple",
    price: 18999000,
    image: "https://cdnpro.eraspace.com/media/catalog/product/a/p/apple_macbook_air_13_inci_m3_2024_silver_1_2.jpg",
    images: [
      "https://cdnpro.eraspace.com/media/catalog/product/a/p/apple_macbook_air_13_inci_m3_2024_silver_1_2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2paD9AQbo3tZ7wGsYAyweLB_DQjk6BEnSor8xxQ9vlxd_X0kemdV2JOU&s=10",
      "https://cdnpro.eraspace.com/media/mageplaza/blog/post/s/p/spesifikasi_macbook_air_m3_primary_1.jpg"
    ],
    description: "Laptop Apple dengan chip M3, desain tipis, dan performa yang mendukung kebutuhan produktivitas.",
    specifications: {
      "Prosesor": "Apple M3",
      "CPU": "8-core",
      "GPU": "8-core atau 10-core",
      "Layar": "13,6 inci Liquid Retina",
      "Resolusi": "2560 x 1664 piksel",
      "RAM": "8 GB / 16 GB / 24 GB (tergantung konfigurasi)",
      "Penyimpanan": "256 GB / 512 GB / 1 TB / 2 TB SSD",
      "Kamera": "1080p FaceTime HD",
      "Konektivitas": "Wi-Fi 6E, Bluetooth 5.3",
      "Port": "MagSafe 3, 2x Thunderbolt / USB 4, jack 3,5 mm",
      "Sistem Operasi": "macOS"
    }
  },
  {
    id: 2,
    name: "ASUS ROG Zephyrus G14",
    category: "Laptop",
    brand: "ASUS",
    price: 29999000,
    image: "https://dlcdnwebimgs.asus.com/gain/E90DE227-7002-48C1-A940-B6E952D0BCCC",
    images: [
      "https://dlcdnwebimgs.asus.com/gain/E90DE227-7002-48C1-A940-B6E952D0BCCC",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4jX0maTl4yUal_MjDu6aH2CFCxxoEiY-cds1ZA95pgwh0ZgfAl3d0L9C&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXvzbT6ne6RESDVJGBgyOtZ8MI1lCCbpEo3mpRFIa1JxaOjLpU4R0SQJE&s=10"
    ],
    description: "Laptop gaming dengan desain ringkas dan performa tinggi untuk gaming maupun pekerjaan berat.",
    specifications: {
      "Prosesor": "AMD Ryzen (tergantung varian)",
      "GPU": "NVIDIA GeForce RTX (tergantung varian)",
      "Layar": "14 inci",
      "Panel": "ROG Nebula Display (tergantung varian)",
      "RAM": "Tergantung konfigurasi",
      "Penyimpanan": "SSD NVMe (kapasitas tergantung varian)",
      "Audio": "Speaker dengan dukungan Dolby Atmos",
      "Konektivitas": "Wi-Fi, Bluetooth",
      "Sistem Operasi": "Windows 11"
    }
  },
  {
    id: 3,
    name: "Lenovo IdeaPad Slim 3",
    category: "Laptop",
    brand: "Lenovo",
    price: 8999000,
    image: "https://p2-ofp.static.pub//fes/cms/2024/09/13/jmv2dc0d81jncxoluodx7ezpgq765o350215.png",
    images: [
      "https://p2-ofp.static.pub//fes/cms/2024/09/13/jmv2dc0d81jncxoluodx7ezpgq765o350215.png",
      "https://plazait.co.id/uploads/products/gallery/lenovo-ideapad-slim-3-14arp10-83k6008aid-ryzen-5-7535hs-amd-radeon-graphics-cosm-1776141211-140.jpg",
      "https://cdn.mos.cms.futurecdn.net/xYyfMxRBkMTysBNqZbaWo.jpg"
    ],
    description: "Laptop untuk kebutuhan sehari-hari, belajar, dan pekerjaan dengan desain yang praktis.",
    specifications: {
      "Prosesor": "Intel Core atau AMD Ryzen (tergantung varian)",
      "Layar": "Tersedia dalam beberapa ukuran, termasuk 14 dan 15,6 inci",
      "Resolusi": "Full HD pada varian tertentu",
      "RAM": "Tergantung konfigurasi",
      "Penyimpanan": "SSD (kapasitas tergantung varian)",
      "Grafis": "Integrated Graphics",
      "Kamera": "HD Webcam",
      "Konektivitas": "Wi-Fi, Bluetooth",
      "Port": "USB-A, USB-C, HDMI, audio jack (tergantung varian)",
      "Sistem Operasi": "Windows 11"
    }
  },
  {
    id: 4,
    name: "ASUS Vivobook 14",
    category: "Laptop",
    brand: "ASUS",
    price: 9999000,
    image: "https://dlcdnwebimgs.asus.com/gain/d7dac694-ccb7-416e-acea-0c776a878760/",
    images: [
      "https://dlcdnwebimgs.asus.com/gain/d7dac694-ccb7-416e-acea-0c776a878760/",
      "https://plazait.co.id/uploads/products/gallery/asus-vivobook-14-a1404vap-vips5155m-core-5-120u-16gb-512gb-terra-cotta-1774864519-823.webp",
      "https://plazait.co.id/uploads/products/gallery/asus-vivobook-14-a1404vap-vips5155m-core-5-120u-16gb-512gb-terra-cotta-1774864519-813.webp"
    ],
    description: "Laptop 14 inci dengan desain modern yang cocok untuk produktivitas dan aktivitas sehari-hari.",
    specifications: {
      "Prosesor": "Intel Core atau AMD Ryzen (tergantung varian)",
      "Layar": "14 inci",
      "Resolusi": "Full HD atau lebih tinggi (tergantung varian)",
      "RAM": "Tergantung konfigurasi",
      "Penyimpanan": "SSD NVMe (kapasitas tergantung varian)",
      "Grafis": "Integrated Graphics",
      "Kamera": "HD Webcam",
      "Konektivitas": "Wi-Fi, Bluetooth",
      "Port": "USB-A, USB-C, HDMI, audio jack",
      "Sistem Operasi": "Windows 11"
    }
  },
  {
    id: 5,
    name: "Lenovo Legion 7",
    category: "Laptop",
    brand: "Lenovo",
    price: 29999000,
    image: "https://product.hstatic.net/200000722513/product/legion_7_16irx9_ct1_01_092622aa0062409380291da026cd8332_1024x1024.png",
    images: [
      "https://product.hstatic.net/200000722513/product/legion_7_16irx9_ct1_01_092622aa0062409380291da026cd8332_1024x1024.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnaQjewuQhjRw6lIsyJOAByYgfKoJwN7Ry2CQ8xQXe5peKEA5JcEuIZ4&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2jChTabDxdZfeyd85KUrqDfz9ETZoYDnwxwpMyz7xpbEJXtxcL-OoZ4D&s=10"
    ],
    description: "Laptop gaming Lenovo Legion dengan performa tinggi untuk gaming dan pekerjaan yang membutuhkan kemampuan komputasi besar.",
    specifications: {
      "Prosesor": "Intel Core i9 generasi ke-14 (tergantung konfigurasi)",
      "GPU": "NVIDIA GeForce RTX (tergantung konfigurasi)",
      "Layar": "16 inci",
      "Resolusi": "2560 x 1600 piksel pada varian tertentu",
      "Refresh Rate": "Hingga 240 Hz pada varian tertentu",
      "RAM": "DDR5 (kapasitas tergantung konfigurasi)",
      "Penyimpanan": "SSD NVMe",
      "Audio": "Stereo Speaker",
      "Konektivitas": "Wi-Fi, Bluetooth",
      "Sistem Operasi": "Windows 11"
    }
  },

  // =========================
  // SMARTPHONE
  // =========================
  {
    id: 6,
    name: "iPhone 16",
    category: "Smartphone",
    brand: "Apple",
    price: 14999000,
    image: "https://www.digimap.co.id/cdn/shop/files/0788-APPMYEA3ID-A-1.jpg?v=1734067560",
    images: [
      "https://www.digimap.co.id/cdn/shop/files/0788-APPMYEA3ID-A-1.jpg?v=1734067560",
      "https://www.digimap.co.id/cdn/shop/files/0788-APPMYEC3ID-A-1.jpg?v=1734067526",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzYxw5ByRFaLzeULR6UzvOZ19BFpIDfdlPFwmfnwa6CRkZUu907X81beOc&s=10"
    ],
    description: "Smartphone Apple dengan kamera berkualitas, performa responsif, dan fitur modern.",
    specifications: {
      "Prosesor": "Apple A18",
      "Layar": "6,1 inci Super Retina XDR OLED",
      "Resolusi": "2556 x 1179 piksel",
      "Refresh Rate": "60 Hz",
      "Kamera Belakang": "48 MP Fusion + 12 MP Ultra Wide",
      "Kamera Depan": "12 MP TrueDepth",
      "Perekaman Video": "Hingga 4K Dolby Vision",
      "Penyimpanan": "128 GB / 256 GB / 512 GB",
      "Konektivitas": "5G, Wi-Fi 7, Bluetooth 5.3",
      "Port": "USB-C",
      "Ketahanan": "IP68",
      "Sistem Operasi": "iOS"
    }
  },
  {
    id: 7,
    name: "iPhone 18 Pro Max",
    category: "Smartphone",
    brand: "Apple",
    price: 24999000,
    image: "https://www.hellostore.id/cdn/shop/files/1-18ProMaxBurgundy.png?v=1791198829",
    images: [
      "https://www.hellostore.id/cdn/shop/files/1-18ProMaxBurgundy.png?v=1791198829",
      "https://i.pinimg.com/736x/77/d1/cc/77d1cc6e05b52c6bc6f37455eb395f00.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFPbagB0avX3qR04_-M7b4yzmFhrRUn7NVLCjmKQUmMq18yXxWDecIgth1&s=10"
    ],
    description: "Smartphone premium Apple dengan layar besar dan fitur unggulan.",
    specifications: {
      "Prosesor": "Apple A20 Pro",
      "Layar": "6,9 inci Super Retina XDR OLED",
      "Resolusi": "2868 x 1320 piksel",
      "Refresh Rate": "ProMotion hingga 120 Hz",
      "Kamera Belakang": "Sistem kamera Pro Fusion 48 MP",
      "Kamera Depan": "18 MP Center Stage",
      "Penyimpanan": "256 GB / 512 GB / 1 TB / 2 TB",
      "Konektivitas": "5G, Wi-Fi 7, Bluetooth 6",
      "Port": "USB-C",
      "Ketahanan": "IP68",
      "Sistem Operasi": "iOS"
    }
  },
  {
    id: 8,
    name: "Xiaomi 11T Pro",
    category: "Smartphone",
    brand: "Xiaomi",
    price: 6999000,
    image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1635414285.13045403.png",
    images: [
      "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1635414285.13045403.png",
      "https://i.pinimg.com/736x/8d/92/f5/8d92f50ae17bc5de279cde0b79ae8b98.jpg",
      "https://i.pinimg.com/236x/9c/dd/95/9cdd95b4fa66dfdf91ee9eaa38f5dd69.jpg"
    ],
    description: "Smartphone Xiaomi dengan performa bertenaga dan kemampuan pengisian daya cepat.",
    specifications: {
      "Prosesor": "Qualcomm Snapdragon 888 5G",
      "Layar": "6,67 inci AMOLED",
      "Resolusi": "2400 x 1080 piksel",
      "Refresh Rate": "120 Hz",
      "Kamera Belakang": "108 MP + 8 MP Ultra Wide + 5 MP Telemacro",
      "Kamera Depan": "16 MP",
      "RAM": "8 GB / 12 GB",
      "Penyimpanan": "128 GB / 256 GB",
      "Baterai": "5000 mAh",
      "Pengisian Daya": "120 W Xiaomi HyperCharge",
      "Konektivitas": "5G, Wi-Fi 6, Bluetooth 5.2",
      "Sistem Operasi": "MIUI berbasis Android"
    }
  },
  {
    id: 9,
    name: "Google Pixel 10 Pro",
    category: "Smartphone",
    brand: "Google",
    price: 16999000,
    image: "https://shop.maujual.com/cdn/shop/files/Jade.png?v=1768235420",
    images: [
      "https://shop.maujual.com/cdn/shop/files/Jade.png?v=1768235420",
      "https://wifihifi.com/wp-content/uploads/2025/09/google-pixel-10-pro-back-hand-angle.jpg",
      "hhttps://i.guim.co.uk/img/media/5f43bfe28f64884fb2e26c8489dc28f0d1237f27/461_0_5840_4672/master/5840.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ae625beeb6951ae6cd2c60c5c97319ca"
    ],
    description: "Smartphone Google dengan pengalaman Android dan fitur fotografi berbasis komputasi.",
    specifications: {
      "Prosesor": "Google Tensor G5",
      "Layar": "6,3 inci Super Actua LTPO OLED",
      "Resolusi": "1280 x 2856 piksel",
      "Refresh Rate": "1–120 Hz",
      "RAM": "16 GB",
      "Penyimpanan": "128 GB / 256 GB / 512 GB / 1 TB (tergantung wilayah)",
      "Kamera Belakang": "Sistem tiga kamera: utama, ultra-wide, dan telephoto",
      "Kamera Depan": "42 MP",
      "Baterai": "4870 mAh (tipikal)",
      "Konektivitas": "5G, Wi-Fi, Bluetooth",
      "Ketahanan": "IP68",
      "Sistem Operasi": "Android"
    }
  },
  {
    id: 10,
    name: "Samsung Galaxy J2 Prime",
    category: "Smartphone",
    brand: "Samsung",
    price: 1200000,
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//1153/samsung_samsung-galaxy-j2-prime-smartphone---gold--8gb--ram-1-5gb-_full02.jpg",
    images: [
      "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//1153/samsung_samsung-galaxy-j2-prime-smartphone---gold--8gb--ram-1-5gb-_full02.jpg",
      "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//1094/samsung_samsung-galaxy-j2-prime-smartphone---black--8gb--1-5gb-_full03.jpg",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk7-m9fzv36vm5177f"
    ],
    description: "Smartphone Samsung generasi lama untuk kebutuhan komunikasi dan penggunaan dasar.",
    specifications: {
      "Prosesor": "MediaTek MT6737T Quad-core",
      "Layar": "5 inci PLS TFT",
      "Resolusi": "960 x 540 piksel",
      "Kamera Belakang": "8 MP",
      "Kamera Depan": "5 MP dengan LED Flash",
      "RAM": "1,5 GB",
      "Penyimpanan": "8 GB",
      "Baterai": "2600 mAh",
      "Konektivitas": "4G LTE, Wi-Fi, Bluetooth 4.2",
      "Port": "Micro USB 2.0",
      "Sistem Operasi": "Android"
    }
  },

  // =========================
  // GADGET LAINNYA
  // =========================
  {
    id: 11,
    name: "iPad Air",
    category: "Tablet",
    brand: "Apple",
    price: 9999000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNkU63_kVlhu_JScgLBQn4pTPu9yk-7GZhtiEImxhgsg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNkU63_kVlhu_JScgLBQn4pTPu9yk-7GZhtiEImxhgsg&s=10",
      "https://cdn11.bigcommerce.com/s-ahgfi493tw/images/stencil/original/products/2306/6007/Aesthetic_Pink_-_iPad_Air_4th_Gen_Mock_Up__16022.1620541769.jpg",
      "https://www.digimap.co.id/cdn/shop/files/iPad_Air_13_M2_WiFi_Starlight_PDP_Image_Position_1b__GBEN_7153466e-f34c-4abd-bf2f-5ae19267374a.jpg?v=1721802721&width=1445"
    ],
    description: "Tablet Apple untuk belajar, bekerja, menggambar, dan menikmati konten multimedia.",
    specifications: {
      "Chip": "Apple Silicon (tergantung generasi)",
      "Layar": "Liquid Retina",
      "Ukuran Layar": "Tersedia dalam ukuran 11 inci dan 13 inci pada generasi tertentu",
      "Kamera Belakang": "12 MP",
      "Kamera Depan": "12 MP (tergantung generasi)",
      "Penyimpanan": "Tergantung generasi dan konfigurasi",
      "Konektivitas": "Wi-Fi, Bluetooth",
      "Port": "USB-C",
      "Dukungan Aksesori": "Apple Pencil dan Magic Keyboard (tergantung generasi)",
      "Sistem Operasi": "iPadOS"
    }
  },
  {
    id: 12,
    name: "PlayStation 5",
    category: "Gaming",
    brand: "Sony",
    price: 8999000,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
    images: [
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
      "https://i.pinimg.com/736x/29/37/e6/2937e6ec9a37ddce1fa106e8d42cd578.jpg",
      "https://i.pinimg.com/236x/a9/b7/7b/a9b77b8d1a93fe24a9b89436025a36c1.jpg"
    ],
    description: "Konsol permainan dari Sony dengan dukungan grafis dan performa untuk bermain game.",
    specifications: {
      "CPU": "AMD Ryzen Zen 2, 8-core",
      "GPU": "AMD RDNA 2",
      "Performa GPU": "10,3 TFLOPS",
      "Memori": "16 GB GDDR6",
      "Penyimpanan Internal": "SSD 825 GB atau 1 TB (tergantung model)",
      "Resolusi": "Mendukung hingga 4K",
      "Frame Rate": "Hingga 120 fps pada game yang mendukung",
      "Audio": "Tempest 3D AudioTech",
      "Konektivitas": "Wi-Fi, Bluetooth, Ethernet",
      "Port": "USB-A, USB-C, HDMI 2.1",
      "Media": "Blu-ray Disc pada edisi Disc"
    }
  },
  {
    id: 13,
    name: "Sony Alpha A7 IV",
    category: "Kamera",
    brand: "Sony",
    price: 34999000,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Sony_A7_IV_%28ILCE-7M4%29_-_by_Henry_S%C3%B6derlund_%2851739988735%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/Sony_A7_IV_%28ILCE-7M4%29_-_by_Henry_S%C3%B6derlund_%2851739988735%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
      "https://i.pinimg.com/736x/36/dd/0c/36dd0c3fc54e01f65483fbec4bede4c3.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCcMZG682tq1wRSVuhyq7six1hfoTKNf-ADIstJLK6A&s=10"
    ],
    description: "Kamera mirrorless full-frame untuk kebutuhan fotografi dan pembuatan video.",
    specifications: {
      "Sensor": "Full-frame Exmor R CMOS",
      "Resolusi": "33 MP",
      "Prosesor": "BIONZ XR",
      "Autofokus": "Fast Hybrid AF dengan Real-time Tracking",
      "ISO": "100–51.200 (dapat diperluas)",
      "Perekaman Video": "4K hingga 60p",
      "Stabilisasi": "5-axis In-body Image Stabilization",
      "Layar": "3 inci LCD vari-angle",
      "Jendela Bidik": "OLED Electronic Viewfinder",
      "Media Penyimpanan": "Dual Slot SD / CFexpress Type A",
      "Konektivitas": "Wi-Fi, Bluetooth",
      "Mount": "Sony E-mount"
    }
  },
  {
    id: 14,
    name: "Sony WH-1000XM5",
    category: "Audio",
    brand: "Sony",
    price: 4999000,
    image: "https://www.sony.co.id/image/86ef18640c4199cc7ce7150a5143460a?fmt=png-alpha",
    images: [
      "https://www.sony.co.id/image/86ef18640c4199cc7ce7150a5143460a?fmt=png-alpha",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7xk42g453gOG9_O0sb782VxqmwWkdr6H35yhtKGKpagLgJ21btUyhfw6q&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJtK_7VJreRbPIRlwTSL4jpR0MBt2iMossxWu7S3p0BdCzmkH1GsQtkGY&s=10"
    ],
    description: "Headphone nirkabel dengan fitur peredam kebisingan dan kualitas audio yang baik.",
    specifications: {
      "Tipe": "Wireless Over-ear Headphones",
      "Driver": "30 mm",
      "Peredam Kebisingan": "Active Noise Cancelling",
      "Konektivitas": "Bluetooth 5.2",
      "Codec": "SBC, AAC, LDAC",
      "Mikrofon": "Multiple microphones dengan noise reduction",
      "Daya Tahan Baterai": "Hingga 30 jam dengan ANC aktif",
      "Pengisian Daya": "USB-C",
      "Fitur": "Speak-to-Chat dan Adaptive Sound Control",
      "Berat": "Sekitar 250 gram"
    }
  },
  {
    id: 15,
    name: "JBL Flip 6",
    category: "Audio",
    brand: "JBL",
    price: 1799000,
    image: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw1461aed4/2_JBL_FLIP6_3_4_RIGHT_BLACK_30195_x1.png?sw=537&sfrm=png",
    images: [
      "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw1461aed4/2_JBL_FLIP6_3_4_RIGHT_BLACK_30195_x1.png?sw=537&sfrm=png",
      "https://id.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw9701e3d3/pdp/JBL_Flip_6_Lifestyle_01_904x560px.png",
      "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwf451d7ef/2_JBL_FLIP6_3_4_RIGHT_PINK_30192_x1.png?sw=537&sfrm=png"
    ],
    description: "Speaker Bluetooth portabel dengan desain ringkas untuk mendengarkan musik.",
    specifications: {
      "Tipe": "Portable Bluetooth Speaker",
      "Output Daya": "30 W RMS",
      "Driver": "45 x 80 mm woofer dan 16 mm tweeter",
      "Respons Frekuensi": "63 Hz – 20 kHz",
      "Konektivitas": "Bluetooth 5.1",
      "Ketahanan Air dan Debu": "IP67",
      "Daya Tahan Baterai": "Hingga 12 jam",
      "Pengisian Daya": "USB-C",
      "Fitur": "JBL PartyBoost",
      "Berat": "Sekitar 550 gram"
    }
  }
];

export default products;