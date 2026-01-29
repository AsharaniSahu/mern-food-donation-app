import React, { useState } from 'react';
import DonationDisplay from './DonationDisplay';
import Navbar from "../components/ManagementNavBar";
import './Track.css';

function MTrack() {
  const [category, setCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
       <div className="app-container">
       <Navbar />
      <div className="track-container">
        <div className="category-selector">
          <label htmlFor="donation" className="category-label">
            Filter Donations
          </label>
          <select
            name="donation"
            id="donation"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIsLoading(true);
              // Simulate loading
              setTimeout(() => setIsLoading(false), 800);
            }}
            className="category-select"
            disabled={isLoading}
          >
            <option value="All">All Donations</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {isLoading ? (
          <div className="loading-state">
            <DonationDisplay category={category} />
          </div>
        ) : (
          <DonationDisplay category={category} />
        )}
      </div>
      </div>
    </>
  );
}

export default MTrack;