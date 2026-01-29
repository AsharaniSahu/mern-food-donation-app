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
          <Link to="/management-dashboard" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/ManagementAboutUs" className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/MTrack" className="nav-link">History</Link>
        </li>
      
        <li className="nav-item">
          <Link to="/LogOut" className="nav-link">Logout</Link>
        </li>
  
      </ul>
    </div>
  );
}