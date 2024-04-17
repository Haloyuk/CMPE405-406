import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { decrypt, encrypt, hashUsername } from "../utils/cryptoUtils.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, email, gender } =
            req.body;

        if (!["male", "female"].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedUsername = hashUsername(userName);
        const user = await User.findOne({ userName: hashedUsername });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: encrypt(fullName),
            userName: hashedUsername,
            password: hashedPassword,
            email: encrypt(email),
            gender,
            profilePic:
                gender === "male"
                    ? `https://avatar.iran.liara.run/public/boy?username=${hashedUsername}`
                    : `https://avatar.iran.liara.run/public/girl?username=${hashedUsername}`,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: fullName,
                userName: userName,
                email: email,
                gender,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const hashedUsername = hashUsername(userName);
        const user = await User.findOne({ userName: hashedUsername });

        if (!user) {
            console.log(`User not found: ${userName}`);
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            console.log(`Password does not match for user: ${userName}`);
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: decrypt(user.fullName),
            userName: userName,
            email: decrypt(user.email),
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: error.message });
    }
};
