import React from "react";
import "./MessageContainer.css";
import { LuSend } from "react-icons/lu";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { GrFormAttachment } from "react-icons/gr";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
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
