import mongoose from "mongoose";

const FoodShopDetailsSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    hotelFoodTypes: {
        type: String
    },
    cuisines: [String],
    popularDishes: {
        type: String
    },
    img: {
        type: String
    },
    knownFor: {
        type: String
    },
    avgCost: {
        type: String
    },
    moreInfo: [String]
})


export const FoodshopDeatilsModel = mongoose.model('ShopDetailsModel', FoodShopDetailsSchema)