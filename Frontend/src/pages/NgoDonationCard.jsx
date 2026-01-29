import React, { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './RecommendationCard.css';
import placeholderImage from './image.png';

const NgoDonationDisplayCard = memo(({ image, productName, productId, status }) => {
  const [loaded, setLoaded] = useState(false);
  const [accepted, setAccepted] = useState(status.toLowerCase() === 'approved');
  const imgRef = useRef(new Image());

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800'
  };

  useEffect(() => {
    const img = imgRef.current;
    img.src = image || placeholderImage;
    img.onload = () => setLoaded(true);
    return () => { img.onload = null; };
  }, [image]);

  const handleAccept = async () => {
        console.log("Product ID:", productId);
       
    try {
      const response = await fetch(`http://localhost:5000/api/DR/accept/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setAccepted(true);
      alert('Donation accepted successfully!');
    } catch (error) {
      console.error('Accept error:', error);
      alert('Failed to accept donation. Try again.');
    }
  };

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/donation/${productId}`}>
        <div className="w-full aspect-[4/5] relative">
          {loaded ? (
            <img
              src={image || placeholderImage}
              alt="Food Donation"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          )}
          <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
          }`}>
            {accepted ? 'Approved' : status}
          </span>
        </div>
      </Link>

      <div className="p-4">
    
        <h3 className="text-lg font-semibold text-gray-800 truncate">{productName}</h3>
          <button
            onClick={handleAccept}
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Accept Donation
          </button>
    
      
      </div>
    </div>
  );
});

export default NgoDonationDisplayCard;
