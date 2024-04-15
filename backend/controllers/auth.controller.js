import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { json } from "express";

const algorithm = "aes-256-cbc";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwfr3xx"; // replace with your own secret key
const iv = crypto.randomBytes(16);

export function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrpyted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decrpyted.toString();
}

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, email, gender } =
            req.body;

        if (!["male", "female"].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar.iran.liara.run

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${encrypt(
            userName
        )}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${encrypt(
            userName
        )}`;

        const newUser = new User({
            fullName: encrypt(fullName),
            userName: encrypt(userName),
            password: hashedPassword,
            email: encrypt(email),
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            //generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: decrypt(newUser.fullName),
                userName: decrypt(newUser.userName),
                email: decrypt(newUser.email),
                gender,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!user || !isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
