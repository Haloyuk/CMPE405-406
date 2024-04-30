import GroupChat from "../models/groupChat.model.js";
import { io } from "../socket/socket.js";

export const createGroupChat = async (req, res) => {
    //console.log(req.body);
    const { name, adminId, users } = req.body;

    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    //const adminId = req.user.id; // Assuming the logged-in user's ID is sent as 'user' in the request

    //console.log("Admin ID:", adminId);

    try {
        const newGroupChat = new GroupChat({
            name,
            admin: adminId,
            users: [adminId].concat(users || []),
        });

        //console.log("newGroupChat: ", newGroupChat);

        const savedGroupChat = await newGroupChat.save();

        res.status(201).json(savedGroupChat);
    } catch (error) {
        console.log("error in createGroupChat: ", error.message);
        //console.log("error: ", error);
        res.status(500).json({ error: "Error creating group chat" });
    }
};

export const getGroupChatMessages = async (req, res) => {
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat) {
            return res.status(404).json({ error: "Group chat not found" });
        }

        res.status(200).json(groupChat.messages);
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

export const sendMessageInGroupChat = async (req, res) => {
    const { sender, content } = req.body;
    const { id } = req.params;

    try {
        const groupChat = await GroupChat.findById(id);

        if (!groupChat.users.map((user) => user.toString()).includes(sender)) {
            return res.status(403).json({ error: "User not in group chat" });
        }

        const newMessage = { sender, content, timestamp: new Date() };
        groupChat.messages.push(newMessage);
        await groupChat.save();

        // Emit the newGroupMessage event
        io.emit("newGroupMessage", newMessage);

        res.status(200).json(groupChat);
    } catch (error) {
        console.log("error in sendMessageInGroupChat: ", error.message);
        res.status(500).json({ error: "Error sending message in group chat" });
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

        res.status(200).json(groupChat);
    } catch (error) {
        console.log("error in getGroupChat: ", error.message);
        res.status(500).json({ error: "Error getting group chat" });
    }
};
