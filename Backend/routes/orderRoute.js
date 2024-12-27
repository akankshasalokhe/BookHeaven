const express = require('express');
const { placeOrderController, getOrdrHistoryController, getAllOrdersController, updateOrderStatusController } = require('../controllers/orderController');
const { authenticateToken } = require('../controllers/userAuth');
const router = express.Router();

router.post('/placeOrder',authenticateToken,placeOrderController)
router.get('/orderHistory',authenticateToken,getOrdrHistoryController)
router.get('/getallOrder',authenticateToken,getAllOrdersController)
router.put('/updateOrder/:id',authenticateToken,updateOrderStatusController)

module.exports = router;
