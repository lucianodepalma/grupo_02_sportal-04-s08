import React, {useState, useEffect, useContext} from 'react';
import "../assets/css/dashboardGrid.css";
import BigPanel from './BigPanel';
import MiniPanel from './MiniPanel';
import ProductContainer from './ProductContainer';
import StatusContext from './Status';


function DashboardGrid(props) {
    const [status, setStatus] = useState('productos');
    const {paginaActual, setPaginaActual} = useContext(StatusContext)
    const [oneProduct, setOneProduct] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    
    useEffect( () => {
        fetch('http://localhost:3001/api/products/70267136')
        .then (response => response.json())
        .then(data => {
            setOneProduct(data.headingsCollection.length);
            setMarcas(data.brandsCollection.length);
            setTipos(data.familiesCollection.length);
        })
    }, []);

    const backPageHandler = () => {
        paginaActual > 1 && setPaginaActual(paginaActual-1)
        console.log("bak");
    }

    const forwardPageHandler = () => {
        paginaActual < props.searchData.pages && setPaginaActual(paginaActual+1)
        console.log("frw");
    }
    
    return (
        <StatusContext.Provider value={{status, setStatus}}>
        <div className="dashboardgrid">

        <MiniPanel row={1} col={1} num={props.searchData.count} concept={"productos"} />
        <MiniPanel row={1} col={2} num={props.usuariosData.count} concept={"usuarios"} />
        <MiniPanel row={1} col={3} num={oneProduct} concept={"categorías"}/>

        <MiniPanel row={2} col={1} num={marcas} concept={"marcas"} />
        <MiniPanel row={2} col={2} num={tipos} concept={"tipos"} />
        <MiniPanel row={2} col={3} num={props.searchData.sales} concept={"ventas / mes"} bg={"#a0a0a0"} clr={"#ffffff"}  />
        <BigPanel flag={(status === "ventas / mes") ? true :false}/>
        <ProductContainer flag={status} productDataDash={props.productData} usuariosDataDash = {props.usuariosData} searchDataDash = {props.searchData} />
        <div className="bar" dangerouslySetInnerHTML={{__html:((props.searchData.pages === 0) ? " Sin resultados" :( paginaActual+"/" + props.searchData.pages + " paginas"))}}/>
            <i onClick={backPageHandler} className="left fas fa-angle-double-left"/>
            <i onClick={forwardPageHandler} className="right fas fa-angle-double-right"/>
        </div>
        </StatusContext.Provider>
    )
}

export default DashboardGrid
