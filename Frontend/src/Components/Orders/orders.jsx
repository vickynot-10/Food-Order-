import { useEffect,useState } from "react";
import './orders.css';
import axios from "axios";
import AddShoppingCart from "@mui/icons-material/AddShoppingCartOutlined";
import  Alert  from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Contexts/authProvider';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { IconButton } from "@mui/material";
import { useNav } from "../../Contexts/context";
import Button from "@mui/material/Button";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
export function Orders(){
    const {setActive} = useNav();
    useEffect(()=>{
        
    setActive('orders')
    },[])
    
    const navigate=useNavigate();
    const [errorData,setErrorData] = useState("");
    const [isError,setError]=useState(false);
    const [isLoading,setLoading]=useState(true)
    const [completeOrder,setOrder]=useState([])
    
    const {isLoggedIn,setisLoggedIn} = useAuth();
    const [isReverse,setReverse]=useState(false);
    const [isFirstOrder,setIsOrder] = useState(false)
    
    useEffect(()=>{
        async function fetchData(){
            try{
                const res= await axios.get('http://localhost:3000/orders',{
                    withCredentials : true
            })
            if(!res || !res.data){
                throw new Error('Response was not ok');
            }
            if(res.data.isLoggedInobj === true){
                setisLoggedIn(true);
                setOrder(res.data.result)
            }
            if(res.data.isLoggedInobj === true && res.data.firstOrder === true ){
                setIsOrder(true)
            }
           }
        catch(err){
            setError(true);
            let errorMessage =  err.message || 'An error occurred';
          
            if(err.response.data.message){
                errorMessage=err.response.data.message;
            }
          setErrorData(errorMessage)
        }
        finally{
            setLoading(false)
        }
        }
        fetchData()

    },[])

    function ToggleReverse(){
        setReverse(!isReverse)
    }
    const DisplayArr = isReverse ? [...completeOrder].reverse() : completeOrder 

    return(
        <div id="orders-container">
            <Button startIcon={ <FilterAltIcon /> } 
            onClick={ ToggleReverse
            }
            sx={{
                backgroundColor:'transparent',color:'black' , border:'1.5px solid rgb(230, 233, 239)',
                boxShadow:'rgba(28, 28, 28, 0.06) 0px 1.481px 5.924px 0px',
                
                '&:hover':{
                    backgroundColor:'transparent',color:'black'
                }
            }}  >Latest Orders</Button>
            {
                isLoading ? <div style={{
                    display:'flex',justifyContent:'center',alignItems:'center' 
                }} >
                    <CircularProgress size={100} />
                     </div> :
                       isFirstOrder ? <div style={{
                        display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'row'
                    }} >  <p
                    style={{
                        fontSize:'clamp(12px,2vw,20px)'
                    }}
                    >Make your First Order</p> 
                    <IconButton
                    onClick={
                        ()=> navigate('/delivery')
                    }
                    >
                        <AddShoppingCart />
                    </IconButton>
                      </div> :
                  
            
                isError ? <div style={{
                    display:'flex',justifyContent:'center',alignItems:'center'
                }} >
                    <Alert variant="filled" severity="error">
                    {errorData}
                    </Alert>
                     </div> : isLoggedIn ?
            
    <div id="order-page-container-2" >
        <div id="order-page-section" >
            {
                 DisplayArr.map((item,index) =>{
                   return <><div id="order-tab-row" key={index} >
                       <div id="order-tabs">
                           <>
                               {item.orderArr.map(val => {
                                   return val.item_details.map((data,ind) => {
                                       return <div id="order-hotel-section" key={ind} >
                                           <div id="order-hotel-img-div">
                                               <img src={`${data.hotel_details.img}.jpg`} alt="hotel_img" />
                                               <p style={{
                                                   textTransform: 'uppercase', fontWeight: 'bold'
                                               }}> {data.hotel_details.hotelName} , {data.item_name} </p>
                                               <p
                                                   style={{
                                                       textTransform: 'uppercase', fontWeight: 'bold'
                                                   }}
                                               > quantity {data.item_quantity} </p>

                                                <p
                                                   style={{
                                                       textTransform: 'uppercase', fontWeight: 'bold'
                                                   }}
                                               > Per Cost ₹{data.item_cost} </p>
                                           </div>
                                       </div>;
                                   });
                               })}
                           </>
                       
                       </div>
                      

                       <div id="order-food-section">
                           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                               <ShoppingCartOutlinedIcon />
                               <p> {item.status} </p>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                               <AccessTimeOutlinedIcon />
                               <p> {item.ordered_time} </p>
                           </div>

                           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                               <ArticleOutlinedIcon />
                               <p> Total Cost ₹{item.total_cost} </p>
                           </div>
                       </div>
                   </div><div id="order-hr-line"> </div>
                   </>
                })
              
            }
            </div>
            </div> : null
            }
        </div>
    
    )
}