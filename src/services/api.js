const API_URL = `${import.meta.env.VITE_API_URL || ''}/api`

async function handleResponse(response) {
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Terjadi kesalahan pada server.')
  }

  return result.data
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`)
  return handleResponse(response)
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`)
  return handleResponse(response)
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`)
  return handleResponse(response)
}

export async function getProductsByCategory(category) {
  const response = await fetch(
    `${API_URL}/categories/${encodeURIComponent(category)}/products`
  )

  return handleResponse(response)
}

export async function searchProducts(keyword) {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(keyword)}`
  )

  return handleResponse(response)
}

export async function uploadProductImage(id, file) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(
    `${API_URL}/products/${id}/images/upload`,
    {
      method: 'POST',
      body: formData
    }
  )

  return handleResponse(response)
}

export async function addProductImageUrl(id, imageUrl) {
  const response = await fetch(
    `${API_URL}/products/${id}/images/url`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl })
    }
  )

  return handleResponse(response)
}

export async function deleteProductImage(id, index) {
  const response = await fetch(
    `${API_URL}/products/${id}/images/${index}`,
    {
      method: 'DELETE'
    }
  )

  return handleResponse(response)
}