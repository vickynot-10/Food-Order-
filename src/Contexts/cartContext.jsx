import { useContext,createContext,useState } from "react";;

const cartcontext = createContext()

export function CartFunction({children}){
    let [cartItems,setCartItems]=useState([]);
    let [totalCost,setTotalCost]=useState(0)
    
    function AddItems(key,ind){
        setCartItems(
            prev =>{
                const prevIndex =prev.findIndex(item => item.id === key._id )
                if(prevIndex  !== -1){
                    let updateArr = [...prev];
                    updateArr[prevIndex]={
                        ...updateArr[prevIndex],
                        quantity : parseInt( updateArr[prevIndex].quantity + 1 )
                    }
                    return updateArr;
                }
                return [...prev,{
                    
                    id: key._id,
                    Foodname : key.Foodname,
                    cost : key.cost,
                    quantity : 1,
                    hotelName : key.hotelName,
                    ratings:key.ratings,
                    index:ind,
                    hotel_details:key.hotel_details
                    
                }]
    }
        );
    }
    function RemoveItem(key){
      
        setCartItems(
            prev=>{
                let previndex =prev.findIndex(item=> item.id === key._id)
                if(previndex !== -1){
                    let updateArr = [...prev];
                    updateArr[previndex]={
                        ...updateArr[previndex],
                        quantity : parseInt( updateArr[previndex].quantity - 1 )
                    }
                    if(updateArr[previndex].quantity <=0){
                        
                        return updateArr.filter(item => item.id !== key._id);
                    }
                    return updateArr;            
                }
                return prev
            }
        );
        
    }
    return <cartcontext.Provider value={{
        totalCost,setTotalCost,
        cartItems,setCartItems , AddItems , RemoveItem}} >
         {children}
          </cartcontext.Provider>
}

export const useCart = ()=> useContext(cartcontext)