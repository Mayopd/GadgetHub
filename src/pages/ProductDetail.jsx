
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/api'

const API_ORIGIN = 'http://localhost:3000'

function getImageUrl(image) {
  if (!image) return ''
  return image.startsWith('http') ? image : `${API_ORIGIN}${image}`
}

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setProduct(null)
    setSelectedImage('')
    setError(null)

    getProductById(id)
      .then(data => {
        setProduct(data)

        const gallery = data.galleryImages?.length
          ? data.galleryImages
          : [data.image]

        setSelectedImage(gallery[0] || '')
      })
      .catch(error => {
        console.error(error)
        setError('Produk gagal dimuat. Silakan coba lagi.')
      })
  }, [id])

  if (error) {
    return (
      <main className="page-container">
        <p>{error}</p>
        <Link to="/catalog" className="back-link">
          ← Back to Catalog
        </Link>
      </main>
    )
  }

  if (!product) {
    return <main className="page-container">Loading product...</main>
  }

  const images = product.galleryImages?.length
    ? product.galleryImages
    : (product.image ? [product.image] : [])

  return (
    <main className="detail-container">
      <Link to="/catalog" className="back-link">
        ← Back to Catalog
      </Link>

      <div className="detail-content">
        <div className="product-gallery">
          <div className="product-main-image">
            {selectedImage ? (
              <img
                src={getImageUrl(selectedImage)}
                alt={product.name}
              />
            ) : (
              <p>Foto produk belum tersedia.</p>
            )}
          </div>

          {images.length > 1 && (
            <div className="product-thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={
                    selectedImage === image
                      ? 'product-thumbnail active'
                      : 'product-thumbnail'
                  }
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Lihat foto ${index + 1}`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-brand">Brand: {product.brand}</p>

          <h2>
            Rp {Number(product.price).toLocaleString('id-ID')}
          </h2>

          <p>{product.description}</p>

          <Link to="/catalog" className="primary-button">
            Explore Other Products
          </Link>
        </div>
      </div>

      <section className="product-specifications">
        <h2>Product Specifications</h2>
        <p className="specifications-subtitle">
          Informasi spesifikasi dan fitur produk
        </p>

        {product.specifications &&
        Object.keys(product.specifications).length > 0 ? (
          <div className="specifications-table">
            {Object.entries(product.specifications).map(
              ([label, value]) => (
                <div className="specification-row" key={label}>
                  <div className="specification-label">
                    {label}
                  </div>

                  <div className="specification-value">
                    {value}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p>Spesifikasi produk belum tersedia.</p>
        )}
      </section>
    </main>
  )
}

export default ProductDetail
