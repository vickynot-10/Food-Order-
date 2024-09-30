import { FoodDetailsModel } from "../Models/FoodsDetails.js";

function formatText(str) {
    if (str.toLowerCase() == "mcdonald's") {
        return "mcdonald's"
    }
    let uppercaseCount = 0;
    return str.replace(/([A-Z])/g, (match) => {
        uppercaseCount++;
        if (uppercaseCount === 2) {
            return `_${match}`;
        }
        return match;
    })
}


export const FoodsInHotel = async(req, res) => {
    const companyName = formatText(req.params.companyname)
    try {
        const CompanyFoodDetails = await FoodDetailsModel.find({
            hotelName: {
                $regex: companyName,
                $options: 'i'
            }
        })
        if (res) {
            res.json(CompanyFoodDetails);
        } else {
            res.send("Not found");
        }
    } catch (e) {
        res.send(e)
    }
}