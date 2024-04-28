import mongoose from "mongoose";
import { encrypt } from "../utils/cryptoUtils.js";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        userName: {
            type: String,
            required: true,
            unique: true,
        },


        originalUserName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },

        profilePic: {
            type: String,
            default: "",
        },
        isVerified: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (this.isModified("gender")) {
        this.gender = encrypt(this.gender);
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
