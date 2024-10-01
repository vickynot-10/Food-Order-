import { UsersModel } from "../Models/User.js";
import express from 'express';
import cors from 'cors';
import { configDotenv } from "dotenv";
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import Cookies from 'js-cookie'

const app = express()
configDotenv()
app.use(cors({
    origin: 'https://food-order-frontend-jhzp.onrender.com/',
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())

import { generateJWTtoken } from "../utils/jwtgenerateToken.js";

export const UserResgister = async(req, res) => {
    const { name } = req.query
    const userNameSearch = await UsersModel.findOne({
        name: name
    })
    if (userNameSearch) {
        return res.status(400).send("User with name already exists");
    }
    return res.status(200).send('OK');

}

export const UserRegisterAddress = async(req, res) => {
    let userVar;
    let { mobile_no, userRealname, password, username, mail } = req.body
    if (!username) {
        return res.status(400).send("Please Enter name");
    }
    if (!password) {
        return res.status(400).send("Please Enter your password")
    }
    if (password.length < 8) {
        return res.status(400).send("Password should be more than 8 characters");
    }

    let salt = await bcrypt.genSalt()
    let passwordHash = await bcrypt.hash(password, salt)

    try {
        let Numbermobile_num = Number(mobile_no);
        if (isNaN(Numbermobile_num)) {
            return res.status(400).send("Mobile Numbers should be Numbers")
        }
        userVar = new UsersModel({
            name: username,
            password: passwordHash,
            email: mail,
            mobile_no: mobile_no,
            user_name: userRealname
        })
        await userVar.save()
        if (!userVar) {
            return res.status(400).send("Please Enter Valid name");
        }
        return res.status(200).json({
            "data": userVar,
            "name": username,
            "user_name": userRealname,
            "phone_num": Numbermobile_num
        })
    } catch (e) {
        return res.status(400).send("Error")
    }
}



export const userLogin = async(req, res) => {
    let userVar;
    const { nameLogin, passwordLogin } = req.body;
    if (!nameLogin) {
        return res.status(400).send("Please Enter Name or Mail");
    }
    if (!passwordLogin) {
        return res.status(400).send("Enter your password");
    }

    const emailExp = /^[a-zA-Z][^\s@][a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$/
    const userExp = emailExp.test(nameLogin);
    try {
        if (userExp) {
            userVar = await UsersModel.findOne({
                email: nameLogin
            })
        } else {
            userVar = await UsersModel.findOne({
                name: nameLogin
            })
        }
        if (!userVar) {
            return res.status(400).send("Invalid username or mail");
        }
        const passwordMatch = await bcrypt.compare(passwordLogin, userVar.password);
        if (!passwordMatch) {
            return res.status(400).send("Invalid Password")
        }
        if (passwordMatch) {
            let token = generateJWTtoken(userVar._id);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000,
                sameSite: 'lax',
                secure: false
            })
            return res.status(200).json({
                "name": userVar.name,
                "data": userVar,
                "isLoggedin": true
            })
        }


    } catch (e) {
        res.status(400).send("Error")
    }

}

export const Logout = async(req, res) => {
    try {

        res.clearCookie("token");

        res.status(200).json({
            isLogout: true
        })

    } catch (e) {
        res.status(400).json({
            isLogout: false,
            msg: "Error while logging out"
        })
    }
}