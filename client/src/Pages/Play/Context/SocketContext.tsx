import { createContext, ReactNode, useContext, useState } from "react";

interface Props {
    children? : ReactNode
}

const SocketContext = createContext<any>({});

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children} : Props)
{
    const [socket, setSocket] = useState();

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}