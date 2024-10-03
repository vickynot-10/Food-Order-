import jwt from 'jsonwebtoken';
import { UsersModel } from '../Models/User.js';
import { configDotenv } from "dotenv";
configDotenv()
export const verifyJWTtoken = (req, res, next) => {

    let token = req.cookies.token;


    if (!token) {
        return res.status(400).json({
            message: "Please Login , Have token",
            isLoggedIn: false,
            userdata: null
        })
    }
    console.log(token)
    try {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decode) => {
            if (err) {
                return err
            }
            let user = await UsersModel.findById(decode.userID);
            if (!user) {
                return res.status(400).json({
                    isLoggedIn: false,
                    userdata: "User cant found"
                })
            }
            req.user = user
            next()
        })
    } catch (e) {

        return res.status(400).json({
            isLoggedIn: false,
            userdata: "User cant found"
        })
    }
}