import "./ChatPage.css";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom"; // react-router-dom'dan Link componentini içe aktarın
import useLogout from "../../hooks/useLogout.js";
//import "./HomeForm.css";
import { HiOutlineHome } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import Sidebar from "../../Component/Sidebar/Sidebar.jsx"
import MessageContainer from "../../Component/MessageContainer/MessageContainer.jsx"
import GroupChat from "../GroupChat/GroupChat.jsx";

const ChatPage = () => {
    const { loading, logout } = useLogout();
    const [showGroupChat, setShowGroupChat] = useState(false);

    const handleClick = () => {
        setShowGroupChat(prevState => !prevState);
      };

    return (
        <div>
            <div className="navigation">
                <ul>
                    <li className="list">
                    <Link to="/">
                            <span className="icon"><HiOutlineHome /></span>
                            <span className="text">Home</span>
                        </Link>
                    </li>
                    <li className="list">
                    <Link to="/profile">
                            <span className="icon"><FiUser /></span>
                            <span className="text">Profile</span>
                        </Link>
                    </li>
                    <li className="list">
                    <Link to="/chat">
                            <span className="icon"><BiMessageRoundedDetail /></span>
                            <span className="text">Chat</span>
                        </Link>
                    </li>
                    {/* <li className="list">
                    <a href="ProfilePage.jsx">
                            <span className="icon"><MdOutlineAddToPhotos /></span>
                            <span className="text">Create Group Chat</span>
                        </a>
                    </li>  */}
                    <li className="list">
                        <a href="#" onClick={logout}>
                            <span className="icon"><MdOutlinePowerSettingsNew /></span>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
            <button className="buton" onClick={handleClick}>Create Group</button>
            
            </div>
            <div className='chat1'>
            {showGroupChat && <GroupChat />}
            <Sidebar/>
            <MessageContainer/>
            </div>
        </div>
    );
};

export default ChatPage;
