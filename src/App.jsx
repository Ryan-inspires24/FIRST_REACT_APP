import './App.css'
import ContactPage from './pages/contact'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/home'
import AboutPage from './pages/about'
import ProductsPage from './pages/products'
import ProductPage from './pages/product'
import LoginPage from './pages/login'
import Users from './users'
import Register from './pages/register'
import UserProfile from './pages/detailedUser'

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/users' element={<Users />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        <Route path='/users/:id' element={<UserProfile />} />
      </Routes>
    </Router>
  )
}
export default App
