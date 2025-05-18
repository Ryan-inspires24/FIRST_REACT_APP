import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import './App.css'

const fetchProducts = async () => {
  const response = await fetch('/products.json')
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}


function App() {
  const [showProducts, setShowProducts] = useState(false)

  const toggleProducts = () => {
    setShowProducts(prev => !prev)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: showProducts
  })

  return (
    <div>
      <h1 className="header">Product Viewer</h1>

      {!showProducts && <p className="description">Nothing to see here! Click the button below to load the products</p>}
      {showProducts && <p className="description">Click the button again to hide the products</p>}

      <button onClick={toggleProducts} className="products_button">
        {showProducts ? 'Hide Products' : 'Show Products'}
      </button>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      {data && (
        <ul className="product-list">
          {data.map(product => (
            <li key={product.id} className="product_item">
              <h2 className="font-semibold">{product.id}. {product.name}</h2>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default App