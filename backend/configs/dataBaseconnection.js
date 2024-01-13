import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const dbConnection = async () => {
    try {
        const coo = await mongoose.connect(`${process.env.MONGODB_URI}/love`);
        console.log(`Database is connected at ${coo.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}