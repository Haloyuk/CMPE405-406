import React from "react";
import Conversation from "../Sidebar/Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className="convos1">
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}
        </div>
    );
};
export default Conversations;
