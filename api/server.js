const express = require('express')
const cors = require('cors')
const products = require('./data/products')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Halaman utama API
app.get('/', (req, res) => {
  res.json({
    message: 'GadgetHub API is running',
    status: 'success'
  })
})

// Mengambil semua produk
app.get('/api/products', (req, res) => {
  res.json({
    status: 'success',
    total: products.length,
    data: products
  })
})

// Mengambil detail produk
app.get('/api/products/:id', (req, res) => {
  const product = products.find(
    p => p.id === Number(req.params.id)
  )

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    })
  }

  res.json({
    status: 'success',
    data: product
  })
})

// Mengambil semua kategori
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(
    products.map(p => p.category)
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

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
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

  const results = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.category.toLowerCase().includes(keyword) ||
    p.brand.toLowerCase().includes(keyword)
  )

  res.json({
    status: 'success',
    total: results.length,
    data: results
  })
})

app.listen(PORT, () => {
  console.log(`GadgetHub API running at http://localhost:${PORT}`)
})