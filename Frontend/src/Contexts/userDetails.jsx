import { createContext,useContext,useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({children})=>{
   const [userName,setUsername]=useState('');
    const [userRealName,setUserRealname] = useState("");
    const [userPhoneNum,setPhoneNum]=useState("");
    const [userId,setUserid]=useState('')

    return(
        <userContext.Provider value={
           { userId,setUserid, userName,setPhoneNum,userRealName,userPhoneNum,setUserRealname,setUsername }
        } >
            {children}

        </userContext.Provider>
    )
}
export const useUserData = ()=> useContext(userContext)