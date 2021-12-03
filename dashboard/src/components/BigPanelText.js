import React from 'react'
import "../assets/css/bigPanelText.css"

const BigPanelText = (props) => {

    let ventas = "";
    if (props.sales == 0) {
        ventas = "No hubo ventas";
    } else if (props.sales == 1) {
        ventas = "1 venta";
    } else {
        ventas = props.sales + " ventas";
    }
    const textTitle = "<h1>Más vendido<hr><b>" + ventas + " en los últimos 30 días</b></h1>"
    //const textus =  textTitle + "<p><b>Racer Flexion</b><br><br><b>$6990.00</b><br><br><b>Nullam vitae turpis rutrum, vehicula nunc vitae, auctor sem. Quisque.</b><br><br><b>Sexo:</b> Hombre<br><br><b>Edad:</b> Adulto<br><br><b>Color:</b> Pepino<br><br><b>Talle:</b> XL<br><br><b>Tamaño:</b> nada</P>"

    return (
        <div id="big-panel-text" dangerouslySetInnerHTML={{__html: textTitle + "<p><b>" + props.nombre + "</b><br><b>$" + props.precio + "</b><br><b>" + props.desc + "</b></p>"}}>
            
        </div>
    )
}

export default BigPanelText