import { useParams } from "react-router-dom";
import { FoodShops } from "../../../Data/data";
import { Suspense,lazy } from "react";
import { useCity } from "../../../Contexts/citySelect";
import { motion } from "framer-motion";
import axios from "axios";
import "./hotelPage.css";
import Directions from "@mui/icons-material/DirectionsOutlined";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Share from "@mui/icons-material/ShareOutlined";
import { useState,useEffect } from "react";
import { useNav } from "../../../Contexts/context";
import  Alert  from "@mui/material/Alert";
import { CircularProgress } from '@mui/material';

const OrderOnlineComponent = lazy(()=>import('./orderonlineFoods/orderOnline'))
const OverviewSectionComponent = lazy(()=>import('./overviewHotels/overview'))

function HotelPage() {
  const {setActive} = useNav();
  setActive('delivery')
  const [isActiveOverview, setActiveOverview] = useState("overview");
  const { hotelPage } = useParams();
  const { selectCity } = useCity();
  const HotelImgs = FoodShops[hotelPage];
  const [hoteldetails,setHotelDetails]= useState({})
  const [err,seterr]=useState('');
  const [iserr,setiserr]=useState(false)
  const [isLoading,setLoading]=useState(true);

let hotelNameLowercase = hotelPage.toLocaleLowerCase()
  useEffect(()=>{
    async function fetchData(){
      try{
        let res = await axios.get(`${process.env.REACT_APP_URL}/delivery/hotel/${hotelNameLowercase}`);
        if(!res || !res.data ){
          throw new Error('Network response was not ok')
       }
       if(res.status===200){
      setHotelDetails(res.data);
       }
      }
      catch(e){    
        setiserr(true)
        let errMsg = "Something error occur"
        if(e.response.data){
          errMsg = e.response.data
        }
        else if(e.message){
        errMsg = e.message;
        }
        seterr(errMsg);
      }
      finally{
        setLoading(false);
      }
    }
    fetchData()
  },[hotelNameLowercase])

  const navArr=[
    {
      'text':'Overview',
      nav:'overview'
    },{
      'text':'Order Online',
      nav:'order'
    },{
      'text':'Review',
      nav:'review'
    },{
      'text':'Photos',
      nav:'photos'
    },{
      'text':'Menu',
      nav:'menu'
    },
  ]

  const buttonArr=[
    {
      'text':"Direction",
      'mui':Directions
    },
    {
      'text':"Bookmark",
      'mui':BookmarkAdd
    },{
      'text':"Share",
      'mui':Share
    },
  ]

  return (
    <div id="hotelpage-container">
      {
        isLoading ? <div
        style={{
          display:'flex',justifyContent:'center',alignItems:'center',
        }}
        
        >
          <CircularProgress size={100} /> 
          </div> : iserr ? <Alert variant="filled" severity="error" sx={{
            height:'40px' , width:'auto'
        }} >{err}</Alert> : <>
      <div id="hotel-contents">
        <div id="hotel-imgs">
          <div id="main-hotel-img">
            <motion.img src={HotelImgs} alt="hotel-img"
             initial={{
              opacity:1
            }}
            whileHover={{
              opacity:0.8
            }}
            
             />
          </div>
          <div id="secondary-hotel-img">
            <motion.img 
            initial={ {opacity:1}  }
            whileHover={{
              opacity:0.8
            }}
             src={HotelImgs} alt="hotel-img" />
            <motion.img 
            initial={ {opacity:1}  }
            whileHover={{
              opacity:0.8, scale:1
            }} 
            src={HotelImgs} alt="hotel-img" />
          </div>
          <div id="third-hotel-img">
            <motion.img 
            initial={ {opacity:1}  }
            whileHover={{
              opacity:0.8
            }}
             src={HotelImgs} alt="hotel-img" />
          </div>
        </div>
      </div>
      <div id="hotel-details">
        <div id="div-for-sticky">
          <div id="hotel-details-header1">
            <p id="hotel-name-header" > {hotelPage} </p>
            <p id="hotel-subtexts-header"> {hoteldetails.hotelFoodTypes} </p>
            <p id="hotel-subtexts-header2"> {selectCity} </p>
            
          </div>
          
         <div id="direction-share-button"> 
          {
            buttonArr.map((item,ind)=>{
              return      <motion.div key={ind}
              whileHover={{
                cursor:'pointer',
                backgroundColor:'rgb(227, 219, 219)'
              }}
              transition={{
                ease:"easeInOut"
              }}
              >
                  <item.mui
                    sx={{
                      fontSize:{
                        xs:'12px',sm:'14px',md:'16px',lg:'16px'
                      },
                      margin:'auto 0'
                    }}
                  />
                  <span>  {item.text}
                </span>
              </motion.div>
          
            })
          }
         </div>
          <div id="about-header-div">
            {
              navArr.map((item,ind)=>{
                return <p key={ind}
                onClick={() => setActiveOverview(item.nav)}
                className={isActiveOverview === item.nav ? "active-about" : " "}
              >
                {item.text}
              </p>
              })
            }
          </div>
          
        
          <div id="hrLine"></div>
          </div>
          <Suspense fallback={<CircularProgress />} >
          {isActiveOverview === "overview" ? (
           <OverviewSectionComponent hotelName={ hotelNameLowercase } />
          ) : isActiveOverview === 'order' ? (
            <OrderOnlineComponent hotelName={hotelPage} />
          ) : null
        } 
        </Suspense>

      
        </div>
        </>
        }
      </div>
    
  );
}

export default HotelPage