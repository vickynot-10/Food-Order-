import { useContext,createContext,useState } from "react";
const cityContext = createContext();

export const CityNameProvider=({children})=>{
    const [selectCity,setCity] = useState("")
    return (
        <cityContext.Provider value={
            {selectCity,setCity}
        }>
            {children}

        </cityContext.Provider> 
    )
}

export const useCity =()=> useContext(cityContext);