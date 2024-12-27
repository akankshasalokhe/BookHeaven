const express=require('express')
const router=express.Router()
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const { authenticateToken } = require('../controllers/userAuth')
const { addBookController, updateBookController, deleteBookController, getAllBooksController, getRecentBookController, getBookByIdController } = require('../controllers/bookController')

router.post('/addBook',authenticateToken,addBookController)
router.put('/updateBook',authenticateToken,updateBookController)
router.delete("/deleteBook",deleteBookController)
router.get('/getAllBooks',getAllBooksController)
router.get('/getrecentBook',getRecentBookController)
router.get("/getbookbyid/:id",getBookByIdController)

module.exports=router
