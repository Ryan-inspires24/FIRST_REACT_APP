import React, { useState } from 'react';
import DefaultPage from '../DefaultPage';
import { NavLink } from 'react-router-dom';
import '../auth.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Please enter a valid username and password');
            setError('Username and password cannot be empty');
            return;
        }

        try {
            const response = await fetch('https://ryaninspires.pythonanywhere.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errData = await response.json();
                alert('Login failed: ' + (errData.message || 'Unknown error'));
                throw new Error(errData.message || 'Login failed');
            }

            const result = await response.json();
            setIsLoggedIn(true);
            alert('Login successful! Welcome ' + result.username);
            setTimeout(() => {
                navigate('/users');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <DefaultPage>
            <div className='auth-container'>
                <div className='auth-header'>
                    <h2 className='auth-header'>Login</h2>
                    <p className='instructions'>Please enter your username and password to login.</p>
                    <p className='instructions'>If you don't have an account, please register.</p>
                </div>
                <div className='auth-form'>
                    <form onSubmit={handleLogin}>
                        <div>
                            <p><label>Username</label></p>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <p><label>Password</label></p>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <p><label>Remember me</label></p>
                            <input type="checkbox" name="rememberMe" />
                        </div>

                        <button type="submit" className='auth-button'>Login</button>
                        <div>
                            <NavLink to="/register">Don't have an account? Register here</NavLink>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        {isLoggedIn && <p className='success-message'>Login successful!</p>}
                    </form>
                </div>
            </div>
        </DefaultPage>
    );
}

export default LoginPage;
