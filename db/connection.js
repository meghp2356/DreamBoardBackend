import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async()=>{
    try {
        const con = await mongoose.connect(process.env.DB_URI)
        console.log("connection is done")
        return con
    } catch (error) {
        console.log("error at connecting the database ",error.message)
        process.exit(q)
    }
}