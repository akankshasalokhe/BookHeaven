const express = require('express');
const { addToCartController, removeFromCartController, getCartController } = require('../controllers/cartControllers');
const { authenticateToken } = require('../controllers/userAuth');
const router = express.Router();

router.put('/addToCart',authenticateToken,addToCartController)
router.put('/removeFromCart/:bookid',authenticateToken,removeFromCartController)
router.get('/getCart',authenticateToken,getCartController)
module.exports = router;
