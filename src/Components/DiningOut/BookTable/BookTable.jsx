import './BookTable.css';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowDown from '@mui/icons-material/ArrowDropDownOutlined'
import moment from 'moment';
import { useNav } from '../../../Contexts/context';
export function BookTable(){
    const {setActive} = useNav();
    setActive('diningout')
    const time = moment();
    const [guestValue,setGuestValue] = useState('2 Guests');
    const [dayValue,setDayValue] = useState('Today');
    const [dateArray,setDateArr]=useState([]);
    const [currentSesion,setCurrentSession]=useState('Select Time');
    const [sessionArrays,setsessionArrays]=useState([]);
    const [currentIndex,setCurrentIndex]=useState(null);
    const timeSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'];

    

    useEffect(()=>{
        

        function getTime(){
            const hour = time.hour();
            let newarray = [];
            let datesArr=[];
            for(let i=2;i<=5;i++){
                let dates = moment(time).add(i,'days').format('ddd DD MMM');
                datesArr.push(dates);
            }
            setDateArr(datesArr)
            
        if (hour < 12) {
            setCurrentSession('BreakFast');
            newarray=["BreakFast","Lunch","Dinner"];
          } else if (hour < 17) {
            setCurrentSession('Lunch');
            newarray=["Lunch","Dinner"];
          } else {
            setCurrentSession('Dinner');
            newarray=["Dinner"];
          }
          setsessionArrays(newarray);
        }
        getTime()
    },[])


    
    function changingValuesGuestSelect(e){
        let str = e.target.value;
        setGuestValue(str);
    }
    function changingValuesDateSelect(e){
        let str= e.target.value;
        setDayValue(str);
    }

    function changingValuesTimeSelect(e){
        let str= e.target.value;
        setCurrentSession(str);
    }

    function settingBorder(ind){
        
        setCurrentIndex(ind)
    }

    return(
        <div id='booktable-container' >
            <div id='booktable-page' >
            
            <div id='selecttable-title'  >
                <p 
                style={{
                fontSize:'clamp(14px,2vw,24px)' , fontWeight:'bold'
                }}
                >Select your booking details</p>
                
            </div>
            
            <div id='select-tags-group'>
                <div id='first-select' >
                    <EventAvailableOutlinedIcon 
                    sx={{
                        fontSize:{
                            xs:'15px',sm:'12px',md:'15px',lg:'20px'
                        },
                        position:'absolute',top:'50%',left:'5%' , transform:'translate(-5%,-50%)'
                    }}
                    
                    />
                <Select
                
                sx={{ width:'100%', paddingLeft:{
                    xs:'10px' , sm:'15px',md:'20px',lg:'30px'
                } , fontSize:{
                    xs:'10px',sm:'13px',md:'16px',lg:'16px'
                } }} 
                
                onChange={changingValuesDateSelect} 
                value={dayValue}
                inputProps={{ 'aria-label': 'Without label' }}
                >   
                <MenuItem value='Today'>Today</MenuItem>
                <MenuItem value='Tomorrow'>Tomorrow</MenuItem>
                {
                    dateArray.map((val,ind)=>{
                        return <MenuItem value={val} key={ind} >{val}</MenuItem>

                    })
                }
                </Select>
            </div>


            <div id='second-select' >
                    <AccessTimeOutlinedIcon  
                    sx={{
                        fontSize:{
                            xs:'15px',sm:'12px',md:'15px',lg:'20px'
                        },
                        position:'absolute',top:'50%',left:'5%' , transform:'translate(-5%,-50%)'
                    }}
                    
                    />
                <Select sx={{ width:'100%' , paddingLeft:{
                    xs:'10px' , sm:'15px',md:'20px',lg:'30px'
                } , fontSize:{
                    xs:'10px',sm:'13px',md:'16px',lg:'16px'
                } }} 
                value={currentSesion}
                onChange={changingValuesTimeSelect}
                
                inputProps={{ 'aria-label': 'Without label' }}
                >   
                {
                    sessionArrays.map((val,ind)=>{
                        return  <MenuItem key={ind} value={val} > {val} </MenuItem>
                        
                    })
                }

        </Select>
        </div>

        <div id='third-select' >
                    <PeopleOutlineOutlinedIcon
                    sx={{
                        fontSize:{
                            xs:'15px',sm:'12px',md:'15px',lg:'20px'
                        },
                        position:'absolute',top:'50%',left:'5%' , transform:'translate(-5%,-50%)'
                    }}
                    
                    />
                <Select sx={{ width:'100%' ,paddingLeft:{
                    xs:'10px' , sm:'15px',md:'20px',lg:'30px'
                } , fontSize:{
                    xs:'10px',sm:'13px',md:'16px',lg:'16px'
                } }}  onChange={changingValuesGuestSelect} value={guestValue}
                inputProps={{ 'aria-label': 'Without label' }}
                >   
            <MenuItem value='2 Guests'>2 Guests</MenuItem>
            <MenuItem value='3 Guests'>3 Guests</MenuItem>
            <MenuItem value='4 Guests'>4 Guests</MenuItem>
            <MenuItem value='5 Guests'>5 Guests</MenuItem>
            <MenuItem value='6 Guests'>6 Guests</MenuItem>
            <MenuItem value='7 Guests'>7 Guests</MenuItem>
            
            </Select>
        </div>




            </div>

            <div id='select-slots' >
                <div
                style={{
                    display:'flex',justifyContent:'space-evenly' ,alignItems:'center',flexDirection:'row'
                }}
                >
                    <p
                    style={{
                    fontSize:'clamp(14px,2vw,24px)' , fontWeight:'bold' 
                    }}
                    >Select Slots</p>
                    <div id='hrline-Booktable'></div>
                    <ArrowDown />
                </div>
                <div id='time-slots-div'>
                    {
                        timeSlots.map((val,ind)=>{
                            return <div 
                            onClick={()=> settingBorder(ind)} 
                            style={{
                                border: currentIndex === ind ? '1.5px solid rgb(239, 79,95) ' : '1.5px solid rgb(230, 233, 239)' ,
                                backgroundColor: currentIndex === ind ? '#FFD6D6' : 'rgb(255, 245, 246)' 
                            }}
                            key={ind} id='time-slot-separate' > 
                                <p> {val} </p>
                                 </div>
                        })
                    }
                </div>

            </div>

            <div>
                <button id='proceed-tocart-btn' >Proceed to cart</button>
            </div>

        </div>
        </div>
    )
}