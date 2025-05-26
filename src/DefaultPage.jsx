import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './defaultPage.css'; // External stylesheet
import UserProfile from './pages/detailedUser';

const DefaultPage = ({ children }) => {
    const username = localStorage.getItem('username') || null;
    const [theme, setTheme] = useState('light');
    const userId = localStorage.getItem('userId') || null;
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleLogout = () => {
        localStorage.removeItem('logginToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        window.location.reload(); 
    };

    return (
        <div className={`default-layout ${theme}`}>
            <header className="header">
                <Link to="/" className="logo">RyanInspires</Link>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/products">Products</Link>
                    {!username && <Link to="/login">Login/Register</Link>}
                    {username && (
                        <a href="#" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            Logout
                        </a>

                    )}
                </nav>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark mode🌙' : 'Light mode☀️'}
                </button>
            </header>

            <main className="main-content">{children}</main>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} RyanInspires | All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DefaultPage;
