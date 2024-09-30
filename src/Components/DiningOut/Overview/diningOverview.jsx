import { useEffect, useState } from "react";
import { useNav } from "../../../Contexts/context";
import Check from "@mui/icons-material/Check";
import  Alert  from "@mui/material/Alert";
import  CircularProgress  from "@mui/material/CircularProgress";
import './diningOverview.css';
export function DiningOverview( {hoteldetails} ){
    const [loading,setLoading] = useState(true)
    const [isError,setIsError]=useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        if(!hoteldetails){
            setIsError(true);
            setError("Hotel is Not available");
            return;
        }
      const loadTimer=  setTimeout(()=>{
            setLoading(false)
        },1000)
        return ()=> clearTimeout(loadTimer);
    },[])
    const {setActive} = useNav();
    setActive('diningout')
    return (
        
    <div id="overview-details">
    {
       loading ? <div style={{
        display:'flex',justifyContent:"center",alignItems:"center"
       }}> <CircularProgress size={100}  />  </div>
      : 
      isError ? <Alert variant="filled" severity="error">{error}  </Alert> :
      <>
    <p id="about-this-place-p">About this place</p>
    
    <div id="menus-div">
      <p id="menu-text">Menus</p>
      <p>Menu contents</p>
    </div>
    <div id="cusines-div">
      <p id="cuisines-text">Cuisines</p>
      <div id="dining-total-cuisines-div">
           { !hoteldetails[0].cuisines ? (
            <CircularProgress />
           )  : hoteldetails[0].cuisines.map((key, val) => {
          return (
            <div id="dining-cuisine-separate-div" key={val}>
              {key}
            </div>
          );
        })}   
      </div>
    </div>
    <div>
      { hoteldetails[0].popularDishes!=null ?(
        <>
        <p id="cuisines-text">Popular Dishes</p>
        <p id="overview-subtexts"> {hoteldetails[0].popularDishes} </p>  
        </>
      ) :(
        null
      )
      }
      { hoteldetails[0].knownFor!=null ?(
        <>
        <p id="cuisines-text">People Say This Place Is Known For</p>
        <p id="overview-subtexts"> {hoteldetails[0].knownFor} </p>
        </>
      ) :(
        null
      )
      }
      <p id="cuisines-text">Average Cost</p>
      <p id="overview-subtexts"> {hoteldetails[0].avgCost} </p>
    </div>
    <div id="dining-more-info-div">
        {  !hoteldetails[0].moreInfo ? (
          <p>Loading</p>
        ) :  hoteldetails[0].moreInfo.map((val, ind) => {
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

    )
}



