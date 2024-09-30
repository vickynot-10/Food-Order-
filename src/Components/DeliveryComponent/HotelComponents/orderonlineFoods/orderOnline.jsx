import "./orderOnline.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import  Alert  from "@mui/material/Alert";
import  CircularProgress  from '@mui/material/CircularProgress';
import { useNav } from "../../../../Contexts/context";

export function OrderOnline({ hotelName }) {
  const {setActive} = useNav();
  setActive('delivery')
  
  const [HotelfoodDetails, setHotelFoodDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uniqueFoodNames, setUniqueNames] = useState([]);
  const [filterFoodSection, setFilterFoods] = useState([]);
  const [foodDishNav, setFoodDishNav] = useState(" ");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:4040/${hotelName}/foods`);
        if (!res || !res.data ) {
          throw new Error("Network response was not ok");
        }
        const uniqueFoods = Array.from(
          new Set(res.data.map((item) => item.Foodname))
        );
        setUniqueNames(uniqueFoods);
        setHotelFoodDetails(res.data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [hotelName]);
  function filterFoodsOnNav(e) {
    const str = e.target.value;
    setFoodDishNav(str);
    setFilterFoods(HotelfoodDetails.filter((item) => item.Foodname === str));
  }

  return (
    <div id="order-online-container">
       {
         loading ? <div style={{
          display:'flex',justifyContent:"center",alignItems:"center"
         }}> <CircularProgress size={100}  />  </div>
        : 
        error ? <Alert variant="filled" severity="error" sx={{
            height:'40px' , width:'auto'
        }} >{error}</Alert> : 
        <>    
      <div id="order-online-div">
        <div id="order-food-name-lists">
          {uniqueFoodNames.map((val, key) => {
            return (
              <div
                onClick={() => setFoodDishNav(val)}
                key={key}
                className={foodDishNav === val ? "activeFoodDishNav" : " "}
              >
                <button onClick={filterFoodsOnNav} value={val}>
                  {val.replace(/_/g, " ")}
                </button>
              </div>
            );
          })}
        </div>
        <div id="order-food-image-details">
          <div id="order-food-header-search">
            <p id="order-online-p">Order Online</p>
            <div id="dish-search-box">
            <input type="text" />
              <span id="dish-search-icon">
                
                <SearchOutlined  sx={{
                  fontSize:{
                    xs:16 , sm:18,md:20,lg:22
                  }
                }} />
              </span>
              <span id="dish-close-icon">
                <CloseOutlined sx={{
                  fontSize:{
                    xs:16 , sm:18,md:20,lg:22
                  }
                }}
                
                />
              </span>
            </div>
          </div>
          <p id="food-dish-header"> </p>
          <div id="food-images-details-div">
            {filterFoodSection.map((key, ind) => {
              return (
                <div id="food-img-contents">
                  <div id="food-dish-img-icon">
                    <img
                      src={
                        key.Foodname === "ice_cream"
                          ? `${key.img}/icecream${ind + 1}.jpg`
                          : `${key.img}/${key.Foodname}${ind + 1}.jpg`
                      }
                      alt="img"
                    />
                  </div>
                  <div id="food-details-col">
                    <p id="food-dish-name-order">
                      
                      {key.Foodname.replace(/_/g, " ")}
                    </p>
                    <p id="food-dish-cost-order"> ₹{key.cost} </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </>
       }
    </div>
  );
}
