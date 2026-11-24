import { Link } from 'react-router-dom'

function Profile() {
  return (
    <main className="page-container">
      <div className="page-heading">
        <span>YOUR APPLICATION</span>
        <h1>Profile</h1>
        <p>Informasi dan pengelolaan aplikasi GadgetHub.</p>
      </div>

      <div className="about-content">
        <h2>GadgetHub</h2>

        <p>
          GadgetHub merupakan katalog perangkat elektronik
          yang menyediakan informasi produk berdasarkan
          kategori, merek, dan detail produk.
        </p>

        <p>
          Aplikasi ini dikembangkan sebagai proyek pembelajaran
          Progressive Web App.
        </p>

        <div className="profile-links">
          <Link to="/about" className="primary-button">
            About GadgetHub
          </Link>

          <Link
            to="/manage-products"
            className="primary-button"
          >
            Kelola Produk
          </Link>

          <Link
            to="/gallery"
            className="primary-button gallery-link-button"
          >
            🖼 Kelola Galeri Produk
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Profile