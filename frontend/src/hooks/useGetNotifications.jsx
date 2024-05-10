import React, { useEffect, useState } from "react";
import { extractTime } from "../../../backend/utils/extractTime";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

function Notifications() {
    const { socket, userId } = useSocketContext();

    const [isLoading, setIsLoading] = useState(!userId);
    const [notifications, setNotifications] = useState([]);
    const [latestNotifications, setLatestNotifications] = useState({});
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        if (!userId) return;

        const fetchNotifications = async () => {
            try {
                const response = await fetch(`/api/notifications/${userId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                setNotifications(data);
                setIsLoading(false);

                // Populate latestNotifications state
                const latestNotifications = {};
                data.forEach((notification) => {
                    if (notification.groupChat) {
                        latestNotifications[
                            `${notification.groupChat}-${notification.senderId}`
                        ] = notification;
                    } else {
                        latestNotifications[notification.senderId] =
                            notification;
                    }
                });
                setLatestNotifications(latestNotifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    useEffect(() => {
        if (!socket || isLoading) return;

        socket.emit("userConnected", userId);

        socket.on("newNotification", function (notification) {
            //console.log("Received newNotification event", notification);
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                notification,
            ]);

            setLatestNotifications((prevLatestNotifications) => ({
                ...prevLatestNotifications,
                [notification.senderId]: notification,
            }));
        });

        socket.on("newGroupNotification", function (notification) {
            //console.log("Received newGroupNotification event", notification);
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                notification,
            ]);

            setLatestNotifications((prevLatestNotifications) => ({
                ...prevLatestNotifications,
                [`${notification.groupChat}-${notification.senderId}`]:
                    notification,
            }));
        });

        return () => {
            socket.off("newNotification");
            socket.off("newGroupNotification");
        };
    }, [userId, socket, isLoading]);

    useEffect(() => {
        if (selectedConversation) {
            notifications.forEach((notification) => {
                if (
                    notification.senderId === selectedConversation._id &&
                    !notification.groupChat
                ) {
                    handleMarkAsSeen(notification._id);
                }

                if (
                    notification.groupChat &&
                    notification.groupChat === selectedConversation._id
                ) {
                    handleMarkAsSeen(notification._id);
                }
            });
        }
    }, [selectedConversation, notifications]);

    const handleMarkAsSeen = async (_id) => {
        const notification = notifications.find(
            (notification) => notification._id === _id
        );

        if (!notification) {
            return;
        }
        const notificationKey = notification.groupChat
            ? `${notification.groupChat}-${notification.senderId}`
            : notification.senderId;
        if (!latestNotifications[notificationKey]) {
            return;
        }

        try {
            const response = await fetch(`/api/notifications/${_id}/seen`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error marking notification as seen");
            }

            setNotifications((prevNotifications) =>
                prevNotifications.filter(
                    (notification) =>
                        !(
                            notification._id === _id &&
                            ((notification.senderId ===
                                selectedConversation._id &&
                                !notification.groupChat) ||
                                notification.groupChat ===
                                    selectedConversation._id)
                        )
                )
            );

            // Update latestNotifications state
            setLatestNotifications((prevLatestNotifications) => {
                const updatedNotifications = { ...prevLatestNotifications };
                const notification = notifications.find(
                    (notification) => notification._id === _id
                );

                if (notification) {
                    if (notification.groupChat) {
                        delete updatedNotifications[
                            `${notification.groupChat}-${notification.senderId}`
                        ];
                    } else {
                        delete updatedNotifications[notification.senderId];
                    }
                }

                return updatedNotifications;
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Notifications</h1>
            {Object.values(latestNotifications).map((notification) => (
                <div key={notification._id}>
                    <p>{notification.message}</p>
                    <p>Time: {extractTime(notification.timestamp)}</p>
                </div>
            ))}
        </div>
    );
}

export default Notifications;
