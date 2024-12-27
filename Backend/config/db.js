const mongoose=require('mongoose')
const colors=require('colors')
const connectDB=async () => {
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MONGODB database ${conn.connection.host}`.bgCyan.white)  
    }
    catch(error){
        console.log(`error in mongoDB ${error}`.bgRed.white)
    }
    
}
module.exports=connectDB