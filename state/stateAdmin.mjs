import express from 'express';
import Order from '../model/order.model.mjs';
import Books from '../model/book.model.mjs';
const route = express.Router();
route.get("/", async (req , res) => {
    try {
        const totalOrder = await Order.countDocuments();

        const totalSale = await Order.aggregate([
            {
                $group:{
                    _id: null,
                    totalSale: {$sum: "$totalPrice"}
                }
            }
        ]);

        const trendingBookCount = await Books.aggregate([
            {$match : {trending:true}},
            {$count:"trendingBookCount"}
        ]);

        const trendingBooks = trendingBookCount.length>0?trendingBookCount[0].trendingBookCount:0;


        const totalBooks = await Books.countDocuments();

        const monthlyOrder = await Order.aggregate([
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m", date:"$createdAt"}},
                    totalSale:{$sum:"$totalPrice"},
                    totalOrder:{$sum:1}
                }
            },{
                $sort:{_id:1}
            }
        ]);

        res.status(200).json({
            totalOrder,
            totalBooks,
            totalSale: totalSale[0]?.totalSale || 0,
            trendingBooks,
            monthlyOrder
        })
        

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

export default route;
