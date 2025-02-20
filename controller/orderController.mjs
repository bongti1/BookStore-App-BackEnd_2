import Order from "../model/order.model.mjs";

export const getOrderByEmail = async(req, res) => {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({createAt: -1});
    if(!orders){
        res.status(404).json({massage: "No order found"});
    }  
    return res.status(200).json(orders);
};

export const newOrder = async(req, res) => {
    const newOrder = await Order(req.body);
    const saveOrder = await newOrder.save();
    if(!saveOrder){
        res.status(400).json({message: "Order not saved"});
    }
    return res.status(200).json(saveOrder);
};
