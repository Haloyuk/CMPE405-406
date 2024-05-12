import React, { useState, useRef } from "react";
import "./MessageContainer.css";
import { LuSend } from "react-icons/lu";
import useSendMessage from "../../hooks/useSendMessage";
import useSendGroupMessage from "../../hooks/useSendGroupMessages";
import { GrFormAttachment } from "react-icons/gr";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(); // create a ref for the file input
    const { loading: loadingOneToOne, sendMessage } = useSendMessage();
    const { loading: loadingGroup, sendGroupMessage } = useSendGroupMessage();
    const { selectedConversation } = useConversation();

    const [fileName, setFileName] = useState("");

    // Update the handleFileChange function
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0]?.name); // Set the file name
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !file) return;

        if (
            selectedConversation &&
            selectedConversation.users &&
            selectedConversation.users.length >= 1
        ) {
            const groupId = selectedConversation._id;
            await sendGroupMessage(groupId, message, file);
        } else {
            await sendMessage(message, file);
        }

        setMessage("");
        setFile(null);
        setFileName(""); // Reset the file name
        fileInputRef.current.value = ""; // clear the file input field
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
                <label htmlFor="fileInput" className="custom-file-upload">
                    <GrFormAttachment />
                    <span>Choose File</span> {/* Change the color here */}
                </label>
                <input
                    id="fileInput"
                    type="file"
                    ref={fileInputRef} // attach the ref to the file input
                    onChange={handleFileChange}
                    style={{ display: "none" }} // hide the file input
                />
                <span style={{ color: 'rgba(54, 160, 199, 0.534)' }}>{fileName}</span> 
                <button type="submit" className="messageinput4">
                    <LuSend />
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
