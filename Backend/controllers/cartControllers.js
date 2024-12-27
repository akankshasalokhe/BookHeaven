const userModel = require("../models/userModel");

const addToCartController = async (req, res) => {
    try {
        const { bookid, id } = req.headers; // Use req.fields for form data sent by express-formidable

        if (!bookid || !id) {
            return res.status(400).send({
                success: false,
                message: "Both Book ID and User ID are required."
            });
        }

        const userData = await userModel.findById(id);

        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        const isBookInCart = userData.cart.includes(bookid);

        if (isBookInCart) {
            return res.json({
                status:"success",
                message: "This book is already in your cart."
            });
        }

        await userModel.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });

        return res.status(200).send({
            success: true,
            message: "Book successfully added to cart."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while adding book to cart.",
            error: error.message || error
        });
    }
};


const removeFromCartController = async (req, res) => {
    try {
        const { bookid } = req.params;  // Assuming book ID is passed as a URL parameter
        const { id } = req.headers;     // Assuming user ID is passed as a header
        
        // Validate the provided IDs
        if (!bookid || !id) {
            return res.status(400).send({
                success: false,
                message: "Book ID and User ID are required."
            });
        }

        // Find the user by ID
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Remove the book from the user's cart
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            $pull: { cart: bookid }
        }, { new: true });  // 'new: true' will return the updated user document

        if (!updatedUser) {
            return res.status(400).send({
                success: false,
                message: "Failed to update the cart. Please try again."
            });
        }

        // If the book was removed successfully
        return res.status(200).send({
            success: true,
            message: "Book successfully removed from cart.",
            updatedCart: updatedUser.cart  // Optional: return updated cart information
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while removing book from cart."
        });
    }
};



const getCartController = async (req, res) => {
    try{
        const { id } = req.headers
        const userData = await userModel.findById(id).populate("cart")
        const cart = userData.cart.reverse()

        return res.json({
            status:"success",
            data:cart
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
};




module.exports = { addToCartController,removeFromCartController,getCartController };
