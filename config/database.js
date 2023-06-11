import mongoose from "mongoose";

export const connectDB = async()=>{
    const  {connection}  = await mongoose.connect(process.env.MONGO_URI);
    console.log( `MongoDB Is Connected with ${connection.host}`);
}