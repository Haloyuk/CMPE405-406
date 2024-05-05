import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const useSendGroupMessage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    const sendGroupMessage = async (groupId, message) => {
        /* console.log("sendGroupMessage called");
        console.log("Group ID:", groupId);
        console.log("Message:", message); */
        setLoading(true);
        try {
            /* console.log("Auth User ID:", authUser._id);
            console.log("Selected Conversation ID:", selectedConversation._id);
            console.log({
                senderId: authUser._id,
                message,
            }); */
            const response = await fetch(
                `/api/groupChat/sendMessage/${groupId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sender: authUser._id,
                        content: message,
                    }),
                }
            );
            const data = await response.json();
            //console.log(data);
        } catch (error) {
            console.error("Error in sendGroupMessage:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendGroupMessage };
};

export default useSendGroupMessage;
