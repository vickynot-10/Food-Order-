import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Directions from "@mui/icons-material/DirectionsOutlined";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Share from "@mui/icons-material/ShareOutlined";
import  CircularProgress  from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useCity } from "../../../Contexts/citySelect";
import { DiningOverview } from "../Overview/diningOverview";
import axios from "axios";
import './dininghotelpage.css'
import  Alert  from "@mui/material/Alert";
import { BookTable } from "../BookTable/BookTable";
import { useNav } from "../../../Contexts/context";
export function DiningHotelPage(){
    const {setActive} = useNav();
    setActive('diningout')
    const [hoteldetails,setHotelDetails]= useState({})
    const {hotelname} = useParams();
    const { selectCity } = useCity();
    const [err,seterr]=useState("");
    const [isError,setisError]=useState(false);
    const [isLoading,setLoading]=useState(true);
    const [isDiningNavActive,setDiningNav]=useState('overview');

    useEffect(()=>{
        async function fetchData(){
        try{
            const res= await axios.get(`http://localhost:4040/diningout/${hotelname}`)
            if(!res || !res.data ){
                throw new Error("Response was not ok");
            }
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
                            <motion.img src={`${val[1].img}.jpg`} alt="hotel-img"
                                initial={{
                                    opacity: 1
                                }}
                                whileHover={{
                                    opacity: 0.8
                                }} />
                        </div>
                        <div id="dining-secondary-hotel-img">
                            <motion.img
                                initial={{ opacity: 1 }}
                                whileHover={{
                                    opacity: 0.8
                                }}
                                src={`${val[1].img}.jpg`} alt="hotel-img" />
                            <motion.img
                                initial={{ opacity: 1 }}
                                whileHover={{
                                    opacity: 0.8, scale: 1
                                }}
                                src={`${val[1].img}.jpg`} alt="hotel-img" />
                        </div>
                        <div id="dining-third-hotel-img">
                            <motion.img
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
                                            <motion.div
                                                whileHover={{
                                                    cursor: 'pointer',
                                                    backgroundColor: 'rgb(227, 219, 219)'
                                                }}
                                                transition={{
                                                    ease: "easeInOut"
                                                }}
                                            >

                                                <Directions
                                                    sx={{
                                                        fontSize: {
                                                            xs: '12px', sm: '14px', md: '16px', lg: '16px'
                                                        },
                                                        margin: 'auto 0'
                                                    }} />
                                                <span>  Direction
                                                </span>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{
                                                    cursor: 'pointer',
                                                    backgroundColor: 'rgb(227, 219, 219)'
                                                }}
                                                transition={{
                                                    ease: "easeInOut"
                                                }}

                                            >

                                                <BookmarkAdd
                                                    sx={{
                                                        fontSize: {
                                                            xs: '12px', sm: '14px', md: '16px', lg: '16px'
                                                        },
                                                        margin: 'auto 0'
                                                    }} />
                                                <span>  Bookmark
                                                </span>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{
                                                    cursor: 'pointer',
                                                    backgroundColor: 'rgb(227, 219, 219)'
                                                }}
                                                transition={{
                                                    ease: "easeInOut"
                                                }}

                                            >


                                                <Share
                                                    sx={{
                                                        fontSize: {
                                                            xs: '12px', sm: '14px', md: '16px', lg: '16px'
                                                        },
                                                        margin: 'auto 0'
                                                    }} />

                                                <span>  Share
                                                </span>
                                            </motion.div>
                                        </div>
                                        <div id="dining-about-header-div">
                                            <p
                                                onClick={() => setDiningNav("overview")}
                                                className={isDiningNavActive === "overview" ? "dining-active-about" : " "}
                                            >
                                                Overview
                                            </p>
                                            <p
                                                onClick={() => setDiningNav("bookTable")}
                                                className={isDiningNavActive === "bookTable" ? "dining-active-about" : " "}
                                            >
                                                Book A Table
                                            </p>
                                            <p
                                                onClick={() => setDiningNav("review")}
                                                className={isDiningNavActive === "review" ? "dining-active-about" : " "}
                                            >
                                                Reviews
                                            </p>
                                            <p
                                                onClick={() => setDiningNav("photos")}
                                                className={isDiningNavActive === "photos" ? "dining-active-about" : " "}
                                            >
                                                Photos
                                            </p>
                                            <p
                                                onClick={() => setDiningNav("menu")}
                                                className={isDiningNavActive === "menu" ? "dining-active-about" : " "}
                                            >
                                                Menu
                                            </p>
                                        </div>


                                        <div id="dining-hrLine"></div>
                                    </div>
                                    {isDiningNavActive === "overview" ? (
                                        <DiningOverview hoteldetails={hoteldetails} />
                                    ) : 
                                        isDiningNavActive === "bookTable" ? (
                                        <BookTable />    
                                        ) : null
                                    }


                                </div>    
                            
                </>
            })
        }
            
            </>
            }
          </div> 
        
      );
    }    
