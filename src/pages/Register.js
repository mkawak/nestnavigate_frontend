import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
import API_BASE_URL from '../config';

function Register() {
    const [form, setForm] = useState({ email: '', name: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        navigate('/login');
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account?</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
    );
}

export default Register;