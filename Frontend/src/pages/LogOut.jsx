import React from 'react';
import "./LogOut.css";
import "./LoginPage";
import { Link } from 'react-router-dom';  


export default function LogOut(){

return(
    <>
    <div className="logout-container">
    <h2>You have been logged out</h2>
    <a><Link to = "/login" style={{color: 'white'}}>Go to Login Page</Link></a>
    </div>
    
    </>
)

}