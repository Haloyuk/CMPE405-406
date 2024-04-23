import "./ProfilePage.css";
import React from "react";
import { Link, Route } from "react-router-dom"; // react-router-dom'dan Link componentini içe aktarın
import useLogout from "../../hooks/useLogout.js";
// import "./HomeForm.css";
import { HiOutlineHome } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { LuEye } from "react-icons/lu";

const ProfilePage = () => {
    const { loading, logout } = useLogout();

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
                    <li className="list">
                        <a href="#" onClick={logout}>
                            <span className="icon"><MdOutlinePowerSettingsNew /></span>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div> 
                                <div className="block glow"><img src="https://cdns-images.dzcdn.net/images/cover/31804304a962af07a678da79148c6373/264x264.jpg" alt
                                    class="ui-w-80"/></div>
                                <br/><button>Change Profile Picture</button>
                                <div>
                                    <label className="labels">Full Name&emsp;</label>
                                   {/* aşağıya input tagi olan yerlere databaseden çekilen değerler konacak  */}
                                   <input type="text"/> 
                                </div>

                                <div>
                                    <label className="labels">Username &emsp;</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label className="labels">Password &emsp;</label>
                                    <input type="text"/>
                                    {/* <button className="icon"><LuEye/></button> */}
                                    
                                </div>
                                <div>
                                    <label className="labels">Email &emsp;</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label className="labels">Gender &emsp;</label>
                                    <input type="text"/>
                                </div>
                            
            </div>



    );
};

export default ProfilePage;