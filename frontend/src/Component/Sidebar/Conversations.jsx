import React, { useState } from "react";
import Conversation from "../Sidebar/Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations";
import GroupChatItem from "../GroupChat/GroupChatItem.jsx";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    const [selectedGroupChat, setSelectedGroupChat] = useState();

    const handleGroupChatClick = (groupChat) => {
        setSelectedGroupChat(groupChat);
    };

    const safeConversations = Array.isArray(conversations?.users)
        ? [...conversations.users].sort((a, b) =>
              (a.fullName || "").localeCompare(b.fullName || "")
          )
        : [];

    const safeGroupChats = Array.isArray(conversations?.groupChats)
        ? [...conversations.groupChats].sort((a, b) =>
              (a.name || "").localeCompare(b.name || "")
          )
        : [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="convos1">
            {safeGroupChats.map((groupChat, idx) => (
                <GroupChatItem
                    key={groupChat._id}
                    groupChat={groupChat}
                    lastIdx={idx === safeGroupChats.length - 1}
                    onClick={() => handleGroupChatClick(groupChat)}
                />
            ))}
            {safeConversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === safeConversations.length - 1}
                />
            ))}

            {selectedGroupChat && (
                <div>
                    <h2>{selectedGroupChat.name}</h2>
                    <p>Admin: {selectedGroupChat.admin}</p>
                    <p>Users: {selectedGroupChat.users.join(", ")}</p>
                </div>
            )}
        </div>
    );
};

export default Conversations;
