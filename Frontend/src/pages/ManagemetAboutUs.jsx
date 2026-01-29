import Navbar from "../components/ManagementNavBar";
import React from 'react';
import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Navbar with fixed positioning */}
      <div className="fixed-navbar">
        <Navbar/>
      </div>
      
      {/* Main Content with padding to account for fixed navbar */}
      <div className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            About Our Mission
          </h1>
          <p className="page-subtitle">
            Bridging the gap between food donors and those in need
          </p>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-content">
            <p className="mission-text">
              Welcome to our donation platform! Our mission is to bridge the gap between food donors and those in need, ensuring that no one goes to bed hungry. We believe in the power of community and the importance of sharing resources.
            </p>
            <p className="mission-text">
              Founded by a team of three passionate individuals, we are dedicated to making a difference in people's lives through sustainable food distribution and community engagement.
            </p>
          </div>
        </div>

        {/* Founders Section */}
        <div className="founders-section">
          <h2 className="section-title">Our Founders</h2>
          <p className="section-subtitle">
            The visionary leaders who brought this initiative to life
          </p>
          
          <div className="founders-grid">
            {/* Founder 1 */}
            <div className="founder-card">
              <div className="founder-avatar founder-avatar-blue">
                <span className="founder-initials">AS</span>
              </div>
              <h3 className="founder-name">Asharani Sahu</h3>
              <p className="founder-role">Co-Founder & CEO</p>
              <p className="founder-description">Visionary leader with expertise in social entrepreneurship</p>
            </div>
            
            {/* Founder 2 */}
            <div className="founder-card">
              <div className="founder-avatar founder-avatar-green">
                <span className="founder-initials">GS</span>
              </div>
              <h3 className="founder-name">Gautami Surve</h3>
              <p className="founder-role">Co-Founder & CTO</p>
              <p className="founder-description">Technology innovator driving our platform development</p>
            </div>
            
            {/* Founder 3 */}
            <div className="founder-card">
              <div className="founder-avatar founder-avatar-purple">
                <span className="founder-initials">SD</span>
              </div>
              <h3 className="founder-name">Shruti Dahivalikar</h3>
              <p className="founder-role">Co-Founder & COO</p>
              <p className="founder-description">Operations expert ensuring our mission reaches those in need</p>
            </div>

            <div className="founder-card">
              <div className="founder-avatar founder-avatar-blue">
                <span className="founder-initials">VP</span>
              </div>
              <h3 className="founder-name">Vaishnavi Patil</h3>
              <p className="founder-role">Co-Founder & CEO</p>
              <p className="founder-description">Visionary leader with expertise in social entrepreneurship</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon value-icon-blue">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="value-title">Community First</h3>
              <p className="value-description">We prioritize the needs of our community above all else, ensuring equitable access to resources.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon value-icon-green">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-description">We promote sustainable practices to reduce food waste while addressing hunger.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon value-icon-purple">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="value-title">Transparency</h3>
              <p className="value-description">We maintain open communication about our operations and impact with all stakeholders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;