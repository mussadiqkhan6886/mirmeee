import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("MONGODB CONNECTED")
    }catch(err){
        console.log(err)
    }
}