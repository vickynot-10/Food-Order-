import { useParams } from "react-router-dom";
import { FoodShops } from "../../../Data/data";
import { useCity } from "../../../Contexts/citySelect";
import { motion } from "framer-motion";
import axios from "axios";
import "./hotelPage.css";
import Directions from "@mui/icons-material/DirectionsOutlined";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Share from "@mui/icons-material/ShareOutlined";
import { OverviewSection } from "./overviewHotels/overview";
import { useState,useEffect } from "react";
import { OrderOnline } from "./orderonlineFoods/orderOnline";
import { useNav } from "../../../Contexts/context";
import  Alert  from "@mui/material/Alert";
import { CircularProgress } from '@mui/material';
export function HotelPage() {
  const {setActive} = useNav();
  setActive('delivery')
  const [isActiveOverview, setActiveOverview] = useState("overview");
  const { hotelPage } = useParams();
  const { selectCity } = useCity();
  const HotelImgs = FoodShops[hotelPage];
  const [hoteldetails,setHotelDetails]= useState({})
  const [err,seterr]=useState(null);
  const [isLoading,setLoading]=useState(true);
  useEffect(()=>{
    document.title=`${hotelPage}`;
  },[])
let hotelNameLowercase = hotelPage.toLocaleLowerCase()
  useEffect(()=>{
    async function fetchData(){
      try{
        let res = await axios.get(`http://localhost:4040/delivery/hotel/${hotelNameLowercase}`);
        if(!res || !res.data ){
          throw new Error('Network response was not ok')
       }
      setHotelDetails(res.data);
      seterr(null)
      }
      catch(e){    
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
  })


  return (
    <div id="hotelpage-container">
      {
        isLoading ? <div
        style={{
          display:'flex',justifyContent:'center',alignItems:'center',
        }}
        
        >
          <CircularProgress size={100} /> 
          </div> : err ? <Alert variant="filled" severity="error" sx={{
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
          <motion.div 
          whileHover={{
            cursor:'pointer',
            backgroundColor:'rgb(227, 219, 219)'
          }}
          transition={{
            ease:"easeInOut"
          }}
          >
             
              <Directions
                sx={{
                  fontSize:{
                    xs:'12px',sm:'14px',md:'16px',lg:'16px'
                  },
                  margin:'auto 0'
                }}
              />
              <span>  Direction
            </span>
          </motion.div>
          <motion.div 
          whileHover={{
            cursor:'pointer',
            backgroundColor:'rgb(227, 219, 219)'
          }}
          transition={{
            ease:"easeInOut"
          }}      
          
          >
            
            
              
              <BookmarkAdd
                sx={{
                  fontSize:{
                    xs:'12px',sm:'14px',md:'16px',lg:'16px'
                  },
                  margin:'auto 0'
                }}
              />
            <span>  Bookmark
            </span>
          </motion.div>

          <motion.div
          whileHover={{
            cursor:'pointer',
            backgroundColor:'rgb(227, 219, 219)'
          }}
          transition={{
            ease:"easeInOut"
          }}
          
          >
            
              
              <Share
                sx={{
                  fontSize:{
                    xs:'12px',sm:'14px',md:'16px',lg:'16px'
                  },
                  margin:'auto 0'
                }}
              />
            
            <span>  Share
            </span>
          </motion.div>
         </div>
          <div id="about-header-div">
            <p
              onClick={() => setActiveOverview("overview")}
              className={isActiveOverview === "overview" ? "active-about" : " "}
            >
              Overview
            </p>
            <p
              onClick={() => setActiveOverview("order")}
              className={isActiveOverview === "order" ? "active-about" : " "}
            >
              Order Online
            </p>
            <p
              onClick={() => setActiveOverview("review")}
              className={isActiveOverview === "review" ? "active-about" : " "}
            >
              Reviews
            </p>
            <p
              onClick={() => setActiveOverview("photos")}
              className={isActiveOverview === "photos" ? "active-about" : " "}
            >
              Photos
            </p>
            <p
              onClick={() => setActiveOverview("menu")}
              className={isActiveOverview === "menu" ? "active-about" : " "}
            >
              Menu
            </p>
          </div>
          
        
          <div id="hrLine"></div>
          </div>
          {isActiveOverview === "overview" ? (
           <OverviewSection hotelName={ hotelNameLowercase } />
          ) : (
            <OrderOnline hotelName={hotelPage} />
          )}

      
        </div>
        </>
        }
      </div>
    
  );
}
