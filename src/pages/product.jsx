import React from 'react'
import {useParams} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import '../App.css'

const fetchProducts = async () => {
  const response = await fetch('/products.json') // Corrected path
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
<div className="product-detail-page">
  <h1 className="page-title">Product Details</h1>
  
  <div className="product-detail-container">
    <img className="product-detail-image" src={product.image} alt={product.name} />

    <div className="product-detail-info">
      <h2 className="product-detail-name">{product.name}</h2>
      <p className="product-detail-description">
        <strong>Description:</strong> {product.description}
      </p>
    </div>
  </div>
</div>
  )
}
export default ProductPage
