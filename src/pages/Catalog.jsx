
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/api'

function Catalog() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(error => {
        console.error(error)
        setError('Produk gagal dimuat. Silakan coba lagi.')
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = [
    'All',
    ...new Set(products.map(product => product.category))
  ]

  const filteredProducts = category === 'All'
    ? products
    : products.filter(product => product.category === category)

  return (
    <main className="page-container">
      <div className="page-heading">
        <span>EXPLORE OUR COLLECTION</span>
        <h1>Product Catalog</h1>
        <p>Temukan perangkat elektronik sesuai kebutuhanmu.</p>
      </div>

      <div className="filter-list">
        {categories.map(item => (
          <button
            key={item}
            className={category === item ? 'filter-active' : ''}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image: product.image
              }}
            />
          ))}
        </div>
      ) : (
        <p>Produk tidak ditemukan.</p>
      )}
    </main>
  )
}

export default Catalog
