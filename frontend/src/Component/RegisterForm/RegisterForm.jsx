import React from "react";
import { LuUser2 } from "react-icons/lu";
import "./RegisterForm.css";
import { useState } from "react";

function RegisterForm() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmedPassword: "",
        gender: "",
    });

    const handleCheckBoxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="logo"></div>
                <div className="input-box">
                    <LuUser2 />
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={inputs.fullName}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                fullName: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={inputs.username}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                username: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={inputs.password}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Canfirmed Password"
                        required
                        value={inputs.confirmedPassword}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                confirmedPassword: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-box">
                    <input type="email" placeholder="E-mail" required />
                </div>
                <p>Select your gender: </p>
                <input type="radio" name="gender" value="male" required />
                <label for="male">Male </label>
                <input type="radio" name="gender" value="female" required />
                <label for="female"> Female</label>
                <br />
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
