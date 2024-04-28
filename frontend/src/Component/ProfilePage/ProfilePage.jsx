import "./ProfilePage.css";
import React from "react";
import { Link, Route } from "react-router-dom"; // react-router-dom'dan Link componentini içe aktarın
import useLogout from "../../hooks/useLogout.js";
import { HiOutlineHome } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import useProfileData from "../../hooks/useProfileData";

const ProfilePage = () => {
    const { logout } = useLogout();
    const { loading, profileData } = useProfileData();

    return (
        <div>
            <div className="navigation">
                <ul>
                    <li className="list">
                        <Link to="/">
                            <span className="icon">
                                <HiOutlineHome />
                            </span>
                            <span className="text">Home</span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/profile">
                            <span className="icon">
                                <FiUser />
                            </span>
                            <span className="text">Profile</span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/chat">
                            <span className="icon">
                                <BiMessageRoundedDetail />
                            </span>
                            <span className="text">Chat</span>
                        </Link>
                    </li>
                    <li className="list">
                        <a href="#" onClick={logout}>
                            <span className="icon">
                                <MdOutlinePowerSettingsNew />
                            </span>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="block glow">
                <img
                    src={profileData.profilePic}
                    alt="profile-pic"
                    class="ui-w-80"
                />
            </div>
            <br />
            
            <div class="wrap">
    <div class="left-side">
        <p>
            <label class="labels">Full Name:&emsp;</label>
            
        </p>

        <p>
            <label class="labels">Username: &emsp;</label>
            
        </p>

        <p>
            <label class="labels">Email: &emsp;</label>
            
        </p>

        <p>
            <label class="labels">Gender: &emsp;</label>
            
        </p>
    </div>

    <div class="right-side">
        <p><span class="data">{profileData.fullName || ""}</span></p>
        <p><span class="data">{profileData.userName || ""}</span></p>
        <p><span class="data">{profileData.email || ""}</span></p>
        <p><span class="data">{profileData.gender || ""}</span></p>
    </div>
</div>

        </div>
    );
};

export default ProfilePage;