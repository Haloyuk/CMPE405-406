import GroupChat from "../models/groupChat.model.js";

export const createGroupChat = async (req, res) => {
    const { name, users } = req.body;

    try {
        const groupChat = new GroupChat({ name, users });
        await groupChat.save();

        res.status(201).json(groupChat);
    } catch (error) {
        console.log("Error in createGroupChat: ", error.message);
        res.status(500).json({ error: "Error creating group chat" });
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
        if (userIndex > -1) {
            groupChat.users.splice(userIndex, 1);
            await groupChat.save();
        }

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
        groupChat.messages.push({ sender, content, timestamp: new Date() });
        await groupChat.save();

        res.status(200).json(groupChat);
    } catch (error) {
        console.log("error in sendMessageInGroupChat: ", error.message);
        res.status(500).json({ error: "Error sending message in group chat" });
    }
};
