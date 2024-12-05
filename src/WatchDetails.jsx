import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data2 from './watchesdata'; // Your watches data array
import Navbar from './Navbar';

const WatchDetails = () => {
  const { productId } = useParams(); // Get the watch id from the URL
  const [product2, setProduct2] = useState(null); // State to store watch details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Set loading to true when the effect starts
    setLoading(true);
    setError(null); // Reset error state if the effect is triggered

    // Fetching the watch data based on productId
    const foundProduct = data2.find((item) => item.id === parseInt(productId));
    
    if (foundProduct) {
      setProduct2(foundProduct); // Set the found product
    } else {
      setError("Product not found!"); // Set error if no product is found
    }

    // Set loading to false after fetching the data
    setLoading(false);
  }, [productId]);

  // If loading, show the loading message
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // If an error occurred, show an error message
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  // Render the watch details once product2 is loaded
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Watch Image */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="h-96 w-full object-contain rounded-md"
              src={product2.image} // Access the image property safely
              alt={product2.name}
            />
          </div>

          {/* Watch Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold text-gray-800">{product2.name}</h1>
            <p className="text-xl text-gray-600">{product2.brand}</p>

            {/* Watch Specifications */}
            <div className="mt-4 text-gray-700">
              <div className="flex justify-between mt-2">
                <span className="font-semibold">Display:</span>
                <span>{product2.display}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold">Usage:</span>
                <span>{product2.Usage}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold">Price:</span>
                <span>{product2.price}</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-4 text-xl font-bold text-teal-600">{product2.price}</div>

            {/* Order Button */}
            <div className="mt-6">
              <Link to={`/WatchOrder/${product2.id}`}>
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

export default WatchDetails;
