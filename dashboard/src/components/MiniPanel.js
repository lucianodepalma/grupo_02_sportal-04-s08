import React, {useState} from 'react';
import "../assets/css/MiniPanel.css";

const MiniPanel = (props) => {
    console.log(props.row);
    
    const [condition, setCondition] = useState(false);
    // const buttn = useRef(null)
    // useEffect(() =>{
    //     elStyle.className = state;
    // },[state]

    // )

    function actionClick(e) {
        // e.preventDefault();
        !condition ? setCondition(true) : setCondition(false);
        console.log("click");
        setTimeout(function () {
            setCondition(false);
            }, 10000);
    }

    return (
        <React.Fragment>
        <button type="button" onClick={actionClick} className={condition ? "pressed" : "minipanel-box"} style={{gridRow: props.row, gridColumn:props.col, backgroundColor:props.bg, color:props.clr, zIndex:1000}}>{props.num}
            <div  className="minipanel-concept" >{props.concept}</div>
        </button>
        </React.Fragment>
    )
}

export default MiniPanel
