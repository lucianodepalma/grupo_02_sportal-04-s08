import React, {useState, useEffect} from 'react';
import "../assets/css/normalize.css"; 
import "../assets/css/style.css"; 
import "../assets/css/header.css";

import DashboardGrid from './DashboardGrid';

const axios = require('axios').default;
// import HeaderPanel from "./HeaderPanel"

// function App() {
//     const [searchTerm, setSearchTerm] = React.useState("");
//      const handleChange = event => {
//        setSearchTerm(event.target.value);
//      };
//      return (
//        <div className="App">
//          <input
//            type="text"
//            placeholder="Search"
//            value={searchTerm}
//            onChange={handleChange}
//          />
//          <ul>
//            <li>Item 1</li>
//            <li>Item 2</li>
//          </ul>
//        </div>
//      );
//    }


function Header () {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResp, setSearchResp] = useState({});
    
    

    // useEffect(() => {
    //     console.log("resp: ", searchResp)
        
    // }, [searchResp])

    const handleChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
        console.log("hadle: ",event.target.value)
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/products/search/?rpp=10&page=1&searchString='+ searchTerm)
        .then( ((response) => {
            
            setSearchResp(response.data);
            console.log("axios: ", searchTerm ,response.data)
        }))
        .catch( (error =>{
            console.log(error)
        }))
        
        return () => {
           
        }
    }, [searchTerm])

    return (
        <React.Fragment>
            <div className="container">
                <header className="header">
            


                <div className="header-upper"></div>
                <div className="header-banner">
                    <DashboardGrid searchData={searchResp}/>
                </div>
                 <div className="header-circle"><a href="/" ><span className="circle-link"></span></a></div> 
                
                {/* <HeaderPanel /> */}
                <div className="header-search-fill"></div>

                <div className="header-search-box">
                    <form className="form-search-submit" action="/productos/search" method="GET">
                        <input onChange={handleChange} className="header-search-input" type="text" name="searchString" value={searchTerm} placeholder="Ingrese su búsqueda" autoComplete="false" />
                    </form>
                </div>

                <i  className="header-glass fas fa-search" />
                
                <nav className="header-menu">
                    <ul className="header-menu">
                        <li><a href="/productos/1">&nbsp;&nbsp;Básicos</a></li>
                        <li><a href="/productos/2">Calzado</a></li>
                        <li><a href="/productos/3">Equipo</a></li>
                        <li><a href="/productos/4">Carga</a></li>
                        <li><a href="/productos/8">Agua</a></li>
                        <li><a href="/productos/5">Portátiles</a></li>
                        <li><a href="/productos/7">Electro</a></li>
                    </ul>
                </nav>
                <a className="header-sandwich" href="/productos/7" target="_self">
                    <i className="fas fa-bars" />
                </a>

                </header>
            </div>
                
            
        </React.Fragment>
    )
}

export default Header;