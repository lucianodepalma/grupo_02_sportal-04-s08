import React from 'react'
import "../assets/css/productCard.css"

const ProductCard = (props) => {
    //const back_textus = "<p><b>Racer Flexion</b><br><b>$6990.00</b><br><b>Nullam vitae turpis rutrum, vehicula nunc vitae, auctor sem. Quisque.</b><br><b>Sexo:</b> Hombre<br><b>Edad:</b> Adulto<br><b>Color:</b> Pepino<br><b>Talle:</b> XL<br><b>Tamaño:</b> nada</P>"
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


