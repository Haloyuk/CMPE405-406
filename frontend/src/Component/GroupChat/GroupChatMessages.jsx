import React, { useState } from "react";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";
import useGetGroupMessages from "../../hooks/useGetGroupMessages";
import useListenGroupMessages from "../../hooks/useListenGroupMessages"; // Import the hook
import Messages from "./Messages";

const GroupChatMessages = ({ groupId, userId }) => {
    const [message, setMessage] = useState("");
    const { groupMessages, loading } = useConversation(); // Get the groupMessages state from useConversation

    useGetGroupMessages(groupId); // Call the hook
    useListenGroupMessages(); // Call the hook

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/groupChat/${groupId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: userId,
                    content: message,
                }),
            });
            const data = await response.json();
            console.log(data);
            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {/* Pass the groupMessages state as the messages prop */}
            <Messages messages={groupMessages} loading={loading} />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default GroupChatMessages;
