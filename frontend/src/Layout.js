import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Layout.css';

const Layout = ({children}) => {
    return (
        <div className="layout">
            <header className="layout-header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/cottages">Cottages</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="layout-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
