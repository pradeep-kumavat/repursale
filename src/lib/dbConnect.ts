import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("Connected to Mongodb Successfully!!")
        })

        connection.on("error", (error)=>{
            console.log("Mongodb connection error" + error)
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connect to db");
        console.log(error);
    }
}
