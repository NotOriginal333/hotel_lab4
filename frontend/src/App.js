import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './authentication/Register';
import Login from './authentication/Login';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to the User Authentication App</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;
