import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    createGroupChat,
    addUserToGroupChat,
    removeUserFromGroupChat,
    sendMessageInGroupChat,
    removeGroupChat,
    groupChatInfo,
    getGroupChatMessages,
} from "../controllers/groupChat.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroupChat);
router.post("/addUser/:id", protectRoute, addUserToGroupChat);
router.post("/removeUser/:id", protectRoute, removeUserFromGroupChat);
router.post("/sendMessage/:id", protectRoute, sendMessageInGroupChat);
router.delete("/removeGroup/:id", protectRoute, removeGroupChat);
router.get("/info/:id", protectRoute, groupChatInfo);
router.get("/getMessages/:id", protectRoute, getGroupChatMessages);

export default router;
