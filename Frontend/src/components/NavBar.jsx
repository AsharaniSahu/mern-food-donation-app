import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // assuming your CSS file is named navbar.css

export default function Navbar() {
  return (
    <div className="navbar">
   {/* Brand Name */}
   

      <ul className="nav-list">
      <div className="brand-name">
        <Link to="/donor-dashboard" className="brand-link">MealCircle</Link>
      </div>
        <li className="nav-item">
          <Link to="/donor-dashboard" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/AboutUs" className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/Track" className="nav-link">Your Donations</Link>
        </li>
        <li className="nav-item">
          <Link to="/ContactUs" className="nav-link">Contact Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/LogOut" className="nav-link">Logout</Link>
        </li>
        <li>
          <Link to="/Donor" className="donate-button">
            +DONATE
          </Link>
        </li>
      </ul>
    </div>
  );
}