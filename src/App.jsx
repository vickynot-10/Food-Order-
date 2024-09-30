import { Header } from './Components/Header/header';
import './App.css';
import { Footer } from './Components/Footer/footer';
import { ChooseOptions } from './Components/ChoosingOptions/options';
import { DeliveryPage } from './Components/DeliveryComponent/Deliverpage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FoodDeliversItems } from './Components/DeliveryComponent/FoodDeliveringHotels/DeliveryFoodItems';
import { HotelPage } from './Components/DeliveryComponent/HotelComponents/HotelPage';
import { CityNameProvider } from './Contexts/citySelect';
import { OptionsContextProvider } from './Contexts/context';
import { CartFunction } from './Contexts/cartContext';
import { BuyPage } from './Components/BuyNow/buyPage';
import { OrderForm } from './Components/OrderForm/orderform';
import { AuthContextProvider } from './Contexts/authProvider';
import { UserContextProvider } from './Contexts/userDetails';
import { OrdercontextProvider } from './Contexts/ordersContexts';
import { Orders } from './Components/Orders/orders';
import { DiningOut } from './Components/DiningOut/diningout';
import { DiningHotelPage } from './Components/DiningOut/DiningHotels/dininghotelpage';
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
      <Routes>
        <Route path='/' element={ <Navigate to ='/delivery' replace={true} /> } />
        <Route path='/delivery' element={ <DeliveryPage /> } />
        <Route path='/delivery/food/:item' element={ <FoodDeliversItems /> } />
        <Route path='/delivery/hotel/:hotelPage' element={ <HotelPage /> } />
        <Route path='/delivery-cart' element={ <BuyPage /> } />
        <Route path='/delivery-page' element={ <OrderForm /> } />
        {/* Orders Routes */}
        <Route path='/orders' element={ <Orders /> } />
        { /* Dining-Out Routes */ }
        <Route path='/diningout' element={ <DiningOut /> } />
        <Route path='/diningHotel/:hotelname' element={ <DiningHotelPage /> } />       
      </Routes>   
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
