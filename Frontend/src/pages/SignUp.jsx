import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // You can reuse the login styles


export default function SignupPage() {
    const [formData, setFormData] = useState({
        e_mail: '',
        password: '',
        role: '',
        user_name: '',
        phone_no: '',
        address: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/Auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful! Now login.');
                navigate('/login');
            } else {
                alert(data.message || 'Signup failed');
            }

        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="login-container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user_name" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="e_mail" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phone_no" placeholder="Phone Number" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="ngo">NGO</option>
                    <option value="donor">Donor</option>
                    <option value="management">Management</option>
                </select>
                <button type="submit" className="login-btn">Sign Up</button>
            </form>
            <p class="bottomtext">Already have an account? <a href="/login">Login</a></p>

        </div>
        
    );
}
