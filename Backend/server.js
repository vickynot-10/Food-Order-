import express from 'express';
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { getDatabase } from './Database/database.js';
import routes from './Routes/routes.js';
import path,{dirname} from 'path';

getDatabase()
import { configDotenv } from 'dotenv';
import { fileURLToPath } from 'url';
configDotenv()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
const __filename=fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
if(process.env.ENVIRONMENT=='production'){
    app.use(express.static(path.join(__dirname,'..','Frontend','build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(path.join(__dirname,'..','Frontend','build','index.html')))
    })
    
}



app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(routes)


app.listen(process.env.PORT_NUMBER || 1010, () => {
    console.log("Listening to port", process.env.PORT_NUMBER || 1010)
})