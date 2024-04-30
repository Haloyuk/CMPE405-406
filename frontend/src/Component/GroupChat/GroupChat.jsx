import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import "./GroupChat.css";
import SearchInput from "../Sidebar/SearchInput";
import useGroupChat from "../../hooks/useGroupChat";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const GroupChat = () => {
    const { createGroupChat } = useGroupChat();
    const { conversations, isLoading } = useGetConversations();
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCreateGroupChat = async (e) => {
        e.preventDefault();
        if (!groupName) {
            toast.error("Please enter a group name.");
            return;
        }
        const userIds = selectedUsers.map((user) => user.value);
        const authUser = JSON.parse(localStorage.getItem("authUser")); // parse the authUser object from local storage
        const adminId = authUser._id;
        //console.log(userIds);
        await createGroupChat(groupName, userIds);
        setGroupName("");
        setSelectedUsers([]);
    };

    const handleUserSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions || []);
    };

    const options = useMemo(
        () =>
            Array.isArray(conversations?.users)
                ? conversations.users.map((user) => ({
                      value: user._id,
                      label: user.userName,
                  }))
                : [],
        [conversations]
    );

    return (
        <>
            <form onSubmit={handleCreateGroupChat}>
                <div className="bordertest">
                    <label className="bold">Group Name:</label>
                    <input
                        className="input-box2"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button className="buton2" type="submit">
                        Create
                    </button>
                    <div>
                        <label className="bold">Select Group Members:</label>
                        <Select
                            isMulti
                            options={options}
                            onChange={handleUserSelect}
                            value={selectedUsers}
                            isSearchable
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default GroupChat;
