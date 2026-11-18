import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { searchProducts } from '../services/api'

function Search() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch(value) {
    setKeyword(value)

    if (!value.trim()) {
      setResults([])
      return
    }

    setLoading(true)

    try {
      const data = await searchProducts(value)
      setResults(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <span>FIND YOUR DEVICE</span>
        <h1>Search Products</h1>
        <p>Cari produk berdasarkan nama, kategori, atau merek.</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search gadget..."
        value={keyword}
        onChange={e => handleSearch(e.target.value)}
      />

      {loading && <p>Searching...</p>}

      {!loading && keyword && results.length === 0 && (
        <p>Produk tidak ditemukan.</p>
      )}

      <div className="product-grid">
        {results.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default Search