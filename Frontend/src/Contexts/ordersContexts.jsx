import {  createContext,useContext, useState } from "react";

const Ordercontext = createContext();

export const OrdercontextProvider =({children})=>{
    const [ordersData,setOrderData]=useState({})
    return (
        <Ordercontext.Provider value={{setOrderData,ordersData}} >
        {children}
        </Ordercontext.Provider>
    )
}

export const useOrder =() => useContext(Ordercontext)