import React from 'react'
import "../assets/css/productCard.css"

const ProductCard = (props) => {
    return (
        <div className="product-card" >
            <div className="product-card-inner">
                <div className="product-card-front" style={{backgroundImage: "url(" + props.cardImage +")"}}>
                </div>
                <div className="product-card-back" dangerouslySetInnerHTML={{__html: "<p><b>" + props.nombre + "</b><br><b>" + props.precio + "</b><br><b>" + props.desc + "</b></p>"}}>
                </div>
            </div>
        </div>
    )
}

export default ProductCard


