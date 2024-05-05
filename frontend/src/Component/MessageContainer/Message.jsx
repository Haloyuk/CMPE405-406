import React from "react";
import "./MessageContainer.css";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../../../backend/utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const formattedTime = extractTime(message.createdAt || message.timestamp);
    const fromMe =
        (message.senderId || message.sender || message.userId) === authUser._id;
    const chatClassName = fromMe ? "messagesend1" : "receivedmessage1";

    const senderName = fromMe
        ? "You"
        : selectedConversation.isGroup
        ? message.senderName
        : selectedConversation.fullName;

    return (
        <div className="">
            <div className={` ${chatClassName} `}>
                <div className="receivedmessagetime">{senderName}</div>
                {message.message || message.content}
                <div className="receivedmessagetime">{formattedTime}</div>
            </div>
        </div>
    );
};
export default Message;
