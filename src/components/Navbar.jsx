import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <Link
        to="/"
        className="logo"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <img
          src="/logo.svg"
          alt="GadgetHub"
          style={{ height: '40px', width: 'auto' }}
        />
        <div>
          Gadget<span>Hub</span>
        </div>
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Link to="/search" className="search-button" aria-label="Search Product">
        <span className="search-text">Search Product</span>
        <span className="search-icon-mobile">⌕</span>
      </Link>
    </header>
  )
}

export default Navbar