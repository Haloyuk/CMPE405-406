import React, { useState, useMemo } from "react";
import Select from "react-select";
import useGetGroupInfo from "../../hooks/useGetGroupInfo";
import useAddUserToGroupChat from "../../hooks/useAddUserToGroupChat";
import useRemoveUserFromGroupChat from "../../hooks/useRemoveUserFromGroupChat";
import useRemoveGroupChat from "../../hooks/useRemoveGroupChat";
import useGetConversations from "../../hooks/useGetConversations";
import "./GroupChat.css";

const GroupChatInfo = ({ conversation }) => {
    const {
        loading: groupLoading,
        groupInfo,
        error: groupError,
    } = useGetGroupInfo(conversation ? conversation._id : undefined);

    const {
        loading: usersLoading,
        conversations,
        error: usersError,
    } = useGetConversations();

    const { addUser: addUserToGroup } = useAddUserToGroupChat();
    const { removeUser: removeUserFromGroup } = useRemoveUserFromGroupChat();
    const { removeGroup: removeGroupChat } = useRemoveGroupChat();

    const [selectedUserToRemove, setSelectedUserToRemove] = useState(null);
    const [selectedUserToAdd, setSelectedUserToAdd] = useState(null);

    const getAllUsersAndRemoveGroupUsers = (allUsers, groupUsers) => {
        //console.log("All users before filtering:", allUsers);
        //console.log("Group users:", groupUsers);
        const filteredUsers = allUsers.filter(
            (user) =>
                !groupUsers.find((groupUser) => groupUser._id === user._id)
        );
        //console.log("All users after filtering:", filteredUsers);
        return filteredUsers;
    };

    const allUsers = useMemo(() => {
        //console.log("Recalculating allUsers...");
        //console.log("conversations.users:", conversations?.users);
        //console.log("groupInfo.usersInfo:", groupInfo?.usersInfo);

        if (Array.isArray(conversations?.users) && groupInfo?.usersInfo) {
            const groupUsersWithCorrectId = groupInfo.usersInfo.map((user) => ({
                ...user,
                _id: user.id,
            }));
            const users = getAllUsersAndRemoveGroupUsers(
                conversations.users,
                groupUsersWithCorrectId
            ).map((user) => ({
                value: user._id,
                label: user.fullName,
            }));

            //console.log("New allUsers:", users);
            return users;
        } else {
            return [];
        }
    }, [conversations, groupInfo]);

    if (groupLoading || usersLoading || !groupInfo || !conversations) {
        return <div>Loading...</div>;
    }

    if (groupError || usersError) {
        return <div>Error: {groupError || usersError}</div>;
    }

    const handleRemoveUser = () => {
        console.log("selectedUserToRemove:", selectedUserToRemove);
        if (selectedUserToRemove) {
            console.log("Removing user:", selectedUserToRemove);
            removeUserFromGroup(selectedUserToRemove.value, conversation._id);
        }
    };

    const handleAddUser = () => {
        if (selectedUserToAdd) {
            console.log("Adding user:", selectedUserToAdd);
            addUserToGroup(selectedUserToAdd.value, conversation._id);
        }
    };

    const handleDeleteGroup = () => {
        removeGroupChat(conversation._id);
    };

    console.log("groupInfo:", groupInfo);
    console.log("groupInfo.usersInfo:", groupInfo?.usersInfo);

    return (
        <div className="profile-border">
            <div className="groupprof1">{groupInfo?.name}</div>
            <div className="groupprof2">
                Group Admin: {groupInfo?.adminInfo.name}
            </div>
            <br />
            <div>
                Members:{" "}
                {groupInfo?.usersInfo.map((user) => user.name).join(", ")}
            </div>
            <Select
                className="groupprof3"
                options={groupInfo?.usersInfo.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))}
                onChange={setSelectedUserToRemove}
            />
            <button className="remove-button" onClick={handleRemoveUser}>
                Remove Member
            </button>
            <Select
                className="groupprof3"
                options={allUsers}
                onChange={setSelectedUserToAdd}
            />
            <button className="add-button" onClick={handleAddUser}>
                Add Member
            </button>
            <button
                className="remove-button"
                style={{ marginTop: "220px" }}
                onClick={handleDeleteGroup}
            >
                Delete Group
            </button>
        </div>
    );
};

export default GroupChatInfo;
