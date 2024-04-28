import React from "react";
import "./Sidebar.css";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <>
            <div
                className={`other ${isSelected ? "sidebarclick" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className="">
                    <div className="">
                        <img src={conversation.profilePic} alt="no photo"></img>
                    </div>
                </div>

                <div className="nametags">
                    <div className="nametags2">
                        <p className="nametags3">{conversation.fullName}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <hr></hr>}
        </>
    );
};
export default Conversation;
