import { DiningoutModel } from "../Models/DiningOutHotels.js";


export const DiningHotelDetails = async(req, res) => {
    try {
        const hotel = await DiningoutModel.find();
        return res.status(200).send(hotel);
    } catch (e) {
        res.status(400).send(e);
    }
}