import { useCart } from "../../Contexts/cartContext"
import './buynow.css';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import AddOutlined from '@mui/icons-material/AddOutlined';
import Star from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo,useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/CloseOutlined';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { useNav } from "../../Contexts/context";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
export function BuyPage(){
    const {setActive} = useNav();
    setActive('delivery')
    const navigation=useNavigate();
    let {cartItems,setCartItems,setTotalCost } = useCart();
    const [isopen,setopen]=useState(true)
    function DisplayOFFSnackBar(){
        setopen(false);
        setCartItems([]);
    }
    function IncrementCost(key){
        setCartItems(
            prev =>{
                const prevIndex =prev.findIndex(item => item.id === key.id )
                if(prevIndex  !== -1){
                    let updateArr = [...prev];
                    updateArr[prevIndex]={
                        ...updateArr[prevIndex],
                        quantity : parseInt( updateArr[prevIndex].quantity + 1 )
                    }
                    return updateArr;
                }
                return [...prev,{
                    id: key.id,
                    Foodname : key.Foodname,
                    cost : key.cost,
                    quantity : 1,
                }]
        }
        )
        setopen(true)
    }
    function DecrementCost(key){
        
        setCartItems(
            prev=>{
                let previndex =prev.findIndex(item=> item.id === key.id)
                if(previndex !== -1){
                    let updateArr = [...prev];
                    updateArr[previndex]={
                        ...updateArr[previndex],
                        quantity : parseInt( updateArr[previndex].quantity - 1  )
                    }
                    if(updateArr[previndex].quantity <=0){
                        return updateArr.filter(item => item.id !== key.id);
                    }
                    return updateArr;            
                }
                return prev
            }
        );
        setopen(true)
    }
     const total=useMemo(()=>{
        if (!Array.isArray(cartItems)) {
            return 0;
        }
        return cartItems.reduce((total, item) => 
            total + (item.quantity * item.cost), 0)
    })
    useEffect(()=>{
        setTotalCost(total)
    },[total])

    function DeleteRow(key){
        setCartItems(prev=>{
           return prev.filter(item=>item.id !== key.id)
        })
    }
    return(
        <div id="buypage-container">
            <div id="buypage-contents">
                {
                    cartItems.length <=0 ? 
                    <div style={{
                        display:'flex',flexDirection:'row',alignItems:'center'
                    }}> 
                    <p
                    style={{
                        fontSize:'clamp(10px,1vw,20px)'
                    }}
                    
                    >Your Cart is empty , Click here to explore foods  </p>
                    <IconButton
                    onClick={
                        ()=>{
                            navigation('/delivery')
                        }
                    }
                    
                    >
                        <AddShoppingCartIcon
                        sx={{
                            fontSize:{
                                xs:16 , sm:18,md:20,lg:22
                            }
                        }}
                        
                        />
                    </IconButton>
                     </div>
                    
                    : <>
            {cartItems.map((val,ind)=>{
                return <div id="buynowfood-contents" key={ind}>
                    <div id="img-div-ind">
                        <img src={  
                        val.Foodname==="ice_cream" ? `../../Assests/Foodimages/icecream${val.index+1}.jpg`
                        :
                        `../../Assests/Foodimages/${val.Foodname}${val.index+1}.jpg`
                        } alt="food-img" />
                        
                    </div>
                    
                    <div id="buy-food-details" >
                       <div id="buyfood-details-1" >
                            <div>
                                <p id="buynow-hotelname" > {val.hotelName!=null ? val.hotelName.replace(/_/g,' ') : val.hotelName  } </p>
                            </div>
                            <div id='hotel-ratings-div-buynow'>
                                        <p id="hotel-ratings-buynow"> {val.ratings} </p>
                                        <span>
                                        <Star  sx={{
                                            color:"white",
                                            fontSize:'12px'
                                           
                                        }}  />
                                        </span>
                            </div>
                        </div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center' ,flexDirection:'column' }}>
                            <p style={{ color:'#696969',fontSize:'18px',textTransform:'capitalize'  }} > {val.Foodname} </p>
                          <p style={{ color:'#696969' ,fontSize:'18px',textTransform:'capitalize' }} >₹{val.cost} </p>
                        </div>
                    </div>
                    <div id="buy-food-quantity">
                        <div id="quantity-btn-design-div">
                            <span onClick={()=>DecrementCost(val)}> <RemoveOutlinedIcon sx={{
                                color:'#EF4F5F' , cursor:'pointer'
                            }}  /> </span>
                            <span> {val.quantity} </span>
                            <span onClick={()=>IncrementCost(val)} > <AddOutlined sx={{
                                color:'#EF4F5F' ,cursor:'pointer'
                            }} /> </span>
                            
                        </div>
                        <p> {`₹${val.quantity * val.cost} `} </p>
                    </div> 
                    <div id="delete-icon-buy"
                    style={{display:'flex',justifyContent:'center',marginTop:'30px'
                    }}
                    > 
                        <DeleteIcon 
                        onClick={()=>DeleteRow(val)}
                        sx={{
                            fontSize:{
                                xs:'28px',sm:'26px',md:'24px',lg:'24px'
                            },
                            cursor:'pointer',color:'#696969'
                        }} />
                    </div>           
                </div>       
                })
            }
            <div>
                <Snackbar          
         anchorOrigin={{vertical:'bottom' , horizontal:'center'}} open={isopen} 
         autoHideDuration={null}
         
             message={`Total : ${total}`}
        
        
         
         action={
            <>
            <IconButton
            onClick={
                ()=>{
                    navigation('/delivery-page')
                }
            }
            
            >
            <NavigateNext sx={{
                color:'white'
            }} /> </IconButton>
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
            </div>
            </>
            }
            </div>
        </div>
    )
}