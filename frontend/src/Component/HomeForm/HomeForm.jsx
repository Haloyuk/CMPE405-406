import React from "react";
import useLogout from "../../hooks/useLogout.js";
import "./HomeForm.css";

const HomeForm = () => {
    const { loading, logout } = useLogout();

    return (
        <div>
            {loading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </div>
    );
};

export default HomeForm;
