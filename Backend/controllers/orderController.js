const User = require("../models/userModel");
const Book = require("../models/bookModel")
const Order = require("../models/orderModel")

const placeOrderController = async (req,res) => {
    try{
        const { id } =req.headers
        const { order } = req.body
        for (const orderData of order){
            const newOrder = new Order({user:id, book:orderData._id})
            const orderDataFormDb = await newOrder.save();

            await User.findByIdAndUpdate(id,{
                $push: {orders:orderDataFormDb._id},
            })
            await User.findByIdAndUpdate(id,{
                $pull: {cart:orderData._id}
            })
        }
        return res.status(200).send({
            success: true,
            message: "Order Placed Successfully."
        });
    }catch(error){
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while placing order.",
        });
    }
}

const getOrdrHistoryController = async (req,res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate: { path: "book"}
        })
        const ordersData = userData.orders.reverse()
        return res.status(200).send({
            success: true,
            data: ordersData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while placing order.",
        })
    }
}

const getAllOrdersController = async (req,res) => {
    try{
        const userData = await Order.find()
        .populate({
            path:"book"
        })
        .populate({
            path:"user"
        })
        .sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            data: userData
        })
    }catch(error){
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred .",
        })
    }
}

const updateOrderStatusController = async (req,res) => {
    try {
        const { id } = req.params
        await Order.findByIdAndUpdate(id, {status:req.body.status})
        return res.json({
            status: "Success",
            message: "Status Update Successfully",
        }) 
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error occurred in status updating .",
        })
    }
}

module.exports={ placeOrderController,getOrdrHistoryController,getAllOrdersController,updateOrderStatusController }