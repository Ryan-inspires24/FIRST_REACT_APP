import React from 'react'
import {useParams} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import '../App.css'
import DefaultLayout from '../DefaultProductPage'
import RatingStars from '../RatingStars'
import { Link } from 'react-router-dom'


const fetchProducts = async () => {
  const response = await fetch('/products.json') 
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}


function ProductPage(){
    const {id} = useParams()
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: fetchProducts
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const product = data.find(item => item.id === parseInt(id))

    if (!product) return <p>Product not found</p>

  return (

<DefaultLayout>
  <div className="product-detail-page">
    <h1 className="page-title">Product Details</h1>

    <div className="product-detail-container">
      <img className="product-detail-image" src={product.image} alt={product.name} />

      <div className="product-detail-info">
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-description">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="product-detail-stock">
          <strong>Stock:</strong> <span className='stock'>{product.stock}</span>
        </p>
        <p className="product-detail-price">
          <strong>Price:</strong> <span className='price'>{product.price} XAF</span>
        </p>
        <p className="product-detail-category">
          <strong>Category:</strong> <span className='category'>{product.category}</span>
        </p>
        <p className="product-detail-rating">
          <strong>Rating:</strong> <RatingStars rating={product.rating} /> ({product.reviews.length} reviews)
        </p>
        <p className="product-detail-reviews">
          <strong>Reviews:</strong> <span className='reviews'>{product.reviews}</span>
        </p>
        <p className='back-to-products'>
          <Link to="/products">Back to Products</Link>
        </p>
      </div>
        <div className="product-detail-actions">
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="buy-now-button">Buy Now</button>
            <button className='wishlist-button'>Add to Wishlist</button>
          </div>
    </div>
  </div>
</DefaultLayout>
  )
}
export default ProductPage
