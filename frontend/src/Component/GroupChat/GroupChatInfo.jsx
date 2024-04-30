import useGetGroupInfo from "../../hooks/useGetGroupInfo";
import "./GroupChat.css";

const GroupChatInfo = ({ id }) => {
    const { loading, groupInfo, error } = useGetGroupInfo(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bordertest">
            <h2 className="bold">{groupInfo.name}</h2>
            <p>
                <span className="bold">Admin:</span> {groupInfo.admin}
            </p>
            <p>
                <span className="bold">Users:</span>{" "}
                {groupInfo.users.join(", ")}
            </p>
        </div>
    );
};

export default GroupChatInfo;
