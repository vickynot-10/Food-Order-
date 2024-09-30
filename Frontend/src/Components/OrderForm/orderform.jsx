import './orderform.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CallIcon from '@mui/icons-material/Call';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useUserData } from '../../Contexts/userDetails';
import { useCart } from '../../Contexts/cartContext';
import Snackbar from '@mui/material/Snackbar';

import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close'
import SnackbarContent from '@mui/material/SnackbarContent';
import { useEffect, useRef, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useNav } from '../../Contexts/context';
import { useOrder } from '../../Contexts/ordersContexts';
import { useAuth } from '../../Contexts/authProvider';
export function OrderForm(){
    const {setActive} = useNav();
    setActive('delivery')
    
    let {setOrderData} = useOrder()
    const [errordata,setErrordata]=useState("")
    const [snakcbarErr,setSnackbarer]=useState(false)
    const [iserror,setisError]=useState(false) 
    const navigate=useNavigate();
    const {userIDAuth,userPhoneAuth,userRealNameAuth} = useAuth();
    const [Modalopen, setModalOpen] = useState(false);
    const [userdata,setuserData]=useState({
        name :'',
        phone:'',
        address:''
    })
    const [isopen,setopen]=useState(true)

    let {totalCost,cartItems,setCartItems} = useCart();
    useEffect(()=>{
        function addData(){
            setuserData({
                name : userRealNameAuth,phone : userPhoneAuth,address:' '

            })
        }
        addData()
    },[userPhoneAuth])

    async function PlaceOrder(e){
        e.preventDefault();
        try{
            if( !userdata.name ){
                throw new Error("Please Enter your name")
            }
            if(isNaN(userdata.phone)){
                throw new Error("Mobile number should not contain texts")
            }
            if( !userdata.phone ){
                throw new Error("Please Enter your Mobile number ")
            }
            if(userdata.address.length <=5 || !userdata.address ){
                throw new Error("Please Enter your address with atleast 5 characters")
            }
        const res = await axios.post('http://localhost:4040/placeOrder',{
            "userId" : userIDAuth,
            "foodDetails":cartItems
        },{
            withCredentials:true
        }  )
        if(!res || !res.data ){
            throw new Error('Response is not ok')
        }
        setisError(false)
        setOrderData(res.data)
        setModalOpen(true)
        setopen(false)
    const emptycart=  cartItems.map(item=>({       
        id: item._id,
        Foodname : null,
        cost : 0,
        quantity : 0,
        hotelName : null,
        ratings:null,
        index:null,
        hotel_details:null
      }))
      setCartItems(emptycart)
        setTimeout(()=>{
            setModalOpen(false)
            navigate('/delivery')
        },4000) 
    }catch(err){
        let errMsg = err.message || "An error occured";
        if(err.response){
            errMsg = err.response.data || "An error occured"
        }
        
        setSnackbarer(true)
        setErrordata(errMsg);
        setisError(true);
    }
    }
    function offModal(){
        setModalOpen(false)
    }
    function savingDetails(e){
        let keyName = e.target.name;
        let val=e.target.value;
        setuserData(prev=>(
            
            {
                ...prev,
                [keyName]:val
            }
        ) )
    }
    return(
        
        <div id='order-form-container'>
            
            <>
                        <Modal
                            open={Modalopen}
                            onClose={offModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}

                            >
                                <Typography id="modal-modal-title" variant="h6" sx={{
                                    display: 'flex', flexDirection: 'row', alignItems: 'center'
                                }} component="h2">
                                    <CheckCircleOutlinedIcon
                                        sx={{
                                            marginRight: '6px',
                                            color: 'green'
                                        }} /> Order Successfull
                                </Typography>

                            </Box>
                        </Modal>

                    </><>
                            <Snackbar

                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={isopen}
                                autoHideDuration={null}
                                sx={{
                                    '.MuiSnackbarContent-root': {
                                        height: '80px',
                                        width: '50vw',
                                        backgroundColor: '#EF4F5F',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }
                                }}>
                                <SnackbarContent
                                    message={<div style={{
                                        width: '50vw', height: '70px',
                                        display: 'flex', flexDirection: 'row',
                                        alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <p>₹{totalCost}</p>
                                            <p id='total-cost-snack'>TOTAL COST</p>
                                        </div>

                                        <div style={{
                                            display: 'flex', flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <p id='place-order-text'
                                                onClick={PlaceOrder}
                                            >Place Order</p>
                                            <ArrowRightIcon
                                                sx={{
                                                    cursor: 'pointer'
                                                }} />
                                        </div>
                                    </div>} />



                            </Snackbar>


                        </><div id='order-inputs'>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PersonOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField onChange={savingDetails} label="Receiver's Name" name='name'
                                    value={userRealNameAuth || userdata.name}
                                    variant="standard" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Receiver's Mobile Number" name='phone' onChange={savingDetails}
                                    value={userPhoneAuth || userdata.phone}
                                    variant="standard" />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <ArticleOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    value={`Total Bill ₹${totalCost}`}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true
                                    }}
                                    variant="standard" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <HomeOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField name='address'
                                    value={userdata.address}
                                    onChange={savingDetails}
                                    sx={{
                                        width: '200px'
                                    }}
                                    multiline label="Address" variant="standard" />
                            </Box>
                            {
                                 iserror ?    <Snackbar 
                                 anchorOrigin={{
                                     vertical:'center' , horizontal: 'center'
                                 }}
                                 onClose={ ()=> setSnackbarer(false)}
                                 open={snakcbarErr}
                                 autoHideDuration={3000}
                                 message={errordata}
                                 action={
                                     <IconButton onClick={ ()=>{
                                         setSnackbarer(false)
                                     }  }>
                                       <CloseIcon sx={{
                                         color:'white'
                                       }} />
                                     </IconButton>
                                   }
                                 
                                 />  : null                 
                            }
                        </div>
    </div>
    )
}