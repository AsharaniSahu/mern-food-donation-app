import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // assuming your CSS file is named navbar.css

export default function WelcomeNavbar() {
  return (
    <div className="navbar">

  <div className="brand-name">
        <Link to="/donor-dashboard" className="brand-link">MealCircle</Link>
      </div>

      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/AboutUs" className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/ContactUs" className="nav-link">Contact Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/LogOut" className="nav-link">Logout</Link>
        </li>
        <li>
          <Link to="/Login" className="donate-button">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}