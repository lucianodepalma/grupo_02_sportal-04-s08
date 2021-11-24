import React from "react";
import avatar from "../assets/images/avatars/1636322350748_img.png"
import UserPanel from "./UserPanel";

const HeaderPanel = () => {

    const openPanel = (e) =>{
        return ""
    }
    
  return (
    <React.Fragment>
        {/* locals.logueado */}
        {/* if (locals.avatar) */}
        { (true)
            ? <p id="header-login" onClick={ openPanel } >Name{(true) ? <img id="profile-avatar-header" src={avatar} height="50" /> : <i className="far fa-user-circle" />} </p>       
            : <a id="header-login" href="/login">Login <i class="far fa-user-circle"/> </a>
        }
        <UserPanel /> 




    </React.Fragment>
  );
};

export default HeaderPanel;
