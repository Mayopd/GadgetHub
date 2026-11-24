import { supabase } from '../lib/supabase'

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api`

// Cache sederhana di memori browser agar navigasi antar halaman instan
const cache = new Map()
const CACHE_TTL = 60 * 1000 // 60 detik

function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

export function clearApiCache() {
  cache.clear()
}

async function request(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase()

  // Gunakan cache untuk request GET
  if (method === 'GET') {
    const cachedData = getCached(endpoint)
    if (cachedData) return cachedData
  }

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { 'Content-Type': 'application/json' }),
    ...options.headers
  }

  // Hanya ambil token auth untuk operasi tulis (POST, PUT, DELETE)
  if (method !== 'GET') {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Terjadi kesalahan pada server.')
  }

  if (method === 'GET') {
    setCached(endpoint, result.data)
  } else {
    // Hapus cache setiap kali ada perubahan data oleh admin
    clearApiCache()
  }

  return result.data
}

// Ambil seluruh produk
export async function getProducts() {
  return request('/products')
}

// Ambil detail produk
export async function getProductById(id) {
  return request(`/products/${id}`)
}

// Ambil kategori
export async function getCategories() {
  return request('/categories')
}

// Ambil produk berdasarkan kategori
export async function getProductsByCategory(category) {
  return request(
    `/categories/${encodeURIComponent(category)}/products`
  )
}

// Cari produk
export async function searchProducts(keyword) {
  return request(`/search?q=${encodeURIComponent(keyword)}`)
}

// Tambah produk
export async function createProduct(product) {
  return request('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  })
}

// Edit produk
export async function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product)
  })
}

// Hapus produk
export async function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: 'DELETE'
  })
}

// Upload gambar
export async function uploadProductImage(id, file) {
  const formData = new FormData()
  formData.append('image', file)

  return request(`/products/${id}/images/upload`, {
    method: 'POST',
    body: formData
  })
}

// Tambah gambar URL
export async function addProductImageUrl(id, imageUrl) {
  return request(`/products/${id}/images/url`, {
    method: 'POST',
    body: JSON.stringify({ imageUrl })
  })
}

// Hapus gambar
export async function deleteProductImage(id, index) {
  return request(`/products/${id}/images/${index}`, {
    method: 'DELETE'
  })
}