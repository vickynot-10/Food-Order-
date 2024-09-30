import { OrderModel } from "../Models/OrderDetails.js";





export const OrderDisplay = async(req, res) => {
    if (!req.user) {
        return res.status(400).json({
            message: "Please Login",
            isLoggedIn: false,
            userdata: null
        })
    }
    try {
        let ordersDetails = req.user.orders
        const orders = await OrderModel.find({
            _id: ordersDetails
        });
        if (!orders) {
            return res.status(200).json({
                "isLoggedInobj": true,
                "firstOrder": true
            })
        }
        const result = Object.values(orders).map(item => ({
            "orderArr": item.orders,
            "total_cost": item.total_cost,
            "ordered_time": item.ordered_time,
            "status": item.status
        }))

        res.status(200).json({
            "isLoggedInobj": true,
            'result': result
        })

    } catch (e) {
        res.status(400).send(e)
    }

}