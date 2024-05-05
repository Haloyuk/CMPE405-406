import React from "react";
import "./MessageContainer.css";
import { LuSend } from "react-icons/lu";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import useSendGroupMessage from "../../hooks/useSendGroupMessages";
import { GrFormAttachment } from "react-icons/gr";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading: loadingOneToOne, sendMessage } = useSendMessage();
    const { loading: loadingGroup, sendGroupMessage } = useSendGroupMessage();
    const { selectedConversation } = useConversation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        //console.log(selectedConversation);

        if (
            selectedConversation &&
            selectedConversation.users &&
            selectedConversation.users.length >= 1
        ) {
            const groupId = selectedConversation._id;
            //console.log("Group ID:", groupId);
            await sendGroupMessage(groupId, message);
        } else {
            await sendMessage(message);
        }

        setMessage("");
    };

    return (
        <form className="messageinput1" onSubmit={handleSubmit}>
            <div className="messageinput2">
                <input
                    type="text"
                    className="messageinput3"
                    placeholder="Send a message.."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {/* <button type="" className="messageinput5">buse</button> */}
                <button type="submit" className="messageinput4">
                    <LuSend />
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
