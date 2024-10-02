import './App.css';
import { Header } from './Components/Header/header';
import { Footer } from './Components/Footer/footer';
import { ChooseOptions } from './Components/ChoosingOptions/options';
import { DeliveryPage } from './Components/DeliveryComponent/Deliverpage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense,lazy } from 'react';
import  CircularProgress  from '@mui/material/CircularProgress';
//Contexts
import { CityNameProvider } from './Contexts/citySelect';
import { OptionsContextProvider } from './Contexts/context';
import { CartFunction } from './Contexts/cartContext';
import { AuthContextProvider } from './Contexts/authProvider';
import { UserContextProvider } from './Contexts/userDetails';
import { OrdercontextProvider } from './Contexts/ordersContexts';


const FoodDeliverComponent = lazy(()=> import('./Components/DeliveryComponent/FoodDeliveringHotels/DeliveryFoodItems') )
const HotelPageComponent = lazy(()=> import('./Components/DeliveryComponent/HotelComponents/HotelPage') )
const OrdersComponent = lazy(()=> import('./Components/Orders/orders') )
const DiningOutComponent = lazy(()=> import('./Components/DiningOut/diningout') )
const DiningHotelPageComponent = lazy(()=> import('./Components/DiningOut/DiningHotels/dininghotelpage') )
const BuyPageComponent = lazy(()=> import('./Components/BuyNow/buyPage') )
const OrderFormComponent = lazy(()=> import('./Components/OrderForm/orderform') )



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <AuthContextProvider>
      <OrdercontextProvider>
      <UserContextProvider>
      <CartFunction>
      <CityNameProvider>
      <OptionsContextProvider>
        <Header /> 
       <ChooseOptions /> 

       <Suspense fallback={<CircularProgress />} >
      <Routes>
        <Route path='/' element={ <Navigate to ='/delivery' replace={true} /> } />
        <Route path='/delivery' element={ <DeliveryPage /> } />
        <Route path='/delivery/food/:item' element={ <FoodDeliverComponent /> } />
        <Route path='/delivery/hotel/:hotelPage' element={ <HotelPageComponent /> } />
        <Route path='/delivery-cart' element={ <BuyPageComponent /> } />
        <Route path='/delivery-page' element={ <OrderFormComponent /> } />
        {/* Orders Routes */}
        <Route path='/orders' element={ <OrdersComponent /> } />
        { /* Dining-Out Routes */ }
        <Route path='/diningout' element={ <DiningOutComponent /> } />
        <Route path='/diningHotel/:hotelname' element={ <DiningHotelPageComponent /> } />       
      </Routes> 
      </Suspense>
      <Footer /> 
      </OptionsContextProvider> 
      </CityNameProvider>
      </CartFunction>
      </UserContextProvider>
      </OrdercontextProvider>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
