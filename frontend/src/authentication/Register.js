import React, { useState } from "react";
import axios from "axios";
import { getCsrfToken } from "../utils/csrf";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

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
      console.log("Registration successful:", response.data);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;