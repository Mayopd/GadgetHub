import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(error => console.error('Gagal mengambil produk:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">WELCOME TO GADGETHUB</span>
          <h1>Discover Technology That Moves You.</h1>
          <p>
            Temukan berbagai perangkat elektronik pilihan
            untuk mendukung aktivitas dan produktivitasmu.
          </p>
          <Link to="/catalog" className="primary-button">
            Explore Products →
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900"
            alt="Electronic devices"
          />
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span>OUR COLLECTION</span>
            <h2>Featured Products</h2>
          </div>
          <Link to="/catalog">View All →</Link>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home