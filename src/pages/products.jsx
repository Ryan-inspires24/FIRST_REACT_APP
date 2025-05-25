import React from "react";
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import DefaultPage from "../DefaultPage";
import '../products.css'; 

const fetchProducts = async () => {
    const response = await fetch('./products.json')
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
}


function ProductsPage() {
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
<DefaultPage>
        <div>
            <h1 className="header">View our latest products!!!</h1>

            {!showProducts && <p className="description">Nothing to see here until you click the button below to load the products.</p>}
            {showProducts && <p className="description">Click the button again to hide the products</p>}

            <button onClick={toggleProducts} className="products_button">
                {showProducts ? 'Hide Products' : 'Show Products'}
            </button>

            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error.message}</p>}
            {showProducts && data && (
                <ul className="product-list">
                    {data.map(product => (
                        <Link to={`/products/${product.id}`} className="product_link">
                            <li key={product.id} className="product_item">
                                <img className="product-image" src={product.image} alt={product.name} />
                                <h2 className="font-semibold">{product.id}. {product.name}</h2>
                                <p>{product.description}</p>


                            </li>
                        </Link>

                    ))}
                </ul>
            )}
        </div>
    </DefaultPage>
)
}
export default ProductsPage;

