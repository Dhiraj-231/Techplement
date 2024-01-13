import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
    },
    age: {
        type: String,
        require: [true, "Please enter Number"]
    },
    email: {
        type: String,
        required: [true, "Please enter valid email"]
    },
    avatar: {
        public_id: String,
        url: String,
    },
    password: {
        type: String,
        required: [true, "Please Enter password "],
        Selection: false
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
});

export default mongoose.model("User", userSchema);