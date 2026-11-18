import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/api'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(error => console.error(error))
  }, [id])

  if (!product) {
    return <main className="page-container">Loading product...</main>
  }

  return (
    <main className="detail-container">
      <Link to="/catalog" className="back-link">
        ← Back to Catalog
      </Link>

      <div className="detail-content">
        <img src={product.image} alt={product.name} />

        <div>
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-brand">Brand: {product.brand}</p>
          <h2>Rp {product.price.toLocaleString('id-ID')}</h2>
          <p>{product.description}</p>

          <Link to="/catalog" className="primary-button">
            Explore Other Products
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail