import { createContext } from "react";

const StatusContext = createContext({
    status: 'productos',
    paginaActual: 1,
    setStatus: (estado) => {},
    setPaginado: (pagina) => {}
});


export default StatusContext;