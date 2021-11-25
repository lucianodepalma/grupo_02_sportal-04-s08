import { createContext } from "react";

const StatusContext = createContext({
    status: 'productos',
    paginado: {paginaActual:1,ultimaPagina:1},
    setStatus: (estado) => {},
    setPaginado: (pagina) => {}
});


export default StatusContext;