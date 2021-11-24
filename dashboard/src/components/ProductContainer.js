import React from 'react'
import "../assets/css/productContainer.css"
import ProductCard from './ProductCard'

const ProductContainer = () => {
    const cardImage = "images/select200/AD_CM8534-1.JPG"
    return (
        <div id="product-container">
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
            <ProductCard cardImage={cardImage}/>
        </div>
    )
}

export default ProductContainer
