const express=require('express')
const { registerController,loginController ,getuserInfoController, updateAddressController} = require('../controllers/authController')
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware')
const { authenticateToken } = require('../controllers/userAuth')

const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/getuserinfo',authenticateToken,getuserInfoController)
router.put('/updateAddress',authenticateToken,updateAddressController)
// router.post('/forgotpassword',forgotPasswordController)
// router.get('/test',requireSignIn,isAdmin,testController)
router.get('/userauth',requireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})
router.get('/adminauth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})

router.put('/Profile',requireSignIn)

module.exports=router