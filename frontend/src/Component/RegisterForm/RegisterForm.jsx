import React from "react";
import { LuUser2 } from "react-icons/lu";
import "./RegisterForm.css";
import { useState } from "react";
import useRegister from "../../hooks/useRegister";

function RegisterForm() {
    const [inputs, setInputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        gender: "",
    });

    const { loading, register } = useRegister();

    const handleCheckBoxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(inputs);
    };

    //console.log(inputs);

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
                        value={inputs.userName}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                userName: e.target.value,
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
                        placeholder="Confirmed Password"
                        required
                        value={inputs.confirmPassword}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={inputs.email}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                email: e.target.value,
                            })
                        }
                    />
                </div>

                <input
                    type="radio"
                    name="gender"
                    value="male"
                    required
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            gender: e.target.value,
                        })
                    }
                />
                <label htmlFor="male">Male </label>
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    required
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            gender: e.target.value,
                        })
                    }
                />
                <label htmlFor="female"> Female</label>
                <br />
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
