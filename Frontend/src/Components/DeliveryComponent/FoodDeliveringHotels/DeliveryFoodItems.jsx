
import './FoodItemDeliver.css';
import { useNavigate, useParams } from "react-router-dom";
import  Star  from "@mui/icons-material/Star";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import AddOutlined from '@mui/icons-material/AddOutlined'
import { useCity } from "../../../Contexts/citySelect";
import { useEffect, useState } from "react";
import  Alert  from "@mui/material/Alert";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import Cart from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useCart } from '../../../Contexts/cartContext';
import { useNav } from '../../../Contexts/context';
export function FoodDeliversItems(){
    const {setActive} = useNav();
    setActive('delivery')
    const [isopen,setopen]=useState(false)
    const [foods,setFoodData]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { item }=useParams();
    let foodName = item.toLowerCase()
    const { AddItems,RemoveItem,setCartItems } = useCart();
    const navigate=useNavigate()
    useEffect(()=>{
        async function fetchdata(){
            try{
            let res = await axios.get(`http://localhost:4040/delivery/food/${foodName}`)
            if(!res || !res.data ){
                throw new Error('Network response was not ok')
             }
            setFoodData(res.data)            
            }catch (err) {
                let errMsg = "Something error occur"
                if(err.response){
                     errMsg = err.response.data
                }
                else if(err.message){
                     errMsg = err.message;
                }
                setError(errMsg);
                
            } finally {
                setLoading(false);
            }
        }
        fetchdata()
    },[foodName]) 
    const [isClick,setClick]=useState({});
    const [quantity,setQuantity]=useState({});
     const [snackBarMsg,setsnackMsg]=useState(0);
    const [showAdd,setAdd]=useState({})
    
    function DisplayOFFSnackBar(){
        Object.keys(showAdd).forEach((key)=>{
            showAdd[key] = true
        })
        Object.keys(quantity).forEach((key)=>{
            quantity[key] = 0
        })
        Object.keys(isClick).forEach((key)=>{
            isClick[key] = false
        })
        setsnackMsg(0)
        setopen(false)
        setCartItems([])
    }
    function AddFood(key,ind) {
          
           setClick(prev => ({ ...prev, [key._id]: true }));
            setAdd(prev => ({ ...prev, [key._id]: false }));
            setQuantity(prev => ({ ...prev, [key._id]: (prev[key._id] || 0) + 1 }));
            setsnackMsg( snackBarMsg + 1 );
            setopen(true);
            AddItems(key,ind)
            
    }
        function IncreaseFood(key,ind) {
            
            setClick(prev => ({ ...prev, [key._id]: true }));
            setAdd(prev => ({ ...prev, [key._id]: false }));
            setQuantity(prev => ({ ...prev, [key._id]: (prev[key._id] || 0) + 1 }));
            setsnackMsg( snackBarMsg + 1 )
            setopen(true);
            AddItems(key,ind)
           
        }
        
        function DecreaseFood(key) {
           setopen(true);
            setsnackMsg( snackBarMsg - 1 )
            setQuantity(prev => {
                const newQuantity = (prev[key._id] || 0) - 1;
                if (newQuantity <= 0) {
                    setClick(prev => ({ ...prev, [key._id]: false }));
                    setAdd(prev => ({ ...prev, [key._id]: true }));
                }
                return { ...prev, [key._id]: Math.max(newQuantity, 0) };
            });
            RemoveItem(key)
        }
    const {selectCity} = useCity()
    function NavigateDeliveryPage(){
        navigate('/delivery-cart');
    }
    return( 
    <>
         <Snackbar 
         message={`${snackBarMsg} items added`}
         anchorOrigin={{vertical:'bottom' , horizontal:'center'}} open={isopen} 
         autoHideDuration={null} action={
            <>
            <IconButton onClick={NavigateDeliveryPage} >
            <Cart sx={{color:'white'}} /> </IconButton>
            <IconButton  onClick={DisplayOFFSnackBar} >
                 <CloseIcon sx={{
                    color:'white'
                 }} />

            </IconButton>
            </>
         }  sx={{
            '.MuiSnackbarContent-root': {
              width: '80vw',
              height: '80px',
              margin:'auto',
              backgroundColor:'#EF4F5F'
             }}} />
            
        <p id="delivery-in-p">{item.slice(0,1).toUpperCase() + item.slice(1).replace(/_/g," ") } Delivery in {selectCity}</p>
         <div id="food-deliver-container">
         {
         loading ? <div style={{
          display:'flex',justifyContent:"center",alignItems:"center"
         }}> <CircularProgress size={100}  />  </div>
        : 
        error ? <Alert variant="filled" severity="error" sx={{
            height:'40px' , width:'auto'
        }} >{error}</Alert> : 
        <>  
           {
                foods.map((key,ind)=>{
                    return  <div id="food-hotel-items" key={ind}>  
                        <div id="add-cart-img-div">
                        <span onClick={ ()=> IncreaseFood(key,ind)} id="plus-icon"> <AddOutlined sx={{
                            color:'#EF4F5F',
                            height:'18px',
                            width:'18px'
                         }} /> </span>
                         { isClick[key._id]!==true ? (                       
                             null
                         ) : (
                            <span id="minus-icon" onClick={ ()=> DecreaseFood(key)} > <RemoveOutlinedIcon sx={{
                                color:'#EF4F5F',
                                height:'18px',
                                width:'18px'
                             }} /> </span>
                         )
                         }
                         <img src={
                            key.Foodname==="ice_cream" ? `${key.img}/icecream${ind+1}.jpg`
                            :
                            `${key.img}/${key.Foodname}${ind+1}.jpg`} alt="img" />
                        
                         <div  onClick={ ()=> AddFood(key,ind)} id="add-food-btn">
                             {showAdd[key._id]!==false ? (
                                <span>ADD</span>
                            ) : (
                                <span> {quantity[key._id]} </span>
                            ) }
                        
                            </div>         
                         </div>
                        <div id="food-hotel-subdiv"> 
                            <div id="food-hotel-subdivs-1">
                           
                                <p id="hotel-name" > {key.hotelName.replace(/_/g,' ')} </p>
                                <p id="hotel-types"> {key.types} </p>
                            </div>
                            <div id="food-hotel-subdivs-2">
                                <div id='hotel-ratings-div'>
                                        <p id="hotel-ratings"> {key.ratings} </p>
                                        <span>
                                        <Star  sx={{
                                            color:"white",
                                            fontSize:'12px'
                                           
                                        }}  />
                                        </span>
                                     </div>
                                <p id="hotel-cost"> {key.cost} </p>
                            </div> 
                        </div>
                    </div>
                })
            }
            </>
        }
        </div>
    </>
    )
}