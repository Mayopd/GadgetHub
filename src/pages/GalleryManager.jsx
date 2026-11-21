
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getProducts,
  getProductById,
  uploadProductImage,
  addProductImageUrl,
  deleteProductImage
} from '../services/api'

const API_ORIGIN = 'http://localhost:3000'

function getImageUrl(image) {
  if (!image) return ''

  return image.startsWith('http')
    ? image
    : `${API_ORIGIN}${image}`
}

function GalleryManager() {
  const [products, setProducts] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadProduct(id) {
    if (!id) return

    try {
      const product = await getProductById(id)
      setSelectedProduct(product)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data)

        if (data.length > 0) {
          setSelectedId(String(data[0].id))
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (selectedId) {
      setMessage('')
      setError('')
      loadProduct(selectedId)
    }
  }, [selectedId])

  async function handleUpload(event) {
    const file = event.target.files?.[0]

    if (!file || !selectedId) return

    setMessage('')
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 5 MB.')
      event.target.value = ''
      return
    }

    try {
      setSaving(true)

      await uploadProductImage(selectedId, file)
      await loadProduct(selectedId)

      setMessage('Foto berhasil ditambahkan.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
      event.target.value = ''
    }
  }

  async function handleAddUrl(event) {
    event.preventDefault()

    if (!imageUrl.trim() || !selectedId) return

    setMessage('')
    setError('')

    try {
      setSaving(true)

      await addProductImageUrl(selectedId, imageUrl.trim())
      await loadProduct(selectedId)

      setImageUrl('')
      setMessage('Foto dari URL berhasil ditambahkan.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(index) {
    const confirmed = window.confirm(
      'Yakin ingin menghapus foto tambahan ini?'
    )

    if (!confirmed) return

    setMessage('')
    setError('')

    try {
      setSaving(true)

      await deleteProductImage(selectedId, index)
      await loadProduct(selectedId)

      setMessage('Foto berhasil dihapus.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="page-container">
        <p>Memuat daftar produk...</p>
      </main>
    )
  }

  return (
    <main className="page-container">
      <Link to="/profile" className="back-link">
        ← Back to Profile
      </Link>

      <div className="page-heading">
        <span>PRODUCT MANAGEMENT</span>
        <h1>Kelola Galeri Produk</h1>
        <p>
          Tambahkan foto produk melalui upload dari komputer
          atau menggunakan URL gambar.
        </p>
      </div>

      <section className="gallery-manager">
        <label htmlFor="gallery-product-select">
          Pilih Produk
        </label>

        <select
          id="gallery-product-select"
          value={selectedId}
          onChange={event => setSelectedId(event.target.value)}
        >
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {selectedProduct && (
          <>
            <div className="gallery-selected-product">
              <img
                src={getImageUrl(selectedProduct.image)}
                alt={selectedProduct.name}
              />

              <div>
                <h3>{selectedProduct.name}</h3>
                <p>{selectedProduct.brand}</p>
                <span>
                  {(selectedProduct.galleryImages || []).length} foto tambahan
                </span>
              </div>
            </div>

            <div className="gallery-add-section">
              <h3>Upload Foto dari Komputer</h3>
              <p>Format gambar, maksimal 5 MB per foto.</p>

              <label
                htmlFor="gallery-file"
                className="gallery-upload-button"
              >
                {saving ? 'Menyimpan...' : 'Pilih Foto'}
              </label>

              <input
                id="gallery-file"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={saving}
                hidden
              />
            </div>

            <div className="gallery-add-section">
              <h3>Tambahkan Foto dari URL</h3>

              <form onSubmit={handleAddUrl}>
                <input
                  type="url"
                  placeholder="https://contoh.com/foto-produk.jpg"
                  value={imageUrl}
                  onChange={event => setImageUrl(event.target.value)}
                  required
                />

                <button type="submit" disabled={saving}>
                  Tambahkan Foto
                </button>
              </form>
            </div>

            {message && (
              <p className="gallery-success">{message}</p>
            )}

            {error && (
              <p className="gallery-error">{error}</p>
            )}

            <div className="gallery-list-section">
              <h3>Foto Tambahan</h3>

              {(selectedProduct.galleryImages || []).length > 0 ? (
                <div className="gallery-manager-grid">
                  {selectedProduct.galleryImages.map((image, index) => (
                    <div
                      className="gallery-manager-card"
                      key={`${image}-${index}`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${selectedProduct.name} foto tambahan ${index + 1}`}
                      />

                      <div className="gallery-manager-card-footer">
                        <span>Foto {index + 1}</span>

                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          disabled={saving}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Belum ada foto tambahan untuk produk ini.</p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default GalleryManager
