import { FoodshopDeatilsModel } from '../Models/FoodShopDetails.js';
import { FoodDetailsModel } from '../Models/FoodsDetails.js';
import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
export const SearchFoods = async(req, res) => {
    let foodName = req.query.Searchfoodname;
    let hotelSearch;
    let foodSearch;
    const regex = new RegExp(`^${foodName}`, 'i')
    if (foodName) {
        hotelSearch = await FoodshopDeatilsModel.find({
            hotelName: {
                $regex: regex
            }
        })
        if (hotelSearch !== true) {
            foodSearch = await FoodDetailsModel.find({
                Foodname: {
                    $regex: regex
                }
            })
        }
        if (hotelSearch.length === 0 && foodSearch.length === 0) {
            return res.status(400).send("Can't find");
        }
        if (!hotelSearch && !foodSearch) {
            return res.status(400).send("Can't find");
        }
        return res.status(200).json({
            "Food": foodSearch,
            "Hotel": hotelSearch
        });
    }
    return res.status(400).send("Can't find");
}