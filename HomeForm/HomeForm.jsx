import React from "react";
import useLogout from "../../hooks/useLogout.js";
import "./HomeForm.css";
import { HiOutlineHome } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

const HomeForm = () => {
    const { loading, logout } = useLogout();

    return (
        <div>
            <div className="navigation">
                <ul>
                    <li className="list active">
                        <a href="#">
                            <span className="icon"><HiOutlineHome /></span>
                            <span className="text">Home</span>
                            <span className="circle"></span>
                        </a>
                    </li>
                    <li className="list">
                        <a href="#">
                            <span className="icon"><FiUser /></span>
                            <span className="text">Profile</span>
                            <span className="circle"></span>
                        </a>
                    </li>
                    <li className="list">
                        <a href="#">
                            <span className="icon"><BiMessageRoundedDetail /></span>
                            <span className="text">Message</span>
                            <span className="circle"></span>
                        </a>
                    </li>
                    <li className="list">
                        <a href="#">
                            <span className="icon"><MdOutlineAddToPhotos /></span>
                            <span className="text">GroupChat</span>
                            <span className="circle"></span>
                        </a>
                    </li>
                    <li className="list">
                        <a href="#" onClick={logout}>
                            <span className="icon"><MdOutlinePowerSettingsNew /></span>
                            <span className="text" >Logout</span>
                            <span className="circle"></span>
                        </a>
                    </li>
                    <div className="indicator"></div>
                </ul>
            </div>
            
        </div>
        
    );
};

export default HomeForm;
