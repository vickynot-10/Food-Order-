import { Link } from 'react-router-dom';
import { useContext } from 'react';
import  RestaurantTwoTone  from '@mui/icons-material/RestaurantOutlined';
import  DeliveryDiningOutlined  from '@mui/icons-material/DeliveryDiningOutlined';

import { motion } from 'framer-motion';
import './option.css'
import { OptionsContext } from '../../Contexts/context';
import LocalMallIcon from '@mui/icons-material/LocalMall';
export function ChooseOptions(){
    const {isActive,setActive} = useContext(OptionsContext)
    return(
        <div id='choose-opt-container'>
        <div id="choose-options-div">
            
            <div id='opt-btn-div'>
                <motion.div id='icon-div'                 
                initial={{opacity:0}}
                animate={{opacity: isActive==='delivery' ? 1 : 0}}
                transition={{
                    ease:"linear"
                }}

                style={ {display : isActive==='delivery' ? 'flex' : 'none' } } >
                    <DeliveryDiningOutlined style={{color:'black' , fontSize:'30px' }} />
                </motion.div>    
                <p id='options-btn' onClick={ ()=> setActive('delivery') }>
                    <Link to="/delivery"  className={ isActive==='delivery' ? 'active' : "choose-btn-p"  }>Delivery</Link>
                </p>
            </div>
            <div id='opt-btn-div'>
                <motion.div id='icon-div'
                initial={{opacity:0}}
                animate={{opacity: isActive==='orders' ? 1 : 0  }}
                transition={{
                    duration:0.5,
                    ease:"linear"
                }}
                style={ {display : isActive==='orders' ? 'flex' : 'none' } } >
                    <LocalMallIcon style={{color:'black' , fontSize:'30px' }} />
                </motion.div>
                <p id='options-btn' onClick={ ()=> setActive('orders') }>
                    <Link to="/orders" 
                    className={ isActive==='orders' ? 'active' : "choose-btn-p"  }>Orders</Link>
                </p>
            </div>
            <div id='opt-btn-div'>
                <motion.div
                initial={{opacity:0}}
                animate={{opacity: isActive==='diningout' ? 1 : 0}}
                transition={{
                    ease:"linear"
                }}
                id='icon-div' style={ {display : isActive==='diningout' ? 'flex' : 'none' } } >
                    <RestaurantTwoTone 
                    style={{color:'black' , fontSize:'30px' }} />
                </motion.div>
                <p  id='options-btn' onClick={ ()=> setActive('diningout') }>
                    <Link to="/diningout" className={ isActive === 'diningout' ? 'active' : "choose-btn-p"  }>Dining Out</Link>
                </p>
            </div>
        </div>
        </div>
    )
}