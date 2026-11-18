import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory } from '../services/api'

function CategoryDetail() {
  const { category } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProductsByCategory(category)
      .then(setProducts)
      .catch(error => console.error(error))
  }, [category])

  return (
    <main className="page-container">
      <Link to="/categories" className="back-link">
        ← Back to Categories
      </Link>

      <div className="page-heading">
        <span>PRODUCT CATEGORY</span>
        <h1>{decodeURIComponent(category)}</h1>
        <p>Produk yang tersedia dalam kategori ini.</p>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default CategoryDetail