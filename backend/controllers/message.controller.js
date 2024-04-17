import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { encrypt, decrypt } from "../utils/cryptoUtils.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const encryptedMessage = encrypt(message);

        const newMessage = new Message({
            senderId,
            receiverId,
            message: encryptedMessage,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //await conversation.save();
        //await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages.map((message) => {
            return {
                ...message._doc,
                message: decrypt(message.message),
            };
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
