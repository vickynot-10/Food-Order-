import { createContext, useState,useContext } from "react";

export const OptionsContext=createContext();

export function OptionsContextProvider({ children }){
    const [isActive,setActive]=useState('delivery');
    return(
        <OptionsContext.Provider value={ {isActive,setActive} }>
            {children}
        </OptionsContext.Provider>
    )
}
export const useNav = ()=> useContext(OptionsContext)