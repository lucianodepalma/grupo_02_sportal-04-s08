import React, {useState, useEffect} from 'react';
import "../assets/css/productContainer.css";
import ProductCard from './ProductCard';

const ProductContainer = (props) => {
    const [productos, setProductos] = useState({});
    const [usuarios, setUsuarios] = useState({});
    const [oneProduct, setOneProduct] = useState({});
    
    const flagChart = props.flag;
    console.log("prodCont:",props.searchDataDash)
    console.log('usuarios', props.usuariosDataDash)

    useEffect( () => {
        setProductos(props.searchDataDash);
    }, [props]);

    useEffect( () => {
        setUsuarios(props.usuariosDataDash);
    }, [props]);

    useEffect( () => {
        setOneProduct(props.productDataDash);
    }, [props]);

    return (
        <div id="product-container">
            {   
                flagChart === 'usuarios' ?
                    usuarios.count > 0 && usuarios.users.map( item => {
                        return <ProductCard cardImage={item.avatar} nombre={item.name} precio={item.email} desc={''}/>
                    }) :
                    flagChart === 'marcas' ?
                        oneProduct.brandsCollection.map( item => {
                            return <ProductCard cardImage={item.icon} nombre={item.desc} precio={''} desc={''}/>
                        }) :
                        productos.count > 0 && productos.products.map( item => {
                            return <ProductCard cardImage={item.image} nombre={item.name} precio={'$ ' + item.price} desc={item.description}/>
                        })
            }
        </div>
    )
}

export default ProductContainer
