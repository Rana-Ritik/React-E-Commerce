import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import dataa from './mobiledata';  // Assuming this is your mobile data
import Navbar from './Navbar';

const MobileDetails = () => {
  const { productId } = useParams();  // Get the productId from the URL
  const [mobile, setMobile] = useState(null);  // State to store mobile details

  useEffect(() => {
    // Find the mobile that matches the productId from dataa
    const selectedMobile = dataa.find((item) => item.id === parseInt(productId));
    setMobile(selectedMobile);  // Set mobile data to state
  }, [productId]);  // Re-run the effect when productId changes

  // Check if mobile data is not available yet (e.g., data is loading or productId doesn't match)
  if (!mobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Loading...</h2>  {/* Or use a spinner here */}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mobile Image and Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img className="h-96 w-full object-contain rounded-md" src={mobile.image} alt={mobile.name} />
          </div>
          {/* Mobile Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold text-gray-800">{mobile.name}</h1>
            <p className="text-xl text-gray-600">{mobile.brand}</p>
            <div className="mt-4 text-gray-700">
              <DetailRow label="STORAGE" value={mobile.storage} />
              <DetailRow label="DISPLAY" value={mobile.display} />
              <DetailRow label="CAMERA" value={mobile.camera} />
              <DetailRow label="PROCESSOR" value={mobile.processor} />
            </div>
            <div className="mt-6 text-xl font-bold text-blue-500">{mobile.price}</div>
            
            <div className="mt-6">
              <Link to={`/Order/${mobile.id}`}>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying label and value pairs
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-700 mt-2">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

export default MobileDetails;
