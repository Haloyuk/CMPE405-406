import GroupChat from "../models/groupChat.model.js";
import { io } from "../socket/socket.js";
import User from "../models/user.model.js";
import { encrypt, decrypt } from "../utils/cryptoUtils.js";

export const createGroupChat = async (req, res) => {
    const { name, adminId, users } = req.body;

    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    try {
        const encryptedName = encrypt(name);

        const newGroupChat = new GroupChat({
            name: encryptedName,
            admin: adminId,
            users: [adminId].concat(users || []),
        });

        const savedGroupChat = await newGroupChat.save();

        const decryptedGroupChat = {
            ...savedGroupChat._doc,
            name: decrypt(savedGroupChat.name),
        };

        res.status(201).json(decryptedGroupChat);
    } catch (error) {
        console.log("error in createGroupChat: ", error.message);
        res.status(500).json({ error: "Error creating group chat" });
    }
};

export const sendMessageInGroupChat = async (req, res) => {
    const { sender, content } = req.body;
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat.users.map((user) => user.toString()).includes(sender)) {
            return res.status(403).json({ error: "User not in group chat" });
        }

        const senderUser = await User.findById(sender);
        if (!senderUser) {
            return res.status(404).json({ error: "Sender not found" });
        }

        const encryptedSenderName = encrypt(senderUser.fullName);
        const encryptedContent = encrypt(content);

        const newMessage = {
            sender,
            senderName: encryptedSenderName,
            content: encryptedContent,
            timestamp: new Date(),
        };

        groupChat.messages.push(newMessage);
        await groupChat.save();

        const decryptedMessage = {
            ...newMessage,
            senderName: decrypt(newMessage.senderName),
            content: decrypt(newMessage.content),
        };

        io.emit("newGroupMessage", decryptedMessage);

        res.status(200).json(groupChat);
    } catch (error) {
        console.log("error in sendMessageInGroupChat: ", error.message);
        res.status(500).json({ error: "Error sending message in group chat" });
    }
};

export const getGroupChatMessages = async (req, res) => {
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat) {
            return res.status(404).json({ error: "Group chat not found" });
        }

        const decryptedMessages = groupChat.messages.map((message) => {
            return {
                sender: message.sender,
                senderName: decrypt(message.senderName),
                content: decrypt(message.content),
                timestamp: message.timestamp.toISOString(),
            };
        });

        res.status(200).json(decryptedMessages);
    } catch (error) {
        console.log("error in getGroupChatMessages: ", error.message);
        res.status(500).json({ error: "Error getting group chat messages" });
    }
};

export const addUserToGroupChat = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat) {
            return res.status(404).json({ error: "Group chat not found" });
        }

        if (!groupChat.users) {
            return res.status(400).json({ error: "Group chat has no users" });
        }

        if (groupChat.users.includes(userId)) {
            return res
                .status(400)
                .json({ error: "User already in group chat" });
        }

        groupChat.users.push(userId);
        await groupChat.save();

        res.status(200).json(groupChat);
    } catch (error) {
        console.log("error in addUserToGroupChat: ", error.message);
        res.status(500).json({ error: "Error adding user to group chat" });
    }
};

export const removeUserFromGroupChat = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat) {
            return res.status(404).json({ error: "Group chat not found" });
        }

        const userIndex = groupChat.users.indexOf(userId);

        if (userIndex === -1) {
            return res.status(400).json({ error: "User not in group chat" });
        }

        groupChat.users.splice(userIndex, 1);
        await groupChat.save();

        res.status(200).json(groupChat);
    } catch (error) {
        console.log("error in removeUserFromGroupChat: ", error.message);
        res.status(500).json({ error: "Error removing user from group chat" });
    }
};

export const removeGroupChat = async (req, res) => {
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat) {
            return res.status(404).json({ error: "Group chat not found" });
        }

        await GroupChat.findOneAndDelete({ _id: id });

        res.status(200).json({ message: "Group chat removed successfully" });
    } catch (error) {
        console.log("error in removeGroupChat: ", error.message);
        res.status(500).json({ error: "Error removing group chat" });
    }
};

export const groupChatInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat) {
            return res.status(404).json({ error: "Group chat not found" });
        }

        const admin = await User.findById(groupChat.admin);
        const users = await Promise.all(
            groupChat.users
                .filter((userId) => userId.toString() !== admin._id.toString())
                .map((userId) => User.findById(userId))
        );

        if (!admin || users.includes(null)) {
            return res.status(404).json({ error: "User not found" });
        }

        const adminInfo = {
            id: admin._id.toString(),
            name: decrypt(admin.fullName),
        };
        const usersInfo = users.map((user) => ({
            id: user._id.toString(),
            name: decrypt(user.fullName),
        }));

        res.status(200).json({
            name: decrypt(groupChat.name),
            adminInfo,
            usersInfo,
        });
    } catch (error) {
        console.log("error in getGroupUsers: ", error.message);
        res.status(500).json({ error: "Error getting user names" });
    }
};
