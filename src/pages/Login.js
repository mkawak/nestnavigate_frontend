import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
import API_BASE_URL from '../config';

function Login({ setToken }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(form),
        });
        const data = await res.json();
        setToken(data.access_token);
        navigate('/dashboard');
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Email" onChange={handleChange} required />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <button onClick={() => navigate('/')}>Go to Register</button>
        </div>
    );
}

export default Login;