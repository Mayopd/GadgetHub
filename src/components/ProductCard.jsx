import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const API_ORIGIN = 'http://localhost:3000'

function getImageUrl(image) {
  if (!image) return ''
  return image.startsWith('http') ? image : `${API_ORIGIN}${image}`
}

function ProductCard({ product }) {
  const images = product.galleryImages?.length
    ? product.galleryImages
    : (product.image ? [product.image] : [])

  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)

  const hasMultiple = images.length > 1

  function goTo(index) {
    setCurrent(index)
  }

  function goPrev(e) {
    e.preventDefault()
    e.stopPropagation()
    setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  function goNext(e) {
    e.preventDefault()
    e.stopPropagation()
    setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }

  function handleTouchMove(e) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  function handleTouchEnd(e) {
    const threshold = 40

    if (touchDeltaX.current > threshold) {
      // Swipe right → previous
      setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1))
    } else if (touchDeltaX.current < -threshold) {
      // Swipe left → next
      setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }

    touchDeltaX.current = 0
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div
          className="card-image-slider"
          onTouchStart={hasMultiple ? handleTouchStart : undefined}
          onTouchMove={hasMultiple ? handleTouchMove : undefined}
          onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
        >
          <div
            className="card-image-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={getImageUrl(image)}
                alt={`${product.name} ${index + 1}`}
                draggable={false}
              />
            ))}
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                className="card-slider-arrow card-slider-prev"
                onClick={goPrev}
                aria-label="Foto sebelumnya"
              >
                ‹
              </button>

              <button
                type="button"
                className="card-slider-arrow card-slider-next"
                onClick={goNext}
                aria-label="Foto berikutnya"
              >
                ›
              </button>

              <div className="card-slider-dots">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === current
                        ? 'card-slider-dot active'
                        : 'card-slider-dot'
                    }
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      goTo(index)
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

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
