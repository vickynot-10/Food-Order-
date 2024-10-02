import express from 'express';
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { getDatabase } from './Database/database.js';
import routes from './Routes/routes.js';
getDatabase()
import { configDotenv } from 'dotenv';
configDotenv()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(routes)


app.listen(process.env.PORT_NUMBER || 1010, () => {
    console.log("Listening to port", process.env.PORT_NUMBER || 1010)
})