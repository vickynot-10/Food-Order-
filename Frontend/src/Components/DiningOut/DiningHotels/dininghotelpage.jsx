import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Suspense,lazy } from "react";
import Directions from "@mui/icons-material/DirectionsOutlined";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

import { LazyLoadImage } from 'react-lazy-load-image-component';

import Share from "@mui/icons-material/ShareOutlined";
import  CircularProgress  from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useCity } from "../../../Contexts/citySelect";
import axios from "axios";
import './dininghotelpage.css'
import  Alert  from "@mui/material/Alert";
import { useNav } from "../../../Contexts/context";
const DiningOverviewComponent = lazy(()=>import('../Overview/diningOverview'))
const BookTableComponent = lazy(()=>import('../BookTable/BookTable'))



 function DiningHotelPage(){
    const {setActive} = useNav();
    useEffect(()=>{
        setActive('diningout')
    },[])
    const [hoteldetails,setHotelDetails]= useState({})
    const {hotelname} = useParams();
    const { selectCity } = useCity();
    const [err,seterr]=useState("");
    const [isError,setisError]=useState(false);
    const [isLoading,setLoading]=useState(true);

    const [isDiningNavActive,setDiningNav]=useState('overview');
    
  const navArr=[
    {
      'text':'Overview',
      nav:'overview'
    },{
      'text':'Book A Table',
      nav:'bookTable'
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

    useEffect(()=>{
        async function fetchData(){
        try{
            const res= await axios.get(`${process.env.REACT_APP_URL}/diningout/${hotelname}`)
            if(!res || !res.data ){
                throw new Error("Response was not ok");
            }
            console.log(res[1])
            setHotelDetails(res.data)
        }
        catch(e){
            let errMsg = e.message || "An error occured";
                setisError(true)
                if(e.response){
                    errMsg = e.response.data
                }
                seterr(errMsg)
        }
        finally{
            setLoading(false)
        }
    }
    fetchData()
    },[])
    return(
        <div id="dining-hotelpage-container">
          {
            isLoading ? <div
            style={{
              display:'flex',justifyContent:'center',alignItems:'center',
            }}
            
            >
              <CircularProgress size={100} /> 
              </div> : isError ? <Alert variant="filled" severity="error" sx={{
                height:'40px' , width:'auto'
            }} >{err}</Alert> : 
            <>
            { Object.entries(hoteldetails).map((val,ind)=>{
                return    <>
                <div id="dining-hotel-contents" key={ind} >
                    <div id="dining-hotel-imgs">
                    
                        <div id="dining-main-hotel-img">
                            <motion.LazyLoadImage
                            effect='blur'
                             src={`${val[1].img}.jpg`} alt={val[1].hotelName}
                                initial={{
                                    opacity: 1
                                }}
                                whileHover={{
                                    opacity: 0.8
                                }} />
                        </div>
                        <div id="dining-secondary-hotel-img">
                            <motion.LazyLoadImage
                            effect="blur"
                                initial={{ opacity: 1 }}
                                whileHover={{
                                    opacity: 0.8
                                }}
                                src={`${val[1].img}.jpg`} alt={val[1].hotelName} />
                            <motion.LazyLoadImage
                            effect='blur'
                                initial={{ opacity: 1 }}
                                whileHover={{
                                    opacity: 0.8, scale: 1
                                }}
                                src={`${val[1].img}.jpg`} alt="hotel-img" />
                        </div>
                        <div id="dining-third-hotel-img">
                            <motion.LazyLoadImage
                            effect='blur'
                                initial={{ opacity: 1 }}
                                whileHover={{
                                    opacity: 0.8
                                }}
                                src={`${val[1].img}.jpg`} alt="hotel-img" />
                        </div>
                    </div>
                </div>
            
         <div id="dining-hotel-details">
            <div id="dining-div-for-sticky">
                    <div id="hotel-details-header1">
                        <p id="dining-hotel-name-header"> {val[1].hotelName.replace(/_/g," ")} </p>
                        <p id="dining-hotel-subtexts-header"> {val[1].hotelFoodTypes} </p>
                                <p id="dining-hotel-subtexts-header2"> {selectCity} </p>

                                        </div>
                                        <div id="dining-direction-share-button">

                                            {
                                                buttonArr.map((item,ind)=>{
                                                return    <motion.div key={ind}
                                                whileHover={{
                                                    cursor: 'pointer',
                                                    backgroundColor: 'rgb(227, 219, 219)'
                                                }}
                                                transition={{
                                                    ease: "easeInOut"
                                                }}
                                            >

                                                <item.mui
                                                    sx={{
                                                        fontSize: {
                                                            xs: '12px', sm: '14px', md: '16px', lg: '16px'
                                                        },
                                                        margin: 'auto 0'
                                                    }} />
                                                <span>  {item.text}
                                                </span>
                                            </motion.div>
                                            
                                                })
                                            }
                                        </div>
                                        <div id="dining-about-header-div">

                                            {
                                                navArr.map((item,ind)=>{
                                                    return  <p key={ind}
                                                    onClick={() => setDiningNav(item.nav)}
                                                    className={isDiningNavActive === item.nav ? "dining-active-about" : " "}
                                                >
                                                    {item.text}
                                                </p>
                                                })
                                            }
                                        </div>


                                        <div id="dining-hrLine"></div>
                                    </div>
                                    <Suspense fallback={<CircularProgress />} >
                                    {isDiningNavActive === "overview" ? (
                                        <DiningOverviewComponent hoteldetails={hoteldetails} />
                                    ) : 
                                        isDiningNavActive === "bookTable" ? (
                                        <BookTableComponent />    
                                        ) : null
                                    }
                                    </Suspense>


                                </div>    
                            
                </>
            })
        }
            
            </>
            }
          </div> 
        
      );
    }    
    export default DiningHotelPage