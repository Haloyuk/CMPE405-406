import React, { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import "./LoginForm.css";
import useLogin from "../../hooks/useLogin";

function LoginForm() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { loading, login } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(userName, password);
    };

    return (
        <div className="wrapper" >
            <form onSubmit={handleLogin}>
                <div className="logo"></div>
                <div className="input-box">
                    <LuUser2 />
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    {/* <MdLockOutline /> */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <div className="remember-forgot">
                    <label htmlFor="">
                        <input type="checkbox" /> Remember me{" "}
                    </label>
                    <a href="a">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link"></div>
                <p>
                    Don't have an account? <a href="register">Register</a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
