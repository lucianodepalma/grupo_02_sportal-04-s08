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
    const [qtySold, setQtySold] = useState({});
    const flagChart = !props.flag;

    useEffect( () => {
        fetch('http://localhost:3001/api/cart/bestSeller')
        .then (response => response.json())
        .then(data => {
            setImagen(data.record.image);
            setNameProduct(data.record.model);
            setPriceProduct(data.record.price);
            setDescProduct(data.record.desc);
            setQtySold(data.sales);
        })

    }, []);

    return (
        <>
        <div id="big-panel" ></div>
        {flagChart ? <> <BigPanelImage  bigImage={imagen}/> <BigPanelText nombre={nameProduct} precio={priceProduct} desc={descProduct} sales={qtySold}/> </> : <Chart />}
        </>
    )
}

export default BigPanel
