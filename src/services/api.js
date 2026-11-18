const API_URL = 'http://localhost:3000/api'

// Mengambil semua produk
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`)
  const result = await response.json()
  return result.data
}

// Mengambil detail produk
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`)
  const result = await response.json()
  return result.data
}

// Mengambil semua kategori
export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`)
  const result = await response.json()
  return result.data
}

// Mengambil produk berdasarkan kategori
export async function getProductsByCategory(category) {
  const response = await fetch(
    `${API_URL}/categories/${encodeURIComponent(category)}/products`
  )
  const result = await response.json()
  return result.data
}

// Mencari produk
export async function searchProducts(keyword) {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(keyword)}`
  )
  const result = await response.json()
  return result.data
}