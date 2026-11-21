
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const products = require('./data/products')

const app = express()
const PORT = 3000

const UPLOAD_DIR = path.join(__dirname, 'uploads')
const GALLERY_FILE = path.join(__dirname, 'data', 'galleries.json')

// Membuat folder penyimpanan jika belum tersedia
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

if (!fs.existsSync(GALLERY_FILE)) {
  fs.writeFileSync(GALLERY_FILE, '{}')
}

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(UPLOAD_DIR))

// Membaca data foto tambahan
function readGalleries() {
  try {
    return JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf8'))
  } catch (error) {
    console.error('Gagal membaca galeri:', error)
    return {}
  }
}

// Menyimpan data foto tambahan
function saveGalleries(galleries) {
  fs.writeFileSync(
    GALLERY_FILE,
    JSON.stringify(galleries, null, 2)
  )
}

// Menggabungkan produk dengan foto tambahan
function getProductsWithImages() {
  const galleries = readGalleries()

  return products.map(product => {
    const galleryImages = galleries[product.id] || []
    const defaultImages = product.images || (product.image ? [product.image] : [])

    return {
      ...product,
      image: defaultImages[0] || product.image,
      galleryImages,
      images: [
        ...defaultImages,
        ...galleryImages
      ]
    }
  })
}

// Mencari produk
function findProduct(id) {
  return products.find(product => product.id === Number(id))
}

// Konfigurasi penyimpanan foto
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, UPLOAD_DIR)
  },

  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`

    callback(null, filename)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true)
    } else {
      callback(new Error('File harus berupa gambar.'))
    }
  }
})

// Halaman utama API
app.get('/', (req, res) => {
  res.json({
    message: 'GadgetHub API is running',
    status: 'success'
  })
})

// Mengambil semua produk
app.get('/api/products', (req, res) => {
  const data = getProductsWithImages()

  res.json({
    status: 'success',
    total: data.length,
    data
  })
})

// Mengambil detail produk
app.get('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id)

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    })
  }

  const galleries = readGalleries()
  const galleryImages = galleries[product.id] || []
  const defaultImages = product.images || (product.image ? [product.image] : [])

  res.json({
    status: 'success',
    data: {
      ...product,
      image: defaultImages[0] || product.image,
      galleryImages,
      images: [
        ...defaultImages,
        ...galleryImages
      ]
    }
  })
})

// Upload foto dari komputer
app.post(
  '/api/products/:id/images/upload',
  upload.single('image'),
  (req, res) => {
    const product = findProduct(req.params.id)

    if (!product) {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }

      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Pilih foto terlebih dahulu.'
      })
    }

    const galleries = readGalleries()
    const galleryImages = galleries[product.id] || []

    const imageUrl = `/uploads/${req.file.filename}`

    galleryImages.push(imageUrl)
    galleries[product.id] = galleryImages

    saveGalleries(galleries)

    res.status(201).json({
      status: 'success',
      message: 'Foto berhasil diunggah.',
      data: galleryImages
    })
  }
)

// Menambahkan foto melalui URL
app.post('/api/products/:id/images/url', (req, res) => {
  const product = findProduct(req.params.id)

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    })
  }

  const { imageUrl } = req.body

  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'URL gambar wajib diisi.'
    })
  }

  let parsedUrl

  try {
    parsedUrl = new URL(imageUrl)
  } catch {
    return res.status(400).json({
      status: 'error',
      message: 'URL gambar tidak valid.'
    })
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return res.status(400).json({
      status: 'error',
      message: 'URL harus menggunakan HTTP atau HTTPS.'
    })
  }

  const galleries = readGalleries()
  const galleryImages = galleries[product.id] || []

  galleryImages.push(imageUrl)
  galleries[product.id] = galleryImages

  saveGalleries(galleries)

  res.status(201).json({
    status: 'success',
    message: 'URL gambar berhasil ditambahkan.',
    data: galleryImages
  })
})

// Menghapus foto tambahan berdasarkan indeks
app.delete('/api/products/:id/images/:index', (req, res) => {
  const product = findProduct(req.params.id)
  const index = Number(req.params.index)

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    })
  }

  const galleries = readGalleries()
  const galleryImages = galleries[product.id] || []

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= galleryImages.length
  ) {
    return res.status(404).json({
      status: 'error',
      message: 'Foto tidak ditemukan.'
    })
  }

  const removedImage = galleryImages[index]

  galleryImages.splice(index, 1)
  galleries[product.id] = galleryImages

  // Menghapus file fisik jika berasal dari upload
  if (removedImage.startsWith('/uploads/')) {
    const filename = path.basename(removedImage)
    const filePath = path.join(UPLOAD_DIR, filename)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  saveGalleries(galleries)

  res.json({
    status: 'success',
    message: 'Foto berhasil dihapus.',
    data: galleryImages
  })
})

// Mengambil semua kategori
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(
    products.map(product => product.category)
  )]

  res.json({
    status: 'success',
    total: categories.length,
    data: categories
  })
})

// Mengambil produk berdasarkan kategori
app.get('/api/categories/:category/products', (req, res) => {
  const category = decodeURIComponent(req.params.category)

  const filteredProducts = getProductsWithImages().filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  )

  res.json({
    status: 'success',
    total: filteredProducts.length,
    data: filteredProducts
  })
})

// Mencari produk
app.get('/api/search', (req, res) => {
  const keyword = (req.query.q || '').toLowerCase()

  const results = getProductsWithImages().filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword) ||
    product.brand.toLowerCase().includes(keyword)
  )

  res.json({
    status: 'success',
    total: results.length,
    data: results
  })
})

// Penanganan error
app.use((error, req, res, next) => {
  console.error(error)

  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Ukuran gambar maksimal 5 MB.'
      : error.message

    return res.status(400).json({
      status: 'error',
      message
    })
  }

  res.status(400).json({
    status: 'error',
    message: error.message || 'Terjadi kesalahan.'
  })
})

app.listen(PORT, () => {
  console.log(`GadgetHub API running at http://localhost:${PORT}`)
})
