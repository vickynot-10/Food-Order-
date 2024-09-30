import './header.css';
import  SearchOutlined  from '@mui/icons-material/SearchOutlined';
import  Room  from '@mui/icons-material/Room';
import { useCity } from '../../Contexts/citySelect';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import VisibleOn from '@mui/icons-material/Visibility'
import VisibleOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion'

import Alert from '@mui/material/Alert';
import Navigatenext from '@mui/icons-material/NavigateNext'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close'
import { Dialog,DialogContent,DialogTitle } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useUserData } from '../../Contexts/userDetails';
import  Star  from "@mui/icons-material/Star";
import Snackbar from '@mui/material/Snackbar';


import { useAuth } from '../../Contexts/authProvider';



export function Header(){

    const {isLoggedIn,username,setuserName,setisLoggedIn} = useAuth();
    const [isSignupLoggedin , setIsSignupLoggedin]=useState(false);
    const [locationerr,setlocationerr]=useState({
        "data": "", "isTrue" : false , 'snackbar': true
    })
    let PassEl=useRef(null);
    const [errSnackbar,seterrSnackbar]=useState(true)
    const [isLogouterr,setisLogoutErr]=useState(false);
    let searchEl = useRef(null);
    let divEl=useRef(null);
    let navigate=useNavigate();
    let {setPhoneNum, setUserid,setUserRealname} = useUserData();
    const {selectCity,setCity} = useCity();
    const [showSecondForm,setSecondForm]=useState(false);
   const [formDetails,setFormDetails]=useState({
    name : '',
    mail:'',
    password:'',
    user_name:'',
    mobile_no:''
   });
   const [loginForm,setloginForm]=useState({
    nameLogin:'',
    passwordLogin : ''
   })
   const [errorData,setErrorData]= useState("");
   
   
   const [locationValue,setLocationvalue] =useState({
    value:'get_location',
    isSet : false
   })
   
   const [showAlert,setAlert]=useState(false)
    const [isOpen,setopen]=useState(false);
    const [isSignForm,setSignForm]=useState(false)
    const [isVisible,setvisible]=useState(false)
    const [logouterr,setlogouterr]=useState("")
    const [successalert,setSucessalert]=useState(false);
    const [searchFood,setSearchFood]=useState([]);
    const [searchItem,setSearchItem]=useState('')
    const [searchHotel,setSearchHotel]=useState([]);
    const [searchError,setSearchError]=useState('');
    const [isErrorSearch,setIsSearchError]=useState(false);
    const [isLoading,setLoading]=useState(true)
    const [loadingInput,setInputLoading]=useState(false);
    const[isBlur,setBlur]=useState(true);

    useEffect(()=>{
        function offDiv(e){
            if (divEl.current && !divEl.current.contains(e.target)) {
                setBlur(true);
              }
        }
        document.addEventListener('mousedown',offDiv);
        return ()=>{
            document.removeEventListener('mousedown',offDiv);
        }

    },[])

    

    function timerAlert(){
        setSucessalert(true);
        setTimeout(()=>{
            setSucessalert(false)
        },5000)
    }
    function redirectFoodOrder(str){
        let foodname = str.toLowerCase();
        setBlur(true)
        navigate(`/delivery/food/${foodname}`);
        searchEl.current.value="";
    }
    
    function SaveDetails(e){
        let val=e.target.value;
        let nameVal= e.target.name;
        setFormDetails(prev=>(
            {
                ...prev,
                [nameVal]:val
            }
        ))
        
    }
    function SaveLoginDetails(e){
        let val=e.target.value;
        let nameVal= e.target.name;
        setloginForm(prev=>(
            {
                ...prev,
                [nameVal]:val
            }
        ))
    }
    async function Logout(){
        try{
            const res=await axios.post('http://localhost:4040/logout');
            if(!res){
                throw new Error("Error while logging out")
            }
            if(res.data.isLogout === true){
                setisLoggedIn(false)
                navigate('/delivery')
                
            }
        }
        catch(e){
            let errMsg = e.message || "An error occured while Logging out ";
            setlogouterr(errMsg)
            setisLogoutErr(true)
        }
            }

    function Offalert(){
        setAlert(false)
    }
     async function HandleForm(e){   
        e.preventDefault();
        setInputLoading(true)
        try{
            if(!formDetails.name ||  !formDetails.mail ){
                throw new Error('Please Enter Details')
            }
            if( formDetails.mail.length <= 0  || formDetails.name.length <= 0 ){
                throw new Error('Please Enter Details') 
            }
            
            const EmailExp = /^[a-zA-Z][a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$/ 
            if(!EmailExp.test(formDetails.mail)){
                throw new Error("Invalid Mail , Add characters such as @");
            }
            const res= await axios.get('http://localhost:4040/register',{
                params :{
                    "name" : formDetails.name
                }
            });
            if(!res || !res.data){
                throw new Error("Network response was not ok")
            }
            if( res.data === "OK"){
                setSecondForm(true);
                timerAlert();
                setAlert(false)
            }
        }
        catch(err){
            let errorMessage =  err.message || 'An error occurred';
            if(err.response){
                errorMessage=err.response.data;
            }
            setErrorData(errorMessage)
    
            setAlert(true)
        }
        finally{
            setInputLoading(false)
        }

    }

    async function HandleSecondSignup(e) {
        e.preventDefault()

        try{
            if(!formDetails.mobile_no || !formDetails.user_name || !formDetails.password ){
                throw new Error("Please Enter Details");
            }
            if( formDetails.user_name.length <= 0 || formDetails.user_name.length <= 4){
                throw new Error("Name should more than 4 characters long")
            }
            if( formDetails.mobile_no.length <= 0 || formDetails.mobile_no.length <= 8){
                throw new Error("Mobile Number should more than 8 characters long")
            }
            if( formDetails.password.length <= 0 || formDetails.password.length <= 8){
                throw new Error("Password should more than 8 characters long")
            }
            const res= await axios.post(`http://localhost:4040/register2/`,{
                "username" :formDetails.name ,
                "mail" : formDetails.mail,
                "mobile_no" : formDetails.mobile_no,
                "userRealname": formDetails.user_name,
                "password":formDetails.password
            });
            if(!res || !res.data){
                throw new Error("Network response was not ok")
            }
            if(res.data){
                setIsSignupLoggedin(true)
                setuserName(res.data.name);
                setUserid(res.data.data._id);
                setUserRealname(res.data.user_name);
                setPhoneNum(res.data.phone_num);
                timerAlert();
                setAlert(false)
                setSignForm(false)
            }
        }
        catch(err){
            let errorMessage =  err.message || 'An error occurred';
            if(err.response){
                errorMessage=err.response.data;
            }
            setErrorData(errorMessage)
    
            setAlert(true)
        }
        
        finally{
            setInputLoading(false)
        }
        
    }

    function getLoaction(){
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(fetchipdata,(err)=>{
        setlocationerr( {
            data : err.message || "An error occured",
            isTrue : true,
            snackbar:false
        } )
    })
    }
    else{
        setlocationerr( {
            data : "Geolocation doesnt support in your browser",
            isTrue : true,
            snackbar:true
        } )

    }

   async function fetchipdata(position){   
        const { latitude, longitude } = position.coords;
        try{
        const apiKey =process.env.REACT_APP_IPDATA_APIKEY
        const response = await axios.get(`https://api.ipdata.co?api-key=${apiKey}&lat=${latitude}&lon=${longitude}`);
        if(!response || !response.data ){
            throw new Error("Error on getting Location");
        }
        if(response.status===200){
            setLocationvalue( { value: response.data.region ,isSet:true } );
            setCity(response.data.region)
        }
        }
        catch(e){
            let errMsg = e.message || "An error occured";
            if(e.response){
                errMsg = e.response.data
            }
            setlocationerr( {
                data : errMsg,
                isTrue : true,
                snackbar:true
            } )
    }
    }
    }
    async function LoginFormSubmit(e) {
        e.preventDefault();

        
        try{
            if(!loginForm.nameLogin || !loginForm.passwordLogin){
                throw new Error('Please Enter Details')
                
            }if(loginForm.nameLogin.length <= 0 || loginForm.passwordLogin.length <= 0){
                return setErrorData("Please Enter Details");
            }
            const res= await axios.post('http://localhost:4040/login',loginForm ,{
                withCredentials : true
            });
            if(!res || !res.data){
                throw new Error('Response is not ok')
            }
            if(res.data.isLoggedin===true){
                setisLoggedIn(true);
                setuserName(res.data.data.name)
                setUserid(res.data.data._id);
                window.location.href='/delivery'
                setopen(false)
                timerAlert();
            }
            setloginForm({
                nameLogin:'',
                passwordLogin : ''
            })
        }
        catch(err){
            let errMsg = err.message || "An error occured";
            if(err.response){
                errMsg = err.response.data
            }
            setErrorData(errMsg)
            setAlert(true)
    
        }
        finally{
            setInputLoading(false)
        }
    }
    function DisplayLoginForm(){
        setopen(true)
    }
    function OffLoginForm(){
        setopen(false);
        setAlert(false)
    }
    function DisplaySignUpForm(){
        setSignForm(true)
    }
    async function OffSignUpForm(){
        setSecondForm(false)
        setSignForm(false);
        setAlert(false);

        
    }
    function SettingCity(e){
        if(e.target.value === 'get_location'){
            getLoaction();
            return;
        } 
        setCity(e.target.value);
    }
    async function SearchingItems(e){
        let str=e.target.value;
        setSearchItem(str)
        if(str.length <= 0 ){     
            setBlur(true) 
            setLoading(false) 
            setIsSearchError(false)
            return;
        }
        else{
            setLoading(true)
            setBlur(false)
        }
        try{
        let res= await axios.get(`http://localhost:4040/foodSearch`,{
            params:{
                Searchfoodname : str
            }
        });
        if(!res || !res.data ){
            setLoading(false);
            throw new Error('Network response was not ok');
           }
        if(res.data.Food){
            setLoading(false)
            setIsSearchError(false)
            setSearchFood(res.data.Food);
        }
        if(res.data.Hotel){
            setLoading(false)
            setIsSearchError(false)
            setSearchHotel(res.data.Hotel);
        }        
    }catch(e){
        setLoading(false)
        setIsSearchError(true)
        let errorMessage =  e.message || 'An error occurred';
        if(e.response){
            errorMessage=e.response.data;
        }
        setSearchError(errorMessage);
    }
    finally{
        setLoading(false)
      }
    }
    function VisibleToggle(){
        setvisible(!isVisible);
        PassEl.current.type=isVisible ? 'password' : 'text';
    }
    
    
    return ( 
        <div id="header-container">
           
          {/*LOGIN FORM DESIGN */} 
             <Dialog
                onClose={OffLoginForm}
                PaperProps={{
                    style:{
                        minWidth:'300px',minHeight:'400px',height:'auto',width:'auto'
                    }
                }}
                open={isOpen}
                >
                    <DialogTitle>
                        <div style={{
                        display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'
                        }}>
                            <p style={{
                                color:'#4F4F4F',fontSize:'30px',margin:'0px',padding:'8px'
                            }}>Log in</p>
                            <IconButton onClick={OffLoginForm} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        </DialogTitle>
                    <DialogContent>
                          <form onSubmit={LoginFormSubmit}>                           
                            <div
                        style={{
                            display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'
                        }}
                        >
                            <input type='text'
                            id='login-input-box' 
                            value={loginForm.nameLogin} 
                            
                            name='nameLogin' onChange={SaveLoginDetails}  placeholder='Username or E-mail' />
                            <div style={{
                                position:'relative',top:'0%',left:'0%'
                            }}>
                                <input ref={PassEl} 
                                id='password-login-box'
                                type='password' 
                              
                              value={loginForm.passwordLogin}
                                
                                onChange={SaveLoginDetails} name='passwordLogin'  placeholder='Password' />
                                {
                                    isVisible ? <IconButton onClick={VisibleToggle} sx={{
                                        position:'absolute',top:'50%' , left:'95%',transform:'translate(-95%,-50%)' , cursor:'poiner'
                                    }} > 
                                    <VisibleOn   /> </IconButton> :
                                     <IconButton onClick={VisibleToggle} sx={{
                                        position:'absolute',top:'50%' , left:'95%',transform:'translate(-95%,-50%)' , cursor:'poiner'
                                    }}>
                                    <VisibleOff /> </IconButton>
                                }
                             </div>
                        { showAlert ? 
                    <Alert variant="filled" sx={{
                        display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',
                        margin:'10px 0',height:'30px' ,width:'auto' ,fontSize:'10px' , borderRadius:'10px'
                    }}  severity="error">
                        {errorData}
                        <IconButton onClick={Offalert}>
                            <CloseIcon sx={{
                                color:'white'
                            }} />
                        </IconButton>
                    </Alert> : successalert ?
                    <Alert variant="filled" severity="success">
                    This is a filled success Alert.
                  </Alert> : null
                        }
                            <input type='submit' style={{
                                 width:'200px',height:'50px',backgroundColor:'#EF4F5F',
                                 border:'unset',color:'white',padding:'8px',borderRadius:'10px',
                                 cursor:'pointer'
                            }} />
                            </div>
                        </form>
                        <div style={{
                            display:'flex',justifyContent:'unset',alignItems:'center'
                        }}>
                            <p 
                            style={{
                                color:'#4F4F4F'
                            }}
                            >New to Tomato ?</p>
                            <button
                            style={{
                                border:'unset',backgroundColor:'unset',cursor:'pointer',
                                color:'#4F4F4F', fontSize:'15px'
                            }}
                            onClick={DisplaySignUpForm}
                            
                            >Create an Account</button>
                        </div>
                    </DialogContent>
                </Dialog> 

        {/*SIGN UP FORM DESIGN */}

        <Dialog
                PaperProps={{
                    style:{
                        minWidth:'300px', minHeight:'450px' ,height:'auto',width:'auto'
                    }
                }}
                
                open={isSignForm}
                onClose={OffSignUpForm}
                >
                    <DialogTitle>
                        <div style={{
                        display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'
                        }}>
                            <p style={{
                                color:'#4F4F4F',fontSize:'30px',margin:'0px',padding:'8px'
                            }}>Sign Up</p>
                            <IconButton onClick={OffSignUpForm} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        </DialogTitle>
                    <DialogContent>{
                    showSecondForm ? 
                    // Second form
                  
                  <form onSubmit={HandleSecondSignup} >
                    <div
                style={{
                    display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'
                }}
                >
                    <input type='text' 
                    id='register-name-input'
                    name='user_name' 
                    onChange={SaveDetails} value={formDetails.user_name}  placeholder='Name' />

                    <div style={{
                        position:'relative',top:'0%',left:'0%'
                    }}>
                        <input ref={PassEl} 
                        id='register-password-input'
                        
                        onChange={SaveDetails} value={formDetails.password}  type='password' name='password'  placeholder='Password' />
                        {
                            isVisible ? <IconButton onClick={VisibleToggle} sx={{
                                position:'absolute',top:'50%' , left:'95%',transform:'translate(-95%,-50%)' , cursor:'poiner'
                            }} > 
                            <VisibleOn   /> </IconButton> :
                             <IconButton onClick={VisibleToggle} sx={{
                                position:'absolute',top:'50%' , left:'95%',transform:'translate(-95%,-50%)' , cursor:'poiner'
                            }}>
                            <VisibleOff /> </IconButton>

                        }
                     </div>



                    <input type='text'
                    id='register-mail-input'
                    name='mobile_no' onChange={SaveDetails} value={formDetails.mobile_no} placeholder='Mobile Number' />
                     <div
                     style={{
                        display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
                     }}
                     > 
                     {
                showAlert ? 
            <Alert variant="filled" sx={{
                display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',
                margin:'10px 0',height:'30px' ,width:'auto' ,fontSize:'10px' , borderRadius:'10px'
            }}  severity="error">
                {errorData}
                <IconButton onClick={Offalert}>
                    <CloseIcon sx={{
                        color:'white'
                    }} />
                </IconButton>
            </Alert> : null
                }
                </div>
                    <input type='submit' style={{
                        margin:'10px 0 0 0',
                         width:'200px',height:'50px',backgroundColor:'#EF4F5F',
                         border:'unset',color:'white',padding:'8px',borderRadius:'10px',
                         cursor:'pointer'
                    }} />
                    </div>
                </form>
                    :
                    
                //  First Sign up Form  
                    <form onSubmit={HandleForm} >
                    <div
                style={{
                    display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'
                }}
                >
                    <input type='text' 
                    id='register-name-input'
                    
                    name='name' 
                    onChange={SaveDetails} value={formDetails.name}  placeholder='Username' />

                    <input type='text'
                    id='register-mail-input'
                    
                     name='mail' onChange={SaveDetails} value={formDetails.mail} placeholder='E-mail' />
                    
                    
                     <div
                     style={{
                        display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
                     }}
                     > 
                     {
                showAlert ? 
            <Alert variant="filled" sx={{
                display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',
                margin:'10px 0',height:'30px' ,width:'auto' ,fontSize:'10px' , borderRadius:'10px'
            }}  severity="error">
                {errorData}
                <IconButton onClick={Offalert}>
                    <CloseIcon sx={{
                        color:'white'
                    }} />
                </IconButton>
            </Alert> : null
                }
                </div>
                    <button type='submit'     
                  style={{
                    margin:'10px 0 0 0',
                         width:'200px',height:'50px',backgroundColor:'#EF4F5F',
                         border:'unset',color:'white',padding:'8px',borderRadius:'10px',
                         cursor:'pointer'
                    }}>  {  loadingInput ? <CircularProgress size={25} /> : "Next"   } </button>
                    </div>
                </form>
                    }
                          
                        <div style={{
                            display:'flex',justifyContent:'unset',alignItems:'center'
                        }}>
                            <p 
                            style={{
                                color:'#4F4F4F'
                            }}
                            >Already Have an Account ?</p>
                            <button
                            style={{
                                border:'unset',backgroundColor:'unset',cursor:'pointer',
                                color:'#4F4F4F', fontSize:'15px'
                            }}
                            onClick={DisplayLoginForm}
                            >Log In</button>
                        </div>
                    </DialogContent>
                </Dialog> 
            
                <p id='tomato-header'>Tomato</p>
                <div id='input-boxes'>   
                    <div id='select-elem-container'>
                        <div id='search-input-entire-div'>
                     <div id='select-tag-div'> 
                    <FormControl sx={{ m: 1  }}>
                     <InputLabel>City</InputLabel>
                        <Select
                        defaultValue=" "
                        value={selectCity}
                        onChange={SettingCity}
                        autoWidth
                        label="City"
                        IconComponent={()=> <span /> }
                        sx={{
                            width:{
                                xs:'90px',sm:'150px',md:'150px',lg:'150px'
                            }
                        }}
                        >
                    <MenuItem 
                    value={
                        locationValue.isSet ? locationValue.value : 'get_location'
                    }    >
                        {locationValue.isSet ? locationValue.value : "Get Your Location" }
                    </MenuItem>
                    <MenuItem value="City 1">City 1</MenuItem>
                    <MenuItem value="City 2">City 2</MenuItem>
                    <MenuItem value="City 3">City 3</MenuItem>
                  </Select>
                 </FormControl>
                          <span id='location-icon'><Room /></span>
                           </div>
                           <div id='search-item-input-container'>
                                <div id='search-input-container'>
                                    <input type='text'
                                    ref={searchEl}                           
                                    onClick={ ()=>{
                                        setLoading(true)
                                        setBlur(false) } }
                                   id='search-input' onChange={SearchingItems}
                                    placeholder='Search for Restaurant or Dish'
                                    />
                                    <span id='search-glass'><SearchOutlined /> </span>
                                </div>{
                                    isBlur!==true ? (
                                        <div id='search-items-container' 
                                        ref={divEl}
                                        >        
                                        {  isLoading ? <div style={{
                                            marginTop:'30px',
                                     display:'flex',justifyContent:"center",alignItems:"center"
                                     }}> <CircularProgress size={50}  />  </div> 
             
                                                :
                                    
                                        isErrorSearch ?                                      
                                            <Alert variant="filled" severity="error">
                                                 {searchError}  
                                            </Alert>                                   
                                        : searchItem.length > 0 &&
                                        <>
                                            {searchHotel.map((val,ind)=>{
                                                    return <div key={ind}>
                                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem alignItems="flex-start">
                                                      <ListItemAvatar>
                                                        <Avatar
                                                         sx={{
                                                            width:'50px',height:'50px'
                                                        }}
                                                       
                                                        
                                                        src={`${val.img}.jpg`} alt={val.hotelName}  />
                                                      </ListItemAvatar>
                                                      <ListItemText
                                                      sx={{
                                                        textTransform:'capitalize'
                                                      }}
                                                        primary={val.hotelName.replace(/_/g,' ')}
                                                        secondary={
                                                          <>
                                                            <Typography  
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: 'text.primary', display: 'inline' }}
                                                            >
                                                            {val.avgCost}                        
                                                            </Typography>
                                                         </>
                                                        }
                                                      />
                                                      </ListItem>
                                                      <div id='order-now-search'>
                                                            <button>Order Now</button>
                                                            <motion.div                                                      
                                                            whileHover={{
                                                                x:10
                                                            }}
                                                            
                                                            >
                                                                <Navigatenext                                                           
                                                                sx={{
                                                                   margin:'5px 0',
                                                                    cursor:'pointer'
                                                                }}
                                                             />
                                                             </motion.div>
                                                             </div>
                                                      <Divider variant="inset" component="li" />
                                                      </List>
                                                      </div>
                                                  
                                                })
                                            }
                                            {
                                                searchFood.map((val,ind)=>{
                                                    return  <div key={ind}>
                                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem alignItems="flex-start">
                                                      <ListItemAvatar>
                                                        <Avatar
                                                        sx={{
                                                            width:'50px',height:'50px'
                                                        }}
                                                        
                                                        src={val.Foodname==="ice_cream" ? `${val.img}/icecream${ind+1}.jpg`
                                                                :
                                                            `${val.img}/${val.Foodname}${ind+1}.jpg`}  alt={val.hotelName}  />
                                                      </ListItemAvatar>
                                                      <ListItemText
                                                        primary={val.hotelName.replace(/_/g,' ')}
                                                        secondary={
                                                          <>
                                                            <Typography
                                                              component="span"
                                                              variant="body2"
                                                              sx={{ color: 'text.primary', display: 'inline' , textTransform:'capitalize' }}
                                                            >
                                                              {val.Foodname.replace(/_/g,' ') }
                                                            </Typography>
                                                            <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{
                                                                display:'inline', marginLeft:'15px'
                                                            }}  >
                                                            ₹ {val.cost}
                                                            </Typography>
                                                            </>
                                                        }
                                                      />
                                                      <div id='hotel-ratings-search-div'>
                                                     <p id="hotel-search-ratings"> {val.ratings} </p>
                                                    <span>
                                                    <Star  sx={{
                                                    color:"white",
                                                    fontSize   :'12px'
                                           
                                                        }}  />
                                                    </span>
                                                    </div>
                                                      </ListItem>
                                                      <div id='order-now-search'>
                                                            <button
                                                            onClick={ ()=>redirectFoodOrder(val.Foodname)  }
                                                            
                                                            >Order Now</button>
                                                            <motion.div                                                      
                                                            whileHover={{
                                                                x:10
                                                            }}
                                                            
                                                            >
                                                                <Navigatenext                                                           
                                                                sx={{
                                                                   margin:'5px 0',
                                                                    cursor:'pointer'
                                                                }}
                                                             />
                                                             </motion.div>
                                                             </div>
                                                      <Divider variant="inset" component="li" />
                                                      </List>
                                                      </div>
                                                  
                                                })
                                            }
                                            </>
                                            
                                        }
                                    </div>
                                    ) : null
                                }                                                                   
                            </div>
                        </div>
                    </div>              
                </div>

                <div id='login-controls'>
                    {
                    isLoggedIn || isSignupLoggedin ? <>
                        <p id='username-login' > {username} </p>
                        <p id='signout-p' onClick={Logout} >Sign out</p>
                        </> : 
                    <>
                <p id='login-p' onClick={DisplayLoginForm}>Log in</p>
                <p id='signup-p' onClick={DisplaySignUpForm} >Sign up</p>
                </>
                }
                </div> 
                {
                    locationerr.isTrue ? <>
                    <Snackbar 
                    open={locationerr.snackbar}
                    anchorOrigin={{
                        vertical:'center' , horizontal: 'center'
                    }}
                    autoHideDuration={3000}
                    message={locationerr.data}
                    action={
                        <IconButton onClick={ ()=>{
                            setlocationerr(prev=>({
                                ...prev,
                                snackbar:false
                            }))
                        }  }>
                          <CloseIcon sx={{
                            color:'white'
                          }} />
                        </IconButton>
                      }
                    
                    />
                    </> : null
                }              
                {
                    isLogouterr  ? <>
                    <Snackbar 
                    anchorOrigin={{
                        vertical:'center' , horizontal: 'center'
                    }}
                    open={errSnackbar}
                    autoHideDuration={3000}
                    message={logouterr}
                    action={
                        <IconButton onClick={ ()=>{
                            seterrSnackbar(false)
                        }  }>
                          <CloseIcon sx={{
                            color:'white'
                          }} />
                        </IconButton>
                      }
                    
                    />
                    </> : null
                }
        </div>
        
    )
}