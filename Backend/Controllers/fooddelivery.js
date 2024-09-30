import { FoodDetailsModel } from "../Models/FoodsDetails.js";

export const foodDelivery = async(req, res) => {
    const foodName = req.params.foodName.toLocaleLowerCase();
    try {
        const FoodNameDb = await FoodDetailsModel.find({
            Foodname: foodName
        })
        if (FoodNameDb) {
            return res.status(200).json(FoodNameDb);
        } else {
            return res.status(400).send("Food not available for now")
        }
    } catch (e) {
        res.status(400).send("Error");
    }
}