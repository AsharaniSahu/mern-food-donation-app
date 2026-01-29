import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // assuming your CSS file is named navbar.css

export default function Navbar() {
  return (
    <div className="navbar">

        <div className="brand-name">
              <Link to="/donor-dashboard" className="brand-link">MealCircle</Link>
            </div>

      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/ngo-dashboard" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/NgoTrack" className="nav-link">Available Donations</Link>
        </li>
        <li className="nav-item">
          <Link to="/ngoAboutUs" className="nav-link">About Us</Link>
        </li>
      
        <li className="nav-item">
          <Link to="/ngoContactUs" className="nav-link">Contact Us</Link>
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