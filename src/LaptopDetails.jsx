import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from './laptopdata'; // Your laptop data array
import Navbar from './Navbar';
import { useContext } from 'react';


const LaptopDetails = () => {
  const { productId } = useParams(); // Get the laptop id from the URL
  const [laptop, setLaptop] = useState(null); // State to store laptop details
  

  useEffect(() => {
    const selectedLaptop = data.find((item) => item.id === parseInt(productId));
    setLaptop(selectedLaptop); // Set laptop data to state
  }, [productId]);

  if (!laptop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Laptop Image */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img className="h-96 w-full object-contain rounded-md" src={laptop.image} alt={laptop.name} />
          </div>

          {/* Laptop Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold text-gray-800">{laptop.name}</h1>
            <p className="text-xl text-gray-600">{laptop.brand}</p>
            <p className="mt-4 text-gray-700"><strong>Specialty: </strong>{laptop.speciallity}</p>
            <p className="mt-2 text-gray-700"><strong>Display: </strong>{laptop.display}</p>
            <p className="mt-2 text-gray-700"><strong>Series: </strong>{laptop.series}</p>
            <p className="mt-2 text-gray-700"><strong>Battery Backup: </strong>{laptop.batterybackup}</p>
            <div className="mt-4 text-xl font-bold text-blue-500">{laptop.price}</div>

            <div className="mt-6">
              <Link to={`/LaptopOrder/${laptop.id}`}>
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

export default LaptopDetails;
