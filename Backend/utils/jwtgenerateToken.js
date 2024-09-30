import jwt from 'jsonwebtoken';

import { configDotenv } from "dotenv";
configDotenv()

export const generateJWTtoken = (id) => {
    try {
        return jwt.sign({
            userID: id,
        }, process.env.SECRET_KEY, {
            expiresIn: '2h'
        })
    } catch (e) {
        return "Error"
    }

}