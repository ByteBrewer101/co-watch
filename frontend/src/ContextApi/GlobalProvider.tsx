import type React from "react";
import { GlobalContext } from "./Contexts";
import { useRef } from "react";

interface ChildrenTypes{
    children:React.ReactNode
}


export function GlobalProvider({children}:ChildrenTypes){


   
    const currSocket = useRef(null);



    

    return <GlobalContext.Provider value={currSocket} >
        {children}
    </GlobalContext.Provider>

}