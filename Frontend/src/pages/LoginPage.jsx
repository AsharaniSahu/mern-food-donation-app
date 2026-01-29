import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import "./LoginPage.css";

export default function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    e_mail: email,
                    password: password,
                }),
                credentials: 'include' // Important for sessions

            });

            const data = await response.json();

            if (response.ok) {
                const { role } = data;
                localStorage.setItem('token', data.token);

                // Redirect based on role
                if (role === 'ngo') {
                    navigate('/ngo-dashboard');
                } else if (role === 'donor') {
                    navigate('/donor-dashboard');
                } else if (role === 'management') {
                    navigate('/management-dashboard');
                } else {
                    alert("Unknown role.");
                }
            } else {
                alert(data.message || 'Login failed');
            }

        } catch (err) {
            console.error('Login error:', err);
            alert('Something went wrong!');
        }
    };

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username or email address</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Type your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="usernameError" className="error"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Type your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="remember-me">
                    <div className="remember-me-left">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#" style={{ marginLeft: 'auto' }}>Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-btn">LOGIN</button>
                </form>
            </div>

            <div className="footer-links">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Docs</a>
                <a href="#">Manage cookies</a>
                <a href="#">Do not share my personal information</a>
            </div>
            <p class="bottomtext">Don't have an account? <a href="/signup">Sign up</a></p>
        </>
    );
}
