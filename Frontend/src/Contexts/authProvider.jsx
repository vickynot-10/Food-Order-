import axios from "axios";
import { useContext,createContext,useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [isLoggedIn,setisLoggedIn]=useState(false);
    const [username,setuserName]=useState('');
    const [userIDAuth,setuserIDAuth]=useState('')
    const [userPhoneAuth,setuserPhoneAuth]=useState(0)
    const [userRealNameAuth,setuserRealNameAuth]=useState('')
    useEffect(()=>{
        async function fetchData() {
            try{
                const res =await axios.get('http://localhost:4040/user/me',{
                    withCredentials:true
                } );
                if(!res || !res.data ){
                    throw new Error("Response was not ok");
                }
                if(res.data.isLoggedIn===true){
                    setisLoggedIn(true);
                    setuserName(res.data.userdata.name)
                    setuserIDAuth(res.data.userdata._id)
                    setuserRealNameAuth(res.data.userdata.user_name);
                    setuserPhoneAuth(res.data.userdata.mobile_no);
                }

            }
            catch(err){
                setisLoggedIn(false);
            }
        }
        fetchData();
    },[])
    return(
        <AuthContext.Provider value={{isLoggedIn,setuserName,username,setisLoggedIn,
            setuserIDAuth,userIDAuth,userPhoneAuth,userRealNameAuth


        }}  >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext)