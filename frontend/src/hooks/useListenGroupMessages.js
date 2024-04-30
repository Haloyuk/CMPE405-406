import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenGroupMessages = () => {
    const { socket, userId } = useSocketContext(); // Get the current user's ID
    const { groupMessages, setGroupMessages } = useConversation();
    const numMessages = groupMessages.length;

    useEffect(() => {
        socket?.on("newGroupMessage", (decryptedMessage) => {
            //console.log("Received new group message:", decryptedMessage);
            //console.log("Sender ID:", decryptedMessage.sender); // Debug the sender's ID
            //console.log("Current user ID:", userId); // Debug the current user's ID
            if (decryptedMessage.sender !== userId) {
                // Check if the sender is not the current user
                const sound = new Audio(notificationSound);
                sound.play();
            }
            setGroupMessages([...groupMessages, decryptedMessage]);
        });

        return () => {
            socket?.off("newGroupMessage");
        };
    }, [socket, numMessages, userId]); // Add userId to the dependency array

    return { groupMessages };
};

export default useListenGroupMessages;
