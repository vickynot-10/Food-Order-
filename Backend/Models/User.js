import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Number
    },
    user_name: {
        type: String
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }]
})
export const UsersModel = mongoose.model("Usersmodel", UsersSchema)