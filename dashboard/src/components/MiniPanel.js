import React, {useContext, useState, useEffect} from 'react';
import "../assets/css/MiniPanel.css";
import StatusContext from './Status'

const MiniPanel = (props) => {


    const {status, setStatus} = useContext(StatusContext);
    const [condition, setCondition] = useState(false);

    useEffect(() => {
        (status === props.concept) ? setCondition(true) : setCondition(false);
        console.log(status);
    }, [status, props])

    const actionClick = () => {
        (status === props.concept) ? setCondition(true) : setStatus(props.concept);
        
        console.log(props);
    }
    // function actionClick(e) {
    //     (status === props.concept) ? setCondition(true) : setCondition(false);
    //     !condition ? setStatus(props.concept) : setCondition(true);

    //     console.log("click", status);
    //     // setTimeout(function () {
    //     //     setCondition(false);
    //     //     }, 10000);
    // }

    return (
        <React.Fragment>
        <button type="button" onClick={actionClick} className={condition ? "pressed" : "minipanel-box"} style={{gridRow: props.row, gridColumn:props.col, backgroundColor:props.bg, color:props.clr, zIndex:1000}}>{props.num}
            <div  className="minipanel-concept" >{props.concept}</div>
        </button>
        </React.Fragment>
    )
}

export default MiniPanel
