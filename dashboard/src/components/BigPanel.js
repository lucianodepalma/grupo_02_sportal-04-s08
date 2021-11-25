import React from 'react'
import "../assets/css/bigPanel.css"
import BigPanelImage from './BigPanelImage'
import BigPanelText from './BigPanelText'
import Chart from './Chart'

const BigPanel = (props) => {
    const flagChart = !props.flag;
    console.log(flagChart)
    const bigImage = "images/select200/AD_CM8534-1.JPG"
    return (
        <>
        <div id="big-panel" ></div>
        {flagChart ? <> <BigPanelImage  bigImage={bigImage}/> <BigPanelText /> </> : <Chart />}
        </>
    )
}

export default BigPanel
