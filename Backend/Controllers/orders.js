import { OrderModel } from "../Models/OrderDetails.js";
import mongoose from "mongoose";
import moment from 'moment'
import { FoodshopDeatilsModel } from "../Models/FoodShopDetails.js";

import { UsersModel } from "../Models/User.js";

export const OrderDetails = async(req, res) => {

    async function FindingHotel(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            let hotelDetails = await FoodshopDeatilsModel.findById(id);
            return hotelDetails
        } else {
            return res.status(400).send("An error occured,Please Try again ")
        }
    }

    const now = moment();
    let { userId, foodDetails } = req.body;
    console.log(userId)
    if (!userId && !mongoose.Types.ObjectId.isValid(userId) || userId.trim() === "") {
        userId = null
    }
    if (foodDetails.length <= 0) {
        return res.status(400).send("Select Foods at delivery page")
    }
    let total_amt = 0
    let orderObj = {};
    for (let item of foodDetails) {
        let hotelId = item.hotel_details;
        let HotelDetails = await FindingHotel(hotelId)
        if (!orderObj[hotelId]) {
            orderObj[hotelId] = {
                hotel_id: hotelId,
                item_details: []

            }
        }
        orderObj[hotelId].item_details.push({
            item_name: item.Foodname,
            item_quantity: item.quantity,
            item_cost: item.cost,
            hotel_details: HotelDetails,

        })
        total_amt += Number(item.cost * item.quantity)
    };
    const finalObj = Object.values(orderObj);
    try {
        let orders = new OrderModel({
            user_id: userId ? new mongoose.Types.ObjectId(userId) : null,
            orders: finalObj,
            total_cost: total_amt,
            ordered_time: now.format(`DD-MM-YYYY ,HH:mm:ss`),
            status: 'ordered'
        })
        await orders.save()
        await UsersModel.findByIdAndUpdate(
            userId, {
                $push: {
                    orders: orders._id
                }
            }
        )
        res.status(200).send(orders._id)
    } catch (e) {
        return res.status(400).send(e)
    }
}