import React from 'react'
// import PropTypes from 'prop-types'
import "../assets/css/style.css"


const Header = props => {
    return (
        <div>
            
        </div>
    )
}

// Header.propTypes = {

// }

export default Header


let panel = useRef();
    // const [estadoPanel, setEstadoPanel] = useState(panel.style.display = "none")

    

    const openPanel = (e) => {
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
            setTimeout(function () {
            panel.style.display = "none";
            }, 8000);
        }
    }

  const userPanel =  {
        //locals.logueado
        if (True) { 
            //locals.first_name
        <p id="header-login" onclick="openPanel()" >
            //locals.avatar
            if (True) { 
                //locals.avatar 
                <img id="profile-avatar-header" src="../assets/images/avatars/1636322350748_img.png"
                    height="50" /> 
            } else {
                <i className="far fa-user-circle" />
            } 
            <div ref="panel">
                <ul>
                //locals.is_admin
                    if (True) { 
                        <li><a href="/productos/listar">Uso interno</a></li>
                    } 
                    <li><a href="/carrito">Ver carrito</a></li>
                    <li><a href="/profile/<%= locals.email %>">Editar perfil</a></li>
                    <li><a href="/login/logout">Logout</a></li>
                </ul>
            </div>
        </p>
    } else { 
        <a id="header-login" href="/login">Login
            <i className="far fa-user-circle" />
        </a>
    } 
}
    

