import React, { useEffect, useRef, useState } from "react";
import "./MessageContainer.css";
import Message from "../MessageContainer/Message";
import useGetMessages from "../../hooks/useGetMessages";
import useGetGroupMessages from "../../hooks/useGetGroupMessages";
import { CiLock } from "react-icons/ci";
import useListenMessages from "../../hooks/useListenMessages";
import useListenGroupMessages from "../../hooks/useListenGroupMessages";

const Messages = ({ groupId }) => {
    //console.log("GroupId:", groupId);

    let messagesData, loading;

    if (groupId) {
        let { groupMessages } = useGetGroupMessages(groupId);
        messagesData = groupMessages;
        useListenGroupMessages(groupId); // Listen to group messages
    } else {
        let { messages } = useGetMessages();
        messagesData = messages;
        useListenMessages(); // Listen to one-to-one messages
    }

    let messages = Array.isArray(messagesData) ? messagesData : [messagesData];

    //console.log("Structure of messagesData:", messagesData);

    if (groupId && messagesData) {
        messages = messagesData;
    }
    //console.log("messages prop in Messages component:", messages);
    useListenMessages();
    const lastMessageRef = useRef();

    const [messageListVersion, setMessageListVersion] = useState(0);

    useEffect(() => {
        setMessageListVersion((prevVersion) => prevVersion + 1);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messageListVersion]);

    //console.log("Rendering messages:", messages);

    return (
        <div className="messages1">
            <div className="notif">
                <CiLock />
                Messages are end to end encrypted. No one outside of this chat
                can read them, not even Chatcrypt.
            </div>
            <br></br>
            {messages &&
                messages.map((message, index) => {
                    const isLastMessage = index === messages.length - 1;
                    return (
                        <div
                            key={index}
                            ref={isLastMessage ? lastMessageRef : null}
                        >
                            <Message message={message} />
                        </div>
                    );
                })}
        </div>
    );
};
export default Messages;
