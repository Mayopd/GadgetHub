import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import BottomNavigation from './components/BottomNavigation'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import CategoryDetail from './pages/CategoryDetail'
import Categories from './pages/Categories'
import Search from './pages/Search'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<CategoryDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="footer">
        <p>© 2026 GadgetHub. All rights reserved.</p>
      </footer>

      <BottomNavigation />
    </BrowserRouter>
  )
}

export default App