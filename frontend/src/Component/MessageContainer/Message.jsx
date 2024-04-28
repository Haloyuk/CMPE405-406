import React from "react";
import "./MessageContainer.css";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../../../backend/utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const formattedTime = extractTime(message.createdAt);
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? "messagesend1" : "receivedmessage1";
    //const chatTime = fromMe ? "messagesendtime1" : "receivedmessagetime";

    return (
        <div className="">
            <div className={` ${chatClassName} `}>
                {message.message}
                <div className="receivedmessagetime">{formattedTime}</div>
            </div>
        </div>
    );
};
export default Message;
