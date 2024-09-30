import mongoose from "mongoose";
import moment from 'moment'

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'
    },
    orders: [{
        hotel_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodshopDeatilsModel'
        },
        item_details: [{
            item_name: {
                type: String
            },
            item_quantity: {
                type: Number
            },
            item_cost: {
                type: Number
            },
            hotel_details: {
                type: Object,
                default: {}
            }
        }]

    }],
    total_cost: {
        type: Number
    },
    ordered_time: {
        type: String,
        default: () => moment().format('DD-MM-YYYY, HH:mm:ss')
    },
    status: {
        type: String,
        default: 'pending'
    }

})

export const OrderModel = mongoose.model("orders", OrderSchema)