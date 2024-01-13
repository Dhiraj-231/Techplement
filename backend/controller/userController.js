import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { ApiError } from "../utils/apiError.js";
import jsonwebtoken from "jsonwebtoken";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, image, age } = req.body;
        if (
            [name, email, password].some(
                (field) => field?.trim() === ""
            )
        ) {
            throw new ApiError(400, "All field is required..");
        }
        let existUser = await User.findOne({
            $or: [{ email }],
        })

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        };
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "userImage"
        });
        existUser = await User.create({
            name,
            email,
            password,
            age,
            avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
        });
        res.status(200).json({
            success: true,
            messgage: "Done",
            existUser
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exist please login"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Please enter correct password.."
            })
        }
        const payload = {
            _id: user._id,
            email: user.email
        }
        const token = jsonwebtoken.sign(payload, process.env.JWT_SCREAT);
        console.log(token);
        res.status(200).cookie("Accesstoken", token, {
            httpOnly: true,
            secure: true

        }).json({
            success: true,
            message: "Login successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const getAllUSer = async (req, res) => {
    try {
        const query = req.params.query;
        const user = await User.find({
            $or: [
                { name: { $regex: ".*" + query + ".*", $options: "i" } },
                { email: { $regex: ".*" + query + ".*", $options: "i" } },
                { age: { $regex: ".*" + query + ".*", $options: "i" } }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Done",
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
export const allUser = async (req, res) => {
    try {
        console.log("hii");
        const user = await User.find({});
        res.status(200).json({
            success: true,
            message: "Your user",
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}