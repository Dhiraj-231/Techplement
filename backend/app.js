import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/user.routes.js";
import dotenv from "dotenv";
import { dbConnection } from "./configs/databaseconnection.js";
import cloudinary from "cloudinary";
dotenv.config({ path: "./configs/.env" })
const app = express();
dbConnection();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/user", router);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
app.get("/", (req, res) => {
    res.send("<h2>This is example server </h2>");
});
app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is started at port:${process.env.PORT || 6000}`);
})

export default app;