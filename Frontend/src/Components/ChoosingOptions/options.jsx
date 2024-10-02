import { Link } from 'react-router-dom';
import { useContext } from 'react';
import  RestaurantTwoTone  from '@mui/icons-material/RestaurantOutlined';
import  DeliveryDiningOutlined  from '@mui/icons-material/DeliveryDiningOutlined';
import { motion } from 'framer-motion';
import './option.css'
import { OptionsContext } from '../../Contexts/context';
import LocalMallIcon from '@mui/icons-material/LocalMall';


export function ChooseOptions(){
    const {isActive,setActive} = useContext(OptionsContext);
    const optionDivElements=[
        {
            'nav' : 'delivery',
            'muiIcon':  DeliveryDiningOutlined  ,
            'path':'/delivery',
            'text' : 'Delivery'
        },{
            'nav' : 'orders',
            'muiIcon': LocalMallIcon  ,
            'path':'/orders',
            'text' : 'Orders'
        },{
            'nav' : 'diningout',
            'muiIcon': RestaurantTwoTone,
            'path':'/diningout',
            'text' : 'Dining Out'
        },
    ]

    return(
        <div id='choose-opt-container'>
        <div id="choose-options-div">
            
            {
            optionDivElements.map((val,ind)=>{
                return   <div id='opt-btn-div' key={ind} >
                <motion.div
                initial={{opacity:0}}
                animate={{opacity: isActive===val.nav ? 1 : 0}}
                transition={{
                    ease:"linear"
                }}
                id='icon-div' style={ {display : isActive===val.nav ? 'flex' : 'none' } } >
                    <val.muiIcon 
                    style={{color:'black' , fontSize:'30px' }} />
                </motion.div>
                <p  id='options-btn' onClick={ ()=> setActive(val.nav) }>
                    <Link to={val.path} className={ isActive === val.nav ? 'active' : "choose-btn-p"  }> {val.text} </Link>
                </p>
            </div>
            })
          }
          </div>
     </div>
    )
}