import { FoodshopDeatilsModel } from "../Models/FoodShopDetails.js";

export const HotelDelivery = async(req, res) => {
    const hotelname = req.params.hotelname;
    try {
        const hotelNameFind = await FoodshopDeatilsModel.findOne({
            hotelName: hotelname
        })
        if (hotelNameFind) {
            return res.status(200).json(hotelNameFind);
        }

        return res.status(400).send(`${hotelname} not available for now `);
    } catch (e) {
        res.status(400).send("Error");
    }

}