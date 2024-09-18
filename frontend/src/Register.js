// src/Register.js
import React, {useState} from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8080/api/user/create/', {
                name,
                password,
                email,
            });
            setResponse(res.data);
        } catch (error) {
            setResponse(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="Register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Your name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Register;
