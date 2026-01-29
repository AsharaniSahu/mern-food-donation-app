import React, { useState, useEffect } from 'react';
import './NGODashboard.css';
import Navbar from "../components/NgoNavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NGODashboard = () => {
  const [ngoProfile, setNgoProfile] = useState({
    ngoname: '',
    contactperson: '',
    phoneno: '',
    ngoaddress: ''
  });

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [foodRequests, setFoodRequests] = useState([]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setNgoProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/api/ngo/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          throw new Error(`Conflict: ${data.error}`);
        } else {
          throw new Error('Submission failed');
        }
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch('/api/volunteer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteerForm)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      toast.success('Volunteer registered successfully!');
      setVolunteerForm({ name: '', email: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: You might want to fetch foodRequests from server using fetch
  // useEffect(() => {
  //   const fetchRequests = async () => {
  //     const res = await fetch('/api/food-requests');
  //     const data = await res.json();
  //     setFoodRequests(data);
  //   };
  //   fetchRequests();
  // }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar/>
      
      <div className="container">
        {/* Food Requests Section */}
        <div className="section">
          <h2>Food Requests</h2>
          {foodRequests.length === 0 ? (
            <p>No food requests available</p>
          ) : (
            foodRequests.map(request => (
              <div key={request.donationId} className="food-card">
                <img src={request.photo || "https://via.placeholder.com/80"} alt="Food" />
                <div className="food-info">
                  <p><strong>Food:</strong> {request.nameOfFood}</p>
                  <p><strong>Quantity:</strong> {request.quantity}</p>
                  <p><strong>Donor:</strong> {request.donorName}</p>
                  <p><strong>Location:</strong> {request.location}</p>
                </div>
                <div className="buttons">
                  <button 
                    onClick={() => handleFoodResponse(request.donationId, 'accept')}
                    className="accept-btn"
                    disabled={isLoading}
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleFoodResponse(request.donationId, 'decline')}
                    className="decline-btn"
                    disabled={isLoading}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* NGO Profile Section */}
        <div className="section">
          <h2>NGO Profile</h2>
          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <input 
              type="text" 
              name="ngoname"
              placeholder="NGO Name" 
              value={ngoProfile.ngoname}
              onChange={handleProfileChange}
              required
              disabled={isLoading}
            />
            <input 
              type="text" 
              name="contactperson"
              placeholder="Contact Person" 
              value={ngoProfile.contactperson}
              onChange={handleProfileChange}
              required
              disabled={isLoading}
            />
            <input 
              type="text" 
              name="phoneno"
              placeholder="Contact Number" 
              value={ngoProfile.phoneno}
              onChange={handleProfileChange}
              required
              disabled={isLoading}
            />
            <input 
              type="text" 
              name="ngoaddress"
              placeholder="Address" 
              value={ngoProfile.ngoaddress}
              onChange={handleProfileChange}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Reports Section */}
        <div className="section">
          <h2>Reports & Analytics</h2>
          <p><strong>Accepted Donations:</strong> {foodRequests.filter(r => r.status === 'claimed').length}</p>
          <p><strong>Rejected Donations:</strong> {foodRequests.filter(r => r.status === 'rejected').length}</p>
        </div>

        {/* Volunteer Signup Section */}
        <div className="section">
          <h2>Volunteer Signup</h2>
          <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Volunteer Name"
              value={volunteerForm.name}
              onChange={handleVolunteerChange}
              required
              disabled={isLoading}
            />
            <input
              type="email"
              name="email"
              placeholder="Volunteer Email"
              value={volunteerForm.email}
              onChange={handleVolunteerChange}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
