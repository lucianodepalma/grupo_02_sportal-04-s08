import { createContext } from "react";

const StatusContext = createContext({
    status: 'productos',
    setStatus: (estado) => {}
});


export default StatusContext;