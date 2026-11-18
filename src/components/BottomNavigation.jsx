import { NavLink } from 'react-router-dom'

function BottomNavigation() {
  return (
    <nav className="bottom-navigation">
      <NavLink to="/" end>
        <span>⌂</span>
        <small>Home</small>
      </NavLink>

      <NavLink to="/categories">
        <span>▦</span>
        <small>Categories</small>
      </NavLink>

      <NavLink to="/search">
        <span>⌕</span>
        <small>Search</small>
      </NavLink>

      <NavLink to="/profile">
        <span>♙</span>
        <small>Profile</small>
      </NavLink>
    </nav>
  )
}

export default BottomNavigation