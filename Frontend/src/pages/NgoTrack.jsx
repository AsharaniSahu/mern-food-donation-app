import React from 'react';
import NgoDonationDisplay from './NgoDonationDisplay';
import NgoNavbar from "../components/NgoNavBar";
import './Track.css';

function NgoTrack() {
  const category = 'approved';

  return (
    <>
      <div className="app-container">
        <NgoNavbar />
        <div className="track-container">
          <h2 className="category-label">Approved Donations</h2>
          <NgoDonationDisplay category={category} />
        </div>
      </div>
    </>
  );
}

export default NgoTrack;
