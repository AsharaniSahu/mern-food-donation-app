import React, { useState, useEffect } from "react";
import Navbar from "../components/ManagementNavBar";
import "./management.css";

// --- New Component for Donation Card ---
const DonationRequestCard = ({ request, onUpdateStatus }) => (
  <div className="card">
    <div className="card-content">
      <p className="description"><b>Food Item:</b> {request.foodItem}</p>
      <p className="description"><b>Quantity:</b> {request.quantity}</p>
      <p className="description"><b>Prepared Time:</b> {request.preparedTime || "Not provided"}</p>
      <p className="description"><b>Description:</b> {request.description || "No description"}</p>
      <p className="description"><b>Status:</b> {request.status}</p>
      <p className="description"><b>Quality:</b> {request.qualitystatus}</p>
      <p className="description"><b>Contact:</b> {request.contact}</p>
      <div className="button-group">
        <button className="accept" onClick={() => onUpdateStatus(request._id, "approved")}>
          Accept
        </button>
        <button className="decline" onClick={() => onUpdateStatus(request._id, "declined")}>
          Reject
        </button>
      </div>
    </div>
  </div>
);

// --- New Component for NGO Card ---
const NgoCard = ({ ngo }) => (
  <div className="card">
    <div className="card-content">
      <p className="description"><b>NGO Name:</b> {ngo.ngoname}</p>
      <p className="description"><b>Contact Person:</b> {ngo.contactperson}</p>
      <p className="description"><b>Phone:</b> {ngo.phoneno}</p>
      <p className="description"><b>Address:</b> {ngo.ngoaddress}</p>
      <p className="description"><b>Status:</b> {ngo.status}</p>
      <div className="button-group">
        <button className="accept" onClick={() => alert(`Acknowledged ${ngo.ngoname}`)}>
          Acknowledge
        </button>
        <button className="decline" onClick={() => alert(`Flagged ${ngo.ngoname} for review`)}>
          Flag
        </button>
      </div>
    </div>
  </div>
);

// --- Enhanced Management Component ---
export default function Management() {
  const [requests, setRequests] = useState([]);
  const [verifiedNGOs, setVerifiedNGOs] = useState([]);

  // State for loading and errors
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isLoadingNGOs, setIsLoadingNGOs] = useState(true);
  const [errorRequests, setErrorRequests] = useState(null);
  const [errorNGOs, setErrorNGOs] = useState(null);

  // Fetch pending donation requests
  const fetchPendingRequests = async () => {
    setIsLoadingRequests(true);
    setErrorRequests(null);
    try {
      const response = await fetch("http://localhost:5000/api/management/pending");
      if (!response.ok) throw new Error("Failed to fetch pending requests");
      const data = await response.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setErrorRequests(err.message);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  // Fetch verified NGOs
  const fetchVerifiedNGOs = async () => {
    setIsLoadingNGOs(true);
    setErrorNGOs(null);
    try {
      const response = await fetch("http://localhost:5000/api/management/verifiedngo");
      if (!response.ok) throw new Error("Failed to fetch verified NGOs");
      const data = await response.json();
      setVerifiedNGOs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching verified NGOs:", err);
      setErrorNGOs(err.message);
    } finally {
      setIsLoadingNGOs(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchVerifiedNGOs();
  }, []);

  // Handle accept/reject donation
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/management/update-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      
      // Update state optimistically
      setRequests(prev => prev.filter(req => req._id !== id));
      alert(`Donation ${newStatus === "approved" ? "Accepted" : "Rejected"}`);
    } catch (err) {
      console.error("Error updating request status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Helper function to render request content
  const renderRequestContent = () => {
    if (isLoadingRequests) return <p className="info-message">Loading pending requests...</p>;
    if (errorRequests) return <p className="error-message">Error: {errorRequests}</p>;
    if (requests.length === 0) return <p className="info-message">No pending donation requests found.</p>;
    
    return requests.map((request) => (
      <DonationRequestCard 
        key={request._id} 
        request={request} 
        onUpdateStatus={handleStatusChange} 
      />
    ));
  };

  // Helper function to render NGO content
  const renderNgoContent = () => {
    if (isLoadingNGOs) return <p className="info-message">Loading verified NGOs...</p>;
    if (errorNGOs) return <p className="error-message">Error: {errorNGOs}</p>;
    if (verifiedNGOs.length === 0) return <p className="info-message">No verified NGOs found.</p>;

    return verifiedNGOs.map((ngo) => (
      <NgoCard key={ngo._id} ngo={ngo} />
    ));
  };

  return (
    <>
      <Navbar />
      <div className="management-page-container">
        
        <section className="management-section">
          <h2>Pending Donation Requests</h2>
          <div className="card-container">
            {renderRequestContent()}
          </div>
        </section>

        <section className="management-section">
          <h2>Verified NGOs</h2>
          <div className="card-container">
            {renderNgoContent()}
          </div>
        </section>

      </div>
    </>
  );
}