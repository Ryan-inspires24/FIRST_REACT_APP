import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './defaultPage.css'; // External stylesheet

const DefaultPage = ({ children }) => {
    const [theme, setTheme] = useState('light');

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
                    <Link to="/login">Login/Register</Link>
                </nav>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
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
