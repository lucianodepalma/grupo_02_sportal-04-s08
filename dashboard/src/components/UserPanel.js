import React from 'react'

const UserPanel = () => {
    return (
        <div id="userPanel">
                <ul>
                    {(true) &&  <li><a href="/productos/listar">Uso interno</a></li>} 
                    <li><a href="/carrito">Ver carrito</a></li>
                    <li><a href="/profile/<%= locals.email %>">Editar perfil</a></li>
                    <li><a href="/login/logout">Logout</a></li>
                </ul>
        </div>
    )
}

export default UserPanel
