import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory } from '../services/api'

function CategoryDetail() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('Semua')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSelectedBrand('Semua')
    setLoading(true)

    getProductsByCategory(category)
      .then(setProducts)
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [category])

  const brands = [
    'Semua',
    ...new Set(products.map(product => product.brand))
  ]

  const filteredProducts = selectedBrand === 'Semua'
    ? products
    : products.filter(product => product.brand === selectedBrand)

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

      {!loading && brands.length > 2 && (
        <div className="brand-filter">
          <h3 className="brand-filter-title">Filter berdasarkan Merek</h3>

          <div className="brand-filter-list">
            {brands.map(brand => (
              <button
                key={brand}
                className={selectedBrand === brand ? 'brand-chip active' : 'brand-chip'}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
                {brand !== 'Semua' && (
                  <span className="brand-chip-count">
                    {products.filter(p => p.brand === brand).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Produk tidak ditemukan untuk merek ini.</p>
      )}
    </main>
  )
}

export default CategoryDetail
