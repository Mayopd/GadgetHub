import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../services/api'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(error => console.error(error))
  }, [])

  return (
    <main className="page-container">
      <div className="page-heading">
        <span>EXPLORE CATEGORIES</span>
        <h1>Product Categories</h1>
        <p>Temukan perangkat berdasarkan kategori pilihanmu.</p>
      </div>

      <div className="category-grid">
        {categories.map(category => (
          <Link
            to={`/category/${encodeURIComponent(category)}`}
            className="category-card"
            key={category}
          >
            <h2>{category}</h2>
            <span>Explore →</span>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Categories