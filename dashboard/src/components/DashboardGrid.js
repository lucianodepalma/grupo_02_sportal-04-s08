import React, {useState} from 'react'
import "../assets/css/dashboardGrid.css"
import BigPanel from './BigPanel';
import MiniPanel from './MiniPanel';
import ProductContainer from './ProductContainer';
import StatusContext from './Status'


function DashboardGrid(props) {
    const [ status, setStatus] = useState('productos')
    const pages = "2 / 22 páginas" //props.pages
    console.log("dshb: ",status)
    return (
        <StatusContext.Provider value={{status, setStatus}}>
        <div className="dashboardgrid">

        <MiniPanel row={1} col={1} num={"1.100"} concept={"productos"}/>
        <MiniPanel row={1} col={2} num={"1.200"} concept={"usuarios"} />
        <MiniPanel row={1} col={3} num={"1.300"} concept={"categorías"}  />

        <MiniPanel row={2} col={1} num={"1.400"} concept={"marcas"}  />
        <MiniPanel row={2} col={2} num={"1.500"} concept={"tipos"}  />
        <MiniPanel row={2} col={3} num={"1.600"} concept={"ventas / mes"} bg={"#a0a0a0"} clr={"#ffffff"}  />
        <BigPanel flag={ (status === "ventas / mes") ? true :false }/>
        <ProductContainer />
        <div className="bar" dangerouslySetInnerHTML={{__html: pages}}/>
        <i className="left fas fa-angle-double-left"/>
        <i className="right fas fa-angle-double-right"/>
        </div>
        </StatusContext.Provider>
    )
}

export default DashboardGrid
