import './diningout.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useCity } from '../../Contexts/citySelect';
import { DiningOutObj } from '../../Data/data';
import Star from '@mui/icons-material/Star';
import  Alert  from '@mui/material/Alert';
import  CircularProgress  from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNav } from '../../Contexts/context';
import axios from 'axios';
export function DiningOut(){
    const {selectCity} = useCity();
    const {setActive} = useNav();
    useEffect(()=>{
        
    setActive('diningout')
    },[])
    const navigate = useNavigate();
    const [isLoading,setLoading]=useState(true)
    const [diningHotelDetails,setDiningHoteldetails]=useState([]);
    const [errordata,setErrorData]=useState('');
    const [isError,setIsError]=useState(false);
    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await axios.get('http://localhost:4040/diningout')
                if(!res || !res.data ){
                    throw new Error("Response was not ok");
                }
                if(res.statusText==='OK' ){
                    setIsError(false)
                    setDiningHoteldetails(res.data)
                }
            }
            catch(e){
                let errMsg = e.message || "An error occured";
                setIsError(true)
                if(e.response){
                    errMsg = e.response.data
                }
                setErrorData(errMsg)
                
            }
            finally{
                setLoading(false);
            }

        }
        fetchData()
    },[])

    function RedirectToHotel(str){
        navigate(`/diningHotel/${str}`)
    }


    return(
        <div id="dining-out-container">
            <div id='dining-out-page'>
                <div>
                    <p id='collection-title' > Collections </p>
                </div>
                <div id='all-collections-text-div' >
                    <p id='explore-text'>Explore curated lists of top restaurants, cafes, pubs, and bars in {selectCity} based on trends</p>
                    <div>
                    <p> All Collections in {selectCity}  </p>
                    <ArrowRightIcon 
                    sx={{
                        color:'#ff7e88'
                    }}
                    />
                    </div>
                </div>
                <div id='collection-cards-div'>

                    {
                    Object.values(DiningOutObj).map((val,ind)=>{
                        return  <div key={ind} id='main-collection-card'
                        style={{
                            background:`url(${val.img})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center',
                            backgroundRepeat:'no-repeat'
                           }}
                        >  <div style={{
                            display:'flex',alignItems:'center' , marginLeft:'4px'
                        }} >
                            
                        <p style={{color:'white',
                        fontSize:'clamp(14px,2vw,20px)'
                        }} > {val.text} </p>
                        <ArrowRightIcon sx={{
                            color:'white'
                        }}  />
                             </div>
                        </div>
                       
                    })
                    }

                </div>
                
                <div id='banner-div'>
                    <div id='banner-div-main'>
                        <p style={{fontSize:'clamp(14px,2vw,20px)' , margin:'5px 0'  }}  >Get up to</p>
                        <div 
                    style={{
                        display:'flex',
                        flexDirection:'row',color:'white' , alignItems:'center'
                    }} >
                        <p  style={{fontSize:'clamp(20px,3vw,35px)' , margin:'unset'}}  >50%</p> 
                        <p style={{fontSize:'clamp(14px,2vw,20px)' , margin:'5px 0 0 5px'   }}  > off</p> 

                        </div>
                        <p style={{fontSize:'clamp(10px,1vw,16px)' , margin:'4px 0 0 0'  }} >on your dining bills with tomato</p>
                        <button id='button-in-banner'>Check out all restaurants</button>
                    </div>
                </div>
                <div>
                    <p id='dining-city-restaurants' > {selectCity} Restaurants </p>
                </div>

                <div id='dining-out-hotel-div'>       
           {  isLoading ? 
           <div style={{width:'80vw',
            display:'flex',justifyContent:'center',alignItems:'center'
           }}  >
           <CircularProgress size={80} /> 
           </div>
           
           :
           isError ? 
           <div style={{width:'100%',
            display:'flex',justifyContent:'center',alignItems:'center'
           }}   > 
           <Alert variant="filled" severity="error" sx={{
            height:'40px' , width:'auto'
        }} >{errordata}</Alert>
        </div>
         :
                diningHotelDetails.map((key,ind)=>{
                    return  <div id="dining-hotel-items" key={ind}>  
                        <div id="dining-img-div" 
                        onClick={()=>RedirectToHotel(key.hotelName)}
                        
                        >
                          <img src={`${key.img}.jpg`} alt="img" /> 
                         
                        </div>
                        <div id="dining-hotel-subdiv"> 
                            <div style={{
                                display:'flex',justifyContent:'space-around',flexDirection:'column',alignItems:'flex-start'
                            }}  >
                           
                                <p id="dining-hotel-name" > {key.hotelName.replace(/_/g,' ')} </p>
                                
                                <p id="dining-hotel-types"> {key.hotelFoodTypes} </p>
                                
                            </div>
                            <div id="dining-hotel-subdivs-2">
                                <div id='dining-hotel-ratings-div'>
                                        <p id="dining-hotel-ratings"> {key.ratings} </p>
                                        <span>
                                        <Star  sx={{
                                            color:"white",
                                            fontSize:'12px'
                                           
                                        }}  />
                                        </span>
                                     </div>
                                        <p id="dining-hotel-cost"> {key.avgCost} </p>
                                
                            </div> 
                        </div>
                    </div>
                })
            }
            </div>

            </div>
        </div>
    )
}