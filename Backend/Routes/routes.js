import express from 'express';
import cors from 'cors';
import { UserResgister, userLogin, Logout } from '../Controllers/userscontroller.js';
import { SearchFoods } from '../Controllers/searchFood.js';
import { HotelDelivery } from '../Controllers/HotelDelivery.js';
import { foodDelivery } from '../Controllers/fooddelivery.js';
import { FoodsInHotel } from '../Controllers/foodsInHotel.js';
import { UserRegisterAddress } from '../Controllers/userscontroller.js';
import { OrderDetails } from '../Controllers/orders.js';
import { OrderDisplay } from '../Controllers/ordersDisplay.js';
import { DiningHotelDetails } from '../Controllers/diningHotelDetails.js';
import { DiningHotelSeparatePage } from '../Controllers/HotelsDining.js';
import { LoginAuthUser } from '../Controllers/LoginAuth.js';
import { RedirectToHome } from '../Controllers/RedirectToHome.js';
import cookieParser from 'cookie-parser';


import { verifyJWTtoken } from '../middlewares/jwtAuthMiddleware.js';
const app = express()

app.use(cors({
    origin: 'https://food-order-frontend-jhzp.onrender.com',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = express.Router();

routes.get('/',RedirectToHome);
routes.get('/register', UserResgister)
routes.post('/register2', UserRegisterAddress)
routes.post('/login', userLogin)
routes.get('/user/me', verifyJWTtoken, LoginAuthUser)
routes.post('/placeOrder', OrderDetails)
routes.get('/orders', verifyJWTtoken, OrderDisplay)
routes.get('/diningout', DiningHotelDetails)
routes.get('/diningout/:hotelName', DiningHotelSeparatePage)
routes.get('/foodSearch', SearchFoods)
routes.get('/delivery/food/:foodName', foodDelivery)
routes.get('/delivery/hotel/:hotelname', HotelDelivery)
routes.get('/:companyname/foods', FoodsInHotel)
routes.post('/logout', Logout)

export default routes