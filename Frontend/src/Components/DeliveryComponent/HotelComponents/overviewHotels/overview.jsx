import { useState,useEffect } from "react";
import "./overview.css";
import axios from "axios";
import Check from "@mui/icons-material/Check";
import  Alert  from "@mui/material/Alert";
import  CircularProgress  from "@mui/material/CircularProgress";
import { useNav } from "../../../../Contexts/context";
export function OverviewSection( {hotelName} ) {
  const {setActive} = useNav();
  setActive('delivery')
  const [hotelDetails,setHotelDetails]=useState({})
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState(null);
  useEffect(()=>{
    async function fetchData(){
      try{
        let res = await axios.get(`http://localhost:4040/delivery/hotel/${hotelName}`);
         if(!res || !res.data ){
          throw new Error('Network response was not ok')
         }
         setHotelDetails(res.data); 
      }catch (err) {
        setError(err.message);
    }
    finally{
      setLoading(false)
    }
    }
    fetchData()
  },[hotelName])
  
  return (

    <div id="overview-details">
      {
         loading ? <div style={{
          display:'flex',justifyContent:"center",alignItems:"center"
         }}> <CircularProgress size={100}  />  </div>
        : 
        error ? <Alert variant="filled" severity="error">{error}  </Alert> :
        <>
      <p id="about-this-place-p">About this place</p>
      
      <div id="menus-div">
        <p id="menu-text">Menus</p>
        <p>Menu contents</p>
      </div>
      <div id="cusines-div">
        <p id="cuisines-text">Cuisines</p>
        <div id="total-cuisines-div">
             { !hotelDetails.cuisines ? (
              <CircularProgress />
             )  : hotelDetails.cuisines.map((key, val) => {
            return (
              <div id="cuisine-separate-div" key={val}>
                {key}
              </div>
            );
          })}   
        </div>
      </div>
      <div>
        { hotelDetails.popularDishes!=null ?(
          <>
          <p id="cuisines-text">Popular Dishes</p>
          <p id="overview-subtexts"> {hotelDetails.popularDishes} </p>  
          </>
        ) :(
          null
        )
        }
        { hotelDetails.knownFor!=null ?(
          <>
          <p id="cuisines-text">People Say This Place Is Known For</p>
          <p id="overview-subtexts"> {hotelDetails.knownFor} </p>
          </>
        ) :(
          null
        )
        }
        <p id="cuisines-text">Average Cost</p>
        <p id="overview-subtexts"> {hotelDetails.avgCost} </p>
      </div>
      <div id="more-info-div">
          {  !hotelDetails.moreInfo ? (
            <p>Loading</p>
          ) :  hotelDetails.moreInfo.map((val, ind) => {
          return (
            <div key={ind} id="separate-info-div">
              <div>
                
                <Check
                  sx={{
                    height: "16px",
                    width: "16px",
                    color: "#119199",
                  }}
                />
              </div>
              <p> {val} </p>
            </div>
          );
        })}  
      </div> 
      </>
}
    </div>
  );
}
