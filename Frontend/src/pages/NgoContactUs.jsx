import Navbar from "../components/NgoNavBar";

import React, { useState } from 'react';
import './ContactUs.css'; // We'll create this CSS file

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You would typically send this data to your backend
  };

  return (
    <>
    <Navbar/>
   

      {/* Main Content */}
      <div className="container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! If you have any questions, feedback, or inquiries, feel free to reach out.</p>

        {/* Contact Info Section */}
        <div className="contact-info">
          <div className="contact-card">
            <h3>📍 Address</h3>
            <p>123 Charity Lane, Giving City, 45678</p>
          </div>
          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="contact-card">
            <h3>✉ Email</h3>
            <p>support@donateforgood.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Leave a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />

            <label htmlFor="email">Email Address:</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />

            <label htmlFor="message">Your Message:</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;