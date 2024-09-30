import { DiningoutModel } from "../Models/DiningOutHotels.js";
export const DiningHotelSeparatePage = async(req, res) => {
    const { hotelName } = req.params
    if (hotelName) {
        try {
            const hotel = await DiningoutModel.find({
                hotelName: hotelName
            })
            if (!hotel) {
                return res.status(400).send("Hotel Page Cant Find");
            }
            return res.status(200).send(hotel)
        } catch (e) {
            return res.status(400).send(e);
        }

    }
}