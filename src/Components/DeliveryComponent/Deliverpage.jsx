import { useEffect, useRef } from "react";
import { FoodImgIcons,FoodShops } from "../../Data/data";
import  KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded";
import  KeyboardArrowRightRounded  from "@mui/icons-material/KeyboardArrowRightRounded";
import './Deliverypage.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useNav } from "../../Contexts/context";
export function DeliveryPage(){
    const {setActive} = useNav();
    useEffect(()=>{
    setActive('delivery') 
    },[])
    let containerRef=useRef(null);
    let brandContainerRef=useRef(null);
    const navigate=useNavigate();
    function RedirectToDeliveryHotel(val){
        let str= val
        navigate(`/delivery/hotel/${str}`)
    }
    function RedirectToDeliveryFoodItem(val){
        let str= val.trim().toLowerCase();
        navigate(`/delivery/food/${str}`)
    }


    function ScrollNext(refEl){
        refEl.current.scrollLeft += 120;
    }
    function scrollPrev(refEl){
        refEl.current.scrollLeft -= 120;
    }
    return(
        <>
        <Outlet />
        <div id="delivery-page-container">
        <div id='food-ins-text'>
            <p>Inspiration for your First order</p>
        </div> 
        <div id="delivery-container" >
            
            <div id="foods-order" ref={containerRef} >
                <div  id="foods-order-div">
                    {
                        Object.entries(FoodImgIcons).map(([key,val])=>{
                            return <div key={val} id="food-items">
                                <img src={val} alt="img" onClick={()=>RedirectToDeliveryFoodItem( key ) } />
                                <p> {key.replace(/_/g,' ')} </p>
                            </div>
                        })
                    }
                </div>
            </div>
                <button id="prev-btn" onClick={ ()=> scrollPrev(containerRef)}> { <KeyboardArrowLeftRounded /> } </button>
                <button id="next-btn"  onClick={()=> ScrollNext(containerRef)}> { <KeyboardArrowRightRounded /> } </button>
        </div>
        <div id="brand-text">
                <p> Top brands for you </p>
        </div>
        <div id="brand-container">
            <div  id="brand-items-div" ref={brandContainerRef} >
            <div  id="brands-order-div">
                {
                    Object.entries( FoodShops).map(([key1,val])=>{
                        return <div key={key1} id="brand-items">
                            <img src={val} onClick={()=> RedirectToDeliveryHotel(key1) } alt="img"/>
                            <p>{key1}</p>
                      </div>

                    })
                }
                </div>
            </div>
            <button id="prev-order-btn" onClick={ ()=> scrollPrev(brandContainerRef)} > { <KeyboardArrowLeftRounded /> } </button>
            <button id="next-order-btn" onClick={ ()=> ScrollNext(brandContainerRef)} > { <KeyboardArrowRightRounded /> } </button>
        </div>
        
    </div>
    </>
       )
}