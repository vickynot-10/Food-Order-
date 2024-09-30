import mongoose from "mongoose";

const DiningOutSchema = mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        unique: true
    },
    hotelFoodTypes: {
        type: String
    },
    ratings: {
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

export const DiningoutModel = mongoose.model("Diningouthotels", DiningOutSchema);