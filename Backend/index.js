const express = require("express")
const cors=require('cors')
const dotenv= require('dotenv')
const connectDB = require('./config/db.js')
const authRoutes=require('./routes/authRoute.js')
const bookRoutes=require('./routes/bookRoute.js')
const favouritRoutes=require('./routes/favouriteRoute.js')
const cart=require('./routes/cartRoute.js')
const orderRoutes=require('./routes/orderRoute.js')


dotenv.config()
connectDB()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/product",bookRoutes)
app.use("/api/favourite",favouritRoutes)
app.use("/api/cart",cart)
app.use("/api/order",orderRoutes)




app.get("/",(req,res)=>{
    res.send("<h1>Welcome to E-commerce App</h1>")
})
const PORT=process.env.PORT || 1010

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgMagenta)
})