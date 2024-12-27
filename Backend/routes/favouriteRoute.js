const express = require('express');
const router = express.Router();
const { addToFavouriteController, removeFromFavouriteController, getFavouriteBooksController } = require('../controllers/favouriteController');
const { authenticateToken } = require('../controllers/userAuth');
// Use POST method for adding a favourite
router.put('/addtoFavourite', authenticateToken, addToFavouriteController);  // or use JSON if needed
router.put('/removeFavourite',removeFromFavouriteController)
router.get('/getFavouriteBook',authenticateToken,getFavouriteBooksController)
module.exports = router