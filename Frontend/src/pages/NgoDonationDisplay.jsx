import React, { useState, useEffect, useRef } from 'react';
import NgoDonationCard from './NgoDonationCard';
import { useMemo } from 'react';
import './RecommendationCard.css'
import placeholderImage from './image.png';


function DonationDisplay({ category = 'All' }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevCategoryRef = useRef();

  const fetchDonations = async (currentCategory) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = 'http://localhost:5000/api/DR/recommendations';
      if (currentCategory !== 'All') {
        url += `?status=${currentCategory.toLowerCase()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok || !data.donations) {
        throw new Error(data.message || 'Failed to fetch donations');
      }

      setDonations(data.donations);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if category actually changed
    if (category !== prevCategoryRef.current) {
      prevCategoryRef.current = category;
      fetchDonations(category);
    }
  }, [category]);

  const memoizedDonations = useMemo(() => donations, [donations]);


  return (
    <>
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading donations...</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>Error: {error}</p>
          <button 
            onClick={() => fetchDonations(category)}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

{!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memoizedDonations.map((donation) => (
            <NgoDonationCard
              key={donation._id}
              image={placeholderImage}
              productName={donation.foodItem}
              productId={donation._id}
              status={donation.status}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default React.memo(DonationDisplay);
