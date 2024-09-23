import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {getCsrfToken} from "../utils/csrf";
import "./styles/Authentication.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Hook for navigation

    const handleRegister = async (e) => {
        e.preventDefault();
        const csrfToken = getCsrfToken();

        try {
            const response = await axios.post(
                "/api/user/create/",
                {
                    email,
                    password,
                    name,
                },
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                }
            );
            const token = response.data.token;
            localStorage.setItem("token", token);

            console.log("Registration successful:", response.data);
            navigate("/");
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        handleRegister(e);
    };

    return (
        <div className="form-box">
            <form onSubmit={handleRegister}>
                <div className="user-box">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>
                <div className="user-box">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Name</label>
                </div>
                <center>
                    <center>
                        <a href="#" onClick={handleClick}>
                            SEND
                            <span></span>
                        </a></center>
                </center>
            </form>
        </div>
    );
};

export default Register;
