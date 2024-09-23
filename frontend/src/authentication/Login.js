import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {getCsrfToken} from "../utils/csrf";
import "./styles/Authentication.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const csrfToken = getCsrfToken();

        try {
            const response = await axios.post(
                "/api/user/token/",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                }
            );
            const token = response.data.token;
            localStorage.setItem("token", token);

            console.log("Login successful:", response.data);
            navigate("/");
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        handleLogin(e);
    };

    return (
        <div className="form-box">
            <form onSubmit={handleLogin}>
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
                <center>
                    <a href="#" onClick={handleClick}>
                        SEND
                        <span></span>
                    </a></center>
            </form>
        </div>
    )
        ;
};

export default Login;
