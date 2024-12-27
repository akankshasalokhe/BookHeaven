const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avtar:{
        type:String,
        default:"https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
    },
    
    role:{
        type:Number,
        default:0
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"books",

    }],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"books",


    }],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"order",

    }]
},{timestamps:true})
module.exports=mongoose.model('users',userSchema)