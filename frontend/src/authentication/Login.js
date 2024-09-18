import React, { useState } from "react";
import axios from "axios";
import { getCsrfToken } from "../utils/csrf";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      console.log("Login successful:", response.data);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;