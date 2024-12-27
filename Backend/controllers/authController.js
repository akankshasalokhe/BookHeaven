// const { default: userModel } = require("../models/userModel")
const { hashPassword, comparePassword } = require("../helpers/authHelper")
const userModel = require("../models/userModel")
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      if (!name || !email || !password || !phone || !address) {
        return res.status(400).send({ error: "All fields are required" });
      }
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "User already registered. Please login.",
        });
      }
  
      const hashedPassword = await hashPassword(password);
      const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
      
      res.status(201).send({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error in registration",
        error: error.message,
      });
    }
  };

  const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send({ error: "Invalid credentials" });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email not registered",
        });
      }
  
     await bcrypt.compare(password,user.password,(err,data)=>{
      if(data){
        const authClaims = [
          {name: user.name },
          {role:user.role}
        ]
        const token = jwt.sign({ authClaims }, "dkjsdk",{ expiresIn: "30d"})
        res.status(200).json({
          id:user._id,
          role: user.role,
          token: token
      })
      }
     })
      
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error: error.message,
      });
    }
  };
  

// const forgotPasswordController=async (req,res)=>{
// try{
//         const {email,newPassword}=req.body
//         if(!email){
//             res.status(400).send({message:"Email is required"})
//         }
//         if(!newPassword){
//             if(!address){
//                 return res.send({error:"Password is Required"})    
//         }
//         // if(!answer){
//         //     res.status(400).send({message:"Answer is required"})
//         // }
//         const user=await userModel.findOne({email})
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message:"Wrong Email or Answer"
//             })
//         }
//         const hashed=await hashPassword(newPassword)
//         await userModel.findByIdAndUpdate(user._id,
//             {password:hashed})
//             res.status(200).send({
//                 success:true,
//                 message:"Password Reset Successfully"
//             })
        
//  }} catch(error){
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Something went wrong",
//             error
//         })
//     }
// }

// const testController=async (req,res)=>{
//     try{
//         res.send("Middleware tested")
//     }catch(error){
//         console.log(error)
//     }
// }

// const updateProfileController = async (req, res) => {
//     try {
//       const { name, email, password, phone, address } = req.body;
//       const user = await userModel.findById(req.user._id);
  
//       if (password && password.length < 6) {
//         return res.status(400).json({ error: "Password must be at least 6 characters long" });
//       }
  
//       const hashedPassword = password ? await hashPassword(password) : user.password;
  
//       const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
//         name: name || user.name,
//         email: email || user.email,
//         password: hashedPassword,
//         phone: phone || user.phone,
//         address: address || user.address,
//       }, { new: true });
  
//       res.status(200).send({
//         success: true,
//         message: "Profile updated successfully",
//         updatedUser,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         success: false,
//         message: "Error while updating profile",
//         error: error.message,
//       });
//     }
//   };

const getuserInfoController = async (req, res) => {
    try {
        const {id} = req.headers
        const data = await userModel.findById(id).select("-password")
        return res.status(200).json(data)
           
    } catch (error) {
        console.log(error)
        return res.status(500).json({message :"Not get user information"})
    }
}

const updateAddressController = async (req,res) => {
  try{
    const { id } =req.headers;
    const { address } = req.body
    await userModel.findByIdAndUpdate(id, {address:address })
    return res.status(200).json({message:"address updated successfully"})
  }catch(error){
    res.status(500).json({message:"address not updated"})
  }
}



  
module.exports={registerController,loginController,getuserInfoController,updateAddressController}