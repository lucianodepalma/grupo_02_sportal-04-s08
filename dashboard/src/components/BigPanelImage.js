import React from 'react'
import "../assets/css/bigPanelImage.css"

const BigPanelImage = (props) => {
    return (
        <div id="big-panel-image" style={{backgroundImage: "url(" + props.bigImage +")"}}></div>
    )
}

export default BigPanelImage
