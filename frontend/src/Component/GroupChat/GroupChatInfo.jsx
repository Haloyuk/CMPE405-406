import useGetGroupInfo from "../../hooks/useGetGroupInfo";
import "./GroupChat.css";

const GroupChatInfo = ({ conversation }) => {
    const { loading, groupInfo, error } = useGetGroupInfo(
        conversation ? conversation._id : undefined
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !groupInfo) {
        return <div>Error: {error}</div>;
    }

    //console.log(groupInfo);

    return (
        <div className="bordertest">
            {/* {console.log(groupInfo)} */}
            <h2 className="bold">{groupInfo.name}</h2>
            <p>
                <span className="bold">Admin:</span> {groupInfo.adminInfo.name}
            </p>
            <p>
                <span className="bold">Users:</span>{" "}
                {groupInfo.usersInfo.map((user) => user.name).join(", ")}
            </p>
        </div>
    );
};

export default GroupChatInfo;
