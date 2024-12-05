import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import data1 from './tabletdata'; // Your tablet data array
import Navbar from './Navbar';


const TabletDetails = () => {
  const { productId } = useParams(); // Get the tablet id from the URL
  const [tablet, setTablet] = useState(null); // State to store tablet details
  
  

  useEffect(() => {
    const selectedTablet = data1.find((item) => item.id === parseInt(productId));
    setTablet(selectedTablet); // Set tablet data to state
  }, [productId]);

  if (!tablet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tablet Image */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="h-96 w-full object-contain rounded-md"
              src={tablet.image}
              alt={tablet.name}
            />
          </div>

          {/* Tablet Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold text-gray-800">{tablet.name}</h1>
            <p className="text-xl text-gray-600">{tablet.brand}</p>
            <p className="mt-4 text-gray-700">
              <strong>Display: </strong>{tablet.display}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Storage: </strong>{tablet.storage}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Battery Backup: </strong>{tablet.batterybackup}
            </p>
            <div className="mt-4 text-xl font-bold text-blue-500">{tablet.price}</div>

            <div className="mt-6">
              <Link to={`/TabletOrder/${tablet.id}`}>
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

export default TabletDetails;
