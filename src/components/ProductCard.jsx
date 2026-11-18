import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
          <p>
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <span className="detail-link">View Details →</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard