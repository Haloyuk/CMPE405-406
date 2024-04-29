import React, { useEffect } from "react";
import "./MessageContainer.css";
import Message from "../MessageContainer/Message";
import useGetMessages from "../../hooks/useGetMessages";
import { useRef } from "react";
import { CiLock } from "react-icons/ci";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="messages1">
            <div className="notif">
                <CiLock />
                Messages are end to end encrypted. No one outside of this chat
                can read them,not even Chatcrypt.
            </div>
            <br></br>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {!loading && messages.length === 0 && <div className=""></div>}
        </div>
    );
};
export default Messages;
