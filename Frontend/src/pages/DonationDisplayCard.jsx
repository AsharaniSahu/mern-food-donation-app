import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './RecommendationCard.css'
import placeholderImage from './image.png';

const DonationDisplayCard = memo(({ image, productName, productId, status }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800'
  };  

  // Preload image to prevent flickering
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(new Image());

  useEffect(() => {
    const img = imgRef.current;
    img.src = image || placeholderImage;
    img.onload = () => setLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, [image]);


  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/donation/${productId}`}>
        <div className="w-full aspect-[4/5] relative">
          {loaded ? (
        <img
        src={image || placeholderImage}
        alt="Food Donation"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.warn('Image failed to load:', image);
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
            {status}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {productName}
          </h3>
        </div>
      </Link>
    </div>
  );
});

export default DonationDisplayCard;