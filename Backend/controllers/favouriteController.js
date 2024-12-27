const userModel = require("../models/userModel");

const addToFavouriteController = async (req, res) => {
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

        const isBookFavourite = userData.favourites.includes(bookid);

        if (isBookFavourite) {
            return res.json({
                status:"success",
                message: "This book is already in your favourite."
            });
        }

        await userModel.findByIdAndUpdate(id, {
            $push: { favourites: bookid }
        });

        return res.status(200).send({
            success: true,
            message: "Book successfully added to favourites."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while adding book to favourites.",
            error: error.message || error
        });
    }
};


const removeFromFavouriteController = async (req, res) => {
    try {
        const { bookid, id } = req.headers; // Use req.body if sending JSON

        // Validate input fields
        if (!bookid || !id) {
            return res.status(400).send({
                success: false,
                message: "Both Book ID and User ID are required."
            });
        }

        // Find user by ID
        const userData = await userModel.findById(id);

        // If user not found, return an error
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Check if the book is in the user's favourites
        const isBookFavourite = userData.favourites.includes(bookid);

        if (!isBookFavourite) {
            return res.status(400).send({
                success: false,
                message: "This book is not in your favourites."
            });
        }

        // Remove the book from the favourites array using $pull
        await userModel.findByIdAndUpdate(id, {
            $pull: { favourites: bookid } // Pull the bookid out of the favourites array
        });

        return res.status(200).send({
            success: true,
            message: "Book successfully removed from favourites."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while removing book from favourites.",
            error: error.message || error
        });
    }
};


const getFavouriteBooksController = async (req, res) => {
    try {
        const { id } = req.headers; // Assuming you pass the user ID as a URL parameter

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "User ID is required."
            });
        }

        // Find the user by ID
        const userData = await userModel.findById(id).populate('favourites'); // Populate with full book data

        // If user is not found, return an error
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // If the user has no favourites, return an empty array
        if (userData.favourites.length === 0) {
            return res.status(200).send({
                success: true,
                message: "No favourite books found.",
                favourites: []
            });
        }

        // Return the user's favourite books
        return res.status(200).send({
            success: true,
            message: "Favourite books retrieved successfully.",
            data: userData.favourites // This will include the full book details due to the populate
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while retrieving favourite books.",
            error: error.message || error
        });
    }
};



module.exports = { addToFavouriteController,removeFromFavouriteController,getFavouriteBooksController };
