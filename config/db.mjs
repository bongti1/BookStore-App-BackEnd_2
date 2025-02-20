import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_DB;
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`Connect to database : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}