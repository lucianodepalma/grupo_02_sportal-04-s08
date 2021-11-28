import React, {useState, useEffect} from 'react';
import "../assets/css/productContainer.css";
import ProductCard from './ProductCard';

const ProductContainer = (props) => {
    const [productos, setProductos] = useState({});
    // const cantProductos = 18;
    // const [paginado, setPaginado] = useState({paginaActual:1, ultimaPagina:1});
    console.log("prodCont:",props.searchDataDash.searchData)
    useEffect( () => {
        setProductos(props.searchDataDash.searchData);
        // fetch(`http://localhost:3001/api/products/search/?rpp=${cantProductos}&page=${paginado.paginaActual}&searchString=`)
        // .then (response => response.json())
        // .then(data => {
        //     setProductos(data);
        //     console.log("fetch",data)
        // })
    }, [props]);

    //const cardImage = "images/select200/AD_CM8534-1.JPG"

    return (
        <div id="product-container">
            {
                productos.count > 0 && productos.products.map( item => {
                    return <ProductCard cardImage={item.image} nombre={item.name} precio={item.price} desc={item.description}/>
                })
            }
        </div>
    )
}

export default ProductContainer
