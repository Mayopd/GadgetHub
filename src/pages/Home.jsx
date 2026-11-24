import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data.slice(0, 4))
      })
      .catch(err => {
        console.error(err)
        setError('Gagal memuat produk.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <section className="hero">
        <div>
          <span className="hero-label">FUTURE TECHNOLOGY</span>
          <h1>Discover Smart Gadgets for Everyday Life</h1>
          <p>
            Explore curated laptops, smartphones, audio gear, and smart
            accessories with detailed specifications.
          </p>
          <Link to="/catalog" className="primary-button">
            Explore Catalog
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900"
            alt="GadgetHub Showcase"
          />
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span>CURATED SELECTION</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/catalog">View All →</Link>
        </div>

        {loading ? (
          <p>Loading featured products...</p>
        ) : error ? (
          <p>{error}</p>
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