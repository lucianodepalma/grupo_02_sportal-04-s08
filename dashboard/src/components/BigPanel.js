import React, { useState, useEffect }from 'react';
import "../assets/css/bigPanel.css";
import BigPanelImage from './BigPanelImage';
import BigPanelText from './BigPanelText';
import Chart from './Chart';

const BigPanel = (props) => {
    const [imagen, setImagen] = useState({});
    const [nameProduct, setNameProduct] = useState({});
    const [priceProduct, setPriceProduct] = useState({});
    const [descProduct, setDescProduct] = useState({});
    const [qtySoldProduct, setQtySoldProduct] = useState({});
    // const flagChart = !props.flag;
    // const [imagenUsuario, setImagenUsuario] = useState({});
    // const [nameUsuario, setNameUsuario] = useState({});
    // const [emailUsuario, setEmailUsuario] = useState({});
    const flagChart = props.flag;

    // useEffect( () => {
    //     fetch('http://localhost:3001/api/products/search/?rpp=1&page=1&searchString=')
    //     .then (response => response.json())
    //     .then(data => {
    //         setImagen(data.products[0].image);
    //         setNameProduct(data.products[0].name);
    //         setPriceProduct(data.products[0].price);
    //         setDescProduct(data.products[0].description);
    //     })
    // }, []);

    useEffect( () => {
        fetch('http://localhost:3001/api/cart/bestSeller')
        .then (response => response.json())
        .then(data => {
            setImagen(data.record.image);
            setNameProduct(data.record.model);
            setPriceProduct(data.record.price);
            setDescProduct(data.record.desc);
            setQtySoldProduct(data.sales);
        // fetch('http://localhost:3001/api/products/?rpp=1&page=1&searchString=')
        // .then (response => response.json())
        // .then(data => {
        //     setImagen(data.products[0].image);
        //     setNameProduct(data.products[0].name);
        //     setPriceProduct('$ ' + data.products[0].price);
        //     setDescProduct(data.products[0].description);
        })
    }, []);

    useEffect( () => {
        fetch('http://localhost:3001/api/users')
        .then (response => response.json())
        .then(data => {
            setImagenUsuario(data.users[0].avatar);
            setNameUsuario(data.users[0].name);
            setEmailUsuario(data.users[0].email);
        })
    }, []);

    //const bigImage = "images/select200/AD_CM8534-1.JPG"
    return (
        <>
        <div id="big-panel" ></div>
        {/* {flagChart ? <> <BigPanelImage  bigImage={imagen}/> <BigPanelText nombre={nameProduct} precio={priceProduct} desc={descProduct} qtySold={qtySoldProduct}/> </> : <Chart />} */}
        { flagChart === 'ventas / mes' ? 
            <Chart/> :
            flagChart ==='usuarios' ?
                <> <BigPanelImage bigImage={imagenUsuario}/> <BigPanelText title={'Usuario con más compras'} ventas={'89 compras realizadas'} nombre={nameUsuario} precio={emailUsuario} desc={''}/> </>
                : <> <BigPanelImage bigImage={imagen}/> <BigPanelText title={'Más vendido'} ventas={'1.200 ventas'} nombre={nameProduct} precio={priceProduct} desc={descProduct}/> </>}
        </>
    )
}

export default BigPanel
