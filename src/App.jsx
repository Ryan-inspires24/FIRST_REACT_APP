import './App.css'
import ContactPage from './pages/contact'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/home'
import AboutPage from './pages/about'
import ProductsPage from './pages/products'
import ProductPage from './pages/product'

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
      </Routes>
    </Router>
  )
}
export default App
