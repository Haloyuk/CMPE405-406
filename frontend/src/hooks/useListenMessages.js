import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { toast } from "react-hot-toast";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (decryptedMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            toast(`New message from ${decryptedMessage.senderName}`);
            setMessages([...messages, decryptedMessage]);
        });

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, messages, setMessages]);
};

export default useListenMessages;
