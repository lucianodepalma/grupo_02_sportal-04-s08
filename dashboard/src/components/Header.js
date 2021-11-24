import React from 'react';
import "../assets/css/normalize.css"; 
import "../assets/css/style.css"; 
import "../assets/css/header.css";

import DashboardGrid from './DashboardGrid';
// import HeaderPanel from "./HeaderPanel"


function header () {
    return (
        <React.Fragment>
            <div className="container">
                <header className="header">
            


                <div className="header-upper"></div>
                <div className="header-banner">
                    <DashboardGrid />
                </div>
                 <div className="header-circle"><a href="/" ><span className="circle-link"></span></a></div> 
                
                {/* <HeaderPanel /> */}
                <div className="header-search-fill"></div>

                <div className="header-search-box">
                    <form className="form-search-submit" action="/productos/search" method="GET">
                        <input className="header-search-input" type="search" name="searchString" placeholder="Ingrese su búsqueda" autoComplete="false" />
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

export default header;